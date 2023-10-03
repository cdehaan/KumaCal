import React from 'react';

function ActivityDisplay({ data }) {
  if (!data) return <div>None</div>;

  return (
    <div>
         {data.sleep && data.sleep.length > 0 && (
          <div>
            <h4>Sleep</h4>
            <ul>
              {data.sleep.map((entry, index) => (
                <li key={index}>
                  {entry.snipit}
                </li>
              ))}
            </ul>
          </div>
        )}
        {data.food && data.food.length > 0 && (
          <div>
            <h4>Food</h4>
            <ul>
              {data.food.map((entry, index) => (
                <li key={index}>
                  {entry.snipit}
                </li>
              ))}
            </ul>
          </div>
        )}
        {data.outside && data.outside.length > 0 && (
          <div>
            <h4>Outside</h4>
            <ul>
              {data.outside.map((entry, index) => (
                <li key={index}>
                  {entry.snipit}
                </li>
              ))}
            </ul>
          </div>
        )}
        {data.exercise && data.exercise.length > 0 && (
          <div>
            <h4>Exercise</h4>
            <ul>
              {data.exercise.map((entry, index) => (
                <li key={index}>
                  {entry.snipit}
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
}

export default ActivityDisplay;
