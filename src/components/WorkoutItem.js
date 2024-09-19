import React from 'react';  

const WorkoutItem = ({ workout, onRemove }) => {  
  return (  
    <div className="workout-item">  
      <h3>{workout.exercise}</h3>  
      <p>{`Повторения: ${workout.reps}, сеты: ${workout.sets}, вес: ${workout.weight} кг`}</p>  
      <p>{`Дата: ${workout.date}`}</p>
      <button onClick={onRemove} className="add-button">Удалить</button>
    </div>  
  );  
};  

export default WorkoutItem;