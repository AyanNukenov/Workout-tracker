import React, { useState } from "react";  

const exerciseList = [  
"Армейский жим",
"Бицепс на скамье Скотта",
"Бицепс с гантелями стоя",
"Велосипед",
"Выпады с гантелями",
"Гиперэкстензия",
"Жим гантелей на наклонной скамье",
"Жим гантелей сидя",
"Жим ногами в тренажере",
"Жим узким хватом",
"Жим штанги лежа",
"Жим штанги стоя с груди",
"Комплекс махов Жаника на плечи",
"Махи гантелями в стороны",
"Мельница с гирей",
"Мостик",
"Обратные разведения рук в тренажере",
"Отжимания на брусьях",
"Отжимания от скамьи",
"Подтягивания",
"Подъем гантелей на бицепс в скамье Скотта",
"Подъем гантелей на бицепс стоя",
"Подъем гантелей перед собой",
"Подъем штанги на бицепс",
"Приседания в тренажере Смита",
"Приседания со штангой",
"Приседания со штангой на груди в Смите",
"Приседания со штангой на плечах",
"Приседание",
"Разгибания ног",
"Разгибание ног в тренажере",
"Разгибание рук на блоке",
"Разводка гантелей на горизонтальной скамье",
"Сведения рук в кроссовере на верх груди",
"Сведения рук в кроссовере на середину груди",
"Сведения рук в кроссовере на низ груди",
"Скручивания с верхнего блока",
"Тяга верхнего блока",
"Тяга штанги в наклоне",
"Тяга штанги в наклоне обратным хватом",
"Тяга штанги к подбородку",
"Французский жим",
"Шраги со штангой",
  // Добавьте больше упражнений  
];  

export default function ExerciseInput({ exercise, setExercise }) {  
  const [suggestions, setSuggestions] = useState([]);  

  const handleChange = (e) => {  
    const value = e.target.value;  
    setExercise(value);  

    if (value.length > 0) {  
      const filteredSuggestions = exerciseList.filter((exercise) =>  
        exercise.toLowerCase().includes(value.toLowerCase())  
      );  
      setSuggestions(filteredSuggestions);  
    } else {  
      setSuggestions([]);  
    }  
  };  

  const handleSuggestionClick = (suggestion) => {  
    setExercise(suggestion);  
    setSuggestions([]);  
  };  

  return (  
    <div className="relative w-full max-w-xs mx-auto">  
      <input  
        type="text"  
        placeholder="Упражнение"  
        value={exercise}  
        onChange={handleChange}  
        className="input border p-2 rounded w-full"  
        style={{ width: '400px' }} 
      />  
      {suggestions.length > 0 && (  
        <ul className="absolute border border-gray-300 bg-white rounded-md mt-1 w-full z-10"
        style={{ maxHeight: '200px', overflowY: 'auto' }} >  
          {suggestions.map((suggestion, index) => (  
            <li  
              key={index}  
              onClick={() => handleSuggestionClick(suggestion)}  
              className="p-2 hover:bg-gray-200 cursor-pointer"  
            >  
              {suggestion}  
            </li>  
          ))}  
        </ul>  
      )}  
    </div>  
  );  
}



