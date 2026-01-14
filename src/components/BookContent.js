import React, { useState, useEffect } from 'react';

const BookContent = ({ children, className = '' }) => {
  const [selectedText, setSelectedText] = useState('');

  // Function to handle text selection
  useEffect(() => {
    const handleSelection = () => {
      const selectedTextObj = window.getSelection();
      const text = selectedTextObj.toString().trim();
      
      if (text) {
        setSelectedText(text);
      } else {
        setSelectedText('');
      }
    };

    document.addEventListener('selectionchange', handleSelection);
    return () => {
      document.removeEventListener('selectionchange', handleSelection);
    };
  }, []);

  // Function to handle context menu for selected text
  const handleContextMenu = (e) => {
    if (selectedText) {
      // You could show a custom context menu here
      // For now, we'll just log the selected text
      console.log('Selected text:', selectedText);
    }
  };

  return (
    <div 
      className={`book-content ${className}`}
      onMouseUp={handleContextMenu}
    >
      {children}
      {selectedText && (
        <div className="text-selection-indicator">
          Selected: "{selectedText.substring(0, 50)}{selectedText.length > 50 ? '...' : ''}"
        </div>
      )}
    </div>
  );
};

export default BookContent;