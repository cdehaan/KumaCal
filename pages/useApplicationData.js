import { useState, useEffect } from 'react';

function useApplicationData() {
    const defaultValues = {
      resetData: resetData,
      logout: logout,
      loggedIn: false,
      username: '',
      hashedPassword: '',
      processStage: 0,
      applicationForLeaveOfAbsenceSubmitted: false,
      medicalCertificateSubmitted: false,
      medicalCertificateImage: '',
      attendanceStatusSubmitted: false,
      healthExaminationSubmitted: false,
      healthExaminationDate: '',
      systemUseConsent: false,
      interviewReports: [],
      regularContactReports: [],
      dailyActivityReports: [],
    }
    const [data, setData] = useState(defaultValues);

    useEffect(() => {
      if (typeof window !== "undefined") {
        const storedData = localStorage.getItem('userData');
        if (storedData) {
            console.log("Set user data initially to:" + storedData)
            setData({ ...JSON.parse(storedData), resetData: resetData, logout: logout });
          }
        }
    }, []);

    useEffect(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem('userData', JSON.stringify(data));
        console.log("Set user data to:" + JSON.stringify(data))
      }
    }, [data]);

    function resetData() {
      if (typeof window !== "undefined") {
        localStorage.removeItem('userData'); // Removes the user data from localStorage
      }
      setData({ ...defaultValues, resetData: resetData, logout: logout  }); // Important to pass the resetData function to keep it as part of the new state
    }

    function logout() {
      setData(prevData => ({ ...prevData, loggedIn: false }))
    }

    return [data, setData];
}

export default useApplicationData;
