
import React, { useState } from 'react';

const morseCodeMap = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
  'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
  'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..',
  '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', '0': '-----',
  ' ': '/'
};

// Create a reverse map for decoding
const reverseMorseCodeMap = Object.entries(morseCodeMap).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {});


const MorseCodeConverter = ({ addToMessage }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [toMorse, setToMorse] = useState(true); // true for text to morse, false for morse to text

  const convertToMorse = (text) => {
    let morse = '';
    for (let char of text.toUpperCase()) {
      if (morseCodeMap[char]) {
        morse += morseCodeMap[char] + ' ';
      } else {
        morse += '? '; // Represent unknown characters
      }
    }
    setOutput(morse.trim());
  };

  const convertFromMorse = (morse) => {
    let text = '';
    const morseChars = morse.split(' ');
    for (let morseChar of morseChars) {
      if (reverseMorseCodeMap[morseChar]) {
        text += reverseMorseCodeMap[morseChar];
      } else if (morseChar === '/') {
        text += ' ';
      }
    }
    setOutput(text);
  };


  const handleInputChange = (e) => {
    const newText = e.target.value;
    setInput(newText);
    if (toMorse) {
      convertToMorse(newText);
    } else {
      convertFromMorse(newText);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const swapConversion = () => {
    const oldInput = input;
    setInput(output);
    setOutput(oldInput);
    setToMorse(!toMorse);
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Morse Code Converter</h2>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
        <div>
          <label htmlFor="morse-input" className="block text-sm font-medium text-gray-400 mb-2">
            {toMorse ? 'Text' : 'Morse Code'}
          </label>
          <textarea
            id="morse-input"
            className="w-full h-32 p-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder={toMorse ? 'Enter text...' : 'Enter Morse code...'}
            value={input}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="flex justify-center">
            <button
                onClick={swapConversion}
                className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                title="Swap conversion direction"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m2 5H4m0 0l4 4m-4-4l4-4" />
                </svg>
            </button>
        </div>

        <div>
          <label htmlFor="morse-output" className="block text-sm font-medium text-gray-400 mb-2">
            {toMorse ? 'Morse Code' : 'Text'}
          </label>
          <div id="morse-output" className="w-full h-32 p-2 bg-gray-900 border border-gray-700 rounded-md text-white relative">
            {output}
            {output && (
              <div className="absolute top-2 right-2 flex flex-col gap-2">
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                    onClick={() => addToMessage(output)}
                    className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                    Add
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MorseCodeConverter;
