type Props = {
  steps: number,
  setSteps: Function
}

const TimelineSteps = ({ steps, setSteps }: Props) => {
  const stepOptions = [4, 8, 12, 16, 20, 24, 28, 32];

  return (
    <div className="flex gap-3 items-center">
      <span className="text-sm text-light-gray font-semibold">STEPS</span>
      <select
        value={steps}
        onChange={(e) => setSteps(Number(e.target.value))}
        className="bg-secondary text-primary px-3 py-1 rounded-md font-bold cursor-pointer hover:brightness-90"
      >
        {stepOptions.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TimelineSteps;