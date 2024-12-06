import React, { useEffect, useState } from "react";  
import { motion } from "framer-motion"; // Для анимаций  
import { Dumbbell, Award, Smile } from "lucide-react"; // Заменили Barbell на Dumbbell  

const Account = ({ username }) => {  
  const [workoutCount, setWorkoutCount] = useState(0);  
  const [highestWeight, setHighestWeight] = useState(0);  
  const [lowestWeight, setLowestWeight] = useState(0);  

  useEffect(() => {  
    // Загружаем данные тренировок из localStorage  
    const workouts =  
      JSON.parse(  
        localStorage.getItem(  
          `workouts_${username}_${localStorage.getItem("currentPassword")}`  
        )  
      ) || [];  
    setWorkoutCount(workouts.length);  

    if (workouts.length > 0) {  
      const weights = workouts.map((workout) => workout.weight || 0);  
      setHighestWeight(Math.max(...weights));  
      setLowestWeight(Math.min(...weights));  
    }  
  }, [username]);  

  return (  
    <div className="bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 min-h-screen p-6 flex flex-col items-center text-white rounded-lg">  
      {/* Приветствие */}  
      <motion.h1  
        className="text-2xl font-bold mb-8 text-center"  
        initial={{ opacity: 0, y: -30 }}  
        animate={{ opacity: 1, y: 0 }}  
        transition={{ duration: 0.8 }}  
      >  
        Добро пожаловать, {username}!  
      </motion.h1>  

      {/* Карточка с количеством тренировок */}  
      <motion.div  
        className="bg-white text-black shadow-lg rounded-xl p-6 w-full max-w-sm flex flex-col items-center mb-6 hover:shadow-2xl transition-shadow duration-300"  
        initial={{ opacity: 0, scale: 0.9 }}  
        animate={{ opacity: 1, scale: 1 }}  
        transition={{ duration: 0.8 }}  
      >  
        <Smile className="text-blue-500 w-16 h-16 mb-4" />  
        <p className="text-lg font-semibold">За все время Вы сделали:</p>  
        <p className="text-2xl font-bold text-blue-600 text-center">{workoutCount} <br/> упражнения(-й)</p>  
      </motion.div>  

      {/* Блок с максимальным и минимальным весом */}  
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">  
        {/* Максимальный вес */}  
        <motion.div  
          className="bg-white text-black shadow-lg rounded-xl p-6 flex-1 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300"  
          initial={{ opacity: 0, x: -50 }}  
          animate={{ opacity: 1, x: 0 }}  
          transition={{ duration: 0.8 }}  
        >  
          <Dumbbell className="text-green-500 w-16 h-16 mb-4" />  
          <p className="text-lg font-semibold text-center">Максимальный вес в упражнении:</p>  
          <p className="text-2xl font-bold text-green-600">{highestWeight} кг</p>  
        </motion.div>  

        {/* Минимальный вес */}  
        <motion.div  
          className="bg-white text-black shadow-lg rounded-xl p-6 flex-1 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300"  
          initial={{ opacity: 0, x: 50 }}  
          animate={{ opacity: 1, x: 0 }}  
          transition={{ duration: 0.8 }}  
        >  
          <Dumbbell className="text-red-500 w-16 h-16 mb-4" />  
          <p className="text-lg font-semibold text-center">Минимальный вес в упражнении:</p>  
          <p className="text-2xl font-bold text-red-600">{lowestWeight} кг</p>  
        </motion.div>  
      </div>  

      {/* Рекомендация */}  
      {lowestWeight < 50 && (  
        <motion.div  
          className="bg-white text-black shadow-lg rounded-xl p-6 w-full max-w-sm mt-8 hover:shadow-2xl transition-shadow duration-300"  
          initial={{ opacity: 0, y: 30 }}  
          animate={{ opacity: 1, y: 0 }}  
          transition={{ duration: 0.8 }}  
        >  
          <Award className="text-yellow-500 w-16 h-16 mx-auto mb-4" />  
          <p className="text-lg font-semibold text-center text-gray-700">  
            Рекомендуем усилить акцент на эту группу мышц:  
          </p>  
          <p className="text-center text-red-500 font-bold mt-2">  
            Минимальный вес в упражнении: <br /> {lowestWeight} кг  
          </p>  
        </motion.div>  
      )}  
    </div>  
  );  
};  

export default Account;