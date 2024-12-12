import React, { useState } from 'react';  
import ExerciseInput from './ExerciseInput';  
import { format } from "date-fns";  
import Modal from "./Modal"; 


const AddWorkout = ({ onAdd, currentUser, workoutCount  }) => {  
  const [exercise, setExercise] = useState("");  
  const [reps, setReps] = useState("");  
  const [sets, setSets] = useState("");  
  const [weight, setWeight] = useState("");  
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [modalMessage, setModalMessage] = useState("");
  
  

  const handleSubmit = (e) => {  
    e.preventDefault();  
    if (!exercise || !reps || !sets || !weight) return;  
    const date = format(new Date(), "yyyy-MM-dd"); // Сохраняем дату в ISO-формате  
    onAdd({ exercise, reps, sets, weight, date });  

    
      const newWorkoutCount = workoutCount + 1;  
    
      console.log("Новое количество тренировок:", newWorkoutCount); // Отладочный вывод  
    
      // Проверяем, нужно ли показывать поздравление или цитату  
      if (newWorkoutCount === 5) {  
        setModalMessage(`${currentUser}, ты молодец! Отличный старт!`);  
        setIsModalOpen(true);  
      } else if (newWorkoutCount % 10 === 0) {  
        setModalMessage(`Помни! Каждая тренировка — это шаг к твоей цели!`);  
        setIsModalOpen(true);  
      };  

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
      Спортсмен: {currentUser}</h2> {/* Отображаем имя пользователя */}  
      <form onSubmit={handleSubmit} className="add-workout-form">  
        <div className="input-group">
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
        </div>
        <div className="flex">  
          <button type="submit" className="add-button bg-blue-500 text-white p-2 rounded mr-2">  
            Добавить упражнение  
          </button>  
          <button type="button" onClick={scrollToEnd} className="end-button bg-blue-500 text-white p-2 rounded">  
            В конец списка  
          </button>  
        </div>  
      </form>  
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>  
        <h2 className="text-xl font-bold text-gray-800 mb-2">{modalMessage}</h2>  
         
      </Modal> 
    </div>  
  );  
};  

export default AddWorkout;