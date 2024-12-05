import React, { useEffect, useState } from "react";  

const Account = ({ username }) => {  
  const [workoutCount, setWorkoutCount] = useState(0);  
  const [highestWeight, setHighestWeight] = useState(0);  
  const [lowestWeight, setLowestWeight] = useState(0);  

  useEffect(() => {  
    // Загружаем данные тренировок из localStorage  
    const workouts = JSON.parse(  
      localStorage.getItem(`workouts_${username}_${localStorage.getItem("currentPassword")}`)  
    ) || [];  
    setWorkoutCount(workouts.length);  

    if (workouts.length > 0) {  
      const weights = workouts.map((workout) => workout.weight || 0);  
      setHighestWeight(Math.max(...weights));  
      setLowestWeight(Math.min(...weights));  
    }  
  }, [username]);  

  return (  
    <div className="bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen p-4 flex flex-col items-center">  
      {/* Приветствие */}  
      <h1 className="text-2xl font-bold text-blue-500 mb-6 animate-fadeIn">  
        Добро пожаловать, {username}!  
      </h1>  

      {/* Карточка с количеством тренировок */}  
      <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-sm flex flex-col items-center mb-4 animate-fadeIn">  
        <img  
          src="/assets/athlete.png"  
          alt="Атлет"  
          className="w-24 h-24 mb-4"  
        />  
        <p className="text-lg font-semibold">За все время Вы сделали:</p>  
        <p className="text-2xl font-bold text-blue-500">{workoutCount} упражнения(-й)</p>  
      </div>  

      {/* Блок с максимальным и минимальным весом */}  
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">  
        {/* Максимальный вес */}  
        <div className="bg-white shadow-md rounded-lg p-4 flex-1 flex flex-col items-center animate-fadeIn">  
          <img  
            src="/assets/barbell.png"  
            alt="Штанга"  
            className="w-24 h-24 mb-4"  
          />  
          <p className="text-lg font-semibold text-center">Максимальный вес в упражнении:</p>  
          <p className="text-2xl font-bold text-green-500">{highestWeight} кг</p>  
        </div>  

        {/* Минимальный вес */}  
        <div className="bg-white shadow-md rounded-lg p-4 flex-1 flex flex-col items-center animate-fadeIn">  
          <img  
            src="/assets/skinny.png"  
            alt="Худой человек"  
            className="w-24 h-24 mb-4"  
          />  
          <p className="text-lg font-semibold text-center">Минимальный вес в упражнении:</p>  
          <p className="text-2xl font-bold text-red-500">{lowestWeight} кг</p>  
        </div>  
      </div>  

      {/* Рекомендация */}  
      {lowestWeight < 50 && (  
        <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-sm mt-6 animate-fadeIn">  
          <img  
            src="/assets/motivation.png"  
            alt="Мотивация"  
            className="w-24 h-24 mx-auto mb-4"  
          />  
          <p className="text-lg font-semibold text-center text-gray-700">  
            Рекомендуем усилить акцент на эту группу мышц:  
          </p>  
          <p className="text-center text-red-500 font-bold mt-2 text-center">  
            Минимальный вес в упражнении: <br/> {lowestWeight} кг  
          </p>  
        </div>  
      )}  
    </div>  
  );  
};  

export default Account;