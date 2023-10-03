import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import ActivityDisplay from "./ActivityDisplay";


export default function Home() {
  const [activityInput, setActivityInput] = useState("");
  const [recognition, setRecognition] = useState(null);
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

  useEffect(() => {
    if (typeof window !== "undefined" && 'webkitSpeechRecognition' in window) {
      const recognitionInstance = new webkitSpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US";
      setRecognition(recognitionInstance);
    } else {
      console.log("Speech recognition is still not supported in this browser. Please use Chrome or another supported browser.");
    }
  }, []);

  function startDictation() {
    if (recognition) {
      recognition.start();

      recognition.onresult = function(e) {
        setActivityInput(e.results[0][0].transcript)
          //document.getElementById('result').value = e.results[0][0].transcript;
          //recognition.stop();
      };

      recognition.onerror = function(e) {
          recognition.stop();
          console.log(e)
      }

    } else {
        alert("Speech recognition is not supported in this browser. Please use Chrome or another supported browser.");
    }
  }

  function stopDictation() {
    recognition.stop();
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
        <button onClick={startDictation}>Start Dictation</button>
        <button onClick={stopDictation}>Stop Dictation</button>
        <form onSubmit={onSubmit}>
          <textarea rows={5} name="activity" placeholder="What did you do today?" value={activityInput} onChange={(e) => setActivityInput(e.target.value)}></textarea>
          <input type="submit" value="Analyse Activity" />
        </form>
        <div>I slept well from midnight until about 7am. Then I ate some cereal for breakfast. At noon, I had a salad for lunch. An hour later, I sat outside for 30 minutes. I didn't do anything after that until 7pm when I had another salad.</div>
        <ActivityDisplay data={result} />
      </main>
    </div>
  );
}
