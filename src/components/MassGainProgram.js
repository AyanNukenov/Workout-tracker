import React, { useState } from "react";  
import { FaRunning, FaDumbbell, FaWeight } from "react-icons/fa";  
import gainPrograms from "./gainprograms.json"; // Импортируем JSON-файл  

function MassGainProgram() {  
  const [bodyType, setBodyType] = useState("ectomorph"); // По умолчанию эктоморф  

  const program = gainPrograms[bodyType]; // Получаем данные для текущего типа телосложения  

  return (  
    <div className="p-4 bg-gray-100 min-h-screen">  
      {/* Заголовок */}  
      <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-6">  
        Набор массы для мужчин  
      </h1>  

      {/* Кастомный переключатель */}  
      <div className="mb-6 px-4">  
        <label className="block text-lg font-semibold text-gray-800 mb-4 text-center">  
          Выберите тип телосложения:  
        </label>  
        <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">  
          {/* Эктоморф */}  
          <button  
            onClick={() => setBodyType("ectomorph")}  
            className={`flex items-center px-4 py-2 rounded-lg border ${  
              bodyType === "ectomorph"  
                ? "bg-blue-600 text-black border-blue-600"  
                : "bg-white text-gray-700 border-gray-300"  
            } hover:bg-blue-500 hover:text-black transition-all duration-300 w-full sm:w-auto`}  
          >  
            <FaRunning className="text-xl mr-2" />  
            <span>Эктоморф</span>  
          </button>  

          {/* Мезоморф */}  
          <button  
            onClick={() => setBodyType("mesomorph")}  
            className={`flex items-center px-4 py-2 rounded-lg border ${  
              bodyType === "mesomorph"  
                ? "bg-blue-600 text-black border-blue-600"  
                : "bg-white text-gray-700 border-gray-300"  
            } hover:bg-blue-500 hover:text-black transition-all duration-300 w-full sm:w-auto`}  
          >  
            <FaDumbbell className="text-xl mr-2" />  
            <span>Мезоморф</span>  
          </button>  

          {/* Эндоморф */}  
          <button  
            onClick={() => setBodyType("endomorph")}  
            className={`flex items-center px-4 py-2 rounded-lg border ${  
              bodyType === "endomorph"  
                ? "bg-blue-600 text-black border-blue-600"  
                : "bg-white text-gray-700 border-gray-300"  
            } hover:bg-blue-500 hover:text-black transition-all duration-300 w-full sm:w-auto`}  
          >  
            <FaWeight className="text-xl mr-2" />  
            <span>Эндоморф</span>  
          </button>  
        </div>  
      </div>  

      {/* Отображение программы тренировок */}  
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">  
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">  
          {program.title}  
        </h2>  
        <p className="text-base sm:text-sm leading-relaxed text-justify mb-4">  
          {program.description}  
        </p>  

        {/* Рацион питания */}  
        <h3 className="text-lg font-bold text-gray-800 mb-2">Рацион питания:</h3>  
        <ul className="list-disc pl-5 space-y-2">  
          {program.nutrition.map((item, index) => (  
            <li key={index} className="text-gray-700 text-base">{item}</li>  
          ))}  
        </ul>  

        {/* Рекомендуемые анализы */}  
        <h3 className="text-lg font-bold text-gray-800 mb-2 mt-4">Рекомендуемые анализы:</h3>  
        <ul className="list-disc pl-5 space-y-2">  
          {program.healthCheck.map((item, index) => (  
            <li key={index} className="text-gray-700 text-base">{item}</li>  
          ))}  
        </ul>  

        {/* Программа тренировок */}  
        <h3 className="text-lg font-bold text-gray-800 mb-2 mt-4">Программа тренировок:</h3>  
        <div className="space-y-4">  
          {program.workout.map((day, index) => (  
            <div key={index}>  
              <h4 className="font-semibold text-gray-800">{day.day}:</h4>  
              <ul className="list-disc pl-5 space-y-1">  
                {day.exercises.map((exercise, i) => (  
                  <li key={i} className="text-gray-700 text-base">{exercise}</li>  
                ))}  
              </ul>  
            </div>  
          ))}  
        </div>  

        {/* Полезные ресурсы */}  
        <h3 className="text-lg font-bold text-gray-800 mb-2 mt-4">Полезные ресурсы:</h3>  
        <ul className="list-disc pl-5 space-y-2">  
          {program.resources.map((resource, index) => (  
            <li key={index} className="text-gray-700 text-base">  
              <a  
                href={resource.link}  
                target="_blank"  
                rel="noopener noreferrer"  
                className="text-blue-500 underline"  
              >  
                {resource.name}  
              </a>  
            </li>  
          ))}  
        </ul>  
      </div>  
    </div>  
  );  
}  

export default MassGainProgram;