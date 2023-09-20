// UserData.js
import React, { useState, useEffect } from 'react';

const UserData = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch data from the server here
    // Replace 'http://localhost:3002/fetchAll' with your server endpoint
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
  }, []);

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
    </div>
  );
};

export default UserData;
