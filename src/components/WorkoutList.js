import React from 'react';  
import WorkoutGroup from './WorkoutGroup';  

const WorkoutList = ({ groupedWorkouts, onRemove }) => {  
  return (  
    <div className="workout-list">  
      {groupedWorkouts.map(([date, workouts]) => (  
        <WorkoutGroup  
          key={date}  
          date={date}  
          workouts={workouts}  
          onRemoveWorkout={onRemove}  
        />  
      ))}  
    </div>  
  );  
};  

export default WorkoutList;