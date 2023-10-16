import React from "react";
import styles from "./index.module.css";

function Prepare({ data, setData }) {
    const logoutButton = <button onClick={data.logout}>Logout</button>
    const deleteDataButton = <button onClick={data.resetData}>Delete</button>

    function DummyFunction() {
        console.log("Task action clicked!");
    }
    const bearSpeech = (
        <span>
          Hello {data.username}, we're getting ready for your leave of absence.
          <br />
          Here's what we need to do.
        </span>
      );
          
    return (
        <>
            <div className={styles.mascotContainer}>
                <div className={styles.speechBubble}>{bearSpeech}</div>
                <img src="/bear.png" alt="Bear Mascot" className={styles.mascotImage} />
            </div>

            <div className={styles.taskListContainer}>
                <div className={styles.taskItem}>
                    <div className={data.applicationForLeaveOfAbsenceSubmitted ? styles.taskDone : styles.taskPending}>
                        Submit Application for Leave of Absence
                    </div>
                    <button className={styles.taskActionButton} onClick={DummyFunction}>Complete Task</button>
                </div>

                <div className={styles.taskItem}>
                    <div className={data.medicalCertificateSubmitted ? styles.taskDone : styles.taskPending}>
                        Submit a Medical Certificate
                    </div>
                    <button className={styles.taskActionButton} onClick={DummyFunction}>Upload Image</button>
                </div>

                <div className={styles.taskItem}>
                    <div className={data.attendanceStatusSubmitted ? styles.taskDone : styles.taskPending}>
                        Verify Attendance Status
                    </div>
                    <button className={styles.taskActionButton} onClick={DummyFunction}>Verify</button>
                </div>

                <div className={styles.taskItem}>
                    <div className={data.healthExaminationSubmitted ? styles.taskDone : styles.taskPending}>
                        Complete a Health Examination
                    </div>
                    <button className={styles.taskActionButton} onClick={DummyFunction}>Schedule Exam</button>
                </div>

                <div className={styles.taskItem}>
                    <div className={data.systemUseConsent ? styles.taskDone : styles.taskPending}>
                        Give Consent for daily activity collection
                    </div>
                    <button className={styles.taskActionButton} onClick={() => setData(prevData => ({ ...prevData, systemUseConsent: !prevData.systemUseConsent}))}>{data.systemUseConsent ? "Remove Consent" : "Give Consent"}</button>
                </div>
            </div>
            {logoutButton}
            {deleteDataButton}<br/>
      </>
    )
}

export default Prepare