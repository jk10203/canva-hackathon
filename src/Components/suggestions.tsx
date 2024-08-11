// src/Components/suggestions.tsx

import React, { useEffect } from 'react';
import { CanvaApp } from '@canva/sdk';

const Suggestions = ({ suggestions }) => {
  useEffect(() => {
    const app = new CanvaApp({
      apiKey: 'YOUR_CANVA_APP_API_KEY',
    });

    const createSuggestionOverlay = (element, suggestion) => {
      const overlay = document.createElement('div');
      overlay.style.position = 'absolute';
      overlay.style.border = '2px solid blue';
      overlay.style.pointerEvents = 'none';
      overlay.style.backgroundColor = 'rgba(0, 0, 255, 0.1)';
      overlay.style.zIndex = '9999';
      overlay.style.display = 'flex';
      overlay.style.flexDirection = 'column';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';

      const sizeInfo = document.createElement('div');
      sizeInfo.innerText = `Suggested Size: ${suggestion.width} x ${suggestion.height} px`;
      sizeInfo.style.backgroundColor = 'white';
      sizeInfo.style.padding = '4px';
      sizeInfo.style.border = '1px solid blue';
      sizeInfo.style.marginBottom = '4px';
      overlay.appendChild(sizeInfo);

      const updateOverlay = () => {
        const rect = element.getBoundingClientRect();
        overlay.style.left = `${rect.left}px`;
        overlay.style.top = `${rect.top}px`;
        overlay.style.width = `${suggestion.width}px`;
        overlay.style.height = `${suggestion.height}px`;
      };

      updateOverlay();

      const observer = new ResizeObserver(updateOverlay);
      observer.observe(element);

      document.body.appendChild(overlay);

      return overlay;
    };

    app.onReady(() => {
      app.editor.on('elementSelect', (element) => {
        const suggestion = suggestions[element.id];
        if (suggestion) {
          createSuggestionOverlay(element, suggestion);
        }
      });
    });
  }, [suggestions]);

  return (
    <div>
      {/* Render suggestions or other UI components here */}
    </div>
  );
};

export default Suggestions;
