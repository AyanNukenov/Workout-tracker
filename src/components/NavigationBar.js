import React from 'react';  

const NavigationBar = ({ activePage, setActivePage, onLogout }) => {  
  const buttons = [  
    { label: 'Аккаунт', page: 'account' },  
    { label: 'Статистика', page: 'statistics' },  
    { label: 'Тренировки', page: 'addWorkout' },  
    { label: 'Выйти', page: 'logout' },  
  ];  

  return (  
    <div className="navigation-bar w-full border border-[#61dafb] flex justify-around items-center py-2">  
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
          className={`nav-button flex-1 font-bold py-2 px-4 rounded text-center ${  
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