
import React from 'react';
import MorseCodeConverter from './components/MorseCodeConverter';
import LeetConverter from './components/LeetConverter';
import BinaryConverter from './components/BinaryConverter';
import Base64Converter from './components/Base64Converter';
import HexConverter from './components/HexConverter';
import BrowserView from './components/BrowserView';
import Tabs, { Tab } from './components/Tabs';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-6xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">T3XT TR4N5F0RM3R</h1>
      <div className="w-full max-w-4xl p-8 bg-gray-800 rounded-lg shadow-lg">
        <Tabs>
          <Tab label="Morse Code">
            <MorseCodeConverter />
          </Tab>
          <Tab label="Leet Speak">
            <LeetConverter />
          </Tab>
          <Tab label="Binary">
            <BinaryConverter />
          </Tab>
          <Tab label="Base64">
            <Base64Converter />
          </Tab>
          <Tab label="Hex">
            <HexConverter />
          </Tab>
          <Tab label="Browser">
            <BrowserView />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
