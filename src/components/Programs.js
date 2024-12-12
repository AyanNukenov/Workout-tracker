import React from "react";  

function Programs({ setActivePage }) {  
  // Список тренировок  
  const programs = [  
    {  
        id: 1,  
        title: 'Набор массы для мужчин',  
        description: 'Программа тренировок для набора мышечной массы.',  
        page: 'massGainProgram', // Указываем страницу 
    },  
    {  
      id: 2,  
      title: "Набор массы для женщин",  
      description: "Программа тренировок для набора мышечной массы.",  
      gender: "female",  
      goal: "mass",  
    },  
    {  
      id: 3,  
      title: "Похудение для мужчин",  
      description: "Программа тренировок для снижения веса.",  
      gender: "male",  
      goal: "weight_loss",  
    },  
    {  
      id: 4,  
      title: "Похудение для женщин",  
      description: "Программа тренировок для снижения веса.",  
      gender: "female",  
      goal: "weight_loss",  
    },  
    {  
      id: 5,  
      title: "Набор силы для мужчин",  
      description: "Программа тренировок для увеличения силы.",  
      gender: "male",  
      goal: "strength",  
    },  
    {  
      id: 6,  
      title: "Набор силы для женщин",  
      description: "Программа тренировок для увеличения силы.",  
      gender: "female",  
      goal: "strength",  
    },  
  ];  

  return (  
    <div className="p-4">  
      <h1 className="text-2xl font-bold mb-4">Программы тренировок</h1>  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">  
        {programs.map((program) => (  
          <div  
            key={program.id}  
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition mb-4 text-center"  
          >  
            <h2 className="text-xl font-bold mb-2">{program.title}</h2>  
            <p className="text-gray-600">{program.description}</p>  
            <button  
              onClick={() => setActivePage(program.page)} // Переход на новую страницу  
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded"  
            >  
              Показать  
            </button>  
          </div>  
        ))}  
      </div>  
    </div>  
  );  
}  

export default Programs;