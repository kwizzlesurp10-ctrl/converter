import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

const OpenMojiBrowser = () => {
  const [emojis, setEmojis] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  useEffect(() => {
    fetch('https://unpkg.com/openmoji@latest/data/openmoji.json')
      .then(response => response.json())
      .then(data => setEmojis(data));
  }, []);

  const filteredEmojis = emojis.filter(emoji =>
    emoji.annotation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopyToClipboard = (emoji) => {
    navigator.clipboard.writeText(emoji.emoji);
    setSelectedEmoji(emoji.hexcode);
    setTimeout(() => setSelectedEmoji(null), 2000);
  };

  return (
    <div className="h-[600px] flex flex-col gap-4">
      <Input
        type="text"
        placeholder="Search for an emoji..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full"
      />
      <ScrollArea className="flex-grow border rounded-md p-4 bg-white">
        <div className="grid grid-cols-8 gap-4">
          {filteredEmojis.map(emoji => (
            <div 
              key={emoji.hexcode} 
              className="relative group flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors"
              onClick={() => handleCopyToClipboard(emoji)}
            >
              <img 
                src={`https://unpkg.com/openmoji@latest/color/svg/${emoji.hexcode}.svg`} 
                alt={emoji.annotation} 
                className="w-10 h-10"
              />
              <div className="absolute bottom-full mb-2 w-max bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {emoji.annotation}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-800"></div>
              </div>
              {selectedEmoji === emoji.hexcode && (
                <div className="absolute inset-0 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Copy className="w-6 h-6 text-green-700" />
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default OpenMojiBrowser;
