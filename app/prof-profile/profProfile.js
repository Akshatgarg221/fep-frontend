import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './profProfile.css';

const ProfProfile = () => {
  const [profData, setProfData] = useState({
    fullName: '',
    university: '',
    projectoffered: '',
    phoneNumber: '',
    email: '',
  });
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    axios.get('/api/prof-profile')
      .then(response => setProfData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    // Fetch the image URL from your Django backend
    // Replace with your actual endpoint for fetching the image URL
    const fetchImage = async () => {
      try {
        const response = await axios.get('/api/prof-profile-image'); // Adjust the endpoint as necessary
        if (response.status === 200) {
          setImageUrl(response.data.imageUrl); // Adjust the response data as necessary
        } else {
          console.error('Failed to fetch image');
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div className="container">
      {imageUrl ? <img src={imageUrl} alt="Profile" className='passport-image' /> : <p>Loading image...</p>}
      <div>
        <p>Full name: {profData.fullName}</p>
      </div>

      <div>
        <h2>Academic Details</h2>
        <p>University: {profData.university}</p>
        <p>Project offered: {profData.projectoffered}</p>
      </div>

      <div>
        <h2>Contact Details</h2>
        <p>Phone Number: {profData.phoneNumber}</p>
        <p>Alternate Email: {profData.email}</p>
      </div>

      <div className="button-container">
        <Link to="/edit-profile">
          <button>Edit Profile</button>
        </Link>
      </div>
    </div>
  );
};

export default ProfProfile;
