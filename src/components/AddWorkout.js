import React, { useState } from 'react';  
import ExerciseInput from './ExerciseInput';  

const AddWorkout = ({ onAdd, currentUser, onBack }) => {  
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

  const scrollToEnd = () => {  
    window.scrollTo({  
      top: document.documentElement.scrollHeight,  
      behavior: 'smooth',  
    });  
  };  

  return (  
    <div className="add-workout-container">  
      <h2  style={{   
        textAlign: 'center',   
        fontWeight: 'bold',   
        fontSize: '24px',   
        marginTop: '20px',
        fontFamily: 'Arial, sans-serif'   
      }}  > 
      Спортсмен/клиент: {currentUser}</h2> {/* Отображаем имя пользователя */}  
      <form onSubmit={handleSubmit} className="add-workout-form flex flex-col space-y-4">  
      <button onClick={onBack} className="back-button bg-blue-500 text-white p-2 rounded" 
       >  
        Выбрать другого спортсмена/клиента
      </button> 
        <ExerciseInput exercise={exercise} setExercise={setExercise}/>   
        <input  
          type="text"  
          placeholder="Количество повторений"  
          value={reps}  
          onChange={(e) => setReps(e.target.value)}  
          className="input border p-2 rounded"  
        />  
        <input  
          type="text"  
          placeholder="Количество сетов"  
          value={sets}  
          onChange={(e) => setSets(e.target.value)}  
          className="input border p-2 rounded"  
        />  
        <input  
          type="text"  
          placeholder="Вес (кг)"  
          value={weight}  
          onChange={(e) => setWeight(e.target.value)}  
          className="input border p-2 rounded"  
        />  
        <div className="flex">  
          <button type="submit" className="add-button bg-blue-500 text-white p-2 rounded mr-2">  
            Добавить тренировку  
          </button>  
          <button type="button" onClick={scrollToEnd} className="end-button bg-blue-500 text-white p-2 rounded">  
            В конец списка  
          </button>  
        </div>  
      </form>  
    </div>  
  );  
};  

export default AddWorkout;