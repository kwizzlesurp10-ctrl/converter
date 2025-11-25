'use client';
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, RefreshCw, Plus, Trash2, Settings, Zap, Save, FolderOpen, ArrowRightLeft } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function CustomMapper() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [customMappings, setCustomMappings] = useState([
    { from: 'a', to: '@' },
    { from: 'e', to: '3' },
    { from: 'i', to: '!' },
  ]);
  const [savedPresets, setSavedPresets] = useState([]);

  const addMapping = () => {
    setCustomMappings([...customMappings, { from: '', to: '' }]);
  };

  const removeMapping = (index) => {
    setCustomMappings(customMappings.filter((_, i) => i !== index));
  };

  const updateMapping = (index, field, value) => {
    const newMappings = [...customMappings];
    newMappings[index][field] = value;
    setCustomMappings(newMappings);
  };

  const handleConvert = () => {
    if (!input.trim()) {
      toast.error('Please enter some text to convert');
      return;
    }

    let result = input;
    let appliedCount = 0;

    // Apply each custom mapping
    customMappings.forEach(({ from, to }) => {
      if (from && to) {
        const regex = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        const matches = result.match(regex);
        if (matches) {
          appliedCount += matches.length;
        }
        result = result.replace(regex, to);
      }
    });

    setOutput(result);
    
    if (appliedCount > 0) {
      toast.success(`Applied ${appliedCount} transformation${appliedCount > 1 ? 's' : ''}!`);
    } else {
      toast.info('No mappings were applied');
    }
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
    const reversedMappings = customMappings.map(m => ({ from: m.to, to: m.from }));
    setCustomMappings(reversedMappings);
    setInput(output);
    setOutput('');
    toast.success('Mappings reversed!');
  };

  const saveCurrentPreset = () => {
    const name = prompt('Enter preset name:');
    if (name && name.trim()) {
      setSavedPresets([...savedPresets, { name: name.trim(), mappings: [...customMappings] }]);
      toast.success(`Preset "${name}" saved!`);
    }
  };

  const loadSavedPreset = (preset) => {
    setCustomMappings(preset.mappings);
    toast.success(`Preset "${preset.name}" loaded!`);
  };

  const deletePreset = (index) => {
    const newPresets = savedPresets.filter((_, i) => i !== index);
    setSavedPresets(newPresets);
    toast.success('Preset deleted');
  };

  const loadPreset = (preset) => {
    const presets = {
      leet: [
        { from: 'a', to: '4' },
        { from: 'e', to: '3' },
        { from: 'i', to: '1' },
        { from: 'o', to: '0' },
        { from: 's', to: '5' },
        { from: 't', to: '7' },
      ],
      fancy: [
        { from: 'a', to: 'α' },
        { from: 'e', to: 'ε' },
        { from: 'o', to: 'σ' },
        { from: 'u', to: 'υ' },
        { from: 'w', to: 'ω' },
      ],
      brackets: [
        { from: 'a', to: '[a]' },
        { from: 'e', to: '[e]' },
        { from: 'i', to: '[i]' },
        { from: 'o', to: '[o]' },
        { from: 'u', to: '[u]' },
      ],
    };
    setCustomMappings(presets[preset] || []);
    toast.success('Preset loaded!');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="custom-input" className="text-sm font-medium text-slate-700">
          Enter your text
        </Label>
        <Textarea
          id="custom-input"
          placeholder="Type something to transform..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[100px] text-base resize-none bg-white/50 border-slate-200 focus:border-rose-300 focus:ring-rose-200"
        />
      </div>

      <div className="bg-rose-50 rounded-xl p-4 border border-rose-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-rose-600" />
            <h3 className="font-medium text-rose-900">Custom Character Mappings</h3>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={saveCurrentPreset}
              size="sm"
              variant="outline"
              className="border-rose-300 hover:bg-rose-100 text-rose-700"
            >
              <Save className="w-3 h-3 mr-1" />
              Save
            </Button>
            <Button
              onClick={addMapping}
              size="sm"
              variant="outline"
              className="border-rose-300 hover:bg-rose-100 text-rose-700"
            >
              <Plus className="w-3 h-3 mr-1" />
              Add Rule
            </Button>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {customMappings.map((mapping, index) => (
            <div key={index} className="flex items-center gap-2 bg-white rounded-lg p-2 border border-rose-200">
              <Input
                placeholder="From"
                value={mapping.from}
                onChange={(e) => updateMapping(index, 'from', e.target.value)}
                className="flex-1 h-8 text-sm"
              />
              <span className="text-slate-500 font-medium">→</span>
              <Input
                placeholder="To"
                value={mapping.to}
                onChange={(e) => updateMapping(index, 'to', e.target.value)}
                className="flex-1 h-8 text-sm"
              />
              <Button
                onClick={() => removeMapping(index)}
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-rose-600 hover:bg-rose-100"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-xs text-rose-700 font-medium mb-2">Quick Presets:</p>
            <div className="flex flex-wrap gap-2">
              <Badge
                onClick={() => loadPreset('leet')}
                className="cursor-pointer hover:bg-rose-700 bg-rose-600"
              >
                L33T Style
              </Badge>
              <Badge
                onClick={() => loadPreset('fancy')}
                className="cursor-pointer hover:bg-purple-700 bg-purple-600"
              >
                Greek Letters
              </Badge>
              <Badge
                onClick={() => loadPreset('brackets')}
                className="cursor-pointer hover:bg-blue-700 bg-blue-600"
              >
                Brackets
              </Badge>
            </div>
          </div>

          {savedPresets.length > 0 && (
            <div>
              <p className="text-xs text-rose-700 font-medium mb-2">Saved Presets:</p>
              <div className="flex flex-wrap gap-2">
                {savedPresets.map((preset, idx) => (
                  <div key={idx} className="group relative">
                    <Badge
                      onClick={() => loadSavedPreset(preset)}
                      className="cursor-pointer hover:bg-green-700 bg-green-600 pr-8"
                    >
                      <FolderOpen className="w-3 h-3 mr-1" />
                      {preset.name}
                    </Badge>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePreset(idx);
                      }}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleConvert}
          className="flex-1 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white shadow-lg shadow-rose-500/30"
        >
          <Zap className="w-4 h-4 mr-2" />
          Apply Transformations
        </Button>
        {output && (
          <Button
            onClick={handleSwap}
            variant="outline"
            className="border-rose-300 hover:bg-rose-50"
            title="Reverse mappings and swap input/output"
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
            Transformed output
          </Label>
          <div className="relative">
            <Textarea
              value={output}
              readOnly
              className="min-h-[100px] text-base bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200 font-mono resize-none"
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