import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";

function Prepare({ data, setData }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [applicationModalOpen, setApplicationModalOpen] = useState(false);
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [dateModalOpen, setDateModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(data.healthExaminationDate || "");
    const [showTasks, setShowTasks] = useState(false)

    const menuModalRef = useRef(null);
    const applicationModalRef = useRef(null);
    const imageModalRef = useRef(null);
    const examinationModalRef = useRef(null);

    function handleDateChange(event) {
        setSelectedDate(event.target.value);
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuModalRef.current && !menuModalRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
            if (applicationModalRef.current && !applicationModalRef.current.contains(event.target)) {
                setApplicationModalOpen(false);
            }
            if (imageModalRef.current && !imageModalRef.current.contains(event.target)) {
                setImageModalOpen(false);
            }
            if (examinationModalRef.current && !examinationModalRef.current.contains(event.target)) {
                setDateModalOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const unfinishedTasks = (
        (data.applicationForLeaveOfAbsenceSubmitted ? 0 : 1) +
        (data.medicalCertificateSubmitted ? 0 : 1) +
        (data.attendanceStatusSubmitted ? 0 : 1) +
        (data.healthExaminationSubmitted ? 0 : 1) +
        (data.systemUseConsent ? 0 : 1)
    )

    let bearEncouragement = null
    if(2 >= unfinishedTasks >= 1) { bearEncouragement = <><span>You're doing well, only {unfinishedTasks} task{unfinishedTasks > 1 ? 's' : ''} left.</span><br/></> }
    if(unfinishedTasks === 0)     { bearEncouragement = <><span>Well done, you did all the tasks.</span><br/></> }

    const bearSpeech = (
        <span>
          Hello {data.username}, we're getting ready for your leave of absence.<br />
          {bearEncouragement}
          {unfinishedTasks > 1 ? "Here's what we need to do." : ''}
        </span>
    );

    const menuModal = (
        <div className={`${styles.modalBackground} ${styles.logoutModal}`}>
            <div className={styles.modal} ref={menuModalRef}>
                <button onClick={data.logout}>Logout</button>
                <button onClick={data.resetData}>Delete</button>
            </div>
        </div>
    )

    const applicationModal = (
        <div className={styles.modalBackground}>
            <div className={styles.modal} ref={applicationModalRef}>
                {data.applicationForLeaveOfAbsenceSubmitted ? <>
                    <img src="/application.jpg" alt="Uploaded Application" className={styles.uploadedImage} />
                    Application uploaded!</>
                    : <>
                    <img src="/document.svg" alt="Uploaded Application Preview" className={styles.uploadedImage} />
                    No Application uploaded</>}
                <div className={styles.modalButtonContainer}>
                    <button onClick={() => {alert("Upload application PDF dialog here"); setData(prevData => ({ ...prevData, applicationForLeaveOfAbsenceSubmitted: true}))}}>Upload</button>
                    <button onClick={() => {if(confirm("Delete application?")) setData(prevData => ({ ...prevData, applicationForLeaveOfAbsenceSubmitted: false}))}}>Delete</button>
                </div>
            </div>
        </div>
    )

    const imageModal = (
        <div className={styles.modalBackground}>
            <div className={styles.modal} ref={imageModalRef}>
                {data.medicalCertificateSubmitted ? <>
                    <img src="/medicalCertificate.jpg" alt="Uploaded Image Preview" className={styles.uploadedImage} />
                    Image uploaded!</>
                    : <>
                    <img src="/document.svg" alt="Uploaded Image Preview" className={styles.uploadedImage} />
                    No image</>}
                <div className={styles.modalButtonContainer}>
                    <button onClick={() => {alert("Upload image dialog here"); setData(prevData => ({ ...prevData, medicalCertificateSubmitted: true}))}}>Upload</button>
                    <button onClick={() => {if(confirm("Delete image?")) setData(prevData => ({ ...prevData, medicalCertificateSubmitted: false}))}}>Delete</button>
                </div>
            </div>
        </div>
    )

    const dateModal = (
        <div className={styles.modalBackground}>
            <div className={styles.modal} ref={examinationModalRef}>
                <input 
                    type="date" 
                    value={selectedDate} 
                    onChange={handleDateChange}
                    className={styles.dateInput}
                />
                <div className={styles.modalButtonContainer}>
                    <button onClick={() => {
                        if(selectedDate === '') {
                            alert("Please pick a date.");
                            return
                        }
                        alert("Date set!");
                        console.log(selectedDate);
                        setDateModalOpen(false);
                        setData(prevData => ({ ...prevData, healthExaminationSubmitted:true, healthExaminationDate: selectedDate }))
                    }}>Register</button>
                    <button onClick={() => {
                        alert("Date removed");
                        setDateModalOpen(false);
                        setSelectedDate('');
                        setData(prevData => ({ ...prevData, healthExaminationSubmitted:false, healthExaminationDate: ''}))
                    }}>Delete</button>
                </div>
            </div>
        </div>
    )

    const nextStage = (
        <div className={styles.taskListContainer}>
            <div className={styles.taskItem}>
                <div className={data.applicationForLeaveOfAbsenceSubmitted ? styles.taskDone : styles.taskPending}>
                    Review tasks
                </div>
                <button className={styles.taskActionButton} onClick={() => setShowTasks(prevData => !prevData)}>{showTasks ? "Hide" : "Show"}</button>
            </div>
            <div className={styles.taskItem}>
                <div className={data.applicationForLeaveOfAbsenceSubmitted ? styles.taskDone : styles.taskPending}>
                    Move to next stage
                </div>
                <button className={styles.taskActionButton} onClick={() => setData(prevData => ({ ...prevData, processStage: 2}))}>Start</button>
            </div>
        </div>
    )

    return (
        <>
            <div className={styles.menuContainer}>
                <div className={styles.hamburgerIcon} onClick={() => setMenuOpen(!menuOpen)}>☰</div>
                {menuOpen && menuModal}
            </div>
            {applicationModalOpen && applicationModal}
            {imageModalOpen && imageModal}
            {dateModalOpen && dateModal}

            <div className={styles.mascotContainer}>
                <div className={styles.speechBubble}>{bearSpeech}</div>
                <img src="/bear.png" alt="Bear Mascot" className={styles.mascotImage} />
            </div>

            <div id="mainList" className={styles.taskListContainer} style={{maxHeight: (unfinishedTasks > 0 || showTasks) ? "100vh" : "0"}}>
                <div className={styles.taskItem}>
                    <div className={data.applicationForLeaveOfAbsenceSubmitted ? styles.taskDone : styles.taskPending}>
                        {data.applicationForLeaveOfAbsenceSubmitted ? "☑" : "☐"} Submit Application for Leave of Absence
                    </div>
                    <button className={styles.taskActionButton} onClick={() => setApplicationModalOpen(!applicationModalOpen)}>Complete Task</button>
                </div>

                <div className={styles.taskItem}>
                    <div className={data.medicalCertificateSubmitted ? styles.taskDone : styles.taskPending}>
                        {data.medicalCertificateSubmitted ? "☑" : "☐"} Submit a Medical Certificate
                    </div>
                    <button className={styles.taskActionButton} onClick={() => setImageModalOpen(!imageModalOpen)}>Upload Image</button>
                </div>

                <div className={styles.taskItem}>
                    <div className={data.attendanceStatusSubmitted ? styles.taskDone : styles.taskPending}>
                        {data.attendanceStatusSubmitted ? "☑" : "☐"} Verify Attendance Status
                    </div>
                    <button className={styles.taskActionButton} onClick={() => setData(prevData => ({ ...prevData, attendanceStatusSubmitted: !prevData.attendanceStatusSubmitted}))}>Verify</button>
                </div>

                <div className={styles.taskItem}>
                    <div className={data.healthExaminationSubmitted ? styles.taskDone : styles.taskPending}>
                        {data.healthExaminationSubmitted ? "☑" : "☐"} Book a Health Examination
                    </div>
                    <button className={styles.taskActionButton} onClick={() => setDateModalOpen(!dateModalOpen)}>Schedule Exam</button>
                </div>

                <div className={styles.taskItem}>
                    <div className={data.systemUseConsent ? styles.taskDone : styles.taskPending}>
                        {data.systemUseConsent ? "☑" : "☐"} Give Consent for activity tracking
                    </div>
                    <button className={styles.taskActionButton} onClick={() => setData(prevData => ({ ...prevData, systemUseConsent: !prevData.systemUseConsent}))}>{data.systemUseConsent ? "Remove Consent" : "Give Consent"}</button>
                </div>
            </div>
            {unfinishedTasks === 0 && nextStage}
      </>
    )
}

export default Prepare