function ActivityCircleChart({ data, goal, color }) {

  const timeSpent = SumDurations(data)
  const goalPercent = Math.max(0,Math.min(100, timeSpent/goal * 100))

  function SumDurations(activityArray) {
    if(!activityArray) return 0
    return activityArray.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.duration.split(":")[0]) + parseInt(currentValue.duration.split(":")[1])/60, 0)
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
      <span style={{position:"absolute"}}>{timeSpent}</span>
    </div>
  );
}

export default ActivityCircleChart