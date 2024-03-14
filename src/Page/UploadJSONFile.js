import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useDispatch } from "react-redux";
import {
  addUserProfileFormData,
  addCustomProfileData,
} from "../app/profileSlice";
import './UploadJSONFile.css'
const UploadJSONFile = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const history = useHistory();
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const fileName = selectedFile.name;
    const ext = fileName.split(".")[1];
    if (ext !== "json") {
      alert("Please upload JSON File");
      setFile("");
      return;
    }
  };

const handleFileUpload = () => {
  if (!file) {
    alert("Please select a file before uploading.");
    return;
  }
  const reader = new FileReader();

  reader.onload = (event) => {
    const fileContent = event.target.result;

    try {
      const jsonData = JSON.parse(fileContent);
      if (jsonData && jsonData.profile && jsonData.customForm) {
        const { profile } = jsonData;
        Object.entries(profile).forEach(([key, value]) => {
          dispatch(addUserProfileFormData({ key, value }));
        });

        const { customForm } = jsonData;
        customForm.forEach((item, index) => {
          Object.entries(item).forEach(([key, value]) => {
            dispatch(addCustomProfileData({ key, value, index }));
          });
        });

        localStorage.setItem("myProfile", JSON.stringify(jsonData));
        history.push("/pdf");
      } else {
        throw new Error("Invalid JSON format");
      }
    } catch (error) {
      console.error("Error parsing JSON file:", error.message);
      alert("Please upload valid JSON file");
    }
  };

  reader.readAsText(file);
};

  return (
    <div className="upload-file-container">
      <h2>Upload JSON file</h2>
      <input type="file" onChange={handleFileChange} />
      <Link to="/" onClick={handleFileUpload}>
        Upload File
      </Link>
      <div className="create-profile">
        <hr className="hr-text" data-content="or" />
        <Link to="/forms">Create a profile</Link>
      </div>
    </div>
  );
};

export default UploadJSONFile;
