import Head from "next/head";
import useApplicationData from "./useApplicationData";
import styles from "./index.module.css";

export default function Home() {
  const [data, setData] = useApplicationData();

  let topContent = null
  if(data.loggedIn) {
    topContent = <Login />
  } else if(data.processStage === 1) {
    topContent = <Prepare />
  } else if(data.processStage === 2) {
    topContent = <OnLeave />
  }

  return (
    <>
      <Head>
        <title>Activity Analysis</title>
        <link rel="icon" href="/walking.png" />
      </Head>
      <div className={styles.mainWrapper}>
        <div className={styles.redirectHeader} >Looking for the <a href="ActivityRecorder/">Activity log</a>?</div>
        <main className={styles.main}>
          Bear
          {topContent}
          <button onClick={() => setData(prevData => ({ ...prevData, systemUseConsent: !prevData.systemUseConsent }))}>
            Toggle System Use Consent
          </button>
          {data.systemUseConsent ? "Ok!" : "No..."}
        </main>
      </div>
    </>
  );
}
