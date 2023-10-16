import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";

function Prepare({ data, setData }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [dateModalOpen, setDateModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(data.healthExaminationDate || "");
    
    const menuModalRef = useRef(null);
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

    function DummyFunction() {
        console.log("Task action clicked!");
    }

    function UploadImage() {
        setImageModalOpen(!imageModalOpen)
    }

    const bearSpeech = (
        <span>
          Hello {data.username}, we're getting ready for your leave of absence.<br />
          Here's what we need to do.
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

    return (
        <>
            <div className={styles.menuContainer}>
                <div className={styles.hamburgerIcon} onClick={() => setMenuOpen(!menuOpen)}>☰</div>
                {menuOpen && menuModal}
            </div>
            {imageModalOpen && imageModal}
            {dateModalOpen && dateModal}

            <div className={styles.mascotContainer}>
                <div className={styles.speechBubble}>{bearSpeech}</div>
                <img src="/bear.png" alt="Bear Mascot" className={styles.mascotImage} />
            </div>

            <div className={styles.taskListContainer}>
                <div className={styles.taskItem}>
                    <div className={data.applicationForLeaveOfAbsenceSubmitted ? styles.taskDone : styles.taskPending}>
                        {data.applicationForLeaveOfAbsenceSubmitted ? "☑" : "☐"} Submit Application for Leave of Absence
                    </div>
                    <button className={styles.taskActionButton} onClick={DummyFunction}>Complete Task</button>
                </div>

                <div className={styles.taskItem}>
                    <div className={data.medicalCertificateSubmitted ? styles.taskDone : styles.taskPending}>
                        {data.medicalCertificateSubmitted ? "☑" : "☐"} Submit a Medical Certificate
                    </div>
                    <button className={styles.taskActionButton} onClick={UploadImage}>Upload Image</button>
                </div>

                <div className={styles.taskItem}>
                    <div className={data.attendanceStatusSubmitted ? styles.taskDone : styles.taskPending}>
                        {data.attendanceStatusSubmitted ? "☑" : "☐"} Verify Attendance Status
                    </div>
                    <button className={styles.taskActionButton} onClick={DummyFunction}>Verify</button>
                </div>

                <div className={styles.taskItem}>
                    <div className={data.healthExaminationSubmitted ? styles.taskDone : styles.taskPending}>
                        {data.healthExaminationSubmitted ? "☑" : "☐"} Complete a Health Examination
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
      </>
    )
}

export default Prepare