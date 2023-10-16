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
    topContent = <Prepare data={data} setData={setData} />
  } else if(data.processStage === 2) {
    topContent = <OnLeave />
  } else {
    topContent = "Top"
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
          {topContent}
        </main>
      </div>
    </>
  );
}
