import React from 'react';  
import WorkoutGroup from './WorkoutGroup';  

const WorkoutList = ({ workouts, onRemove }) => {  
  const workoutsByDate = workouts.reduce((groups, workout) => {  
    if (!groups[workout.date]) {  
      groups[workout.date] = [];  
    }  
    groups[workout.date].push(workout);  
    return groups;  
  }, {});  

  return (  
    <div className="workout-list">  
      {Object.entries(workoutsByDate).map(([date, workouts]) => (  
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