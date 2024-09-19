import React, { useState, useEffect } from 'react';  
import Header from './components/Header';  
import WorkoutList from './components/WorkoutList';  
import AddWorkout from './components/AddWorkout';  
import ScrollToTopButton from './components/ScrollToTopButton'; 

function App() {  
  const [workouts, setWorkouts] = useState(() => {  
    // Инициализация состояния из localStorage  
    const savedWorkouts = localStorage.getItem('workouts');  
    return savedWorkouts ? JSON.parse(savedWorkouts) : [];  
  });  

  useEffect(() => {  
    // Сохранение данных в localStorage при изменении списка тренировок  
    localStorage.setItem('workouts', JSON.stringify(workouts));  
  }, [workouts]);  

  const addWorkout = (workout) => {  
    setWorkouts([...workouts, workout]);  
  };  

  const removeWorkout = (indexToRemove) => {  
    setWorkouts(workouts.filter((_, index) => index !== indexToRemove));  
  };

  return (  
    <div className="App">  
      <Header />  
      <AddWorkout onAdd={addWorkout} />  
      <WorkoutList workouts={workouts} onRemove={removeWorkout} />  
      <ScrollToTopButton />
    </div>  
  );  
}  

export default App;
