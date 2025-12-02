
import React, { useState } from 'react';

const leetMap = {
  'A': '4', 'B': '8', 'E': '3', 'G': '6', 'L': '1', 'O': '0', 'S': '5', 'T': '7', 'Z': '2'
};

const LeetConverter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e) => {
    const newText = e.target.value.toUpperCase();
    setInput(newText);
    convertToLeet(newText);
  };

  const convertToLeet = (text) => {
    let leetText = '';
    for (let char of text) {
      leetText += leetMap[char] || char;
    }
    setOutput(leetText);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Leet Converter</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="leet-input" className="block text-sm font-medium text-gray-400 mb-2">Input</label>
          <textarea
            id="leet-input"
            className="w-full h-32 p-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter text to convert to Leet speak"
            value={input}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="leet-output" className="block text-sm font-medium text-gray-400 mb-2">Output</label>
          <div id="leet-output" className="w-full h-32 p-2 bg-gray-900 border border-gray-700 rounded-md text-white relative">
            {output}
            {output && (
              <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeetConverter;
