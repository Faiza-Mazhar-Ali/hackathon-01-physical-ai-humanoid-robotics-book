import React, { useState, useRef } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [queryMode, setQueryMode] = useState('global'); // 'global' or 'selected'
  const [selectedText, setSelectedText] = useState('');
  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Update scroll position when messages change
  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to handle text selection
  const handleTextSelection = () => {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      setSelectedText(selectedText);
      setQueryMode('selected');
    }
  };

  // Function to send a message to the backend
  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message to the chat
    const userMessage = { sender: 'user', text: inputValue, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Prepare the request body based on the query mode
      const requestBody = {
        query_text: inputValue,
        query_type: queryMode === 'global' ? 'global_search' : 'selected_text',
        selected_text: queryMode === 'selected' ? selectedText : null
      };

      // Send the request to the backend
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        const botMessage = { 
          sender: 'bot', 
          text: data.response_text, 
          sources: data.source_chunks || [],
          timestamp: new Date() 
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        const errorData = await response.json();
        const errorMessage = { 
          sender: 'bot', 
          text: `Error: ${errorData.detail || 'Failed to get response'}`, 
          timestamp: new Date() 
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage = { 
        sender: 'bot', 
        text: `Error: ${error.message || 'Failed to connect to the server'}`, 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setInputValue('');
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Clear selection when clicking elsewhere
  React.useEffect(() => {
    const handleClick = () => {
      if (!window.getSelection().toString()) {
        setSelectedText('');
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h3>Physical AI & Robotics Assistant</h3>
        <div className="query-mode-selector">
          <button 
            className={queryMode === 'global' ? 'active' : ''} 
            onClick={() => setQueryMode('global')}
          >
            Global Search
          </button>
          <button 
            className={queryMode === 'selected' ? 'active' : ''} 
            onClick={() => {
              if (selectedText) {
                setQueryMode('selected');
              } else {
                alert('Please select text in the document first');
              }
            }}
            disabled={!selectedText}
          >
            Selected Text Only
          </button>
        </div>
      </div>

      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`message ${message.sender}`}
          >
            <div className="message-text">
              {message.text}
            </div>
            {message.sources && message.sources.length > 0 && (
              <div className="message-sources">
                <small>Sources: {message.sources.join(', ')}</small>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="message bot">
            <div className="message-text">
              <em>Thinking...</em>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {selectedText && queryMode === 'selected' && (
        <div className="selected-text-preview">
          <strong>Selected Text:</strong> "{selectedText.substring(0, 100)}{selectedText.length > 100 ? '...' : ''}"
        </div>
      )}

      <div className="chatbot-input">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask a question about Physical AI and Robotics..."
          rows="3"
        />
        <button 
          onClick={sendMessage} 
          disabled={isLoading || !inputValue.trim()}
        >
          Send
        </button>
      </div>

      <div className="chatbot-instructions">
        <p><strong>Global Search:</strong> Ask questions about the entire book content</p>
        <p><strong>Selected Text Only:</strong> Ask questions specifically about selected text</p>
        <p><em>Note: The AI assistant will only respond based on the book content</em></p>
      </div>
    </div>
  );
};

export default Chatbot;