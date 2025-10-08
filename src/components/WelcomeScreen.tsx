import { useState, useEffect } from 'react';

type Props = {
  onEnter: () => void;
};

const WelcomeScreen = ({ onEnter }: Props) => {
  const [charIndex, setCharIndex] = useState(0);
  const [poemCharIndex, setPoemCharIndex] = useState(0);
  const [showPoem, setShowPoem] = useState(false);

  const textLines = [
    "A little wanderer has arrived…",
    "✈️ Exploring melodies, mischief, and maybe a few secrets.",
    "🎵 Every beat is an invitation…",
    "Careful — some rhythms bite back. 😉",
    "",
    "Welcome, Rats"
  ];

  const poem = `Scent of your love,
they fill up my lungs.
I swear it's not just air,
I feel you everywhere.
Gazing at the city lights,
They aren't serene like you,
Tryna break my jambs to get to you,
This distance-no-distance stops me though.
With your brewed essence i pass these nights,
Can't i end this longing by hugging you tight?
I'm writing this to you,
And this ain't new,
Because you knew,
I miss you ❤️`;

  const fullText = textLines.join('\n');

  useEffect(() => {
    if (charIndex < fullText.length) {
      const timer = setTimeout(() => {
        setCharIndex(charIndex + 1);
      }, 60);
      return () => clearTimeout(timer);
    } else if (!showPoem) {
      const timer = setTimeout(() => {
        setShowPoem(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [charIndex, fullText, showPoem]);

  useEffect(() => {
    if (showPoem && poemCharIndex < poem.length) {
      const timer = setTimeout(() => {
        setPoemCharIndex(poemCharIndex + 1);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [poemCharIndex, poem, showPoem]);

  const handleClick = () => {
    if (charIndex < fullText.length) {
      setCharIndex(fullText.length);
    } else if (poemCharIndex < poem.length) {
      setPoemCharIndex(poem.length);
    }
  };

  return (
    <div className="fixed inset-0 z-30 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex items-center justify-center overflow-auto p-2 sm:p-4 lg:p-8">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="notebookLines" x="0" y="0" width="100%" height="40" patternUnits="userSpaceOnUse">
            <line x1="0" y1="40" x2="100%" y2="40" stroke="#e5c9a0" strokeWidth="1" opacity="0.4"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="#fffef7"/>
        <rect width="100%" height="100%" fill="url(#notebookLines)"/>
      </svg>

      <div className="walking-paws-container">
        <div className="paw-track paw-track-1">
          <div className="paw-print paw-left" style={{ left: '0%' }}></div>
          <div className="paw-print paw-right" style={{ left: '8%' }}></div>
          <div className="paw-print paw-left" style={{ left: '16%' }}></div>
          <div className="paw-print paw-right" style={{ left: '24%' }}></div>
          <div className="paw-print paw-left" style={{ left: '32%' }}></div>
          <div className="paw-print paw-right" style={{ left: '40%' }}></div>
          <div className="paw-print paw-left" style={{ left: '48%' }}></div>
          <div className="paw-print paw-right" style={{ left: '56%' }}></div>
          <div className="paw-print paw-left" style={{ left: '64%' }}></div>
          <div className="paw-print paw-right" style={{ left: '72%' }}></div>
          <div className="paw-print paw-left" style={{ left: '80%' }}></div>
          <div className="paw-print paw-right" style={{ left: '88%' }}></div>
        </div>

        <div className="paw-track paw-track-2">
          <div className="paw-print paw-right" style={{ left: '0%' }}></div>
          <div className="paw-print paw-left" style={{ left: '10%' }}></div>
          <div className="paw-print paw-right" style={{ left: '20%' }}></div>
          <div className="paw-print paw-left" style={{ left: '30%' }}></div>
          <div className="paw-print paw-right" style={{ left: '40%' }}></div>
          <div className="paw-print paw-left" style={{ left: '50%' }}></div>
          <div className="paw-print paw-right" style={{ left: '60%' }}></div>
          <div className="paw-print paw-left" style={{ left: '70%' }}></div>
          <div className="paw-print paw-right" style={{ left: '80%' }}></div>
          <div className="paw-print paw-left" style={{ left: '90%' }}></div>
        </div>

        <div className="paw-track paw-track-3">
          <div className="paw-print paw-left" style={{ left: '5%' }}></div>
          <div className="paw-print paw-right" style={{ left: '15%' }}></div>
          <div className="paw-print paw-left" style={{ left: '25%' }}></div>
          <div className="paw-print paw-right" style={{ left: '35%' }}></div>
          <div className="paw-print paw-left" style={{ left: '45%' }}></div>
          <div className="paw-print paw-right" style={{ left: '55%' }}></div>
          <div className="paw-print paw-left" style={{ left: '65%' }}></div>
          <div className="paw-print paw-right" style={{ left: '75%' }}></div>
          <div className="paw-print paw-left" style={{ left: '85%' }}></div>
          <div className="paw-print paw-right" style={{ left: '95%' }}></div>
        </div>

        <div className="paw-track paw-track-4">
          <div className="paw-print paw-right" style={{ left: '2%' }}></div>
          <div className="paw-print paw-left" style={{ left: '12%' }}></div>
          <div className="paw-print paw-right" style={{ left: '22%' }}></div>
          <div className="paw-print paw-left" style={{ left: '32%' }}></div>
          <div className="paw-print paw-right" style={{ left: '42%' }}></div>
          <div className="paw-print paw-left" style={{ left: '52%' }}></div>
          <div className="paw-print paw-right" style={{ left: '62%' }}></div>
          <div className="paw-print paw-left" style={{ left: '72%' }}></div>
          <div className="paw-print paw-right" style={{ left: '82%' }}></div>
          <div className="paw-print paw-left" style={{ left: '92%' }}></div>
        </div>
      </div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" xmlns="http://www.w3.org/2000/svg">
        <g className="animate-float-1 hidden sm:block" opacity="0.3">
          <path d="M 100 150 Q 100 120 130 120 Q 160 120 160 150 Q 160 180 130 180 Q 100 180 100 150 Z"
                fill="none" stroke="#8b7355" strokeWidth="2"/>
          <circle cx="140" cy="150" r="8" fill="#8b7355"/>
          <line x1="148" y1="150" x2="190" y2="140" stroke="#8b7355" strokeWidth="2"/>
          <line x1="190" y1="140" x2="195" y2="145" stroke="#8b7355" strokeWidth="2"/>
          <line x1="190" y1="140" x2="185" y2="135" stroke="#8b7355" strokeWidth="2"/>
        </g>

        <g className="animate-float-2" opacity="0.3">
          <ellipse cx="85%" cy="25%" rx="15" ry="20" fill="none" stroke="#8b7355" strokeWidth="2" transform="rotate(-20 85% 25%)"/>
          <circle cx="85%" cy="25%" r="5" fill="#8b7355"/>
        </g>

        <g className="animate-float-3 hidden md:block" opacity="0.25">
          <path d="M 200 450 Q 210 440 220 450 T 240 450" fill="none" stroke="#8b7355" strokeWidth="2"/>
          <circle cx="230" cy="445" r="4" fill="#8b7355"/>
        </g>

        <path className="animate-scribble-1 hidden sm:block" d="M 50 80 Q 70 60 90 80 Q 110 100 130 80"
              fill="none" stroke="#d4a574" strokeWidth="1.5" opacity="0.4"/>

        <path className="animate-scribble-2" d="M 80% 15% L 85% 18% L 82% 22% L 87% 25%"
              fill="none" stroke="#d4a574" strokeWidth="1.5" opacity="0.4"/>

        <g className="animate-paw-1" opacity="0.2">
          <ellipse cx="15%" cy="70%" rx="8" ry="10" fill="#a0826d"/>
          <circle cx="13%" cy="65%" r="4" fill="#a0826d"/>
          <circle cx="17%" cy="65%" r="4" fill="#a0826d"/>
          <circle cx="12%" cy="68%" r="3" fill="#a0826d"/>
          <circle cx="18%" cy="68%" r="3" fill="#a0826d"/>
        </g>

        <g className="animate-paw-2" opacity="0.2">
          <ellipse cx="90%" cy="80%" rx="8" ry="10" fill="#a0826d" transform="rotate(25 90% 80%)"/>
          <circle cx="88%" cy="76%" r="4" fill="#a0826d"/>
          <circle cx="92%" cy="76%" r="4" fill="#a0826d"/>
          <circle cx="87%" cy="79%" r="3" fill="#a0826d"/>
          <circle cx="93%" cy="79%" r="3" fill="#a0826d"/>
        </g>

        <g className="animate-paw-3 hidden sm:block" opacity="0.15">
          <ellipse cx="25%" cy="20%" rx="6" ry="8" fill="#a0826d"/>
          <circle cx="23%" cy="16%" r="3" fill="#a0826d"/>
          <circle cx="27%" cy="16%" r="3" fill="#a0826d"/>
          <circle cx="22%" cy="19%" r="2.5" fill="#a0826d"/>
          <circle cx="28%" cy="19%" r="2.5" fill="#a0826d"/>
        </g>
      </svg>

      <div className="relative z-10 w-full max-w-6xl mx-auto my-4 sm:my-8 perspective-1000">
        <div className="notebook-page-left hidden lg:block"></div>
        <div className="notebook-page-right hidden lg:block"></div>

        <div
          className="bg-gradient-to-br from-amber-50/95 to-yellow-50/95 backdrop-blur-sm rounded-lg shadow-2xl p-4 sm:p-8 lg:p-12 border-l-4 border-amber-800 overflow-auto max-h-[90vh] cursor-pointer relative"
          onClick={handleClick}
          style={{
            backgroundImage: `repeating-linear-gradient(
              transparent,
              transparent 39px,
              rgba(197, 159, 115, 0.2) 39px,
              rgba(197, 159, 115, 0.2) 40px
            )`,
            boxShadow: '-5px 0 15px rgba(0,0,0,0.1), 10px 10px 30px rgba(0,0,0,0.2)'
          }}
        >
          <div className="absolute top-0 left-0 w-0.5 sm:w-1 h-full bg-red-400 opacity-30" style={{ marginLeft: '40px' }}></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12">
            <div className="min-h-[300px] sm:min-h-[400px] pl-2 sm:pl-4 border-b lg:border-b-0 lg:border-r border-amber-300/50 pb-6 lg:pb-0 lg:pr-6">
              <pre className="text-base sm:text-xl lg:text-2xl xl:text-3xl text-amber-900 leading-relaxed whitespace-pre-wrap font-handwriting tracking-wide"
                   style={{ fontFamily: "'Caveat', 'Shadows Into Light', cursive" }}>
                {fullText.substring(0, charIndex)}
                {charIndex < fullText.length && <span className="animate-blink text-amber-800">|</span>}
              </pre>
            </div>

            <div className="min-h-[300px] sm:min-h-[400px] pl-2 sm:pl-4">
              {showPoem && (
                <pre className="text-base sm:text-lg lg:text-xl xl:text-2xl text-rose-900 leading-relaxed whitespace-pre-wrap font-handwriting tracking-wide animate-fade-in"
                     style={{ fontFamily: "'Caveat', 'Shadows Into Light', cursive" }}>
                  {poem.substring(0, poemCharIndex)}
                  {poemCharIndex < poem.length && <span className="animate-blink text-rose-800">|</span>}
                </pre>
              )}
            </div>
          </div>

          {charIndex >= fullText.length && poemCharIndex >= poem.length && (
            <div className="flex justify-center mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-amber-300/50 animate-fade-in">
              <button
                className="bg-amber-700 hover:bg-amber-800 text-amber-50 font-bold py-3 px-8 sm:py-4 sm:px-12 lg:py-5 lg:px-16 rounded-lg shadow-lg transform transition hover:scale-105 hover:rotate-1 text-base sm:text-lg lg:text-xl"
                onClick={(e) => {
                  e.stopPropagation();
                  onEnter();
                }}
              >
                Enter the Studio
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Shadows+Into+Light&display=swap');

        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(20px, -15px) rotate(5deg); }
          66% { transform: translate(-10px, 10px) rotate(-3deg); }
        }

        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) rotate(-20deg); }
          50% { transform: translate(-15px, 20px) rotate(-25deg); }
        }

        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, -10px); }
        }

        @keyframes scribble-1 {
          0% { stroke-dasharray: 0, 200; }
          100% { stroke-dasharray: 200, 0; }
        }

        @keyframes scribble-2 {
          0% { stroke-dasharray: 0, 100; }
          100% { stroke-dasharray: 100, 0; }
        }

        @keyframes paw-1 {
          0%, 100% { transform: translate(0, 0); opacity: 0.2; }
          50% { transform: translate(5px, -5px); opacity: 0.3; }
        }

        @keyframes paw-2 {
          0%, 100% { transform: translate(0, 0); opacity: 0.2; }
          50% { transform: translate(-8px, 8px); opacity: 0.25; }
        }

        @keyframes paw-3 {
          0%, 100% { transform: translate(0, 0); opacity: 0.15; }
          50% { transform: translate(3px, 5px); opacity: 0.2; }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes walk-track-1 {
          0% { transform: translateX(-100%) translateY(0); opacity: 0; }
          5% { opacity: 0.4; }
          95% { opacity: 0.4; }
          100% { transform: translateX(100vw) translateY(50px); opacity: 0; }
        }

        @keyframes walk-track-2 {
          0% { transform: translateX(-100%) translateY(0); opacity: 0; }
          5% { opacity: 0.3; }
          95% { opacity: 0.3; }
          100% { transform: translateX(100vw) translateY(-40px); opacity: 0; }
        }

        @keyframes walk-track-3 {
          0% { transform: translateX(100vw) translateY(0); opacity: 0; }
          5% { opacity: 0.35; }
          95% { opacity: 0.35; }
          100% { transform: translateX(-100%) translateY(60px); opacity: 0; }
        }

        @keyframes walk-track-4 {
          0% { transform: translateX(100vw) translateY(0); opacity: 0; }
          5% { opacity: 0.25; }
          95% { opacity: 0.25; }
          100% { transform: translateX(-100%) translateY(-30px); opacity: 0; }
        }

        @keyframes paw-appear {
          0%, 100% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }

        .animate-blink { animation: blink 1s step-end infinite; }
        .animate-float-1 { animation: float-1 8s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 10s ease-in-out infinite; }
        .animate-float-3 { animation: float-3 7s ease-in-out infinite; }
        .animate-scribble-1 { animation: scribble-1 3s ease-in-out infinite; }
        .animate-scribble-2 { animation: scribble-2 4s ease-in-out infinite; }
        .animate-paw-1 { animation: paw-1 6s ease-in-out infinite; }
        .animate-paw-2 { animation: paw-2 7s ease-in-out infinite 1s; }
        .animate-paw-3 { animation: paw-3 5s ease-in-out infinite 2s; }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }

        .font-handwriting {
          font-family: 'Caveat', 'Shadows Into Light', cursive;
          font-weight: 600;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .notebook-page-left,
        .notebook-page-right {
          position: absolute;
          width: 40px;
          height: 100%;
          top: 0;
          background: linear-gradient(to right, rgba(139, 115, 85, 0.1), transparent);
          pointer-events: none;
          z-index: 1;
        }

        .notebook-page-left {
          left: -40px;
        }

        .notebook-page-right {
          right: -40px;
          background: linear-gradient(to left, rgba(139, 115, 85, 0.1), transparent);
        }

        .walking-paws-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 5;
          overflow: hidden;
        }

        .paw-track {
          position: absolute;
          width: 100%;
          height: 40px;
          display: flex;
          align-items: center;
        }

        .paw-track-1 {
          top: 15%;
          animation: walk-track-1 18s ease-in-out infinite;
        }

        .paw-track-2 {
          top: 45%;
          animation: walk-track-2 22s ease-in-out infinite 3s;
        }

        .paw-track-3 {
          top: 70%;
          animation: walk-track-3 20s ease-in-out infinite 6s;
        }

        .paw-track-4 {
          top: 30%;
          animation: walk-track-4 25s ease-in-out infinite 9s;
        }

        .paw-print {
          position: absolute;
          width: 18px;
          height: 20px;
          animation: paw-appear 2s ease-in-out infinite;
        }

        .paw-print::before {
          content: '';
          position: absolute;
          width: 8px;
          height: 10px;
          background: #8b6f47;
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }

        .paw-print::after {
          content: '';
          position: absolute;
          width: 4px;
          height: 4px;
          background: #8b6f47;
          border-radius: 50%;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          box-shadow:
            -5px 2px 0 0 #8b6f47,
            5px 2px 0 0 #8b6f47,
            -3px 6px 0 -1px #8b6f47,
            3px 6px 0 -1px #8b6f47;
        }

        .paw-left {
          transform: rotate(-15deg);
        }

        .paw-right {
          transform: rotate(15deg);
        }

        .paw-print:nth-child(1) { animation-delay: 0s; }
        .paw-print:nth-child(2) { animation-delay: 0.15s; }
        .paw-print:nth-child(3) { animation-delay: 0.3s; }
        .paw-print:nth-child(4) { animation-delay: 0.45s; }
        .paw-print:nth-child(5) { animation-delay: 0.6s; }
        .paw-print:nth-child(6) { animation-delay: 0.75s; }
        .paw-print:nth-child(7) { animation-delay: 0.9s; }
        .paw-print:nth-child(8) { animation-delay: 1.05s; }
        .paw-print:nth-child(9) { animation-delay: 1.2s; }
        .paw-print:nth-child(10) { animation-delay: 1.35s; }
        .paw-print:nth-child(11) { animation-delay: 1.5s; }
        .paw-print:nth-child(12) { animation-delay: 1.65s; }

        @media (max-width: 640px) {
          .animate-float-1,
          .animate-float-3,
          .animate-scribble-1,
          .animate-paw-3 {
            display: none;
          }

          .paw-track-3,
          .paw-track-4 {
            display: none;
          }

          .paw-print {
            width: 14px;
            height: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default WelcomeScreen;
