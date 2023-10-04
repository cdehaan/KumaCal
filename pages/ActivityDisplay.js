import React from 'react';
import ActivityCircleChart from './ActivityCircleChart';
import styles from "./index.module.css";

function ActivityDisplay({ data }) {
  if (data === undefined) return <div>Please wait...</div>;

  function AlertNotImplimented() {
    alert("Imagine a nice popup where this value can be changed.")
  }

  const sleepGoal = 8    // hours
  const foodGoal = 3     // *meals*
  const outsideGoal = 2  // hours
  const exerciseGoal = 1 // hours

  function ActivityList(activityData) {
    if(data.uninitialized === true)
        return null

    if(activityData === undefined)
        return <span>[None]</span>

    if(activityData.length === 0)
        return <span>[None len]</span>

    const list = <div>{
        activityData.map((entry, index) => {
            const startButton = <button className={styles.activityTimeButton} onClick={AlertNotImplimented}>{entry.start}</button>
            const endButton = <button className={styles.activityTimeButton} onClick={AlertNotImplimented}>{entry.end}</button>
            const timeButton = <button className={styles.activityTimeButton} onClick={AlertNotImplimented}>{entry.time}</button>
            return (
                <div className={styles.activityEntry} key={index}>
                    {entry.description && (<><span>{entry.description.charAt(0).toUpperCase() + entry.description.slice(1)}</span></>)}
                    {entry.description && entry.start && (<br/>)}
                    {entry.start && entry.end && (<>{startButton} → {endButton}</>)}
                    {entry.time && (<span> - {entry.time}</span>)}
                    {false && entry.snipit && !entry.description && (<><span>{entry.snipit}</span><br/></>)}
                    {false && <button className={styles.deleteActivity} onClick={AlertNotImplimented}>✖</button>}
                </div>
            )
        })
    }</div>

    return(list)
  }

  return (
    <div className={styles.activityDisplayWrapper}>
        <div className={styles.activity}>
            <span className={styles.activityHeader}>Sleep</span>
            <div className={styles.activityData}>
                <ActivityCircleChart data={data.sleep} goal={sleepGoal} color="#33a3db" />
            </div>
            <div className={styles.activityData}>
                {ActivityList(data.sleep)}
            </div>
        </div>
        <div className={styles.activity}>
            <span className={styles.activityHeader}>Food</span>
            <div className={styles.activityData}>
                <ActivityCircleChart data={data.food} goal={foodGoal} color="#a333db" />
            </div>
            <div className={styles.activityData}>
                {ActivityList(data.food)}
            </div>
        </div>
        <div className={styles.activity}>
            <span className={styles.activityHeader}>Outside</span>
            <div className={styles.activityData}>
                <ActivityCircleChart data={data.outside} goal={outsideGoal} color="#db3333" />
            </div>
            <div className={styles.activityData}>
                {ActivityList(data.outside)}
            </div>
        </div>
        <div className={styles.activity}>
            <span className={styles.activityHeader}>Exercise</span>
            <div className={styles.activityData}>
                <ActivityCircleChart data={data.exercise} goal={exerciseGoal} color="#a3db33" />
            </div>
            <div className={styles.activityData}>
                {ActivityList(data.exercise)}
            </div>
        </div>
    </div>
  );
}

export default ActivityDisplay;
