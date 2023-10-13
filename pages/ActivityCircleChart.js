function ActivityCircleChart({ data, goal, activity, color }) {

  const timeSpent = Math.round(SumDurations(data)*10)/10
  const goalPercent = Math.max(0,Math.min(100, timeSpent/goal * 100))

  function SumDurations(activityArray) {
    if(!activityArray)      return 0
    if(!activityArray[0])   return 0
    if(activity === "food") return activityArray.length
    return activityArray.reduce((accumulator, currentValue) => {
      if (!currentValue.duration) {
        return accumulator; // Ignore data without duration
      }

      const durationParts = currentValue.duration.split(":");

      if (durationParts.length !== 2) {
        return accumulator; // Ignore invalid duration format
      }

      const hours = parseInt(durationParts[0]);
      const minutes = parseInt(durationParts[1]);

      if (isNaN(hours) || isNaN(minutes)) {
        return accumulator; // Ignore invalid duration values
      }

      return accumulator + hours + minutes / 60;
    }, 0);
  }

  const radius = 25
  const circumference = 2 * Math.PI * radius;
  const dashLength = (goalPercent / 100) * circumference;
  const gapLength = circumference - dashLength;
  const applyBlur = goalPercent === 100 ? 2 : 0;

  return (
    <div style={{display:"flex", alignItems: "center", justifyContent: "center"}}>
      <svg width={radius*3} height={radius*3} viewBox={`0 0 ${radius*3} ${radius*3}`} className="activity-circle">
      <defs>
        <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="glow" />
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
        <circle
          cx={radius*1.5}
          cy={radius*1.5}
          r={radius}
          fill="none"
          stroke="#eee"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${0}`}
          transform={`rotate(-90 ${radius*1.5} ${radius*1.5})`}
          filter={applyBlur ? "url(#glow-filter)" : ""}
        />
        <circle
          cx={radius*1.5}
          cy={radius*1.5}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${dashLength} ${gapLength}`}
          transform={`rotate(-90 ${radius*1.5} ${radius*1.5})`}
        />
      </svg>
      <span style={{position:"absolute"}}>{timeSpent > 0 ? timeSpent : null}</span>
    </div>
  );
}

export default ActivityCircleChart