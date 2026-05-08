import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Chatbot = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          id: 1,
          type: 'bot',
          content: t('chatbot_welcome')
        }
      ]);
    }
  }, [isOpen, t]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chatbot/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage.content,
          language: i18n.language
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessages(prev => [...prev, {
          id: messages.length + 2,
          type: 'bot',
          content: data.response
        }]);
      } else {
        setMessages(prev => [...prev, {
          id: messages.length + 2,
          type: 'bot',
          content: t('chatbot_error') + ': ' + (data.error || t('chatbot_unknown_error'))
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        id: messages.length + 2,
        type: 'bot',
        content: t('chatbot_network_error')
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      padding: '16px',
      paddingBottom: '100px'
    }}>
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(4px)'
        }}
        onClick={onClose}
      />
      
      <div style={{
        position: 'relative',
        width: '320px',
        maxHeight: '70vh',
        backgroundColor: 'white',
        borderRadius: '24px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden'
      }}>
        <div style={{
          background: 'linear-gradient(90deg, #f472b6, #a78bfa, #60a5fa)',
          padding: '20px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-50%',
            width: '128px',
            height: '128px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-50%',
            left: '-50%',
            width: '96px',
            height: '96px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%'
          }} />
          
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}>
                <svg viewBox="0 0 100 100" style={{ width: '40px', height: '40px' }}>
                  <circle cx="50" cy="45" r="35" fill="#FFE4E1" />
                  <circle cx="38" cy="38" r="6" fill="#333" />
                  <circle cx="62" cy="38" r="6" fill="#333" />
                  <circle cx="39" cy="36" r="2" fill="#fff" />
                  <circle cx="63" cy="36" r="2" fill="#fff" />
                  <path d="M40 55 Q50 65 60 55" stroke="#FF6B8A" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <circle cx="28" cy="48" r="8" fill="#FFB6C1" opacity="0.6" />
                  <circle cx="72" cy="48" r="8" fill="#FFB6C1" opacity="0.6" />
                </svg>
              </div>
              <div>
                <h3 style={{ color: 'white', fontWeight: 'bold', margin: 0, fontSize: '16px' }}>{t('chatbot_title')}</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)', margin: 0, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', backgroundColor: '#86efac', borderRadius: '50%' }} />
                  {t('chatbot_available')}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                hover: { color: 'white' },
                padding: '8px',
                borderRadius: '50%',
                hover: { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
                transition: 'all 0.2s'
              }}
            >
              <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div style={{ height: '280px', overflowY: 'auto', padding: '16px', gap: '16px', display: 'flex', flexDirection: 'column' }}>
          {messages.map(message => (
            <div
              key={message.id}
              style={{ display: 'flex', gap: '12px', justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start' }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                background: message.type === 'user' ? 'linear-gradient(135deg, #60a5fa, #a78bfa)' : 'linear-gradient(135deg, #fbcfe8, #ddd6fe)'
              }}>
                {message.type === 'user' ? (
                  <svg viewBox="0 0 100 100" style={{ width: '24px', height: '24px' }}>
                    <circle cx="50" cy="50" r="35" fill="#fff" />
                    <circle cx="38" cy="42" r="5" fill="#333" />
                    <circle cx="62" cy="42" r="5" fill="#333" />
                    <path d="M40 58 Q50 68 60 58" stroke="#FF6B8A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 100 100" style={{ width: '24px', height: '24px' }}>
                    <circle cx="50" cy="45" r="30" fill="#FFE4E1" />
                    <circle cx="38" cy="38" r="5" fill="#333" />
                    <circle cx="62" cy="38" r="5" fill="#333" />
                    <path d="M42 52 Q50 60 58 52" stroke="#FF6B8A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  </svg>
                )}
              </div>
              <div style={{
                maxWidth: '75%',
                padding: '12px 16px',
                borderRadius: '20px',
                background: message.type === 'user' 
                  ? 'linear-gradient(90deg, #60a5fa, #a78bfa)' 
                  : '#f3f4f6',
                color: message.type === 'user' ? 'white' : '#374151',
                borderRadius: message.type === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px'
              }}>
                <p style={{ margin: 0, fontSize: '14px', whiteSpace: 'pre-wrap' }}>{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-start' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                background: 'linear-gradient(135deg, #fbcfe8, #ddd6fe)'
              }}>
                <svg viewBox="0 0 100 100" style={{ width: '24px', height: '24px' }}>
                  <circle cx="50" cy="45" r="30" fill="#FFE4E1" />
                  <circle cx="38" cy="38" r="5" fill="#333" />
                  <circle cx="62" cy="38" r="5" fill="#333" />
                  <path d="M42 52 Q50 60 58 52" stroke="#FF6B8A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </svg>
              </div>
              <div style={{
                padding: '12px 16px',
                borderRadius: '20px',
                background: '#f3f4f6',
                borderRadius: '20px 20px 20px 4px'
              }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', backgroundColor: '#f472b6', borderRadius: '50%', animation: 'bounce 0.6s ease-in-out infinite' }} />
                  <div style={{ width: '8px', height: '8px', backgroundColor: '#a78bfa', borderRadius: '50%', animation: 'bounce 0.6s ease-in-out infinite', animationDelay: '0.15s' }} />
                  <div style={{ width: '8px', height: '8px', backgroundColor: '#60a5fa', borderRadius: '50%', animation: 'bounce 0.6s ease-in-out infinite', animationDelay: '0.3s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('chatbot_placeholder')}
              style={{
                flex: 1,
                padding: '12px 20px',
                border: '1px solid #d1d5db',
                borderRadius: '24px',
                outline: 'none',
                fontSize: '14px',
                backgroundColor: 'white'
              }}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              style={{
                background: 'linear-gradient(90deg, #f472b6, #a78bfa, #60a5fa)',
                color: 'white',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: isLoading || !inputValue.trim() ? 'not-allowed' : 'pointer',
                opacity: isLoading || !inputValue.trim() ? 0.5 : 1,
                transition: 'all 0.2s'
              }}
            >
              <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
