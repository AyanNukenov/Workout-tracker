import React, { useState } from 'react';  
import WorkoutItem from './WorkoutItem';  

const WorkoutGroup = ({ date, workouts, onRemoveWorkout }) => {  
  const [isCollapsed, setIsCollapsed] = useState(false);  

  const toggleCollapse = () => {  
    setIsCollapsed(!isCollapsed);  
  };  

  return (  
    <div className="workout-group border mb-4 p-2">  
      <div className="flex justify-between items-center cursor-pointer" onClick={toggleCollapse}>  
        <h2 className="text-lg font-bold">{date}</h2>  
        <button className="text-sm">{isCollapsed ? '▼' : '▲'}</button>  
      </div>  
      {!isCollapsed && (  
        <div>  
          {workouts.map((workout) => (  
            <WorkoutItem  
              key={workout.id}  
              workout={workout}  
              onRemove={() => onRemoveWorkout(workout.id)}  
            />  
          ))}  
        </div>  
      )}  
    </div>  
  );  
};  

export default WorkoutGroup;