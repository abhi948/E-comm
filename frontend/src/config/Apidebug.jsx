// Temporary debug component

const { useEffect } = require("react");

export default function Apidebug() {
    useEffect(() => {
      console.log('Current API_BASE_URL:', process.env.REACT_APP_BASE_URL);
      console.log('Process.env:', process.env);
    }, []);
  
    return null;
  }
  
  // Add to your App.js