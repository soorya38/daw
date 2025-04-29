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
    <div className="flex justify-between bg-primary rounded-t-xl px-8 py-3 relative shadow-lg">
      <div className="flex gap-8 items-center">
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
          className="bg-secondary px-4 py-1 rounded-lg text-primary font-bold hover:brightness-90"
        >
          Add Custom
        </button>
        {/* Piano */}
        <button
          onClick={onPianoClick}
          className="bg-secondary px-4 py-1 rounded-lg text-primary font-bold hover:brightness-90"
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