
import React, { useState } from 'react';

const HexConverter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e) => {
    const newText = e.target.value;
    setInput(newText);
    convertToHex(newText);
  };

  const convertToHex = (text) => {
    let hex = '';
    for (let i = 0; i < text.length; i++) {
      hex += text[i].charCodeAt(0).toString(16) + ' ';
    }
    setOutput(hex.trim());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Hex Converter</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="hex-input" className="block text-sm font-medium text-gray-400 mb-2">Input</label>
          <textarea
            id="hex-input"
            className="w-full h-32 p-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter text to convert to hexadecimal"
            value={input}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="hex-output" className="block text-sm font-medium text-gray-400 mb-2">Output</label>
          <div id="hex-output" className="w-full h-32 p-2 bg-gray-900 border border-gray-700 rounded-md text-white relative">
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

export default HexConverter;
