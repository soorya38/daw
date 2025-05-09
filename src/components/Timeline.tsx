import { useState, useEffect, useRef } from 'react';
import MediaButton from './MediaButton';
import TimelineButton from './TimelineButton';
import Track from './Track';
import Modal from './Modal';

type Pad = {
  id: number,
  type: string,
  path: string,
  color: string,
  name: string,
  audio: AudioBuffer | null
}

type Kit = Pad[];

type TimelinePad = {
  kit: number | null,
  sound: AudioBuffer | null,
  playing: boolean
}

type TimelineTrack = {
  name: string,
  pads: TimelinePad[],
  state: {
    solo: boolean,
    muted: boolean,
    ignored: boolean
  },
  audio: {
    volume: number,
    panning: number
  }
}

type TimelineState = {
  settings: {
    BPM: number,
    masterVolume: number
  },
  tracks: TimelineTrack[]
}

type Props = {
  kits: Kit[],
  playSound: Function,
  BPM: number,
  setBPM: Function,
  masterVolume: number,
  setMasterVolume: Function,
  steps: number,
  timeline: TimelineState,
  setTimeline: (timeline: TimelineState) => void
}

const Timeline = ({ kits, playSound, BPM, setBPM, masterVolume, setMasterVolume, steps, timeline, setTimeline }: Props) => {
  // Timeline sequence on/off
  const [active, setActive] = useState(false);

  // Refs for timeline html utilities
  const timelineSpace = useRef<HTMLDivElement>(null);
  const tracksContainer = useRef<HTMLDivElement>(null);
  const downArrow = useRef<SVGSVGElement>(null);

  const handleScroll = () => {
    const timeline = timelineSpace.current!;
    const container = tracksContainer.current!;
    const arrow = downArrow.current!;

    // Sync tracks container with the top of the timeline
    container.scrollLeft = timeline.scrollLeft;

    // Display or hide down arrow
    if (timeline?.scrollTop === 0) {  // Top
      arrow.style.visibility = 'visible';
      arrow.style.opacity = '1';
    } else {
      arrow.style.opacity = '0';
      arrow.style.visibility = 'hidden';
    }
  }

  // Scroll to the bottom of the timelinespace
  const scrollToBottom = () => {
    const timeline = timelineSpace.current!;
    timeline.scrollTop = 1_000_000;
  }

  // Play all armed timeline pads on a column
  const playColumn = async (column: number) => {
    const newTimeline = {...timeline};
    newTimeline.tracks.forEach((track: TimelineTrack) => {
      // Deactivate previous column pads, and activate current column pads
      const prevColumn = (column - 1 < 0) ? (track.pads.length - 1) : (column - 1);
      const prevPad = track.pads[prevColumn];
      prevPad.playing = false;
      const currPad = track.pads[column];
      currPad.playing = true;

      // Play sound
      if (currPad.kit && (track.state.solo || (!track.state.ignored && !track.state.muted))) {
        playSound(currPad.sound, track.audio.panning, track.audio.volume, newTimeline.settings.masterVolume);

        // Set soundboard pad animation
        const soundboardPad = document.getElementById(`${track.name} ${currPad.kit}`);
        soundboardPad?.classList.add('scale-90');
        setTimeout(() => {
          soundboardPad?.classList.remove('scale-90');
        }, 100);
      }
    });
    setTimeline(newTimeline);
    await new Promise(r => setTimeout(r, 60_000 / timeline.settings.BPM));
  }

  // Media Buttons SVGs and functions
  const playPath = <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />;
  const startTimeline = () => setActive(true);
  const stopPath = <path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />;
  const stopTimeline = () => setActive(false);

  // Clear all tiles
  const clearTimeline = () => {
    const newTimeline = {...timeline};
    newTimeline.tracks.forEach((track: TimelineTrack) => {
      track.pads.forEach((pad: TimelinePad) => {
        pad.kit = null;
        pad.sound = null;
      });
    });
    setTimeline(newTimeline);
    setActive(false);
  }

  // Shuffle all tiles
  const shuffleTimeline = () => {
    clearTimeline();
    const newTimeline = {...timeline};
    newTimeline.tracks.forEach((track: TimelineTrack) => {
      track.pads.forEach((pad: TimelinePad) => {
        const isActive = Math.random() > 0.75;
        if (isActive) {
          const kit = Math.floor(Math.random() * 3) + 1;
          pad.kit = kit;
          const soundData = kits[kit - 1].find(sound => sound.type === track.name);
          if (soundData?.audio) {
            pad.sound = soundData.audio;
          }
        }
      });
    });
    setTimeline(newTimeline);
    setActive(false);
  }

  // Export timeline
  const exportTimeline = () => {
    const saveFile = JSON.stringify(timeline);
    const blob = new Blob([saveFile], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.download = `${'MyBeat'}.beat`;
    anchor.href = url;
    anchor.click();
  }

  // Import timeline
  const importTimeline = () => {
    setActive(false);
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.beat';
    input.click();
    input.addEventListener('change', (event: any) => {
      const fr = new FileReader();
      fr.onload = (e: any) => {
        setBPM(JSON.parse(e.target.result).settings.BPM);
        setMasterVolume(JSON.parse(e.target.result).settings.masterVolume);
        setTimeline(JSON.parse(e.target.result));
      };
      fr.readAsText(event.target.files.item(0));
    });
  }

  // Everything modal 
  const [modalContent, setModalContent] = useState(<div></div>);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [ignoreModal, setIgnoreModal] = useState(false);

  const clearModalContent = (
    <div>
      <h3 className="text-xl font-bold text-center text-secondary mb-5">Are you sure?</h3>
      <p className="text-lg text-secondary mb-5">This will clear all tiles from the current timeline</p>
      <div className="flex justify-between mb-5">
        <button
          className="bg-secondary w-24 rounded-lg py-2 text-primary font-bold hover:brightness-75 shadow-lg"
          onClick={() => setModalVisibility(false)}
        >
          No
        </button>
        <button
          className="bg-[#fa685b] w-24 rounded-lg py-2 text-primary font-bold hover:brightness-75 shadow-lg"
          onClick={() => {
            clearTimeline();
            setModalVisibility(false);
          }}
        >
          Yes
        </button>
      </div>
      <div className="flex justify-center items-center">
        <input id="ignore" name="ignore" type="checkbox" onChange={event => setIgnoreModal(event.target.checked)} />
        <label className="ml-2 text-sm text-secondary" htmlFor="ignore">Don't show warnings again</label>
      </div>
    </div>
  );

  const shuffleModalContent = (
    <div>
      <h3 className="text-xl font-bold text-center text-secondary mb-5">Are you sure?</h3>
      <p className="text-lg text-secondary mb-5">This will randomize all tiles from the current timeline</p>
      <div className="flex justify-between mb-5">
        <button
          className="bg-secondary w-24 rounded-lg py-2 text-primary font-bold shadow-lg"
          onClick={() => setModalVisibility(false)}
        >
          No
        </button>
        <button
          className="bg-[#008ef6] w-24 rounded-lg py-2 text-primary font-bold shadow-lg"
          onClick={() => {
            shuffleTimeline();
            setModalVisibility(false);
          }}
        >
          Yes
        </button>
      </div>
      <div className="flex justify-center items-center">
        <input id="ignore" name="ignore" type="checkbox" onChange={event => setIgnoreModal(event.target.checked)} />
        <label className="ml-2 text-sm text-secondary" htmlFor="ignore">Don't show warnings again</label>
      </div>
    </div>
  );

  // Keyboard events in timeline (pausing & playing, hiding modal)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' && !event.repeat) {
        event.preventDefault();
        setActive(active => !active);
      }
      else if (event.code === 'Escape' && !event.repeat) setModalVisibility(false);
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  // Update BPM and master volume after a change
  useEffect(() => {
    const newTimeline = {...timeline};
    newTimeline.settings.BPM = BPM;
    newTimeline.settings.masterVolume = masterVolume;
    setTimeline(newTimeline);
  }, [BPM, masterVolume]);

  // Update timeline when steps change
  useEffect(() => {
    const newTimeline = {...timeline};
    newTimeline.tracks.forEach((track: TimelineTrack) => {
      // Add or remove pads based on steps
      const currentPads = track.pads.length;
      if (currentPads < steps) {
        // Add new pads
        for (let i = currentPads; i < steps; i++) {
          track.pads.push({ kit: null, sound: null, playing: false });
        }
      } else if (currentPads > steps) {
        // Remove excess pads
        track.pads = track.pads.slice(0, steps);
      }
    });
    setTimeline(newTimeline);
  }, [steps]);

  // Timeline manager (starting & stopping)
  useEffect(() => {
    // Activate columns one by one
    let valid: boolean;
    if (active) {
      valid = true;
      const play = async () => {
        while (valid)
          for (let column = 0; column < timeline.tracks[0]?.pads.length && valid; column++)
            await playColumn(column);
      }
      play();
    }

    // Cleanup
    return () => {
      valid = false;
      const newTimeline = {...timeline};
      newTimeline.tracks.forEach((track: TimelineTrack) => {
        track.pads.forEach((pad: TimelinePad) => {
          pad.playing = false;
        });
      });
      setTimeline(newTimeline);
    }
  }, [active]);

  return (
    <div className="bg-primary h-[80%] lg:h-[45%] max-h-80 rounded-b-xl relative shadow-lg">
      <div className="h-full px-8 pb-4">
        <div ref={timelineSpace} className="w-6xl h-full overflow-auto scroll-smooth" onScroll={() => handleScroll()}>
          {/* Top */}
          <div ref={tracksContainer} className="flex sticky top-0 left-0 right-0 bg-primary z-10 min-w-fit overflow-auto py-4 text-light-gray font-semibold shadow-lg">
            {/* Media Buttons */}
            <div className="w-[10%]">
              <div className="flex gap-5 justify-start">
                {/* Play */}
                <MediaButton
                  svgPath={playPath}
                  color={'#66c187'}
                  role={startTimeline}
                  disabled={active}
                />
                {/* Stop */}
                <MediaButton
                  svgPath={stopPath}
                  color={'#f08937'}
                  role={stopTimeline}
                  disabled={!active}
                />
              </div>
            </div>
            <div className="w-[90%] flex gap-8 text-sm text-center">
              {/* Timeline Steps */}
              <div className="w-[80%] timeline-scroll overflow-x-auto">
                <div className="flex gap-4 min-w-max">
                  {Array.from({ length: steps }, (_, i) => (
                    <span key={i} className="w-8">
                      {Math.floor(i / 4) + 1}.{(i % 4) + 1}
                    </span>
                  ))}
                </div>
              </div>
              {/* Audio Manipulation */}
              <div className="w-[20%] flex gap-5 justify-end items-center">
                <div className="w-[10px]">&nbsp;</div>
                <div className="w-[10px]">&nbsp;</div>
                <div>
                  <span>VOL</span>
                </div>
                <div>
                  <span>PAN</span>
                </div>
              </div>
            </div>
          </div>
          {/* Tracks */}
          <div className="min-w-fit">
            {timeline.tracks.map((track: TimelineTrack) => (
              <Track
                key={track.name}
                self={track}
                soundsData={kits.map(kit => kit.find(sound => sound.type === track.name)).filter(Boolean) as Pad[]}
                playSound={playSound}
                timeline={timeline}
                setTimeline={setTimeline}
              />
            ))}
          </div>
          {/* Timeline main utilities */}
          <div className="flex gap-10 pt-5 w-1/2 m-auto justify-center">
            {/* Clear */}
            <TimelineButton
              text={'CLEAR'}
              role={() => {
                if (!ignoreModal) {
                  setModalVisibility(true);
                  setModalContent(clearModalContent)
                } else clearTimeline();
              }}
            />
            {/* Shuffle */}
            <TimelineButton
              text={'SHUFFLE'}
              role={() => {
                if (!ignoreModal) {
                  setModalVisibility(true);
                  setModalContent(shuffleModalContent)
                } else shuffleTimeline();
              }}
            />
            {/* Export */}
            <TimelineButton
              text={'SAVE'}
              role={exportTimeline}
            />
            {/* Import */}
            <TimelineButton
              text={'LOAD'}
              role={importTimeline}
            />
          </div>
        </div>
      </div>
      {/* Down Arrow */}
      <div className="py-1">
        <svg ref={downArrow} onClick={() => scrollToBottom()} className="fill-light-gray w-[14px] m-auto transition-opacity cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
        </svg>
      </div>
      {/* Timeline Buttons Modal */}
      <Modal visible={modalVisibility}>
        {modalContent}
      </Modal>
    </div>
  );
}

export default Timeline;