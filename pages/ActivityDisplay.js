import React from 'react';
import ActivityCircleChart from './ActivityCircleChart';
import styles from "./index.module.css";

function ActivityDisplay({ data }) {
  if (!data) return <div>None</div>;

  function AlertNotImplimented() {
    alert("Imagine a nice popup where this value can be changed.")
  }

  const sleepGoal = 8
  const outsideGoal = 2
  const exerciseGoal = 1

  function ActivityList(activityData) {
    if(!activityData || activityData.length === 0)
        return ( <ul> <li> [None] </li> </ul> )

    const list = <ul>{
        activityData.map((entry, index) => {
            const startButton = <><span>Start:</span><button onClick={AlertNotImplimented} style={{marginRight:"1rem"}}>{entry.start}</button></>
            const endButton = <><span>End:</span><button onClick={AlertNotImplimented}>{entry.end}</button><br/></>
            return (
                <li className={styles.activityEntry} key={index}>
                    {entry.description && (<><span>{entry.description.charAt(0).toUpperCase() + entry.description.slice(1)}</span></>)}
                    {entry.description && entry.start && (<br/>)}
                    {entry.start && startButton}
                    {entry.end && endButton}
                    {entry.time && (<><span> - {entry.time}</span><br/></>)}
                    {entry.snipit && !entry.description && (<><span>{entry.snipit}</span><br/></>)}
                    <button onClick={AlertNotImplimented}>Delete Activity</button>
                </li>
            )
        })
    }</ul>

    return(list)
  }

  return (
    <div>
        <div>
        <span className={styles.activityHeader}>Sleep</span>
        <div style={{display:'flex'}}>
            <ActivityCircleChart data={data.sleep} goal={sleepGoal} color="#98db33" />
            {ActivityList(data.sleep)}
        </div>
        </div>
        <div>
        <span className={styles.activityHeader}>Food</span>
        <div style={{display:'flex'}}>
            {ActivityList(data.food)}
        </div>
        </div>
        <div>
        <span className={styles.activityHeader}>Outside</span>
        <div style={{display:'flex'}}>
            <ActivityCircleChart data={data.outside} goal={outsideGoal} color="#3498db" />
            {ActivityList(data.outside)}
        </div>
        </div>
        <div>
        <span className={styles.activityHeader}>Exercise</span>
            <div style={{display:'flex'}}>
                <ActivityCircleChart data={data.exercise} goal={exerciseGoal} color="#ae33db" />
                {ActivityList(data.exercise)}
            </div>
        </div>
    </div>
  );
}

export default ActivityDisplay;
