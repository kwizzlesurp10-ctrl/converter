
import React, { useState } from 'react';

const BinaryConverter = ({ addToMessage }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [toBinary, setToBinary] = useState(true);

  const convertToBinary = (text) => {
    let binary = '';
    for (let i = 0; i < text.length; i++) {
      binary += text[i].charCodeAt(0).toString(2) + ' ';
    }
    setOutput(binary.trim());
  };

  const convertFromBinary = (binary) => {
    let text = '';
    const binaryChars = binary.split(' ');
    for (let binaryChar of binaryChars) {
      if (binaryChar) {
        text += String.fromCharCode(parseInt(binaryChar, 2));
      }
    }
    setOutput(text);
  };

  const handleInputChange = (e) => {
    const newText = e.target.value;
    setInput(newText);
    if (toBinary) {
      convertToBinary(newText);
    } else {
      convertFromBinary(newText);
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
    setToBinary(!toBinary);
  };

  return (
    <div className="p-4 bg-black rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Binary Converter</h2>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
        <div>
          <label htmlFor="binary-input" className="block text-sm font-medium text-white mb-2">{toBinary ? 'Text' : 'Binary'}</label>
          <textarea
            id="binary-input"
            className="w-full h-32 p-2 bg-black border border-white rounded-md text-white focus:ring-invader-pink focus:border-invader-pink"
            placeholder={toBinary ? "Enter text to convert to binary" : "Enter binary to convert to text"}
            value={input}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-center">
            <button
                onClick={swapConversion}
                className="p-2 bg-black border border-white text-white rounded-full hover:bg-invader-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-invader-pink"
                title="Swap conversion direction"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m2 5H4m0 0l4 4m-4-4l4-4" />
                </svg>
            </button>
        </div>
        <div>
          <label htmlFor="binary-output" className="block text-sm font-medium text-white mb-2">{toBinary ? 'Binary' : 'Text'}</label>
          <div id="binary-output" className="w-full h-32 p-2 bg-black border border-white rounded-md text-white relative">
            {output}
            {output && (
              <div className="absolute top-2 right-2 flex flex-col gap-2">
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1 bg-invader-pink text-black rounded-md hover:bg-invader-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-invader-pink"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={() => addToMessage(output)}
                  className="px-3 py-1 bg-invader-green text-black rounded-md hover:bg-invader-pink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-invader-green"
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

export default BinaryConverter;
