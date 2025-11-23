import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, RefreshCw, Type, Sparkles } from "lucide-react";
import { toast } from "sonner";

const asciiFonts = {
  standard: {
    name: "Standard",
    chars: {
      'A': [' $$$ ', '$   $', '$$$$$', '$   $', '$   $'],
      'B': ['$$$$ ', '$   $', '$$$$ ', '$   $', '$$$$ '],
      'C': [' $$$$', '$    ', '$    ', '$    ', ' $$$$'],
      'D': ['$$$$ ', '$   $', '$   $', '$   $', '$$$$ '],
      'E': ['$$$$$', '$    ', '$$$$ ', '$    ', '$$$$$'],
      'F': ['$$$$$', '$    ', '$$$$ ', '$    ', '$    '],
      'G': [' $$$$', '$    ', '$  $$', '$   $', ' $$$$'],
      'H': ['$   $', '$   $', '$$$$$', '$   $', '$   $'],
      'I': ['$$$$$', '  $  ', '  $  ', '  $  ', '$$$$$'],
      'J': ['$$$$$', '   $ ', '   $ ', '$  $ ', ' $$  '],
      'K': ['$   $', '$  $ ', '$$   ', '$  $ ', '$   $'],
      'L': ['$    ', '$    ', '$    ', '$    ', '$$$$$'],
      'M': ['$   $', '$$ $$', '$ $ $', '$   $', '$   $'],
      'N': ['$   $', '$$  $', '$ $ $', '$  $$', '$   $'],
      'O': [' $$$ ', '$   $', '$   $', '$   $', ' $$$ '],
      'P': ['$$$$ ', '$   $', '$$$$ ', '$    ', '$    '],
      'Q': [' $$$ ', '$   $', '$   $', '$  $$', ' $$$$'],
      'R': ['$$$$ ', '$   $', '$$$$ ', '$  $ ', '$   $'],
      'S': [' $$$$', '$    ', ' $$$ ', '    $', '$$$$ '],
      'T': ['$$$$$', '  $  ', '  $  ', '  $  ', '  $  '],
      'U': ['$   $', '$   $', '$   $', '$   $', ' $$$ '],
      'V': ['$   $', '$   $', '$   $', ' $ $ ', '  $  '],
      'W': ['$   $', '$   $', '$ $ $', '$$ $$', '$   $'],
      'X': ['$   $', ' $ $ ', '  $  ', ' $ $ ', '$   $'],
      'Y': ['$   $', ' $ $ ', '  $  ', '  $  ', '  $  '],
      'Z': ['$$$$$', '   $ ', '  $  ', ' $   ', '$$$$$'],
      '0': [' $$$ ', '$  $$', '$ $ $', '$$  $', ' $$$ '],
      '1': ['  $  ', ' $$  ', '  $  ', '  $  ', '$$$$$'],
      '2': [' $$$ ', '$   $', '   $ ', '  $  ', '$$$$$'],
      '3': [' $$$ ', '$   $', '  $$ ', '$   $', ' $$$ '],
      '4': ['$   $', '$   $', '$$$$$', '    $', '    $'],
      '5': ['$$$$$', '$    ', '$$$$ ', '    $', '$$$$ '],
      '6': [' $$$$', '$    ', '$$$$ ', '$   $', ' $$$ '],
      '7': ['$$$$$', '    $', '   $ ', '  $  ', '  $  '],
      '8': [' $$$ ', '$   $', ' $$$ ', '$   $', ' $$$ '],
      '9': [' $$$ ', '$   $', ' $$$$', '    $', ' $$$ '],
      ' ': ['     ', '     ', '     ', '     ', '     '],
      '!': ['  $  ', '  $  ', '  $  ', '     ', '  $  '],
      '?': [' $$$ ', '$   $', '   $ ', '     ', '  $  '],
      '.': ['     ', '     ', '     ', '     ', '  $  '],
      ',': ['     ', '     ', '     ', '  $  ', ' $   '],
      '-': ['     ', '     ', '$$$$$', '     ', '     '],
      '+': ['     ', '  $  ', '$$$$$', '  $  ', '     '],
      '=': ['     ', '$$$$$', '     ', '$$$$$', '     '],
      '*': ['     ', '$ $ $', ' $$$ ', '$ $ $', '     '],
      '/': ['    $', '   $ ', '  $  ', ' $   ', '$    '],
      '\\': ['$    ', ' $   ', '  $  ', '   $ ', '    $'],
    }
  },
  block: {
    name: "Block",
    chars: {
      'A': ['█████', '█   █', '█████', '█   █', '█   █'],
      'B': ['████ ', '█   █', '████ ', '█   █', '████ '],
      'C': [' ████', '█    ', '█    ', '█    ', ' ████'],
      'D': ['████ ', '█   █', '█   █', '█   █', '████ '],
      'E': ['█████', '█    ', '████ ', '█    ', '█████'],
      'F': ['█████', '█    ', '████ ', '█    ', '█    '],
      'G': [' ████', '█    ', '█  ██', '█   █', ' ████'],
      'H': ['█   █', '█   █', '█████', '█   █', '█   █'],
      'I': ['█████', '  █  ', '  █  ', '  █  ', '█████'],
      'J': ['█████', '   █ ', '   █ ', '█  █ ', ' ██  '],
      'K': ['█   █', '█  █ ', '███  ', '█  █ ', '█   █'],
      'L': ['█    ', '█    ', '█    ', '█    ', '█████'],
      'M': ['█   █', '██ ██', '█ █ █', '█   █', '█   █'],
      'N': ['█   █', '██  █', '█ █ █', '█  ██', '█   █'],
      'O': [' ███ ', '█   █', '█   █', '█   █', ' ███ '],
      'P': ['████ ', '█   █', '████ ', '█    ', '█    '],
      'Q': [' ███ ', '█   █', '█   █', '█  ██', ' ████'],
      'R': ['████ ', '█   █', '████ ', '█  █ ', '█   █'],
      'S': [' ████', '█    ', ' ███ ', '    █', '████ '],
      'T': ['█████', '  █  ', '  █  ', '  █  ', '  █  '],
      'U': ['█   █', '█   █', '█   █', '█   █', ' ███ '],
      'V': ['█   █', '█   █', '█   █', ' █ █ ', '  █  '],
      'W': ['█   █', '█   █', '█ █ █', '██ ██', '█   █'],
      'X': ['█   █', ' █ █ ', '  █  ', ' █ █ ', '█   █'],
      'Y': ['█   █', ' █ █ ', '  █  ', '  █  ', '  █  '],
      'Z': ['█████', '   █ ', '  █  ', ' █   ', '█████'],
      '0': [' ███ ', '█  ██', '█ █ █', '██  █', ' ███ '],
      '1': ['  █  ', ' ██  ', '  █  ', '  █  ', '█████'],
      '2': [' ███ ', '█   █', '   █ ', '  █  ', '█████'],
      '3': [' ███ ', '█   █', '  ██ ', '█   █', ' ███ '],
      '4': ['█   █', '█   █', '█████', '    █', '    █'],
      '5': ['█████', '█    ', '████ ', '    █', '████ '],
      '6': [' ████', '█    ', '████ ', '█   █', ' ███ '],
      '7': ['█████', '    █', '   █ ', '  █  ', '  █  '],
      '8': [' ███ ', '█   █', ' ███ ', '█   █', ' ███ '],
      '9': [' ███ ', '█   █', ' ████', '    █', ' ███ '],
      ' ': ['     ', '     ', '     ', '     ', '     '],
      '!': ['  █  ', '  █  ', '  █  ', '     ', '  █  '],
      '?': [' ███ ', '█   █', '   █ ', '     ', '  █  '],
      '.': ['     ', '     ', '     ', '     ', '  █  '],
      ',': ['     ', '     ', '     ', '  █  ', ' █   '],
      '-': ['     ', '     ', '█████', '     ', '     '],
      '+': ['     ', '  █  ', '█████', '  █  ', '     '],
      '=': ['     ', '█████', '     ', '█████', '     '],
      '*': ['     ', '█ █ █', ' ███ ', '█ █ █', '     '],
      '/': ['    █', '   █ ', '  █  ', ' █   ', '█    '],
      '\\': ['█    ', ' █   ', '  █  ', '   █ ', '    █'],
    }
  },
  small: {
    name: "Small",
    chars: {
      'A': [' _ ', '/_\\', '   '],
      'B': ['|_ ', '|_)', '   '],
      'C': [' _ ', '|_ ', '   '],
      'D': ['|_ ', '|_)', '   '],
      'E': ['|_ ', '|_ ', '   '],
      'F': ['|_ ', '|  ', '   '],
      'G': [' _ ', '|_]', '   '],
      'H': ['   ', '|_|', '   '],
      'I': ['|', '|', ' '],
      'J': [' |', '_|', '  '],
      'K': ['|/', '|\\', '  '],
      'L': ['|  ', '|_ ', '   '],
      'M': ['|\\/|', '|  |', '    '],
      'N': ['|\\|', '| |', '   '],
      'O': [' _ ', '|_|', '   '],
      'P': ['|_ ', '|  ', '   '],
      'Q': [' _ ', '|_\\', '   '],
      'R': ['|_ ', '|\\', '  '],
      'S': [' _ ', '|_ ', '   '],
      'T': ['___', ' | ', '   '],
      'U': ['   ', '|_|', '   '],
      'V': ['   ', '\\/', '  '],
      'W': ['     ', '|/\\|', '    '],
      'X': ['\\ /', ' / ', '   '],
      'Y': ['\\/', ' |', '  '],
      'Z': ['___', ' /_', '   '],
      '0': ['0', '0', ' '],
      '1': ['1', '1', ' '],
      '2': ['2', '2', ' '],
      '3': ['3', '3', ' '],
      '4': ['4', '4', ' '],
      '5': ['5', '5', ' '],
      '6': ['6', '6', ' '],
      '7': ['7', '7', ' '],
      '8': ['8', '8', ' '],
      '9': ['9', '9', ' '],
      ' ': [' ', ' ', ' '],
      '!': ['!', '!', ' '],
      '?': ['?', '?', ' '],
      '.': [' ', '.', ' '],
      ',': [' ', ',', ' '],
      '-': [' ', '-', ' '],
      '+': ['+', '+', ' '],
      '=': ['=', '=', ' '],
      '*': ['*', '*', ' '],
      '/': ['/', '/', ' '],
      '\\': ['\\', '\\', ' '],
    }
  }
};

export default function AsciiConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [font, setFont] = useState('standard');
  const [customChar, setCustomChar] = useState('$');

  const toAsciiArt = (text, fontKey, customCharacter) => {
    const selectedFont = asciiFonts[fontKey] || asciiFonts.standard;
    const height = fontKey === 'small' ? 3 : 5;
    const lines = Array(height).fill('');
    
    const chars = text.toUpperCase().split('');
    
    chars.forEach((char, charIndex) => {
      const asciiChar = selectedFont.chars[char] || selectedFont.chars[' '];
      
      for (let i = 0; i < height; i++) {
        let line = asciiChar[i] || ' '.repeat(5);
        
        // Replace placeholder with custom character for standard and block fonts
        if (fontKey !== 'small') {
          if (fontKey === 'standard') {
            line = line.replace(/\$/g, customCharacter);
          } else if (fontKey === 'block') {
            line = line.replace(/█/g, customCharacter);
          }
        }
        
        lines[i] += line + '  ';
      }
    });
    
    return lines.join('\n');
  };

  const handleConvert = () => {
    if (!input.trim()) {
      toast.error('Please enter some text to convert');
      return;
    }

    const result = toAsciiArt(input, font, customChar || '$');
    setOutput(result);
    toast.success('Converted to ASCII art!');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success('Copied to clipboard!');
  };

  const handleReset = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="ascii-input" className="text-sm font-medium text-slate-700">
          Enter your text
        </Label>
        <Input
          id="ascii-input"
          placeholder="Type something cool..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="text-base bg-white/50 border-slate-200 focus:border-cyan-300 focus:ring-cyan-200"
          maxLength={50}
        />
        <p className="text-xs text-slate-500">Tip: Keep it short for best results (max 50 chars)</p>
      </div>

      <div className="bg-cyan-50 rounded-xl p-4 border border-cyan-200 space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-cyan-900">
            Font Style
          </Label>
          <Select value={font} onValueChange={setFont}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="block">Block</SelectItem>
              <SelectItem value="small">Small</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {font !== 'small' && (
          <div className="space-y-2">
            <Label htmlFor="custom-char" className="text-sm font-medium text-cyan-900">
              Custom Character
            </Label>
            <Input
              id="custom-char"
              placeholder="$"
              value={customChar}
              onChange={(e) => setCustomChar(e.target.value.slice(0, 1))}
              className="bg-white text-center text-xl font-mono"
              maxLength={1}
            />
            <p className="text-xs text-cyan-700">Choose any character to build your ASCII art</p>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleConvert}
          className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/30"
        >
          <Type className="w-4 h-4 mr-2" />
          Generate ASCII Art
        </Button>
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
            ASCII Art Output
          </Label>
          <div className="relative">
            <Textarea
              value={output}
              readOnly
              className="min-h-[200px] text-sm bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200 font-mono resize-none overflow-x-auto whitespace-pre"
              style={{ fontFamily: 'monospace' }}
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

      {!output && (
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-cyan-200">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-cyan-600 mt-1" />
            <div className="space-y-2 text-sm text-slate-600">
              <p><strong className="text-slate-900">Standard Font:</strong> Classic ASCII art with customizable characters</p>
              <p><strong className="text-slate-900">Block Font:</strong> Bold, filled characters for maximum impact</p>
              <p><strong className="text-slate-900">Small Font:</strong> Compact design, perfect for signatures</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}