import React, { useState } from "react";  
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";  
import ExerciseInput from "./ExerciseInput";  
import { format, subMonths, isWithinInterval, parseISO } from "date-fns";  
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"; // Импорт библиотеки 

const Statistics = ({ workouts, onBack }) => {  
  const [selectedExercise, setSelectedExercise] = useState("");  
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);  
  const [timePeriod, setTimePeriod] = useState("month"); // Default period: month  
  const [customStartDate, setCustomStartDate] = useState(""); // Начальная дата для произвольного периода  
  const [customEndDate, setCustomEndDate] = useState(""); // Конечная дата для произвольного периода  

  // Фильтрация тренировок по выбранному периоду  
  const filterWorkoutsByPeriod = (exercise, period) => {  
    console.log("Фильтрация началась:", { exercise, period });

    const now = new Date();  
    let startDate;  

    if (period === "custom") {  
      // Если выбран произвольный период, используем введенные даты  
      if (!customStartDate || !customEndDate) {  
        alert("Пожалуйста, выберите начальную и конечную дату.");  
        return;  
      }  
      startDate = parseISO(customStartDate);  
      const endDate = parseISO(customEndDate);  

      console.log("Произвольный период:", { startDate, endDate });  

      const filtered = workouts.filter(  
        (workout) =>  
          workout.exercise === exercise &&  
          isWithinInterval(parseISO(workout.date), { start: startDate, end: endDate })
            
      );  

      
      setFilteredWorkouts(filtered);  
      return;  
    }  

    // Предустановленные периоды  
    switch (period) {  
      case "month":  
        startDate = subMonths(now, 1);  
        break;  
      case "threeMonths":  
        startDate = subMonths(now, 3);  
        break;  
      case "sixMonths":  
        startDate = subMonths(now, 6);  
        break;  
      case "year":  
        startDate = subMonths(now, 12);  
        break;  
      default:  
        startDate = new Date(0); // Если выбран произвольный период, берем все данные  
    }  

    const filtered = workouts.filter(  
      (workout) =>  
        workout.exercise === exercise &&  
        isWithinInterval(parseISO(workout.date), { start: startDate, end: now })  
    );  

    console.log("Отфильтрованные тренировки:", filtered);  
    setFilteredWorkouts(filtered);  
  };  

  // Обработка выбора упражнения  
  const handleExerciseSelect = (exercise) => {  
    console.log("Выбранное упражнение:", selectedExercise);  
    console.log("Список упражнений в тренировках:", workouts.map(workout => workout.exercise));
    setSelectedExercise(exercise);  
  };  

  // Обработка выбора периода  
  const handlePeriodChange = (period) => {  
    setTimePeriod(period);  
  };  

  // Обработка нажатия кнопки "Создать отчет"  
  const handleCreateReport = () => {  
    if (!selectedExercise) {  
      alert("Пожалуйста, выберите упражнение.");  
      return;  
    }  

    // Если выбран произвольный период, проверяем даты  
    if (timePeriod === "custom") {  
        if (!customStartDate || !customEndDate) {  
        alert("Пожалуйста, выберите начальную и конечную дату.");  
        return;  
        }  
    }  

    // Создаем отчет с названием упражнения  
    // const report = {  
    // name: selectedExercise, // Название отчета = название упражнения  
    // data: filteredWorkouts, // Данные для отчета  
    // };  

    // Сохраняем отчет (например, в локальном состоянии или локальном хранилище)  
    // saveReport(report);

    filterWorkoutsByPeriod(selectedExercise, timePeriod);  
  };  

  // Данные для диаграммы  
  const chartData = filteredWorkouts.map((workout) => ({  
    date: format(parseISO(workout.date), "dd.MM.yyyy"),  
    вес: workout.weight,  
  }));  

  console.log("Данные для диаграммы:", chartData);  

  return (  
    <div className="statistics-container p-4 flex flex-col items-center text-center gap-4">  
      

      {/* Выбор упражнения */}  
      <ExerciseInput exercise={selectedExercise} setExercise={handleExerciseSelect} />  

      {/* Выбор периода */}  
      <div className="time-period-buttons flex text-center items-center gap-2 mt-4">  
        <button  
          className={`px-4 py-2 rounded ${timePeriod === "month" ? "bg-blue-500 text-white" : "bg-gray-200"}`}  
          onClick={() => handlePeriodChange("month")}  
        >  
          Месяц  
        </button>  
        <button  
          className={`px-4 py-2 rounded ${timePeriod === "threeMonths" ? "bg-blue-500 text-white" : "bg-gray-200"}`}  
          onClick={() => handlePeriodChange("threeMonths")}  
        >  
          Три месяца  
        </button>  
        <button  
          className={`px-4 py-2 rounded ${timePeriod === "sixMonths" ? "bg-blue-500 text-white" : "bg-gray-200"}`}  
          onClick={() => handlePeriodChange("sixMonths")}  
        >  
          Полгода  
        </button>  
        <button  
          className={`px-4 py-2 rounded ${timePeriod === "year" ? "bg-blue-500 text-white" : "bg-gray-200"}`}  
          onClick={() => handlePeriodChange("year")}  
        >  
          Год  
        </button>  
        <button  
          className={`px-4 py-2 rounded ${timePeriod === "custom" ? "bg-blue-500 text-white" : "bg-gray-200"}`}  
          onClick={() => handlePeriodChange("custom")}  
        >  
          Задать период  
        </button>  
      </div>  

        {/* Поля для произвольного периода */}  
        {timePeriod === "custom" && (  
        <div className="custom-period-inputs mt-4 flex gap-4">  
          <div>  
            <label className="block text-gray-700">Начальная дата:</label>  
            <input  
              type="date"  
              className="border rounded px-2 py-1"  
              value={customStartDate}  
              onChange={(e) => setCustomStartDate(e.target.value)}  
            />  
          </div>  
          <div>  
            <label className="block text-gray-700">Конечная дата:</label>  
            <input  
              type="date"  
              className="border rounded px-2 py-1"  
              value={customEndDate}  
              onChange={(e) => setCustomEndDate(e.target.value)}  
            />  
          </div>  
        </div>  
      )}  

      {/* Кнопка "Создать отчет" */}  
      <button  
        className="add-recharts bg-blue-500 text-white px-4 py-2 rounded mt-4"  
        onClick={handleCreateReport}  
      >  
        Создать отчет  
      </button>  

      {/* Отображение статистики */}  
      {filteredWorkouts.length === 0 ? (  
        <p className="mt-4 text-gray-500">Нет данных для отображения статистики.</p>  
      ) : (  
        <div className="chart-container mt-4" style={{  
          width: "100%",  
          height: "400px",  
          overflow: "hidden", 
          position: "relative",  
        }}  >  
        <TransformWrapper  
            initialScale={1}   
            minScale={0.5}  
            maxScale={3}  
            centerOnInit={true}  
            > 
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (   
               <TransformComponent>  
                <div style={{ width: "420px", height: "100%" }}>  
                  <h2 className="text-lg font-bold mb-2 text-center">{selectedExercise}</h2>  
                  <ResponsiveContainer width="100%" height={350}>  
                    <LineChart data={chartData}>  
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>  
                    <XAxis dataKey="date" stroke="#61dafb"/>  
                    <YAxis stroke="#61dafb" domain={[0, 'dataMax + 10']} />   
                    <Tooltip />  
                    <Line type="monotone" dataKey="вес" stroke="#8884d8" />  
                    </LineChart>  
                  </ResponsiveContainer>  
                </div> 
               </TransformComponent>   
            )}   
           </TransformWrapper>   
        </div>  
      )}  
    </div>  
  );  
};  

export default Statistics;  