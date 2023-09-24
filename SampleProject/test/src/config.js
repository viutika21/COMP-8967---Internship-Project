// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAigfS1mj6ERWht_qu3j7YdT-gFjzmTl_c",
    authDomain: "nodejs-upload-video.firebaseapp.com",
    projectId: "nodejs-upload-video",
    storageBucket: "nodejs-upload-video.appspot.com",
    messagingSenderId: "707062391045",
    appId: "1:707062391045:web:f50f4010a5430a6fb2576c",
    measurementId: "G-Z2XR7KYF6V"
  };  

  const firebaseApp = initializeApp(firebaseConfig);
  const storage = getStorage(firebaseApp);

 
  export { storage };


export default firebaseApp;
