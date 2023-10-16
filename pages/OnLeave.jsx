import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import Link from "next/link";

function OnLeave({ data, setData }) {
    if(!data) return null;

    const [menuOpen, setMenuOpen] = useState(false);
    const menuModalRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuModalRef.current && !menuModalRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const menuModal = (
        <div className={`${styles.modalBackground} ${styles.logoutModal}`}>
            <div className={styles.modal} ref={menuModalRef}>
                <button onClick={data.logout}>Logout</button>
                <button onClick={data.resetData}>Delete</button>
            </div>
        </div>
    )

    const bearSpeech = (
        <span>
          Hello {data.username}, here's what to do during your leave of absence.<br />
        </span>
    );

    return (
        <>
            <div className={styles.menuContainer}>
                <div className={styles.hamburgerIcon} onClick={() => setMenuOpen(!menuOpen)}>☰</div>
                {menuOpen && menuModal}
            </div>
            <div className={styles.mascotContainer}>
                <div className={styles.speechBubble}>{bearSpeech}</div>
                <img src="/bear.png" alt="Bear Mascot" className={styles.mascotImage} />
            </div>

            <div id="mainList" className={styles.taskListContainer}>
                <div className={styles.taskItem}>
                    <div className={data.dailyActivityReports.length > 0 ? styles.taskDone : styles.taskPending}>
                        {data.dailyActivityReports.length > 0 ? "☑" : "☐"} Submit Activity log
                    </div>
                    <Link href="/ActivityRecorder">
                        <button className={styles.taskActionButton}>Submit</button>
                    </Link>
                </div>
                <div className={styles.taskItem}>
                    <div className={data.attendanceStatusSubmitted ? styles.taskDone : styles.taskPending}>
                        {data.attendanceStatusSubmitted ? "☑" : "☐"} Placeholder Activity
                    </div>
                    <button className={styles.taskActionButton} onClick={() => setData(prevData => ({ ...prevData, attendanceStatusSubmitted: !prevData.attendanceStatusSubmitted}))}>Verify</button>
                </div>
            </div>

            <div className={styles.taskListContainer}>
                <div className={styles.taskItem}>
                    <div className={data.applicationForLeaveOfAbsenceSubmitted ? styles.taskDone : styles.taskPending}>
                        Move to previous stage
                    </div>
                    <button className={styles.taskActionButton} onClick={() => setData(prevData => ({ ...prevData, processStage: 1}))}>Go back</button>
                </div>
            </div>

        </>
    )
}

export default OnLeave