import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import ActivityDisplay from "./ActivityDisplay";


export default function Home() {
  const [activityInput, setActivityInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
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
    }
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
        <form onSubmit={onSubmit} style={{margin: "1rem"}}>
          <textarea rows={5} name="activity" placeholder="What did you do today?" value={activityInput} onChange={(e) => setActivityInput(e.target.value)}></textarea>
          <input type="submit" value="Analyse Activity" />
        </form>
        <span>Simple Description:</span>
        <div>I slept well from midnight until about 7am. Then I ate some cereal for breakfast. At noon, I had a salad for lunch. An hour later, I sat outside for 30 minutes.</div>
        <span>Full Description:</span>
        <div>I slept well from midnight until about 7am. Then I ate some cereal for breakfast. After that, I went for a bike ride outside in the park at about 9am for an hour. At noon, I had a salad for lunch. An hour later, I sat outside for 30 minutes.</div>
        <ActivityDisplay data={result} />
      </main>
    </div>
  );
}
