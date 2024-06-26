import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EditprofProfile.css';

const EditprofProfile = () => {
  const [profData, setprofData] = useState({
    fullName: '',
    university: '',
    projectoffered: '',
    phoneNumber: '',
    email: '',
    profilePictureUrl: '', // Added for profile picture URL
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/prof-profile')
      .then(response => setprofData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setprofData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const formData = new FormData();
    formData.append('file', files[0]);

    axios.post(`/api/upload/${name}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        setprofData(prevState => ({
          ...prevState,
          [`${name}Url`]: response.data.url
        }));
      })
      .catch(error => console.error('Error uploading file:', error));
  };

  const handleSave = () => {
    axios.post('/api/update-prof-profile', profData)
      .then(response => {
        console.log('Data saved successfully');
        navigate('/'); // Navigate back to the profile page
      })
      .catch(error => console.error('Error saving data:', error));
  };

  return (
    <div className="container">
      <div>
        <h2>About</h2>
        <label>
          Full name:
          <input type="text" name="fullName" value={profData.fullName} onChange={handleChange} />
        </label>
        <label>
          Profile Picture:
          <input type="file" name="profilePicture" onChange={handleFileChange} />
        </label>
        {profData.profilePictureUrl && <img src={profData.profilePictureUrl} alt="Profile" className="profile-image" />}
      </div>

      <div>
        <h2>Academic Details</h2>
        <label>
          University:
          <input type="text" name="university" value={profData.university} onChange={handleChange} />
        </label>
        <label>
          Project offered:
          <input type="text" name="projectoffered" value={profData.projectoffered} onChange={handleChange} />
        </label>
      </div>

      <div>
        <h2>Contact Details</h2>
        <label>
          Phone Number:
          <input type="text" name="phoneNumber" value={profData.phoneNumber} onChange={handleChange} />
        </label>
        <label>
          Alternate Email:
          <input type="text" name="email" value={profData.email} onChange={handleChange} />
        </label>
      </div>

      <div className="button-container">
        <button onClick={handleSave}>Save Profile</button>
      </div>
    </div>
  );
};

export default EditprofProfile;
