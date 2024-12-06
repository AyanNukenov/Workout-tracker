import React from "react";  
import { motion } from "framer-motion";  

const Modal = ({ isOpen, onClose, children }) => {  
  if (!isOpen) return null; // Если модальное окно закрыто, ничего не рендерим  

  return (  
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">  
      {/* Анимация модального окна */}  
      <motion.div  
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md text-center relative"     
        initial={{ opacity: 0, scale: 0.8 }}  
        animate={{ opacity: 1, scale: 1 }}  
        exit={{ opacity: 0, scale: 0.8 }}  
        transition={{ duration: 0.5, ease: "easeOut" }}  
      >  
        {/* Содержимое модального окна */}  
        {children}  

        {/* Кнопка закрытия */}  
        <button  
          onClick={onClose}  
          style={{  
            position: "absolute",  
            top: "1rem",  
            right: "1rem",  
            color: "#6B7280", // Серый цвет  
            fontSize: "1.25rem", // Размер текста  
            background: "none", // Убираем фон  
            border: "none", // Убираем границу  
            cursor: "pointer", // Указатель при наведении  
            transition: "color 0.3s ease", // Плавный переход цвета  
          }}  
          onMouseEnter={(e) => (e.target.style.color = "#1F2937")} // Цвет при наведении  
          onMouseLeave={(e) => (e.target.style.color = "#6B7280")} // Возврат цвета  
        >  
          ✖  
        </button>  
      </motion.div>  
    </div>  
  );  
};  

export default Modal;