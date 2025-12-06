
import React, { useState } from 'react';
import MorseCodeConverter from './components/MorseCodeConverter';
import LeetConverter from './components/LeetConverter';
import BinaryConverter from './components/BinaryConverter';
import Base64Converter from './components/Base64Converter';
import HexConverter from './components/HexConverter';
import BrowserView from './components/BrowserView';
import Tabs, { Tab } from './components/Tabs';

function App() {
  const [compoundedMessage, setCompoundedMessage] = useState('');

  const addToCompoundedMessage = (text) => {
    setCompoundedMessage((prev) => prev + text + ' ');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-2 text-transparent bg-clip-text animated-gradient gradient-text">
          T3XT TR4N5F0RM3R
        </h1>
        <p className="text-lg md:text-xl text-gray-400">
          Your one-stop tool for text conversions
        </p>
      </div>
      <div className="w-full max-w-5xl p-6 bg-gray-800 rounded-2xl shadow-2xl">
        <Tabs>
          <Tab label="Morse Code">
            <MorseCodeConverter addToMessage={addToCompoundedMessage} />
          </Tab>
          <Tab label="Leet Speak">
            <LeetConverter addToMessage={addToCompoundedMessage} />
          </Tab>
          <Tab label="Binary">
            <BinaryConverter addToMessage={addToCompoundedMessage} />
          </Tab>
          <Tab label="Base64">
            <Base64Converter addToMessage={addToCompoundedMessage} />
          </Tab>
          <Tab label="Hex">
            <HexConverter addToMessage={addToCompoundedMessage} />
          </Tab>
          <Tab label="Browser">
            <BrowserView />
          </Tab>
        </Tabs>
      </div>

      <div className="w-full max-w-5xl p-6 mt-8 bg-gray-800 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-white">Compounded Message</h2>
        <textarea
          className="w-full h-48 p-2 bg-gray-900 border border-gray-700 rounded-md text-white"
          value={compoundedMessage}
          readOnly
          placeholder="Your compounded message will appear here..."
        />
        <button
          className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-white font-semibold"
          onClick={() => navigator.clipboard.writeText(compoundedMessage)}
        >
          Copy Compounded Message
        </button>
      </div>

      <footer className="mt-8 text-center text-gray-500">
        <p>
          Made with ❤️ by{' '}
          <a
            href="https://github.com/your-github"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-pink-500 transition-colors"
          >
            Your Name
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
