import React, { useState, useEffect } from 'react';  
import Header from './components/Header';  
import WorkoutList from './components/WorkoutList';  
import AddWorkout from './components/AddWorkout';  
import ScrollToTopButton from './components/ScrollToTopButton';  
import AuthForm from './components/AuthForm';  

function App() {  
  const [workouts, setWorkouts] = useState([]);  

  const [currentUser, setCurrentUser] = useState(() => {  
    return localStorage.getItem('currentUser') || '';  
  });  

  // Загружаем тренировки для текущего пользователя при изменении currentUser  
  useEffect(() => {  
    if (currentUser) {  
      const userWorkouts = localStorage.getItem(`workouts_${currentUser}`);  
      setWorkouts(userWorkouts ? JSON.parse(userWorkouts) : []);  
    }  
  }, [currentUser]);  

  const addWorkout = (workout) => {  
    const updatedWorkouts = [...workouts, { ...workout, id: Date.now() }];  
    setWorkouts(updatedWorkouts);  
    localStorage.setItem(`workouts_${currentUser}`, JSON.stringify(updatedWorkouts));  
  };  

  const removeWorkout = (id) => {  
    const updatedWorkouts = workouts.filter(workout => workout.id !== id);  
    setWorkouts(updatedWorkouts);  
    localStorage.setItem(`workouts_${currentUser}`, JSON.stringify(updatedWorkouts));  
  };  

  const handleCreateUser = (username) => {  
    setCurrentUser(username);  
    localStorage.setItem('currentUser', username);  
    setWorkouts([]); // Начать с пустого списка тренировок  
  };  

  const handleSelectUser = (username) => {  
    setCurrentUser(username);  
    localStorage.setItem('currentUser', username);  
    const userWorkouts = localStorage.getItem(`workouts_${username}`);  
    setWorkouts(userWorkouts ? JSON.parse(userWorkouts) : []);  
  };  

  const handleBack = () => {  
    setCurrentUser('');  
    localStorage.removeItem('currentUser');  
  };  

  return (  
    <div className="App">  
      <Header />  
      {!currentUser ? (  
        <AuthForm onCreate={handleCreateUser} onSelect={handleSelectUser} />  
      ) : (  
        <>  
          <AddWorkout onAdd={addWorkout} currentUser={currentUser} onBack={handleBack}/>  
          <WorkoutList workouts={workouts} onRemove={removeWorkout}/>  
          <ScrollToTopButton />  
        </>  
      )}  
    </div>  
  );  
}  

export default App;