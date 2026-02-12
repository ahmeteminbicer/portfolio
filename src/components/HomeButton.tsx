import React, { useState, useEffect } from 'react';

const HomeButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // --- RENK AYARLARI BURADAN YAPILIR ---
  const colors = {
    bg: '#1e1427',    // Ana Arkaplan (Mavi)
    icon: '#c084fc',  // Ana İkon Rengi (Beyaz)
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style>
        {`
          .home-btn-container {
            position: fixed;
            bottom: 24px;
            left: 24px;
            z-index: 1000;
            transition: all 0.5s ease;
          }

          .home-btn-styled {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            cursor: pointer;
            border: 2px solid ${colors.bg};
            background-color: ${colors.bg};
            color: ${colors.icon};
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            outline: none;
          }

          /* Hover'da renklerin yer değiştirmesi */
          .home-btn-styled:hover {
            background-color: ${colors.icon};
            color: ${colors.bg};
            transform: scale(1.1);
          }

          /* Görünürlük ve Alttan Gelme Animasyonu */
          .btn-visible {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
          }

          .btn-hidden {
            opacity: 0;
            transform: translateY(30px);
            pointer-events: none;
          }
        `}
      </style>

      <div className={`home-btn-container ${isVisible ? 'btn-visible' : 'btn-hidden'}`}>
        <button
          onClick={scrollToTop}
          className="home-btn-styled"
          aria-label="Home"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="28" 
            height="28" 
            fill="currentColor" 
            viewBox="0 0 16 16"
          >
            <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.708L8 2.207l-5 5V13.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 2 13.5V8.207l-.646.647a.5.5 0 1 1-.708-.708z"/>
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-5.854 1.5 1.5a.5.5 0 0 1-.708.708L13 11.707V14.5a.5.5 0 1 1-1 0v-2.793l-.646.647a.5.5 0 0 1-.708-.707l1.5-1.5a.5.5 0 0 1 .708 0Z"/>
          </svg>
        </button>
      </div>
    </>
  );
};

export default HomeButton;