import React from 'react';  
import WorkoutItem from './WorkoutItem';  

const WorkoutList = ({ workouts, onRemove }) => {  
  return (  
    <div className="workout-list">  
      {workouts.length === 0 ? (  
        <p>Нет добавленных тренировок</p>  
      ) : (  
        workouts.map((workout, index) => (  
          <WorkoutItem key={index} workout={workout} onRemove={()=> onRemove(index)} />  
        ))  
      )}  
    </div>  
  );  
};  

export default WorkoutList;