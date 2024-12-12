import React, { useState } from 'react';  
import { FaRunning, FaDumbbell, FaWeight } from 'react-icons/fa';  

function MassGainProgram() {  
  const [bodyType, setBodyType] = useState('ectomorph'); // По умолчанию эктоморф  

  const programs = {  
    ectomorph: {  
      title: 'Рекомендуемая программа для эктоморфа (вес < 65 кг)',  
      description: [  
        <span><strong>Понедельник:</strong> Становая тяга, жим лежа, подтягивания.</span>,  
        <span><strong>Среда:</strong> Приседания, жим на наклонной скамье, тяга штанги в наклоне.</span>,  
        <span><strong>Пятница:</strong>Румынская тяга, армейский жим, выпады.</span>,  
      ],  
    },  
    mesomorph: {  
      title: 'Рекомендуемая программа для мезоморфа (вес 65-85 кг)',  
      description: [  
        <span><strong>Понедельник:</strong> Приседания, жим лежа, тяга штанги в наклоне.</span>,  
        <span><strong>Среда:</strong>Становая тяга, подтягивания, жим на наклонной скамье.</span>,  
        <span><strong>Пятница:</strong>Выпады, армейский жим, гиперэкстензии.</span>,  
      ],  
    },  
    endomorph: {  
      title: 'Рекомендуемая программа для эндоморфа (вес > 85 кг)',  
      description: [  
        <span><strong>Понедельник:</strong> Приседания, жим лежа, тяга блока к груди.</span>,  
        <span><strong>Среда:</strong> Становая тяга, жим на наклонной скамье, тяга гантелей в наклоне.</span>,  
        <span><strong>Пятница:</strong> Кардио (30 минут), армейский жим, гиперэкстензии.</span>,  
      ],  
    },  
  };  

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
    onClick={() => setBodyType('ectomorph')}  
    className={`flex items-center mr-3 px-4 py-2 rounded-lg border ${  
      bodyType === 'ectomorph'  
        ? 'bg-blue-600 text-black border-blue-600'  
        : 'bg-white text-gray-700 border-gray-300'  
    } hover:bg-blue-500 hover:text-black transition-all duration-300 w-full sm:w-auto`}  
  >  
    <FaRunning className="text-xl" />  
    <span>Эктоморф</span>  
  </button>  

  {/* Мезоморф */}  
  <button  
    onClick={() => setBodyType('mesomorph')}  
    className={`flex items-center mr-3 text-center px-4 py-2 rounded-lg border ${  
      bodyType === 'mesomorph'  
        ? 'bg-blue-600 text-black border-blue-600'  
        : 'bg-white text-gray-700 border-gray-300'  
    } hover:bg-blue-500 hover:text-white transition-all duration-300 w-full sm:w-auto`}  
  >  
    <FaDumbbell className="text-xl mr-3" />  
    <span>Мезоморф</span>  
  </button>  

  {/* Эндоморф */}  
  <button  
    onClick={() => setBodyType('endomorph')}  
    className={`flex items-center space-x-3 px-4 py-2 rounded-lg border ${  
      bodyType === 'endomorph'  
        ? 'bg-blue-600 text-black border-blue-600'  
        : 'bg-white text-gray-700 border-gray-300'  
    } hover:bg-blue-500 hover:text-white transition-all duration-300 w-full sm:w-auto`}  
  >  
    <FaWeight className="text-xl" />  
    <span>Эндоморф</span>  
  </button>  
</div> 
      </div>  

      {/* Отображение программы тренировок */}  
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">  
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">  
          {programs[bodyType].title}  
        </h2>  
        <ul className="list-disc pl-5 space-y-2 text-center">  
          {programs[bodyType].description.map((item, index) => (  
            <li key={index} className="text-gray-700 text-lg">  
              {item}  
            </li>  
          ))}  
        </ul>  
      </div>  
    </div>  
  );  
}  

export default MassGainProgram;