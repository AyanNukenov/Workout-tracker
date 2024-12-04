import React, { useState, useEffect } from 'react';  
import Header from './components/Header';  
import WorkoutList from './components/WorkoutList';  
import AddWorkout from './components/AddWorkout';  
import ScrollToTopButton from './components/ScrollToTopButton';  
import AuthForm from './components/AuthForm';  
import Statistics from './components/Statistics';  
import NavigationBar from './components/NavigationBar'; // Новый компонент  
import Account from './components/Account'; // Импортируем компонент Account  

function App() {  
  const [workouts, setWorkouts] = useState([]);  
  const [activePage, setActivePage] = useState('account'); // Текущая страница  
  const [currentUser, setCurrentUser] = useState(() => {  
    return localStorage.getItem('currentUser') || '';  
  });  
  const [currentPassword, setCurrentPassword] = useState(() => {  
    return localStorage.getItem('currentPassword') || '';  
  });  

  // Загружаем тренировки для текущего пользователя при изменении currentUser  
  useEffect(() => {  
    if (currentUser) {  
      const userWorkouts = localStorage.getItem(`workouts_${currentUser}_${currentPassword}`);  
      setWorkouts(userWorkouts ? JSON.parse(userWorkouts) : []);  
    }  
  }, [currentUser, currentPassword]);  

  const addWorkout = (workout) => {  
    const updatedWorkouts = [...workouts, { ...workout, id: Date.now() }];  
    setWorkouts(updatedWorkouts);  
    localStorage.setItem(`workouts_${currentUser}_${currentPassword}`, JSON.stringify(updatedWorkouts));  
  };  

  const removeWorkout = (id) => {  
    const updatedWorkouts = workouts.filter((workout) => workout.id !== id);  
    setWorkouts(updatedWorkouts);  
    localStorage.setItem(`workouts_${currentUser}_${currentPassword}`, JSON.stringify(updatedWorkouts));  
  };  

  const handleLogin = (username, password) => {  
    setCurrentUser(username);  
    setCurrentPassword(password);  
    localStorage.setItem('currentUser', username);  
    localStorage.setItem('currentPassword', password);  
    const userWorkouts = localStorage.getItem(`workouts_${username}_${password}`);  
    setWorkouts(userWorkouts ? JSON.parse(userWorkouts) : []);  
    setActivePage('account'); // Устанавливаем текущую страницу на "Аккаунт"  
  };  

  const handleLogout = () => {  
    setCurrentUser('');  
    setCurrentPassword('');  
    localStorage.removeItem('currentUser');  
    localStorage.removeItem('currentPassword');  
    setActivePage('auth'); // Возвращаемся на страницу авторизации  
  };  

  return (  
    <div className="App">  
      <Header />  
      {!currentUser ? (  
        <AuthForm onLogin={handleLogin} />  
      ) : (  
        <>  
          {/* Навигационная панель */}  
          <NavigationBar activePage={activePage} setActivePage={setActivePage} onLogout={handleLogout} />  
          <div className="p-4">  
            {activePage === 'account' && <Account username={currentUser} workouts={workouts} />} {/* Используем компонент Account */}  
            {activePage === 'addWorkout' && (  
              <>  
                <AddWorkout onAdd={addWorkout} currentUser={currentUser} />  
                <WorkoutList workouts={workouts} onRemove={removeWorkout} />  
                <ScrollToTopButton />  
              </>  
            )}  
            {activePage === 'statistics' && <Statistics workouts={workouts} />}  
          </div>  
        </>  
      )}  
    </div>  
  );  
}  

export default App;