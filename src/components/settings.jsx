// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './settings.css';

// const Settings = () => {
//   const [profile, setProfile] = useState({ name: '', email: '' });
//   const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });
//   const [notifications, setNotifications] = useState({ email: true, sms: false });
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const user = JSON.parse(localStorage.getItem('user'));
//         const res = await axios.get('http://localhost:3001/api/auth/profile', {
//           headers: { Authorization: `Bearer ${user.token}` },
//         });
//         setProfile({ name: res.data.name, email: res.data.email });
//       } catch (err) {
//         console.error('Error fetching profile:', err);
//       }
//     };
//     fetchProfile();
//   }, []);

//   const handleProfileChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   const handleSaveProfile = async () => {
//     try {
//       const user = JSON.parse(localStorage.getItem('user'));
//       await axios.put('http://localhost:3001/api/auth/profile', profile, {
//         headers: { Authorization: `Bearer ${user.token}` },
//       });
//       setMessage('Profile updated successfully.');
//     } catch (err) {
//       setMessage('Failed to update profile.');
//     }
//   };

//   const handlePasswordChange = async () => {
//     try {
//       const user = JSON.parse(localStorage.getItem('user'));
//       await axios.put(
//         'http://localhost:3001/api/auth/change-password',
//         passwords,
//         {
//           headers: { Authorization: `Bearer ${user.token}` },
//         }
//       );
//       setMessage('Password changed successfully.');
//       setPasswords({ currentPassword: '', newPassword: '' });
//     } catch (err) {
//       setMessage('Failed to change password.');
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     window.location.href = '/auth';
//   };

//   const handleDeleteAccount = () => {
//     const confirmed = window.confirm('Are you sure you want to delete your account? This cannot be undone.');
//     if (confirmed) {
//       const user = JSON.parse(localStorage.getItem('user'));
//       axios
//         .delete('http://localhost:3001/api/auth/delete', {
//           headers: { Authorization: `Bearer ${user.token}` },
//         })
//         .then(() => {
//           localStorage.removeItem('user');
//           window.location.href = '/';
//         })
//         .catch(() => setMessage('Failed to delete account.'));
//     }
//   };

//   return (
//     <div className="settings-container">
//       <h2>Settings</h2>

//       {message && <div className="message-box">{message}</div>}

//       <section>
//         <h3>Profile</h3>
//         <input name="name" value={profile.name} onChange={handleProfileChange} placeholder="Full Name" />
//         <input name="email" value={profile.email} onChange={handleProfileChange} placeholder="Email" />
//         <button onClick={handleSaveProfile}>Save Profile</button>
//       </section>

//       <section>
//         <h3>Change Password</h3>
//         <input
//           type="password"
//           name="currentPassword"
//           value={passwords.currentPassword}
//           onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
//           placeholder="Current Password"
//         />
//         <input
//           type="password"
//           name="newPassword"
//           value={passwords.newPassword}
//           onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
//           placeholder="New Password"
//         />
//         <button onClick={handlePasswordChange}>Change Password</button>
//       </section>

//       <section>
//         <h3>Notifications</h3>
//         <label>
//           <input
//             type="checkbox"
//             checked={notifications.email}
//             onChange={() => setNotifications({ ...notifications, email: !notifications.email })}
//           />
//           Email Notifications
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             checked={notifications.sms}
//             onChange={() => setNotifications({ ...notifications, sms: !notifications.sms })}
//           />
//           SMS Notifications
//         </label>
//       </section>

//       <section className="danger-zone">
//         <h3>Account Actions</h3>
//         <button className="logout" onClick={handleLogout}>Log Out</button>
//         <button className="delete" onClick={handleDeleteAccount}>Delete Account</button>
//       </section>
//     </div>
//   );
// };

// export default Settings;



import React, { useState } from 'react';
import './settings.css'; // Optional: custom styles

const Settings = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [language, setLanguage] = useState('English (US)');
  const [birthday, setBirthday] = useState('');

  const handleUpload = () => {
    // handle image upload
    alert('Upload functionality coming soon!');
  };

  const handleSendVerification = () => {
    alert('Verification email sent!');
  };

  return (
    <div className="settings-container" style={{ maxWidth: '700px', margin: 'auto', padding: '2rem' }}>
      <h2>Settings</h2>

      {/* Profile Photo */}
      <section className="section">
        <h4>Profile photo</h4>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#ccc' }} />
          <div>
            <button onClick={() => alert('Add photo clicked')} style={{ marginRight: '10px' }}>Add photo</button>
            <button onClick={handleUpload}>Upload photo</button>
          </div>
        </div>
      </section>

      {/* Name */}
      <section className="section">
        <h4>Name</h4>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p>{name}</p>
          <button onClick={() => setName(prompt('Enter your name:', name))}>Edit</button>
        </div>
      </section>

      {/* Email */}
      <section className="section">
        <h4>Email address</h4>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p>{email}</p>
          <button onClick={() => setEmail(prompt('Enter your email:', email))}>Edit</button>
        </div>
        
      </section>

      {/* Birthday */}
      <section className="section">
        <h4>Birthday</h4>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p>{birthday || 'Not set'}</p>
          <button onClick={() => setBirthday(prompt('Enter your birthday (YYYY-MM-DD):', birthday))}>
            {birthday ? 'Edit' : 'Add your birthday'}
          </button>
        </div>
      </section>

      {/* Password */}
      <section className="section">
        <h4>Password</h4>
        <button onClick={() => alert('Redirect to password change')}>Change password</button>
      </section>

      {/* Preferred Language */}
      <section className="section">
        <h4>Preferred communications language</h4>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p>{language}</p>
          <button onClick={() => setLanguage(prompt('Preferred language:', language))}>Edit</button>
        </div>
      </section>

      {/* Deactivate */}
      <section className="section" style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #ccc' }}>
        <p style={{ color: '#888' }}>
          If you deactivate your account, you won’t be able to log in anymore, and your fundraisers will no longer appear on the platform.
        </p>
        <button style={{ marginTop: '1rem', color: 'red', border: '1px solid red' }} onClick={() => alert('Deactivation started')}>
          Deactivate account
        </button>
      </section>
    </div>
  );
};

export default Settings;




