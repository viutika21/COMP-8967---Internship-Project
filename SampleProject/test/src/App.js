// UserData.js
import React, { useState, useEffect , useRef} from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from './config'; // Import your Firebase configuration

const UserData = () => {
  const [userData, setUserData] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    // Fetch data from the server here
    fetch('http://localhost:3001/fetchAll')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUserData(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

      const videoPaths = ['videos/cartoon.mp4'];

      // Fetch download URLs for each video
      const fetchVideoUrls = async () => {
        const urls = await Promise.all(
          videoPaths.map(async (path) => {
            const videoRef = ref(storage, path);
            const url = await getDownloadURL(videoRef);
            return { path, url };
          })
        );
        setVideoUrls(urls);
      };
  
      fetchVideoUrls();

  }, []);

  useEffect(() => {
    // Play the video for the first 30 seconds when the video element is loaded
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();

      // Pause the video after 30 seconds
      setTimeout(() => {
        videoRef.current.pause();
      }, 30000); // 30 seconds in milliseconds
    }
  }, [videoUrls]);

  

  return (
    <div>
      <h2>User Data</h2>
      <ul>
        {userData.map((user, index) => (
          <li key={index}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </li>
        ))}
      </ul>
      <h2>Videos from Firebase Storage:</h2>
      <div className="video-container">
        {videoUrls.map((video, index) => (
          <div key={index}>
            <video controls className="video" ref={videoRef} width="500" height="360">
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserData;

