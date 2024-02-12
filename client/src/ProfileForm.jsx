import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css';

const ProfilePage = ({ userEmail }) => {
  const [profileData, setProfileData] = useState({
    name: '',
    age: '',
    email: userEmail,
    mobileNumber: '',
    gender: '',
    dateOfBirth: ''
  });
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showEditButton, setShowEditButton] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    fetchProfileData(userEmail);
  }, [userEmail]);

  const fetchProfileData = async (email) => {
    try {
      const response = await axios.get(`https://mern-guvi-8jpd.onrender.com/profile?email=${email}`);
      if (response.data) {
        const { username, age, mobileNumber, gender, dateOfBirth } = response.data;
        const formattedDateOfBirth = dateOfBirth ? new Date(dateOfBirth).toISOString().split('T')[0] : '';
    
        const anyDataMissing = !username || !age || !mobileNumber || !gender || !formattedDateOfBirth;
    
        if (anyDataMissing) {
          setProfileData({
            name: username || '', 
            age,
            mobileNumber,
            gender,
            dateOfBirth: formattedDateOfBirth,
            email
          });
          setShowForm(true);
          setShowEditButton(false);
        } else {
          setProfileData({
            name: username || '', 
            age,
            mobileNumber,
            gender,
            dateOfBirth: formattedDateOfBirth,
            email
          });
          setShowForm(false);
          setShowEditButton(true);
        }
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };
  
  
  
  

  const handleUpdate = async () => {
    try {
      const { name, email, ...updatedData } = profileData; 
      const response = await axios.put('https://mern-guvi-8jpd.onrender.com/profile', { name, email, ...updatedData });
      console.log('Profile updated successfully:', response.data);
      setIsProfileUpdated(true);
      setShowForm(false);
      setShowEditButton(true);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  

  const handleEdit = () => {
    setShowForm(true);
    setShowEditButton(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevProfileData => ({
      ...prevProfileData,
      [name]: value
    }));
  };
  
  

  const handleLogout = () => {
  window.location.href = '/login';
};

  return (
    <div className="container111" >
      <h1><center>Profile Page</center></h1>
      {showForm ? (
        <form>
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={profileData.name} onChange={handleChange} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={profileData.email} onChange={handleChange} />
          </div>
          <div>
            <label>Age:</label>
            <input type="text" name="age" value={profileData.age} onChange={handleChange} />
          </div>
          <div>
            <label>Gender:</label>
            <select name="gender" value={profileData.gender} onChange={handleChange}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label>Date of Birth:</label>
            <input type="date" name="dateOfBirth" value={profileData.dateOfBirth} onChange={handleChange} />
          </div>
          <div>
            <label>Mobile Number:</label>
            <input type="text" name="mobileNumber" value={profileData.mobileNumber} onChange={handleChange} />
          </div>

          
          <button type="button" onClick={handleUpdate}>Update</button>
          <br></br>
          {isProfileUpdated}
          {showSuccessMessage && <p>Profile updated successfully!</p>}
        </form>
      ) : (
        <div>
          <h2>Updated Profile Data</h2>
          <div className="profile-card">
            <p>Name: {profileData.name}</p>
            <p>Email: {profileData.email}</p>
            <p>Age: {profileData.age}</p>
            <p>Gender: {profileData.gender}</p>
            <p>Date of Birth: {profileData.dateOfBirth}</p>
            <p>Mobile Number: {profileData.mobileNumber}</p>
            {showEditButton && <button onClick={handleEdit}>Edit</button>}
          </div>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button> 
    </div>
    
  );
};

export default ProfilePage;
