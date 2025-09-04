import { useState } from 'react';

type Props = {
  onInstrumentAdd: (name: string, file: File) => void;
}

const CustomInstrument = ({ onInstrumentAdd }: Props) => {
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && file) {
      onInstrumentAdd(name, file);
      setName('');
      setFile(null);
    }
  };

  return (
    <div className="bg-primary p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold text-secondary mb-4">Add Custom Instrument</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-light-gray mb-1">
            Instrument Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-secondary text-primary rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-light-gray mb-1">
            Audio File (WAV)
          </label>
          <input
            type="file"
            id="file"
            accept=".wav"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full px-3 py-2 bg-secondary text-primary rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-secondary text-primary px-4 py-2 rounded-md font-bold hover:brightness-90"
        >
          Add Instrument
        </button>
      </form>
    </div>
  );
};

export default CustomInstrument;