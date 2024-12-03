import React, { useState, useRef, useEffect } from "react";  

const exerciseList = [  
  "Армейский жим",  
  "Бицепс на скамье Скотта",  
  "Бицепс с гантелями стоя",  
  "Бицепс со штангой стоя",  
  "Велосипед",  
  "Выпады с гантелями",  
  "Гиперэкстензия",  
  "Жим гантелей на наклонной скамье",  
  "Жим гантелей на горизонтальной скамье",  
  "Жим гантелей сидя",  
  "Жим ногами в тренажере",  
  "Жим узким хватом",  
  "Жим штанги лежа",  
  "Жим штанги лежа на наклонной скамье",  
  "Жим штанги стоя с груди",  
  "Комплекс махов Жаника на плечи",  
  "Комплекс планок",  
  "Махи гантелями в стороны",  
  "Мельница с гирей",  
  "Мостик",  
  "Молотки",  
  "Молотки на скамье Скотта",  
  "Обратные разведения рук в тренажере",  
  "Отжимания на брусьях",  
  "Отжимания от скамьи",  
  "Подтягивания",  
  "Подтягивания в гравитроне",  
  "Подъем гантелей на бицепс на скамье Скотта",  
  "Подъем гантелей на бицепс стоя",  
  "Подъем гантелей перед собой",  
  "Подъем на носки стоя",  
  "Подъем на носки в тренажере",  
  "Подъем на платформу с гантелями",  
  "Подъем штанги на бицепс",  
  "Подъем штанги на брахиалис",  
  "Пуловер",  
  "Приседания в тренажере Смита",  
  "Приседания со штангой",  
  "Приседания со штангой на груди в Смите",  
  "Приседания со штангой на плечах",  
  "Приседание",  
  "Разгибания ног",  
  "Разгибание ног в тренажере",  
  "Разгибание рук на блоке",  
  "Разводка гантелей на горизонтальной скамье",  
  "Румынская тяга",  
  "Сведения рук в кроссовере на верх груди",  
  "Сведения рук в кроссовере на середину груди",  
  "Сведения рук в кроссовере на низ груди",  
  "Сгибание ног в тренажере",  
  "Скручивания с верхнего блока",  
  "Становая тяга",  
  "Тяга верхнего блока",  
  "Тяга канатной рукояти на задние дельты",  
  "Тяга штанги в наклоне",  
  "Тяга штанги в наклоне в тренажере",  
  "Тяга штанги в наклоне обратным хватом",  
  "Тяга штанги к подбородку",  
  "Французский жим",  
  "Шраги со штангой",  
  // Добавьте больше упражнений  
];  

export default function ExerciseInput({ exercise, setExercise }) {  
  const [suggestions, setSuggestions] = useState([]);  
  const [isSuggestionSelected, setIsSuggestionSelected] = useState(false); // Флаг для отслеживания выбора из списка  
  const inputRef = useRef(null); // Для отслеживания кликов вне компонента 

  const handleChange = (e) => {  
    const value = e.target.value;  
    setExercise(value); // Устанавливаем введенное значение  
    setIsSuggestionSelected(false); // Сбрасываем флаг выбора  

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
    setExercise(suggestion); // Устанавливаем выбранное упражнение  
    setSuggestions([]); // Очищаем подсказки  
    setIsSuggestionSelected(true); // Устанавливаем флаг выбора  
  };  

  // Закрытие списка при клике вне компонента  
  const handleClickOutside = (e) => {  
    if (inputRef.current && !inputRef.current.contains(e.target)) {  
      setSuggestions([]); // Закрываем список  
    }  
  };

  // Добавляем и удаляем обработчик кликов вне компонента  
  useEffect(() => {  
    document.addEventListener("mousedown", handleClickOutside);  
    return () => {  
      document.removeEventListener("mousedown", handleClickOutside);  
    };  
  }, []);

  const handleBlur = () => {  
    // Если пользователь ввел текст, но не выбрал из списка  
    if (!isSuggestionSelected && exercise.trim() === "") {  
      setExercise(""); // Сбрасываем поле, если ничего не введено  
      setSuggestions([]); // Очищаем подсказки  
    }  
  };  

  return (  
    <div className="relative w-full max-w-xs mx-auto" ref={inputRef} >  
      <input  
        type="text"  
        placeholder="Упражнение"  
        value={exercise}  
        onChange={handleChange}  
        onBlur={handleBlur} // Проверяем ввод при потере фокуса  
        className="input border p-2 rounded w-full"  
        style={{ width: "400px" }}  
      />  
      {suggestions.length > 0 && (  
        <ul  
          className="absolute border border-gray-300 bg-white rounded-md mt-1 w-full z-10"  
          style={{ maxHeight: "200px", overflowY: "auto" }}  
        >  
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