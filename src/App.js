import React, { useState, useEffect } from 'react';  
import Header from './components/Header';  
import WorkoutList from './components/WorkoutList';  
import AddWorkout from './components/AddWorkout';  
import ScrollToTopButton from './components/ScrollToTopButton'; 


function App() {  
  const [workouts, setWorkouts] = useState(() => {  
    const savedWorkouts = localStorage.getItem('workouts');  
    return savedWorkouts ? JSON.parse(savedWorkouts) : [];  
  });  

  useEffect(() => {  
    localStorage.setItem('workouts', JSON.stringify(workouts));  
  }, [workouts]);  

  const addWorkout = (workout) => {  
    setWorkouts([...workouts, { ...workout, id: Date.now() }]);  
  };  

  const removeWorkout = (workoutId) => {  
    setWorkouts(workouts.filter(workout => workout.id !== workoutId));  
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
