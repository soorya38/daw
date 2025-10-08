import TimelinePad  from "./TimelinePad";
import TrackUtility from "./TrackUtility";
import Knob from "./Knob";

type Pad = {
  id: number,
  type: string,
  path: string,
  color: string,
  name: string,
  audio: AudioBuffer | null
}

type AudioTrack = {
  name: string,
  pads: {
    kit: number | null,
    sound: AudioBuffer | null,
    playing: boolean
  }[],
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

type Timeline = {
  settings: { 
    BPM: number,
    masterVolume: number
  },
  tracks: AudioTrack[]
}

type Props = {
  self: AudioTrack,
  soundsData: Pad[],
  playSound: Function,
  timeline: Timeline,
  setTimeline: Function
}

const Track = ({ self, soundsData, playSound, timeline, setTimeline }: Props) => {
  // Properties of all pads on the corresponding track
  const pads = timeline.tracks.find(track => track.name === self.name)!.pads;

  // Solo selected track, mute all others
  const soloTrack = () => {
    const newTimeline = {...timeline};
    const tracks = newTimeline.tracks;

    // Remove solo from all other tracks, and ignore them
    tracks.forEach(track => {
      if (track.name !== self.name) {
        track.state.solo = false;
      }
      track.state.ignored = true;
    });

    // Solo self track
    const index = tracks.findIndex(track => track.name === self.name);
    tracks[index].state.solo = !tracks[index].state.solo;

    // No soloed tracks, remove ignored state
    const soloCount = tracks.filter(track => track.state.solo === true).length;
    if (soloCount === 0) {
      tracks.forEach(track => {
        track.state.ignored = false;
      });
    }

    setTimeline(newTimeline);
  };

  // Don't play any media from selected track
  const muteTrack = () => {
    const newTimeline = {...timeline};
    const tracks = newTimeline.tracks;

    // Mute self track
    const index = tracks.findIndex(track => track.name === self.name);
    tracks[index].state.muted = !tracks[index].state.muted;
    
    setTimeline(newTimeline);
  };

  return (
    <div className="py-2">
      <div className="flex">
        <div className="w-[10%] text-lg text-romantic-pink">
          <span><b>{self.name}</b></span>
        </div>
        <div className="w-[90%] flex gap-8 text-sm text-center">
          {/* Timeline Pads */}
          <div className="w-[80%] timeline-scroll overflow-x-auto">
            <div className="flex gap-4 min-w-max">
              {pads.map((pad, index) => (
                <TimelinePad
                  key={index}
                  padProperties={pad}
                  stateProperties={self.state}
                  audioProperties={self.audio}
                  soundsData={soundsData}
                  playSound={playSound}
                />
              ))}
            </div>
          </div>
          {/* Audio Manipulation */}
          <div className="w-[20%] flex gap-5 justify-end items-center">
            {/* Solo */}
            <TrackUtility
              symbol={'S'}
              activeColor={'#ff6b9d'}
              role={soloTrack}
              property={self.state.solo}
              canBeIgnored={false}
              ignored={self.state.ignored}
            />
            {/* Mute */}
            <TrackUtility
              symbol={'M'}
              activeColor={'#ffb3d9'}
              role={muteTrack}
              property={self.state.muted}
              canBeIgnored={true}
              ignored={self.state.ignored}
            />
            {/* Volume */}
            <Knob
              value={self.audio.volume}
              setter={(value: number) => {
                const newTimeline = {...timeline};
                newTimeline.tracks.find(track => track.name === self.name)!.audio.volume = value;
                setTimeline(newTimeline);
              }}
              initial={0.5}
              min={0}
              max={1}
              step={0.02}
              getRotation={(val: number) => 250 * (val - 0.5)}
            />
            {/* Panning */}
            <Knob
              value={self.audio.panning}
              setter={(value: number) => {
                const newTimeline = {...timeline};
                newTimeline.tracks.find(track => track.name === self.name)!.audio.panning = value;
                setTimeline(newTimeline);
              }}
              initial={0}
              min={-1}
              max={1}
              step={0.04}
              getRotation={(val: number) => 120 * val}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Track;