import { storage } from "./connection.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { readFileSync } from "fs"; // Node.js filesystem module

// Define the path to the video file within the "images" folder
const videoFilePath = "./images/mountains.mp4"; // Adjust the path as needed

// Read the video file from the local filesystem
const file = readFileSync(videoFilePath);

// Create the file metadata for the video (assuming it's a video file with "video/mp4" content type)
const metadata = {
  contentType: "video/mp4",
};

// Specify the path to store the video in Firebase Storage
const storagePath = "images/mountains.mp4"; // Replace with the desired path and filename

// Upload file and metadata to the specified path
const storageRef = ref(storage, storagePath);
const uploadTask = uploadBytesResumable(storageRef, file, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on(
  "state_changed",
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log("Upload is " + progress + "% done");
    switch (snapshot.state) {
      case "paused":
        console.log("Upload is paused");
        break;
      case "running":
        console.log("Upload is running");
        break;
    }
  },
  (error) => {
    // Handle errors here
    console.error("Error uploading file:", error);
  },
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log("File available at", downloadURL);
    });
  }
);
