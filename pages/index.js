import Head from "next/head";
import useApplicationData from "./useApplicationData";
import Login from "./Login";
import Prepare from "./Prepare";
import styles from "./index.module.css";

export default function Home() {
  const [data, setData] = useApplicationData();

  let topContent = null
  if(!data.loggedIn) {
    topContent = <Login data={data} setData={setData} />
  } else if(data.processStage === 1) {
    topContent = <Prepare />
  } else if(data.processStage === 2) {
    topContent = <OnLeave />
  } else {
    topContent = "Top"
  }

  const logoutButton = <button onClick={data.logout}>Logout</button>
  const deleteDataButton = <button onClick={data.resetData}>Delete</button>

  return (
    <>
      <Head>
        <title>Activity Analysis</title>
        <link rel="icon" href="/walking.png" />
      </Head>
      <div className={styles.mainWrapper}>
        <div className={styles.redirectHeader} >Looking for the <a href="ActivityRecorder/">Activity log</a>?</div>
        <main className={styles.main}>
          Bear<br/>
          {topContent}
          <button onClick={() => setData(prevData => ({ ...prevData, systemUseConsent: !prevData.systemUseConsent, processStage: 1 }))}>
            Toggle System Use Consent
          </button>
          {data.systemUseConsent ? "Ok!" : "No..."}<br/>
          Username? {data.username}<br/>
          Signed in? {data.loggedIn ? logoutButton : "No"}<br/>
          Got data? {data.username ? deleteDataButton : "No"}<br/>
          Stage? {data.processStage}
        </main>
      </div>
    </>
  );
}
