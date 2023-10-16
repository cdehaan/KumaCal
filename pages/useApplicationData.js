import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from local storage:', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error writing to local storage:', error);
    }
  };

  return [storedValue, setValue];
};

const useApplicationData = () => {
  const [data, setData] = useLocalStorage('applicationData', {
    loggedIn: false,
    username: '',
    hashedPassword: '',
    processStage: 0,
    systemUseConsent: false,
    applicationForLeaveOfAbsenceSubmitted: false,
    medicalCertificateSubmitted: false,
    medicalCertificateImage: '',
    attendanceStatusSubmitted: false,
    healthExaminationSubmitted: false,
    interviewReports: [],
    regularContactReports: [],
    dailyActivityReports: [],
  });

  return [data, setData];
};

export default useApplicationData;