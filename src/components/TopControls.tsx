import MasterBPM from './MasterBPM';
import MasterVolume from './MasterVolume';
import TimelineSteps from './TimelineSteps';

type Props = {
  BPM: number,
  setBPM: Function,
  masterVolume: number,
  setMasterVolume: Function,
  steps: number,
  setSteps: Function,
  onAddCustomClick: () => void,
  onPianoClick: () => void
}

export default function TopControls({ 
  BPM, 
  setBPM, 
  masterVolume, 
  setMasterVolume, 
  steps, 
  setSteps, 
  onAddCustomClick,
  onPianoClick 
}: Props) {
  return (
    <div className="flex justify-between bg-gradient-to-r from-primary via-romantic-burgundy to-primary rounded-t-xl px-8 py-3 relative shadow-2xl border-t-2 border-romantic-rose">
      <div className="flex gap-8 items-center relative z-10">
        {/* BPM */}
        <MasterBPM
          BPM={BPM}
          setBPM={setBPM}
        />
        {/* Steps */}
        <TimelineSteps
          steps={steps}
          setSteps={setSteps}
        />
        {/* Add Custom Instrument */}
        <button
          onClick={onAddCustomClick}
          className="bg-gradient-to-br from-romantic-rose to-romantic-pink px-4 py-1 rounded-lg text-white font-bold hover:brightness-110 shadow-lg transition-all hover:scale-105"
        >
          Add Custom
        </button>
        {/* Piano */}
        <button
          onClick={onPianoClick}
          className="bg-gradient-to-br from-romantic-lavender to-romantic-pink px-4 py-1 rounded-lg text-white font-bold hover:brightness-110 shadow-lg transition-all hover:scale-105"
        >
          Piano
        </button>
      </div>
      {/* Master Volume */}
      <MasterVolume
        masterVolume={masterVolume}
        setMasterVolume={setMasterVolume}
      />
    </div>
  );
}