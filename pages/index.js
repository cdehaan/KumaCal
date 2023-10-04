import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import ActivityDisplay from "./ActivityDisplay";


export default function Home() {
  const [activityInput, setActivityInput] = useState("");
  const [result, setResult] = useState({uninitialized: true});
  const [hideExample, setHideExample] = useState(true)

  async function onSubmit(event) {
    event.preventDefault();
    setResult(undefined);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ activity: activityInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      //setActivityInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
      setResult({uninitialized: true});
    }
  }

  function ToggleHide() {
    setHideExample(prev => { return !prev })
  }

  return (
    <div>
      <Head>
        <title>Activity Analysis</title>
        <link rel="icon" href="/walking.png" />
      </Head>

      <main className={styles.main}>
        <img src="/walking.png" className={styles.icon} />
        <h3>Activity Tracking</h3>
        <img src="/wave.png" className={styles.icon} />
        <form onSubmit={onSubmit} style={{marginBottom: "1rem"}}>
          <textarea className={styles.formTextarea} rows={5} name="activity" placeholder="What did you do today?" value={activityInput} onChange={(e) => setActivityInput(e.target.value)}></textarea>
          <input type="submit" value="Analyse Activity" className={result===undefined ? styles.loadingButton : ''} />
        </form>
        <ActivityDisplay data={result} />
        <div className={`${styles.exampleGrid} ${hideExample ? styles.hideExample : ""}`}>
          <button style={{width: "12rem", height: "1.5rem", gridColumn: "span 2", justifySelf: "center"}} onClick={ToggleHide}>Toggle Hide Examples</button>
          <span style={{gridColumn: "span 2"}}>Hi Marc. You can copy/paste these paragraphs into the textbox. Also, I have goals set for sleep (8 hours), being outside (2 hours) and exercise (1 hour). The circle fills up based on that goal. I wasn't sure how to represent food. What's a good goal for food? Not sure, but we can make any kind of representation, since we have the data.</span>
          <span className={styles.exampleHeader}>Short Examples:</span>
          <span className={styles.exampleHeader}>Full Examples:</span>
          <span>I slept well from midnight until about 7am. Then I ate some cereal for breakfast. At noon, I had a salad for lunch. An hour later, I sat outside for 30 minutes.</span>
          <span>I slept well from 11pm for about 7 hours. Then I ate some cereal for breakfast. After that, I went to workout in the gym at about 9am for an hour. At noon, I had a salad for lunch. An hour later, I sat outside for 30 minutes. I fell asleep from 3:00pm to 3:30pm.</span>
          <span>真夜中から朝の7時くらいまでよく眠れました。 それから朝食にシリアルを食べました。 お昼はサラダをランチに食べました。 1時間後、私は30分間外に座っていました。</span>
          <span>23時から7時間くらいぐっすり眠れました。 それから朝食にシリアルを食べました。 その後、午前9時頃からジムで1時間トレーニングをしました。 お昼はサラダをランチに食べました。 1時間後、私は30分間外に座っていました。 午後3時から午後3時半まで眠ってしまいました。</span>
        </div>
      </main>
    </div>
  );
}
