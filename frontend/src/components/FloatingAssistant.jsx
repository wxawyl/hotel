import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const FloatingAssistant = ({ onOpenChat }) => {
  const { t } = useTranslation();
  const [position, setPosition] = useState({ x: window.innerWidth - 100, y: window.innerHeight - 120 });
  const [animation, setAnimation] = useState('idle');
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const actionIntervalRef = useRef(null);

  const messages = [
    t('assistant_hi'),
    t('assistant_help'),
    t('assistant_booking'),
    t('assistant_question'),
    t('assistant_chat')
  ];

  const actions = ['idle', 'walk', 'dance', 'wave', 'sleep'];

  const getRandomPosition = () => {
    const baseX = window.innerWidth - 120;
    const baseY = window.innerHeight - 140;
    const range = 30;
    return {
      x: baseX + (Math.random() - 0.5) * range,
      y: baseY + (Math.random() - 0.5) * range
    };
  };

  useEffect(() => {
    const showRandomMessage = () => {
      if (!isHovered && animation !== 'sleep') {
        setMessageText(messages[Math.floor(Math.random() * messages.length)]);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
      }
    };
    showRandomMessage();
    const messageInterval = setInterval(showRandomMessage, 8000);
    return () => clearInterval(messageInterval);
  }, [isHovered, animation]);

  useEffect(() => {
    const performAction = () => {
      if (!isHovered) {
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        setAnimation(randomAction);
        
        if (randomAction === 'walk') {
          const newPos = getRandomPosition();
          setPosition(newPos);
          setTimeout(() => setAnimation('idle'), 2000);
        } else if (randomAction === 'dance') {
          setTimeout(() => setAnimation('idle'), 3000);
        } else if (randomAction === 'wave') {
          setTimeout(() => setAnimation('idle'), 2000);
        } else if (randomAction === 'sleep') {
          setTimeout(() => setAnimation('idle'), 4000);
        }
      }
    };

    actionIntervalRef.current = setInterval(performAction, 6000);
    return () => actionIntervalRef.current && clearInterval(actionIntervalRef.current);
  }, [isHovered]);

  useEffect(() => {
    const handleResize = () => setPosition(prev => ({
      x: Math.min(prev.x, window.innerWidth - 80),
      y: Math.min(prev.y, window.innerHeight - 100)
    }));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getAnimationClass = () => {
    switch (animation) {
      case 'walk': return 'animate-walk';
      case 'dance': return 'animate-dance';
      case 'wave': return 'animate-wave';
      case 'sleep': return 'animate-sleep';
      default: return 'animate-idle';
    }
  };

  const wrapperStyle = { 
    left: position.x, 
    top: position.y, 
    transform: isHovered ? 'scale(1.1)' : 'scale(1)', 
    zIndex: showMessage ? 60 : 50,
    transformOrigin: 'center bottom'
  };
  const messageStyle = { left: Math.min(position.x + 10, window.innerWidth - 250), top: position.y - 70 };

  return (<>
    <div className={`fixed z-50 cursor-pointer transition-all duration-300 ${getAnimationClass()}`} style={wrapperStyle} onClick={onOpenChat} onMouseEnter={() => { setIsHovered(true); setAnimation('wave'); }} onMouseLeave={() => { setIsHovered(false); setAnimation('idle'); }}>
      <div className="relative">
        <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-xl">
          {animation === 'sleep' && <ellipse cx="50" cy="95" rx="25" ry="4" fill="#ddd" opacity="0.5"/>}
          
          <rect x="35" y="55" width="30" height="35" rx="4" fill="#667eea"/>
          <rect x="38" y="58" width="24" height="29" rx="2" fill="#818cf8"/>
          
          <rect x="32" y="60" width="8" height="25" rx="2" fill="#4338ca"/>
          <rect x="60" y="60" width="8" height="25" rx="2" fill="#4338ca"/>
          
          <circle cx="50" cy="35" r="22" fill="#e0e7ff"/>
          <circle cx="50" cy="33" r="18" fill="#c7d2fe"/>
          
          <circle cx="42" cy="32" r="5" fill="#1e293b"/>
          <circle cx="58" cy="32" r="5" fill="#1e293b"/>
          <circle cx="43" cy="31" r="2" fill="#fff"/>
          <circle cx="59" cy="31" r="2" fill="#fff"/>
          
          <circle cx="42" cy="32" r="1" fill="#00ff88">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="58" cy="32" r="1" fill="#00ff88">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>
          </circle>
          
          <path d="M42 42 Q50 50 58 42" stroke="#4338ca" strokeWidth="3" fill="none" strokeLinecap="round"/>
          
          <circle cx="35" cy="38" r="4" fill="#a5b4fc"/>
          <circle cx="65" cy="38" r="4" fill="#a5b4fc"/>
          
          <g className="robot-arm-left">
            <rect x="18" y="55" width="12" height="5" rx="2" fill="#667eea"/>
            <rect x="15" y="60" width="8" height="20" rx="2" fill="#818cf8"/>
            {animation === 'wave' && <circle cx="15" cy="80" r="6" fill="#4338ca">
              <animateTransform attributeName="transform" type="rotate" from="0 15 60" to="45 15 60" dur="0.5s" repeatCount="4"/>
            </circle>}
            {animation !== 'wave' && <circle cx="15" cy="80" r="6" fill="#4338ca"/>}
          </g>
          
          <g className="robot-arm-right">
            <rect x="70" y="55" width="12" height="5" rx="2" fill="#667eea"/>
            <rect x="77" y="60" width="8" height="20" rx="2" fill="#818cf8"/>
            <circle cx="77" cy="80" r="6" fill="#4338ca"/>
          </g>
          
          <rect x="38" y="88" width="8" height="10" rx="2" fill="#4338ca"/>
          <rect x="54" y="88" width="8" height="10" rx="2" fill="#4338ca"/>
          
          <circle cx="50" cy="18" r="4" fill="#00ff88">
            <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite"/>
          </circle>
          
          <line x1="48" y1="14" x2="48" y2="8" stroke="#00ff88" strokeWidth="2" opacity="0.6"/>
          <line x1="52" y1="14" x2="52" y2="8" stroke="#00ff88" strokeWidth="2" opacity="0.6"/>
        </svg>
        
        {isHovered && (<div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center animate-bounce shadow-lg">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
        </div>)}
      </div>
    </div>
    {showMessage && (<div className="fixed z-60 bg-white rounded-2xl shadow-xl px-4 py-3 max-w-xs animate-fade-in message-bubble" style={messageStyle}>
      <div className="flex items-start gap-2">
        <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2"/>
        <p className="text-gray-700 text-sm">{messageText}</p>
      </div>
    </div>)}
  </>);
};

export default FloatingAssistant;
