import React, { useState } from 'react';

const SpinTheWheel = () => {
  const [result, setResult] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showOutcomes, setShowOutcomes] = useState(false);
  const [allOptionsExhausted, setAllOptionsExhausted] = useState(false);
  const [remainingOptions, setRemainingOptions] = useState([
    'Car blew up', 
    'Car is fucked', 
    'Traffic blew up car', 
    'Laptop blew up', 
    'Plane blew up', 
    'Wasn\'t feeling it', 
    'Complicit in eco terrorism', 
    'Arrested', 
    'Detained by customs', 
    'Zoom engineers put out a hit on him', 
    'Horrendous weather (64 and cloudy)', 
    'He\'s here but the mic is off'
  ]);

  const spinWheel = () => {
    if (isSpinning) return;
    
    // If no options left, reset the options
    if (remainingOptions.length === 0) {
      setAllOptionsExhausted(true);
      return;
    }

    setIsSpinning(true);
    setResult(null);

    // Simulate wheel spinning
    setTimeout(() => {
      // Get a random index from remaining options
      const randomIndex = Math.floor(Math.random() * remainingOptions.length);
      const selectedOption = remainingOptions[randomIndex];
      
      // Remove the selected option from remaining options
      const updatedOptions = remainingOptions.filter((_, index) => index !== randomIndex);
      
      setResult(selectedOption);
      setRemainingOptions(updatedOptions);
      setIsSpinning(false);

      // Check if this was the last option
      if (updatedOptions.length === 0) {
        setAllOptionsExhausted(true);
      }
    }, 2000);
  };

  const resetGame = () => {
    setAllOptionsExhausted(false);
    setResult(null);
    setRemainingOptions([
      'Car blew up', 
      'Car is fucked', 
      'Traffic blew up car', 
      'Laptop blew up', 
      'Plane blew up', 
      'Wasn\'t feeling it', 
      'Complicit in eco terrorism', 
      'Arrested', 
      'Detained by customs', 
      'Zoom engineers put out a hit on him', 
      'Horrendous weather (64 and cloudy)', 
      'He\'s here but the mic is off'
    ]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 p-8 w-full max-w-md transform transition-all duration-300 hover:scale-105">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-white drop-shadow-lg">
          Why is Professor Perry MIA?
        </h1>
        
        {allOptionsExhausted ? (
          <div className="text-center">
            <p className="text-3xl font-bold mb-6 animate-pulse-color">
              CLASS MAY ACTUALLY HAPPEN!
            </p>
            <button 
              onClick={resetGame}
              className="px-6 py-3 bg-white/30 hover:bg-white/40 text-white rounded-full 
              transition-colors duration-300 backdrop-blur-sm"
            >
              Play Again
            </button>
          </div>
        ) : (
          <>
            <div 
              onClick={spinWheel} 
              className={`mx-auto w-48 h-48 bg-white/30 rounded-full flex items-center justify-center cursor-pointer 
              hover:bg-white/40 transition-all duration-300 shadow-xl 
              ${isSpinning ? 'animate-spin' : ''}`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="96" 
                height="96" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="drop-shadow-md"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2v20" />
                <path d="m22 12-5 5" />
                <path d="m2 12 5 5" />
                <path d="m7 12 5 5" />
                <path d="m12 7 5 5" />
              </svg>
            </div>
            
            <div className="text-center h-16 mt-6">
              {isSpinning ? (
                <p className="text-white animate-pulse text-xl">Spinning...</p>
              ) : result ? (
                <p className="text-2xl font-bold text-white drop-shadow-lg">{result}</p>
              ) : (
                <p className="text-white/70 text-lg">Click the wheel to spin!</p>
              )}
            </div>

            <div className="mt-6 text-center">
              <button 
                onClick={() => setShowOutcomes(!showOutcomes)}
                className="px-4 py-2 bg-white/30 hover:bg-white/40 text-white rounded-full 
                transition-colors duration-300 backdrop-blur-sm"
              >
                {showOutcomes ? 'Hide' : 'Show'} Possible Outcomes
              </button>

              {showOutcomes && (
                <div className="text-sm text-white mt-4 bg-white/20 rounded-lg p-4">
                  <h3 className="font-bold mb-2">Remaining Outcomes:</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {remainingOptions.map((option, index) => (
                      <div key={index} className="text-left p-1">{option}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <style>{`
        @keyframes pulse-color {
          0%, 100% { color: white; }
          25% { color: #ff6b6b; }
          50% { color: #4ecdc4; }
          75% { color: #45b7d1; }
        }
        .animate-pulse-color {
          animation: pulse-color 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default SpinTheWheel;
