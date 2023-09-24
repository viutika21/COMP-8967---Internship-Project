import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAigfS1mj6ERWht_qu3j7YdT-gFjzmTl_c",
    authDomain: "nodejs-upload-video.firebaseapp.com",
    projectId: "nodejs-upload-video",
    storageBucket: "nodejs-upload-video.appspot.com",
    messagingSenderId: "707062391045",
    appId: "1:707062391045:web:f50f4010a5430a6fb2576c",
    measurementId: "G-Z2XR7KYF6V"
  };    

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
export { storage };