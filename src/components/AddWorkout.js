import React, { useState } from 'react';  

const AddWorkout = ({ onAdd }) => {  
  const [exercise, setExercise] = useState("");  
  const [reps, setReps] = useState("");  
  const [sets, setSets] = useState("");  
  const [weight, setWeight] = useState("");

  const handleSubmit = (e) => {  
    e.preventDefault();  
    if (!exercise || !reps || !sets || !weight) return;  
    const date = new Date().toLocaleDateString();
    onAdd({ exercise, reps, sets, weight, date });  
    setExercise("");  
    setReps("");  
    setSets("");  
    setWeight("");
  };  

  return (  
    <form onSubmit={handleSubmit} className="add-workout-form">  
      <input  
        type="text"  
        placeholder="Упражнение"  
        value={exercise}  
        onChange={(e) => setExercise(e.target.value)}  
        className="input"  
      />  
      <input  
        type="number"  
        placeholder="Количество повторений"  
        value={reps}  
        onChange={(e) => setReps(e.target.value)}  
        className="input"  
      />  
      <input  
        type="number"  
        placeholder="Количество сетов"  
        value={sets}  
        onChange={(e) => setSets(e.target.value)}  
        className="input"  
      />  
      <input  
        type="text"  
        placeholder="Вес (кг)"  
        value={weight}  
        onChange={(e) => setWeight(e.target.value)}  
        className="input"  
      /> 
      <button type="submit" className="add-button">Добавить тренировку</button>  
    </form>  
  );  
};  

export default AddWorkout;