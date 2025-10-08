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
    "Careful — some rhythms bite back. 😉"
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
    <div className="fixed inset-0 z-30 bg-gradient-to-br from-blue-50 via-pink-50 to-blue-100 flex items-center justify-center overflow-auto p-2 sm:p-4 lg:p-8">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="notebookLines" x="0" y="0" width="100%" height="40" patternUnits="userSpaceOnUse">
            <line x1="0" y1="40" x2="100%" y2="40" stroke="#bfdbfe" strokeWidth="1" opacity="0.4"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="#fffef7"/>
        <rect width="100%" height="100%" fill="url(#notebookLines)"/>
      </svg>

      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" xmlns="http://www.w3.org/2000/svg">
        <g className="animate-float-1 hidden sm:block" opacity="0.3">
          <path d="M 100 150 Q 100 120 130 120 Q 160 120 160 150 Q 160 180 130 180 Q 100 180 100 150 Z"
                fill="none" stroke="#3b82f6" strokeWidth="2"/>
          <circle cx="140" cy="150" r="8" fill="#ec4899"/>
          <line x1="148" y1="150" x2="190" y2="140" stroke="#8b7355" strokeWidth="2"/>
          <line x1="190" y1="140" x2="195" y2="145" stroke="#8b7355" strokeWidth="2"/>
          <line x1="190" y1="140" x2="185" y2="135" stroke="#8b7355" strokeWidth="2"/>
        </g>

        <g className="animate-float-2" opacity="0.3">
          <ellipse cx="85%" cy="25%" rx="15" ry="20" fill="none" stroke="#8b7355" strokeWidth="2" transform="rotate(-20 85% 25%)"/>
          <circle cx="85%" cy="25%" r="5" fill="#3b82f6"/>
        </g>

        <g className="animate-float-3 hidden md:block" opacity="0.25">
          <path d="M 200 450 Q 210 440 220 450 T 240 450" fill="none" stroke="#8b7355" strokeWidth="2"/>
          <circle cx="230" cy="445" r="4" fill="#ec4899"/>
        </g>

        <path className="animate-scribble-1 hidden sm:block" d="M 50 80 Q 70 60 90 80 Q 110 100 130 80"
              fill="none" stroke="#f9a8d4" strokeWidth="1.5" opacity="0.4"/>

        <path className="animate-scribble-2" d="M 80% 15% L 85% 18% L 82% 22% L 87% 25%"
              fill="none" stroke="#f9a8d4" strokeWidth="1.5" opacity="0.4"/>

        <g className="animate-paw-1" opacity="0.2">
          <ellipse cx="15%" cy="70%" rx="8" ry="10" fill="#93c5fd"/>
          <circle cx="13%" cy="65%" r="4" fill="#93c5fd"/>
          <circle cx="17%" cy="65%" r="4" fill="#93c5fd"/>
          <circle cx="12%" cy="68%" r="3" fill="#93c5fd"/>
          <circle cx="18%" cy="68%" r="3" fill="#93c5fd"/>
        </g>

        <g className="animate-paw-2" opacity="0.2">
          <ellipse cx="90%" cy="80%" rx="8" ry="10" fill="#f9a8d4" transform="rotate(25 90% 80%)"/>
          <circle cx="88%" cy="76%" r="4" fill="#f9a8d4"/>
          <circle cx="92%" cy="76%" r="4" fill="#f9a8d4"/>
          <circle cx="87%" cy="79%" r="3" fill="#f9a8d4"/>
          <circle cx="93%" cy="79%" r="3" fill="#f9a8d4"/>
        </g>

        <g className="animate-paw-3 hidden sm:block" opacity="0.15">
          <ellipse cx="25%" cy="20%" rx="6" ry="8" fill="#3b82f6"/>
          <circle cx="23%" cy="16%" r="3" fill="#3b82f6"/>
          <circle cx="27%" cy="16%" r="3" fill="#3b82f6"/>
          <circle cx="22%" cy="19%" r="2.5" fill="#3b82f6"/>
          <circle cx="28%" cy="19%" r="2.5" fill="#3b82f6"/>
        </g>
      </svg>

      <div className="relative z-10 w-full max-w-6xl mx-auto my-4 sm:my-8 perspective-1000">
        <div className="notebook-page-left hidden lg:block"></div>
        <div className="notebook-page-right hidden lg:block"></div>

        <div
          className="bg-gradient-to-br from-blue-50/95 to-pink-50/95 backdrop-blur-sm rounded-lg shadow-2xl p-4 sm:p-8 lg:p-12 border-l-4 border-blue-600 overflow-auto max-h-[90vh] cursor-pointer relative"
          onClick={handleClick}
          style={{
            backgroundImage: `repeating-linear-gradient(
              transparent,
              transparent 39px,
              rgba(147, 197, 253, 0.2) 39px,
              rgba(147, 197, 253, 0.2) 40px
            )`,
            boxShadow: '-5px 0 15px rgba(0,0,0,0.1), 10px 10px 30px rgba(0,0,0,0.2)'
          }}
        >
          <div className="absolute top-0 left-0 w-0.5 sm:w-1 h-full bg-pink-400 opacity-30" style={{ marginLeft: '40px' }}></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12">
            <div className="min-h-[300px] sm:min-h-[400px] pl-2 sm:pl-4 border-b lg:border-b-0 lg:border-r border-blue-300/50 pb-6 lg:pb-0 lg:pr-6">
              <pre className="text-base sm:text-xl lg:text-2xl xl:text-3xl text-blue-900 leading-relaxed whitespace-pre-wrap font-handwriting tracking-wide"
                   style={{ fontFamily: "'Caveat', 'Shadows Into Light', cursive" }}>
                {fullText.substring(0, charIndex)}
                {charIndex < fullText.length && <span className="animate-blink text-blue-800">|</span>}
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
            <div className="flex justify-center mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-pink-300/50 animate-fade-in">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 sm:py-4 sm:px-12 lg:py-5 lg:px-16 rounded-lg shadow-lg transform transition hover:scale-105 hover:rotate-1 text-base sm:text-lg lg:text-xl"
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
          background: linear-gradient(to right, rgba(59, 130, 246, 0.1), transparent);
          pointer-events: none;
          z-index: 1;
        }

        .notebook-page-left {
          left: -40px;
        }

        .notebook-page-right {
          right: -40px;
          background: linear-gradient(to left, rgba(236, 72, 153, 0.1), transparent);
        }

      `}</style>
    </div>
  );
};

export default WelcomeScreen;
