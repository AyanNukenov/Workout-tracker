import React, { useState } from "react";  

// Предполагается, что ConfirmationModal - это компонент, который вы используете для подтверждения  
import ConfirmationModal from "./ConfirmationModal";  

function WorkoutItem({ workout, onRemove }) {  
  const [isModalOpen, setIsModalOpen] = useState(false);  

  // Открытие модального окна для подтверждения удаления  
  const handleRemoveClick = () => {  
    setIsModalOpen(true);  
  };  

  // Подтверждение удаления и вызов функции onRemove  
  const handleConfirmRemove = () => {  
    onRemove(); // Вызов функции удаления, переданной из родительского компонента  
    setIsModalOpen(false); // Закрытие модального окна  
  };  

  // Закрытие модального окна без удаления  
  const handleCloseModal = () => {  
    setIsModalOpen(false);  
  };  

  return (  
    <div className="workout-item">  
      <h3>{workout.exercise}</h3>  
      <p>{`Повторения: ${workout.reps}, сеты: ${workout.sets}, вес: ${workout.weight} кг`}</p>  
      <p>{`Дата: ${workout.date}`}</p>  
      <button  
        className="delete-button"  
        onClick={handleRemoveClick}  
      >  
        Удалить  
      </button>  
      <ConfirmationModal  
        isOpen={isModalOpen}  
        onClose={handleCloseModal}  
        onConfirm={handleConfirmRemove}  
      />  
    </div>  
  );  
}  

export default WorkoutItem;