import Head from "next/head";
import styles from "./index.module.css";
import ActivityRecorder from "./ActivityRecorder";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Activity Analysis</title>
        <link rel="icon" href="/walking.png" />
      </Head>

      <main className={styles.main}>
        <ActivityRecorder />
      </main>
    </div>
  );
}
