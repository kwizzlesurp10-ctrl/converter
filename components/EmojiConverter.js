import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw, Smile, Sparkles, ArrowRightLeft } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const emojiMap = {
  // Emotions & Faces
  'happy': '😊', 'sad': '😢', 'angry': '😠', 'love': '❤️', 'laugh': '😂', 
  'cry': '😭', 'excited': '🤩', 'shocked': '😱', 'tired': '😴', 'sick': '🤒', 
  'confused': '😕', 'cool': '😎', 'nervous': '😅', 'worried': '😟', 'scared': '😨',
  'smile': '😄', 'grin': '😁', 'joy': '😍', 'wink': '😉', 'kiss': '😘',
  'thinking': '🤔', 'sleepy': '😪', 'dizzy': '😵', 'crazy': '🤪', 'silly': '🤪',
  'dead': '💀', 'ghost': '👻', 'alien': '👽', 'robot': '🤖', 'poop': '💩',
  
  // Animals & Nature
  'cat': '🐱', 'dog': '🐶', 'mouse': '🐭', 'rabbit': '🐰', 'fox': '🦊', 
  'bear': '🐻', 'panda': '🐼', 'lion': '🦁', 'tiger': '🐯', 'cow': '🐮',
  'pig': '🐷', 'frog': '🐸', 'monkey': '🐵', 'chicken': '🐔', 'penguin': '🐧',
  'bird': '🐦', 'eagle': '🦅', 'duck': '🦆', 'owl': '🦉', 'bat': '🦇',
  'wolf': '🐺', 'unicorn': '🦄', 'horse': '🐴', 'zebra': '🦓', 'deer': '🦌',
  'dinosaur': '🦕', 'dragon': '🐉', 'shark': '🦈', 'whale': '🐋', 'dolphin': '🐬',
  'fish': '🐟', 'octopus': '🐙', 'crab': '🦀', 'turtle': '🐢', 'snake': '🐍',
  'bee': '🐝', 'bug': '🐛', 'butterfly': '🦋', 'spider': '🕷️', 'ant': '🐜',
  
  // Nature & Weather
  'fire': '🔥', 'water': '💧', 'tree': '🌳', 'flower': '🌸', 'rose': '🌹',
  'sun': '☀️', 'moon': '🌙', 'star': '⭐', 'cloud': '☁️', 'wind': '💨',
  'rain': '🌧️', 'snow': '❄️', 'rainbow': '🌈', 'lightning': '⚡', 'storm': '⛈️',
  'earth': '🌍', 'mountain': '⛰️', 'volcano': '🌋', 'beach': '🏖️', 'desert': '🏜️',
  'cactus': '🌵', 'leaf': '🍃', 'maple': '🍁', 'plant': '🌱', 'bamboo': '🎋',
  
  // Food & Drink
  'pizza': '🍕', 'burger': '🍔', 'hotdog': '🌭', 'taco': '🌮', 'burrito': '🌯',
  'sushi': '🍣', 'ramen': '🍜', 'pasta': '🍝', 'rice': '🍚', 'curry': '🍛',
  'bread': '🍞', 'croissant': '🥐', 'bagel': '🥯', 'pretzel': '🥨', 'cheese': '🧀',
  'meat': '🍖', 'bacon': '🥓', 'chicken': '🍗', 'egg': '🥚', 'popcorn': '🍿',
  'salad': '🥗', 'soup': '🍲', 'stew': '🍲', 'sandwich': '🥪', 'wrap': '🌯',
  'cookie': '🍪', 'cake': '🎂', 'pie': '🥧', 'donut': '🍩', 'candy': '🍬',
  'chocolate': '🍫', 'lollipop': '🍭', 'ice cream': '🍦', 'icecream': '🍦', 'cupcake': '🧁',
  'apple': '🍎', 'banana': '🍌', 'orange': '🍊', 'lemon': '🍋', 'grape': '🍇',
  'strawberry': '🍓', 'cherry': '🍒', 'peach': '🍑', 'melon': '🍉', 'pineapple': '🍍',
  'kiwi': '🥝', 'avocado': '🥑', 'tomato': '🍅', 'pepper': '🌶️', 'corn': '🌽',
  'coffee': '☕', 'tea': '🍵', 'milk': '🥛', 'beer': '🍺', 'wine': '🍷',
  'cocktail': '🍹', 'juice': '🧃', 'soda': '🥤', 'champagne': '🍾', 'sake': '🍶',
  
  // Objects & Technology
  'phone': '📱', 'computer': '💻', 'laptop': '💻', 'keyboard': '⌨️', 'mouse': '🖱️',
  'printer': '🖨️', 'camera': '📷', 'video': '📹', 'tv': '📺', 'radio': '📻',
  'microphone': '🎤', 'headphones': '🎧', 'speaker': '🔊', 'battery': '🔋', 'plug': '🔌',
  'watch': '⌚', 'alarm': '⏰', 'clock': '🕐', 'hourglass': '⏳', 'timer': '⏲️',
  'light': '💡', 'bulb': '💡', 'candle': '🕯️', 'flashlight': '🔦', 'lantern': '🏮',
  'book': '📚', 'notebook': '📓', 'pen': '🖊️', 'pencil': '✏️', 'crayon': '🖍️',
  'scissors': '✂️', 'ruler': '📏', 'paperclip': '📎', 'pin': '📌', 'tape': '📼',
  'lock': '🔒', 'unlock': '🔓', 'key': '🔑', 'hammer': '🔨', 'wrench': '🔧',
  'knife': '🔪', 'axe': '🪓', 'sword': '⚔️', 'gun': '🔫', 'bomb': '💣',
  'money': '💰', 'dollar': '💵', 'coin': '🪙', 'credit card': '💳', 'gem': '💎',
  'gift': '🎁', 'balloon': '🎈', 'confetti': '🎊', 'ribbon': '🎀', 'wrapper': '🎁',
  
  // Activities & Sports
  'party': '🎉', 'celebrate': '🎊', 'dance': '💃', 'sing': '🎤', 'paint': '🎨',
  'music': '🎵', 'guitar': '🎸', 'drum': '🥁', 'violin': '🎻', 'piano': '🎹',
  'game': '🎮', 'dice': '🎲', 'puzzle': '🧩', 'chess': '♟️', 'cards': '🃏',
  'soccer': '⚽', 'football': '🏈', 'basketball': '🏀', 'baseball': '⚾', 'tennis': '🎾',
  'volleyball': '🏐', 'golf': '⛳', 'bowling': '🎳', 'boxing': '🥊', 'martial arts': '🥋',
  'run': '🏃', 'walk': '🚶', 'jump': '🤾', 'swim': '🏊', 'surf': '🏄',
  'ski': '⛷️', 'snowboard': '🏂', 'skate': '⛸️', 'climb': '🧗', 'bike': '🚴',
  'trophy': '🏆', 'medal': '🥇', 'winner': '🏅', 'award': '🏆', 'champion': '🏆',
  
  // Places & Travel
  'home': '🏠', 'house': '🏡', 'building': '🏢', 'office': '🏢', 'apartment': '🏬',
  'school': '🏫', 'hospital': '🏥', 'bank': '🏦', 'hotel': '🏨', 'church': '⛪',
  'castle': '🏰', 'tower': '🗼', 'statue': '🗽', 'bridge': '🌉', 'fountain': '⛲',
  'car': '🚗', 'taxi': '🚕', 'bus': '🚌', 'truck': '🚚', 'van': '🚐',
  'train': '🚂', 'metro': '🚇', 'tram': '🚊', 'station': '🚉', 'railway': '🛤️',
  'plane': '✈️', 'airplane': '✈️', 'helicopter': '🚁', 'rocket': '🚀', 'satellite': '🛰️',
  'bicycle': '🚲', 'scooter': '🛴', 'motorcycle': '🏍️', 'boat': '⛵', 'ship': '🚢',
  'anchor': '⚓', 'fuel': '⛽', 'traffic': '🚦', 'stop': '🛑', 'parking': '🅿️',
  
  // Symbols & Signs
  'heart': '❤️', 'broken heart': '💔', 'sparkle': '✨', 'boom': '💥', 'dizzy': '💫',
  'check': '✅', 'yes': '✅', 'correct': '✅', 'no': '❌', 'wrong': '❌',
  'warning': '⚠️', 'danger': '⚠️', 'stop': '🛑', 'prohibited': '🚫', 'error': '❌',
  'question': '❓', 'exclamation': '❗', 'info': 'ℹ️', 'help': '❓', 'idea': '💡',
  'up': '⬆️', 'down': '⬇️', 'left': '⬅️', 'right': '➡️', 'arrow': '➡️',
  'new': '🆕', 'hot': '🔥', 'cool': '🆒', 'free': '🆓', 'ok': '🆗',
  'plus': '➕', 'minus': '➖', 'multiply': '✖️', 'divide': '➗', 'equals': '🟰',
  'percent': '%', 'hashtag': '#️⃣', 'asterisk': '*️⃣', 'zero': '0️⃣', 'hundred': '💯',
  
  // Body & Gestures
  'strong': '💪', 'muscle': '💪', 'brain': '🧠', 'eyes': '👀', 'eye': '👁️',
  'ear': '👂', 'nose': '👃', 'mouth': '👄', 'tongue': '👅', 'tooth': '🦷',
  'hand': '✋', 'fist': '✊', 'fingers': '🖐️', 'thumbs up': '👍', 'thumbs down': '👎',
  'clap': '👏', 'pray': '🙏', 'wave': '👋', 'peace': '✌️', 'ok': '👌',
  'point': '👉', 'finger': '👆', 'point up': '☝️', 'point down': '👇', 'left': '👈',
  'punch': '👊', 'kick': '🦵', 'foot': '🦶', 'leg': '🦵', 'baby': '👶',
  'child': '🧒', 'boy': '👦', 'girl': '👧', 'man': '👨', 'woman': '👩',
  'old': '👴', 'grandma': '👵', 'family': '👨‍👩‍👧‍👦', 'couple': '👫', 'friends': '👯',
  
  // Time & Weather Specific
  'sunrise': '🌅', 'sunset': '🌇', 'night': '🌃', 'midnight': '🌌', 'stars': '✨',
  'winter': '❄️', 'spring': '🌸', 'summer': '☀️', 'fall': '🍂', 'autumn': '🍁',
  'cold': '🥶', 'hot': '🥵', 'warm': '☀️', 'freeze': '🧊', 'ice': '🧊'
};

function toEmojiSpeak(input) {
  let result = input;
  let replacementCount = 0;
  
  const sortedKeys = Object.keys(emojiMap).sort((a, b) => b.length - a.length);
  
  sortedKeys.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = result.match(regex);
    if (matches) {
      replacementCount += matches.length;
      result = result.replace(regex, emojiMap[word]);
    }
  });
  
  return { result, replacementCount };
}

export default function EmojiConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [replacementCount, setReplacementCount] = useState(0);
  const [reverseMode, setReverseMode] = useState(false);

  const reverseEmojiMap = Object.fromEntries(
    Object.entries(emojiMap).map(([word, emoji]) => [emoji, word])
  );

  const fromEmojiSpeak = (input) => {
    let result = input;
    let replacementCount = 0;
    
    Object.entries(reverseEmojiMap).forEach(([emoji, word]) => {
      const regex = new RegExp(emoji.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const matches = result.match(regex);
      if (matches) {
        replacementCount += matches.length;
        result = result.replace(regex, word);
      }
    });
    
    return { result, replacementCount };
  };

  const handleConvert = () => {
    if (!input.trim()) {
      toast.error('Please enter some text to convert');
      return;
    }
    
    const { result, replacementCount: count } = reverseMode 
      ? fromEmojiSpeak(input)
      : toEmojiSpeak(input);
    
    setOutput(result);
    setReplacementCount(count);
    
    if (count === 0) {
      toast.info(reverseMode ? 'No emojis found' : 'No words matched emoji mappings');
    } else {
      toast.success(`Converted ${count} ${reverseMode ? 'emoji' : 'word'}${count > 1 ? 's' : ''}!`);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success('Copied to clipboard!');
  };

  const handleReset = () => {
    setInput('');
    setOutput('');
    setReplacementCount(0);
  };

  const handleSwap = () => {
    setInput(output);
    setOutput('');
  };

  const popularEmojis = [
    { word: 'fire', emoji: '🔥' },
    { word: 'heart', emoji: '❤️' },
    { word: 'party', emoji: '🎉' },
    { word: 'rocket', emoji: '🚀' },
    { word: 'star', emoji: '⭐' },
    { word: 'cool', emoji: '😎' },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="emoji-input" className="text-sm font-medium text-slate-700">
          Enter your text
        </Label>
        <Textarea
          id="emoji-input"
          placeholder="Type something with words like happy, fire, rocket, cool..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[120px] text-base resize-none bg-white/50 border-slate-200 focus:border-purple-300 focus:ring-purple-200"
        />
      </div>

      <div className="flex items-center justify-between bg-purple-50 rounded-xl p-3 border border-purple-200 mb-4">
        <Label className="text-sm font-medium text-purple-900">
          Mode: <span className="text-purple-600 font-semibold">{reverseMode ? 'Decode Emojis' : 'Encode to Emojis'}</span>
        </Label>
        <Switch
          checked={reverseMode}
          onCheckedChange={setReverseMode}
        />
      </div>

      {!reverseMode && (
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
        <div className="flex items-start gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-purple-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-purple-900">Popular emoji words</p>
            <p className="text-xs text-purple-700">Include these words in your text</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {popularEmojis.map(({ word, emoji }) => (
            <Badge key={word} variant="secondary" className="bg-white/80 hover:bg-white cursor-default">
              {emoji} {word}
            </Badge>
          ))}
        </div>
      </div>
      )}

      <div className="flex gap-3">
        <Button
          onClick={handleConvert}
          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/30"
        >
          <Smile className="w-4 h-4 mr-2" />
          {reverseMode ? 'Decode from Emojis' : 'Convert to Emojis'}
        </Button>
        {output && (
          <Button
            onClick={handleSwap}
            variant="outline"
            className="border-purple-300 hover:bg-purple-50"
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
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-slate-700">
              Emoji output
            </Label>
            {replacementCount > 0 && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                {replacementCount} word{replacementCount > 1 ? 's' : ''} converted
              </Badge>
            )}
          </div>
          <div className="relative">
            <Textarea
              value={output}
              readOnly
              className="min-h-[120px] text-lg bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 resize-none"
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