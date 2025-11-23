import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Copy, RefreshCw, Zap, ArrowRightLeft, Clock } from "lucide-react";
import { toast } from "sonner";

// Enhanced L33T speak maps with multiple variations
const leetMaps = {
  mild: {
    'a': '4', 'A': '4',
    'e': '3', 'E': '3',
    'i': '1', 'I': '1',
    'o': '0', 'O': '0',
    's': '5', 'S': '5',
  },
  medium: {
    'a': '4', 'A': '4',
    'e': '3', 'E': '3',
    'i': '1', 'I': '1',
    'o': '0', 'O': '0',
    's': '5', 'S': '5',
    't': '7', 'T': '7',
    'l': '1', 'L': '1',
    'g': '6', 'G': '6',
    'b': '8', 'B': '8',
  },
  extreme: {
    'a': ['4', '@', '/\\'], 'A': ['4', '@', '/\\'],
    'e': ['3', '€'], 'E': ['3', '€'],
    'i': ['1', '!', '|'], 'I': ['1', '!', '|'],
    'o': ['0', '()'], 'O': ['0', '()'],
    's': ['5', '$'], 'S': ['5', '$'],
    't': ['7', '+'], 'T': ['7', '+'],
    'l': ['1', '|'], 'L': ['1', '|'],
    'g': ['6', '9'], 'G': ['6', '9'],
    'b': ['8', '13'], 'B': ['8', '13'],
    'c': ['<', '('], 'C': ['<', '('],
    'k': ['|<', '|{'], 'K': ['|<', '|{'],
    'n': ['|\\|', '/\\/'], 'N': ['|\\|', '/\\/'],
    'x': ['><', ')('], 'X': ['><', ')('],
    'z': ['2', '7_'], 'Z': ['2', '7_'],
  }
};

const wordReplacements = {
  'hacker': 'h4x0r',
  'elite': '1337',
  'leet': '1337',
  'cool': 'k3w1',
  'password': 'p4$$w0rd',
  'newbie': 'n00b',
  'noob': 'n00b',
  'owned': 'pwn3d',
  'own': 'pwn',
  'you': 'u',
  'your': 'ur',
  'are': 'r',
  'for': '4',
  'to': '2',
  'too': '2',
  'the': 'teh',
};

function toLeetSpeak(input, intensity = 'medium', randomized = false) {
  let result = input;
  
  // Apply word replacements first
  Object.keys(wordReplacements).forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    result = result.replace(regex, wordReplacements[word]);
  });
  
  // Get the appropriate character map
  const charMap = leetMaps[intensity] || leetMaps.medium;
  
  // Convert character by character
  result = result.split('').map(char => {
    const replacement = charMap[char];
    if (!replacement) return char;
    
    // For extreme mode with multiple options, pick randomly
    if (Array.isArray(replacement)) {
      return replacement[Math.floor(Math.random() * replacement.length)];
    }
    return replacement;
  }).join('');
  
  // Apply randomization effects
  if (randomized) {
    result = result.split('').map(char => {
      // Random casing for letters
      if (char.match(/[a-z]/i)) {
        return Math.random() < 0.5 ? char.toUpperCase() : char.toLowerCase();
      }
      return char;
    }).join('');
    
    // Add random symbols at the end
    const symbols = ['!', '@', '#', '$', '%', '&', '*', '!', '!!'];
    if (Math.random() < 0.4) {
      result += symbols[Math.floor(Math.random() * symbols.length)];
    }
  }
  
  return result;
}

export default function LeetConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [intensity, setIntensity] = useState(1); // 0=mild, 1=medium, 2=extreme
  const [randomized, setRandomized] = useState(false);
  const [history, setHistory] = useState([]);
  const [reverseMode, setReverseMode] = useState(false);

  const intensityLabels = ['mild', 'medium', 'extreme'];

  const reverseMap = {
    '4': 'a', '@': 'a', '/\\': 'a',
    '3': 'e', '€': 'e',
    '1': 'i', '!': 'i', '|': 'i',
    '0': 'o', '()': 'o',
    '5': 's', '$': 's',
    '7': 't', '+': 't',
    '6': 'g', '9': 'g',
    '8': 'b', '13': 'b',
    '<': 'c', '(': 'c',
    '|<': 'k', '|{': 'k',
    '|\\|': 'n', '/\\/': 'n',
    '><': 'x', ')(': 'x',
    '2': 'z', '7_': 'z',
    'h4x0r': 'hacker', '1337': 'elite', 'k3w1': 'cool',
    'p4$$w0rd': 'password', 'n00b': 'newbie', 'pwn3d': 'owned',
    'pwn': 'own', 'u': 'you', 'ur': 'your', 'r': 'are',
    '4': 'for', '2': 'to', 'teh': 'the',
  };

  const fromLeetSpeak = (input) => {
    let result = input;
    
    // Sort by length to match longer patterns first
    const sortedKeys = Object.keys(reverseMap).sort((a, b) => b.length - a.length);
    
    sortedKeys.forEach(leet => {
      const regex = new RegExp(leet.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      result = result.replace(regex, reverseMap[leet]);
    });
    
    return result;
  };

  const handleConvert = () => {
    if (!input.trim()) {
      toast.error('Please enter some text to convert');
      return;
    }
    
    const result = reverseMode 
      ? fromLeetSpeak(input)
      : toLeetSpeak(input, intensityLabels[intensity], randomized);
    
    setOutput(result);
    setHistory([...history.slice(-4), { input, output: result, mode: reverseMode ? 'reverse' : 'leet' }]);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success('Copied to clipboard!');
  };

  const handleReset = () => {
    setInput('');
    setOutput('');
  };

  const handleSwap = () => {
    setInput(output);
    setOutput('');
  };

  const loadFromHistory = (item) => {
    setInput(item.input);
    setOutput(item.output);
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-2">
        <Label htmlFor="input" className="text-sm font-medium text-slate-700">
          Enter your text
        </Label>
        <Textarea
          id="input"
          placeholder="Type something cool here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[120px] text-base resize-none bg-white/50 border-slate-200 focus:border-indigo-300 focus:ring-indigo-200"
        />
      </div>

      {/* Mode Toggle */}
      <div className="flex items-center justify-between bg-indigo-50 rounded-xl p-3 border border-indigo-200">
        <Label className="text-sm font-medium text-indigo-900">
          Mode: <span className="text-indigo-600 font-semibold">{reverseMode ? 'Decode L33T' : 'Encode L33T'}</span>
        </Label>
        <Switch
          checked={reverseMode}
          onCheckedChange={setReverseMode}
        />
      </div>

      {/* Controls */}
      {!reverseMode && (
        <div className="space-y-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="space-y-3">
            <Label className="text-sm font-medium text-slate-700">
              Intensity Level: <span className="text-indigo-600 font-semibold capitalize">{intensityLabels[intensity]}</span>
            </Label>
            <Slider
              value={[intensity]}
              onValueChange={(value) => setIntensity(value[0])}
              max={2}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>Mild</span>
              <span>Medium</span>
              <span>Extreme</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Label htmlFor="randomize" className="text-sm font-medium text-slate-700">
              Random casing & symbols
            </Label>
            <Switch
              id="randomize"
              checked={randomized}
              onCheckedChange={setRandomized}
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={handleConvert}
          className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/30"
        >
          <Zap className="w-4 h-4 mr-2" />
          {reverseMode ? 'Decode from L33T' : 'Convert to L33T'}
        </Button>
        {output && (
          <Button
            onClick={handleSwap}
            variant="outline"
            className="border-indigo-300 hover:bg-indigo-50"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </Button>
        )}
        <Button
          onClick={handleReset}
          variant="outline"
          className="border-slate-300 hover:bg-slate-50"
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      {/* Output Section */}
      {output && (
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <Label className="text-sm font-medium text-slate-700">
            L33T output
          </Label>
          <div className="relative">
            <Textarea
              value={output}
              readOnly
              className="min-h-[120px] text-base bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 font-mono resize-none"
            />
            <Button
              onClick={handleCopy}
              size="sm"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white border border-slate-200"
              variant="outline"
            >
              <Copy className="w-3 h-3 mr-1" />
              Copy
            </Button>
          </div>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="space-y-2 mt-6">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <Clock className="w-4 h-4" />
            <span>Recent conversions</span>
          </div>
          <div className="space-y-2">
            {history.slice().reverse().map((item, idx) => (
              <button
                key={idx}
                onClick={() => loadFromHistory(item)}
                className="w-full text-left p-3 bg-white rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all text-sm"
              >
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="secondary" className="text-xs">
                    {item.mode === 'reverse' ? '← Decoded' : '→ Encoded'}
                  </Badge>
                  <span className="text-xs text-slate-500">Click to load</span>
                </div>
                <div className="font-mono text-slate-600 truncate">{item.output}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}