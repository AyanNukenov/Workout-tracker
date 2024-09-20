import React, { useState } from 'react';  
import ConfirmationModal from './ConfirmationModal';  

const WorkoutItem = ({ workout, onRemove }) => {  
  const [isModalOpen, setIsModalOpen] = useState(false);  

  const handleRemoveClick = () => {  
    setIsModalOpen(true);  
  };  

  const handleConfirmRemove = () => {  
    onRemove();  
    setIsModalOpen(false);  
  };  

  const handleCloseModal = () => {  
    setIsModalOpen(false);  
  };  

  return (  
    <div className="workout-item">  
      <h3>{workout.exercise}</h3>  
      <p>{`Повторения: ${workout.reps}, сеты: ${workout.sets}, вес: ${workout.weight} кг`}</p>  
      <p>{`Дата: ${workout.date}`}</p>  
      <button  
        className="add-button"  
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
};  

export default WorkoutItem;