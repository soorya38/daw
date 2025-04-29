import { useState } from "react";

const About = () => {
  // Open or closed state
  const [open, setOpen] = useState(false);

  // Toggle about section
  const toggleOpen = () => {
    setOpen(open => !open);
  }

  return (
    <section onClick={() => toggleOpen()} className="relative z-10 cursor-pointer">
      {!open ? (
        <div className="bg-primary shadow-lg w-8 h-20 flex items-center justify-center rounded-tl-lg rounded-bl-lg fixed right-0 top-[50%] -mt-10">
          <svg className="fill-white w-[14px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
        </div>
      ) : (
        <div className="bg-primary shadow-lg w-80 h-96 px-3 py-3 rounded-tl-lg rounded-bl-lg fixed right-0 top-[50%] -mt-48">
          <div className="flex h-full">
            <div className="self-center -mt-[14px]">
              <svg className="fill-white w-[14px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
              </svg>
            </div>
            <div className="w-full px-5 self-center">
              <h2 className="text-xl text-center font-bold tracking-wider mt-1 mb-3">Guide</h2>
              <p className="mb-3">Cycle a pad sound on the timeline by clicking it multiple times. To clear it use <b>Shift</b> + <b>Click</b> or <b>Hold</b> in mobile.</p>
              <p className="mb-3">You can also solo, mute and adjust the volume and panning of each instrument.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default About;