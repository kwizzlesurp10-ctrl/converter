'use client';
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Copy, RefreshCw, ArrowRightLeft, Signal } from "lucide-react";
import { toast } from "sonner";

const morseMap = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..',
  '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
  ' ': '/', ',': '--..--', '.': '.-.-.-', '?': '..--..', '/': '-..-.', '-': '-....-', '(': '-.--.', ')': '-.--.-'
};

const reverseMorseMap = Object.fromEntries(Object.entries(morseMap).map(([key, value]) => [value, key]));

function toMorseCode(input) {
  return input.toUpperCase().split('').map(char => morseMap[char] || '').join(' ');
}

function fromMorseCode(input) {
  return input.split(' ').map(code => reverseMorseMap[code] || '').join('');
}

export default function MorseConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [reverseMode, setReverseMode] = useState(false);

  const handleConvert = () => {
    if (!input.trim()) {
      toast.error('Please enter some text to convert');
      return;
    }
    
    const result = reverseMode 
      ? fromMorseCode(input)
      : toMorseCode(input);
    
    setOutput(result);
    toast.success(`Converted to ${reverseMode ? 'text' : 'Morse code'}!`);
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

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="morse-input" className="text-sm font-medium text-slate-700">
          Enter your text
        </Label>
        <Textarea
          id="morse-input"
          placeholder={reverseMode ? ".... . .-.. .-.. --- / .-- --- .-. .-.. -.." : "Hello World"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[120px] text-base resize-none bg-white/50 border-slate-200 focus:border-blue-300 focus:ring-blue-200"
        />
      </div>

      <div className="flex items-center justify-between bg-blue-50 rounded-xl p-3 border border-blue-200">
        <Label className="text-sm font-medium text-blue-900">
          Mode: <span className="text-blue-600 font-semibold">{reverseMode ? 'Decode Morse' : 'Encode to Morse'}</span>
        </Label>
        <Switch
          checked={reverseMode}
          onCheckedChange={setReverseMode}
        />
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleConvert}
          className="flex-1 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white shadow-lg shadow-blue-500/30"
        >
          <Signal className="w-4 h-4 mr-2" />
          {reverseMode ? 'Decode from Morse' : 'Convert to Morse'}
        </Button>
        {output && (
          <Button
            onClick={handleSwap}
            variant="outline"
            className="border-blue-300 hover:bg-blue-50"
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

      {output && (
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <Label className="text-sm font-medium text-slate-700">
            Morse Code Output
          </Label>
          <div className="relative">
            <Textarea
              value={output}
              readOnly
              className="min-h-[120px] text-lg bg-gradient-to-br from-blue-50 to-sky-50 border-blue-200 font-mono resize-none"
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
    </div>
  );
}
