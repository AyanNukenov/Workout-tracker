import React, { useState, useEffect } from 'react';  

const ScrollToTopButton = () => {  
  const [isVisible, setIsVisible] = useState(false);  

  // Показать кнопку при прокрутке вниз  
  const toggleVisibility = () => {  
    if (window.pageYOffset > 150) {  
      setIsVisible(true);  
    } else {  
      setIsVisible(false);  
    }  
  };  

  // Прокрутка наверх  
  const scrollToTop = () => {  
    window.scrollTo({  
      top: 0,  
      behavior: 'smooth'  
    });  
  };  

  useEffect(() => {  
    window.addEventListener('scroll', toggleVisibility);  
    return () => {  
      window.removeEventListener('scroll', toggleVisibility);  
    };  
  }, []);  

  return (  
    <button  
      type="button"  
      onClick={scrollToTop}  
      className={`fixed bottom-7 right-10 bg-blue-500 text-white p-3 rounded-full shadow-lg transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}  
    >  
      ↑  
    </button>  
  );  
};  

export default ScrollToTopButton;  
