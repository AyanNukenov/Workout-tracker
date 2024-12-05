import React, {useEffect, useState} from 'react';  

const NavigationBar = ({ activePage, setActivePage, onLogout }) => {  
  const buttons = [  
    { label: 'Аккаунт', page: 'account' },  
    { label: 'Тренировки', page: 'addWorkout' },  
    { label: 'Статистика', page: 'statistics' },  
    { label: 'Выйти', page: 'logout' },  
  ];  

  const [isSticky, setIsSticky] = useState(false);  
  useEffect(() => {  
    const handleScroll = () => {  
      const headerHeight = document.querySelector('.header').offsetHeight; // Высота Header  
      const scrollTop = window.scrollY; // Текущая позиция прокрутки  
      setIsSticky(scrollTop >= headerHeight); // Если прокрутка больше высоты Header, фиксируем NavigationBar  
    };  

    window.addEventListener('scroll', handleScroll);  
    return () => {  
      window.removeEventListener('scroll', handleScroll);  
    };  
  }, []);  

  return (  
    <div className={`navigation-bar w-full border-b border-blue-600 flex flex-wrap justify-around items-center py-2 z-50
    ${isSticky ? 'fixed top-0' : 'relative'}`}>  
      {buttons.map((button) => (  
        <button  
          key={button.page}  
          onClick={() => {  
            if (button.page === 'logout') {  
              onLogout(); // Выход из аккаунта  
            } else {  
              setActivePage(button.page); // Переключение страницы  
            }  
          }}  
          className={`nav-button flex-1 sm:flex-none font-bold py-2 px-4 rounded text-center ${  
            activePage === button.page  
              ? 'bg-blue-500 text-white !important' // Нажатая кнопка: фон голубой, текст белый  
              : 'bg-transparent text-black' // Ненажатая кнопка: прозрачный фон, текст черный  
          }`}  
        >  
          {button.label}  
        </button>  
      ))}  
    </div>  
  );  
};  

export default NavigationBar;