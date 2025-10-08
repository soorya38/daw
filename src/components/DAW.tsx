import { useState, useEffect, useCallback, useMemo } from 'react';
import TopControls from './TopControls';
import Soundboard from './Soundboard';
import Timeline from './Timeline';
import CustomInstrument from './CustomInstrument';
import Piano from './Piano';

import kit1 from '../json/kit1.json';
import kit2 from '../json/kit2.json';
import kit3 from '../json/kit3.json';
import timelineTemplate from '../json/timeline.json';

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
  audioContext: AudioContext
}

const DAW = ({ audioContext }: Props) => {
  // BPM
  const [BPM, setBPM] = useState(240);

  // Master volume
  const [masterVolume, setMasterVolume] = useState(0.5);

  // Timeline steps
  const [steps, setSteps] = useState(16);

  // Custom instruments
  const [customKit, setCustomKit] = useState<Kit>([]);
  const [showCustomInstrument, setShowCustomInstrument] = useState(false);
  const [showPiano, setShowPiano] = useState(false);
  const [lastAnalyzedSound, setLastAnalyzedSound] = useState<AudioBuffer | null>(null);

  // Timeline state
  const [timeline, setTimeline] = useState<TimelineState>(timelineTemplate);

  // Get sample from public folder or File object
  const getSample = useCallback(async (path: string | File) => {
    let arrayBuffer;
    if (path instanceof File) {
      arrayBuffer = await path.arrayBuffer();
    } else {
      arrayBuffer = await fetch(path);
      arrayBuffer = await arrayBuffer.arrayBuffer();
    }
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }, [audioContext]);

  // Set up sounds on audio buffer arrays
  const loadSounds = useCallback(async (paths: (string | File)[]) => {
    const audioBuffers = [];

    for (const path of paths) {
      const sample = await getSample(path);
      audioBuffers.push(sample);
    }

    return audioBuffers;
  }, [getSample]);

  // Add custom instrument
  const handleAddCustomInstrument = async (name: string, file: File) => {
    const newInstrument: Pad = {
      id: customKit.length + 31, // Start after kit3's last ID
      type: name,
      path: file.name,
      color: '#' + Math.floor(Math.random()*16777215).toString(16), // Random color
      name: name,
      audio: null
    };

    const audioBuffer = await getSample(file);
    newInstrument.audio = audioBuffer;
    setLastAnalyzedSound(audioBuffer);

    // Add the new instrument to customKit
    setCustomKit(prev => [...prev, newInstrument]);

    // Create empty pads array
    const emptyPads: TimelinePad[] = Array(steps).fill(null).map(() => ({
      kit: null,
      sound: null,
      playing: false
    }));

    // Update timeline with the new track
    const newTrack: TimelineTrack = {
      name: name,
      pads: emptyPads,
      state: {
        solo: false,
        muted: false,
        ignored: false
      },
      audio: {
        volume: 0.5,
        panning: 0
      }
    };

    // Update timeline state
    setTimeline(prevTimeline => ({
      ...prevTimeline,
      tracks: [...prevTimeline.tracks, newTrack]
    }));

    setShowCustomInstrument(false);
    setShowPiano(true);
  };

  // Start a sound
  const playSound = (audioBuffer: AudioBuffer, panning=0, selfVol=1, masterVol=masterVolume) => {
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;

    // Panning & volume
    const pan = new StereoPannerNode(audioContext, { pan: panning });
    const vol = audioContext.createGain();
    vol.gain.value = selfVol * masterVol;
    source.connect(vol).connect(pan).connect(audioContext.destination);

    // Play
    source.start(0);
  }

  // State for re-rendering the component after all kits are loaded
  const [loaded, setLoaded] = useState(false);

  // Memoize kits array
  const kits = useMemo(() => [...[kit1, kit2, kit3], customKit], [customKit]);

  // Load all kits
  useEffect(() => {
    const loadKits = async () => {
      try {
        await Promise.all(
          kits.slice(0, 3).map(async (kit) => {
            const paths = kit.map(sound => sound.path);
            const audioBuffers = await loadSounds(paths);
            kit.forEach((sound, i) => {
              sound.audio = audioBuffers[i];
            });
          })
        );
        setLoaded(true);
      } catch (error) {
        console.log("Error loading kits: ", error);
      }
    }

    loadKits();
  }, [kits, loadSounds]);

  return (
    <div className="flex flex-col justify-center max-w-6xl h-[90vh] m-auto">
      {/* Upper Bar Controls */}
      <TopControls
        BPM={BPM}
        setBPM={setBPM}
        masterVolume={masterVolume}
        setMasterVolume={setMasterVolume}
        steps={steps}
        setSteps={setSteps}
        onAddCustomClick={() => setShowCustomInstrument(true)}
        onPianoClick={() => setShowPiano(true)}
      />
      {/* Sound Effects */}
      <Soundboard
        loaded={loaded}
        kits={kits}
        playSound={playSound}
      />
      {/* Timeline */}
      <Timeline
        kits={kits}
        playSound={playSound}
        BPM={BPM}
        setBPM={setBPM}
        masterVolume={masterVolume}
        setMasterVolume={setMasterVolume}
        steps={steps}
        timeline={timeline}
        setTimeline={setTimeline}
      />
      {/* Custom Instrument Modal */}
      {showCustomInstrument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative">
            <button 
              onClick={() => setShowCustomInstrument(false)}
              className="absolute -top-2 -right-2 bg-primary text-secondary w-8 h-8 rounded-full"
            >
              ×
            </button>
            <CustomInstrument onInstrumentAdd={handleAddCustomInstrument} />
          </div>
        </div>
      )}
      {/* Piano Modal */}
      {showPiano && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Piano 
            audioContext={audioContext}
            onClose={() => setShowPiano(false)}
            analyzedSound={lastAnalyzedSound}
          />
        </div>
      )}
    </div>
  );
}

export default DAW;