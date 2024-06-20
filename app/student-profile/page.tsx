import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './StudentProfile.css';

const StudentProfile = () => {
    const [studentData, setStudentData] = useState({
    fullName: '',
    gender: '',
    passportStatus: '',
    rollNo: '',
    department: '',
    yearOfStudy: '',
    cgpa: '',
    phoneNumber: '',
    email: '',
    cvUrl: '',
    transcriptUrl: ''
  });

  useEffect(() => {
    axios.get('/api/student-profile')
      .then(response => setStudentData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
      <div>
        <h2>About</h2>
        <p>Full name: {studentData.fullName}</p>
        <p>Gender: {studentData.gender}</p>
        <p>Passport Status: {studentData.passportStatus}</p>
      </div>

      <div>
        <h2>Academic Details</h2>
        <p>Roll No.: {studentData.rollNo}</p>
        <p>Department/Centre/School: {studentData.department}</p>
        <p>Year of Study: {studentData.yearOfStudy}</p>
        <p>CGPA: {studentData.cgpa}</p>
      </div>

      <div>
        <h2>Contact Details</h2>
        <p>Phone Number: {studentData.phoneNumber}</p>
        <p>Alternate Email: {studentData.email}</p>
      </div>

      <div>
        <h2>Uploads</h2>
        {studentData.cvUrl && <p><a href={studentData.cvUrl} target="_blank" rel="noopener noreferrer">View CV</a></p>}
        {studentData.transcriptUrl && <p><a href={studentData.transcriptUrl} target="_blank" rel="noopener noreferrer">View Transcript</a></p>}
      </div>

      <div className="button-container">
        <Link to="/edit-profile">
          <button>Edit Profile</button>
        </Link>
      </div>
    </div>
    </div>
  );
};

export default StudentProfile;
