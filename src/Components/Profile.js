import React from 'react';

function Profile({ user, role, setActiveSection }) {
  return (
    <div className="admin-content">
      <div className="profile-section">
        <h2>Profile Info</h2>
        <p>Email: {user?.email}</p>
        <p>Role: {role}</p>
        <button onClick={() => setActiveSection(null)}>Close</button>
      </div>
    </div>
  );
}

export default Profile;
