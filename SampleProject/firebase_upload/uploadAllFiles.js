import { storage } from "./connection.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { readdirSync, readFileSync } from "fs"; // Node.js filesystem module

// Directory path where your video files are located
const directoryPath = "./images"; // Adjust the path as needed

// List all files in the directory
const files = readdirSync(directoryPath);

// Function to upload a single file to Firebase Storage
async function uploadFile(filename) {
  // Read the file data
  const filePath = `${directoryPath}/${filename}`;
  const file = readFileSync(filePath);

  // Create the file metadata (assuming it's a video file with "video/mp4" content type)
  const metadata = {
    contentType: "video/mp4",
  };

  // Specify the path to store the video in Firebase Storage (e.g., "videos/filename.mp4")
  const storagePath = `videos/${filename}`;

  // Upload file and metadata to the specified path
  const storageRef = ref(storage, storagePath);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  // Return a promise that resolves with the download URL when the upload is complete
  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      null,
      reject, // Reject on error
      () => {
        // Resolve with the download URL when the upload is successful
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
}

// Upload all video files
async function uploadAllFiles() {
  for (const filename of files) {
    try {
      const downloadURL = await uploadFile(filename);
      console.log(`File "${filename}" uploaded and available at: ${downloadURL}`);
    } catch (error) {
      console.error(`Error uploading file "${filename}": ${error}`);
    }
  }
}

// Call the function to upload all files
uploadAllFiles();
