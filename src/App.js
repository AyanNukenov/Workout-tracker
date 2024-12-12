import React, { useState, useEffect } from 'react';  
import Header from './components/Header';  
import WorkoutList from './components/WorkoutList';  
import AddWorkout from './components/AddWorkout';  
import ScrollToTopButton from './components/ScrollToTopButton';  
import AuthForm from './components/AuthForm';  
import Statistics from './components/Statistics';  
import NavigationBar from './components/NavigationBar'; // Новый компонент  
import Account from './components/Account'; // Импортируем компонент Account 
import Pagination from './components/Pagination';
import Programs from './components/Programs';
import MassGainProgram from './components/MassGainProgram';

function App() {  
  const [workouts, setWorkouts] = useState([]);  
  const [workoutCount, setWorkoutCount] = useState(0); // Состояние для количества тренировок
  const [activePage, setActivePage] = useState('account'); // Текущая страница  
  const [currentUser, setCurrentUser] = useState(() => {  
    return localStorage.getItem('currentUser') || '';  
  });  
  const [currentPassword, setCurrentPassword] = useState(() => {  
    return localStorage.getItem('currentPassword') || '';  
  });  

  // Пагинация  
  const [currentPage, setCurrentPage] = useState(1); // Текущая страница пагинации  
  const itemsPerPage = 5; // Количество тренировок на одной странице  

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
    setWorkoutCount(updatedWorkouts.length); // Обновляем счётчик тренировок
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

  // Группируем тренировки по дате  
  const groupedWorkouts = workouts.reduce((groups, workout) => {  
    if (!groups[workout.date]) {  
      groups[workout.date] = [];  
    }  
    groups[workout.date].push(workout);  
    return groups;  
  }, {});  

  // Преобразуем объект в массив для удобства работы  
  const groupedWorkoutsArray = Object.entries(groupedWorkouts);  

  // Вычисляем группы тренировок для текущей страницы  
  const indexOfLastGroup = currentPage * itemsPerPage;  
  const indexOfFirstGroup = indexOfLastGroup - itemsPerPage;  
  const currentGroupedWorkouts = groupedWorkoutsArray.slice(  
    indexOfFirstGroup,  
    indexOfLastGroup  
  );  

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
                <AddWorkout onAdd={addWorkout} currentUser={currentUser} workoutCount={workoutCount}  
                    setWorkoutCount={setWorkoutCount}/>  
                <WorkoutList  groupedWorkouts={currentGroupedWorkouts} onRemove={removeWorkout} />  
                {/* Пагинация */}  
                <Pagination  
                  totalItems={groupedWorkoutsArray.length}  
                  itemsPerPage={itemsPerPage}  
                  currentPage={currentPage}  
                  onPageChange={(page) => setCurrentPage(page)} // Обновляем текущую страницу  
                />  
                <ScrollToTopButton />  
              </>  
            )}  
            {activePage === 'statistics' && <Statistics workouts={workouts} />}  
             {/* Добавляем компонент Programs */}  
          {activePage === 'programs' && <Programs setActivePage={setActivePage} />} 
          {activePage === 'massGainProgram' && <MassGainProgram />} {/* Новая страница */}
          </div>  
        </>  
      )}  
    </div>  
  );  
}  

export default App;