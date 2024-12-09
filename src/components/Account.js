import React, { useEffect, useState } from "react";  
import { motion } from "framer-motion"; // Для анимаций  
import { Dumbbell, Award, Smile } from "lucide-react"; // Заменили Barbell на Dumbbell  
import Modal from "./Modal.js";  

const Account = ({ username }) => {  
  const [workoutCount, setWorkoutCount] = useState(0);  
  const [highestWeight, setHighestWeight] = useState(0);  
  const [lowestWeightValue, setLowestWeightValue] = useState(0);  
  const [lowestWeightExercise, setLowestWeightExercise] = useState(""); 

  // Состояния для модальных окон  
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);  
  const [isMaxWeightModalOpen, setIsMaxWeightModalOpen] = useState(false);  
  const [isMinWeightModalOpen, setIsMinWeightModalOpen] = useState(false);  
  const [isRecommendationModalOpen, setIsRecommendationModalOpen] = useState(false);  

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
     // Находим максимальный вес и соответствующее упражнение  
    const maxWorkout = workouts.reduce((max, workout) =>  
      workout.weight > max.weight ? workout : max  
    );  
    setHighestWeight(`${maxWorkout.exercise} ${maxWorkout.weight}`);  

    // Находим минимальный вес и соответствующее упражнение  
    const minWorkout = workouts.reduce((min, workout) =>  
      workout.weight < min.weight ? workout : min  
    );  
    setLowestWeightValue(minWorkout.weight); // Устанавливаем числовое значение  
    setLowestWeightExercise(minWorkout.exercise); // Устанавливаем название упражнения 
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
        onClick={() => setIsWorkoutModalOpen(true)} // Открываем модальное окно  
      >  
        <Smile className="text-blue-500 w-16 h-16 mb-4" />  
        <p className="text-lg font-semibold text-center">  
          За все время <br /> Вы сделали:  
        </p>  
        <p className="text-lg font-bold text-blue-600 text-center">  
          {workoutCount} <br /> упражнения(-й)  
        </p>  
      </motion.div>  

      {/* Блок с максимальным и минимальным весом */}  
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">  
        {/* Максимальный вес */}  
        <motion.div  
          className="bg-white text-black shadow-lg rounded-xl p-6 flex-1 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300 cursor-pointer"  
          initial={{ opacity: 0, x: -50 }}  
          animate={{ opacity: 1, x: 0 }}  
          transition={{ duration: 0.8 }}  
          onClick={() => setIsMaxWeightModalOpen(true)} // Открываем модальное окно  
        >  
          <Dumbbell className="text-green-500 w-16 h-16 mb-4" />  
          <p className="text-lg font-semibold text-center">  
            Максимальный вес в упражнении:  
          </p>  
          <p className="text-lg font-bold text-green-600 text-center">{highestWeight} кг</p>  
        </motion.div>  

        {/* Минимальный вес */}  
        <motion.div  
          className="bg-white text-black shadow-lg rounded-xl p-6 flex-1 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300 cursor-pointer"  
          initial={{ opacity: 0, x: 50 }}  
          animate={{ opacity: 1, x: 0 }}  
          transition={{ duration: 0.8 }}  
          onClick={() => setIsMinWeightModalOpen(true)} // Открываем модальное окно  
        >  
          <Dumbbell className="text-red-500 w-16 h-16 mb-4" />  
          <p className="text-lg font-semibold text-center">  
            Минимальный вес в упражнении:  
          </p>  
          <p className="text-lg font-bold text-red-600 text-center">{lowestWeightExercise} {lowestWeightValue} кг</p>  
        </motion.div>  
      </div>  

      {/* Рекомендация */}  
      {lowestWeightValue < 50 && (  
        <motion.div  
          className="bg-white text-black shadow-lg rounded-xl p-6 w-full max-w-sm mt-8 hover:shadow-2xl transition-shadow duration-300 cursor-pointer"  
          initial={{ opacity: 0, y: 30 }}  
          animate={{ opacity: 1, y: 0 }}  
          transition={{ duration: 0.8 }}  
          onClick={() => setIsRecommendationModalOpen(true)} // Открываем модальное окно  
        >  
          <Award className="text-yellow-500 w-16 h-16 mx-auto mb-4" />  
          <p className="text-lg font-semibold text-center text-gray-700">  
            Рекомендуем усилить акцент:  
          </p>  
          <p className="text-center text-red-500 font-bold mt-2">  
             {lowestWeightExercise} {lowestWeightValue} кг  
          </p>  
        </motion.div>  
      )}  

      {/* Модальные окна */}  
      <Modal isOpen={isWorkoutModalOpen} onClose={() => setIsWorkoutModalOpen(false)}>  
        <img  
          src="/assets/athlete.png"  
          alt="Athlete"  
          className="w-32 h-32 mx-auto mb-4"  
        />  
        <h2 className="text-xl font-bold text-gray-800 mb-2">  
          Ты сможешь сделать себя лучше!  
        </h2>  
        <p className="text-gray-600">  
          <strong>Не ленись!</strong>  
        </p>  
      </Modal>  

      <Modal isOpen={isMaxWeightModalOpen} onClose={() => setIsMaxWeightModalOpen(false)}>  
        <img  
          src="/assets/barbell.png"  
          alt="Barbell"  
          className="w-32 h-32 mx-auto mb-4"  
        />  
        <h2 className="text-xl font-bold text-gray-800 mb-2">Друг, ты можешь больше!</h2>  
        <p className="text-gray-600">Докажи всем!</p>  
      </Modal>  

      <Modal isOpen={isMinWeightModalOpen} onClose={() => setIsMinWeightModalOpen(false)}>  
        <img  
          src="/assets/skinny.png"  
          alt="Skinny"  
          className="w-32 h-32 mx-auto mb-4"  
        />  
        <h2 className="text-xl font-bold text-gray-800 mb-2">  
          Не расстраивайся, большие результаты еще впереди!  
        </h2>  
        <p className="text-gray-600">  
          Но только через тяжелый труд!  
        </p>  
      </Modal>  

      <Modal  
        isOpen={isRecommendationModalOpen}  
        onClose={() => setIsRecommendationModalOpen(false)}  
      >  
        <img  
          src="/assets/motivation.png"  
          alt="Motivation"  
          className="w-32 h-32 mx-auto mb-4"  
        />  
        <h2 className="text-xl font-bold text-gray-800 mb-2">  
          Нет секретного ингредиента! 
        </h2>  
        <p className="text-gray-600">Работай над собой сегодня, чтобы быть довольным завтра!</p>  
      </Modal>  
    </div>  
  );  
};  

export default Account;