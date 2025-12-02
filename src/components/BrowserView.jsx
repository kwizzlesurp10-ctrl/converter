
import React, { useState } from 'react';

const BrowserView = () => {
  const [url, setUrl] = useState('');
  const [iframeUrl, setIframeUrl] = useState('');

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleLoadUrl = () => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      setIframeUrl(url);
    } else {
      setIframeUrl('https://' + url);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg text-white">
      <h2 className="text-2xl font-bold mb-4">Browser</h2>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
          placeholder="Enter a URL"
          className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          onClick={handleLoadUrl}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Load
        </button>
      </div>
      {iframeUrl && (
        <iframe
          src={iframeUrl}
          className="w-full h-96 rounded-md border border-gray-700"
          title="Browser"
          sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        />
      )}
    </div>
  );
};

export default BrowserView;
