"use client";
import React, { useState } from 'react';
import { User, Lock, Save, Camera, Trash2 } from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  React.useEffect(() => {
    const savedPhoto = localStorage.getItem('nexa_profile_photo');
    if (savedPhoto) setProfilePhoto(savedPhoto);
  }, []);

  const updateProfilePhoto = (photo: string | null) => {
    setProfilePhoto(photo);
    if (photo) {
      localStorage.setItem('nexa_profile_photo', photo);
    } else {
      localStorage.removeItem('nexa_profile_photo');
    }
    // Notify other components (like TopNavbar in Layout)
    window.dispatchEvent(new Event('profilePhotoUpdated'));
  };

  return (
    <div className="settings-page-container animate-elegant-entry">
      <div className="settings-header">
        <h1 className="settings-title">Profile Settings</h1>
        <p className="settings-subtitle">Manage your account information and security.</p>
      </div>

      <div className="settings-card">
        <div className="settings-tabs">
          <button 
            className={`settings-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={18} strokeWidth={2.5} />
            Profile Information
          </button>
          <button 
            className={`settings-tab ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <Lock size={18} strokeWidth={2.5} />
            Change Password
          </button>
        </div>

        <div className="settings-content">
          <form className="settings-form" onSubmit={(e) => e.preventDefault()}>
            {activeTab === 'profile' ? (
              <>
                {/* Profile Photo Section */}
                <div className="profile-photo-section">
                  <div className="photo-preview-container">
                    <div className="photo-preview">
                      {profilePhoto ? (
                        <img src={profilePhoto} alt="Profile" />
                      ) : (
                        "AJ"
                      )}
                      <label htmlFor="photo-upload" className="photo-edit-overlay">
                        <Camera size={24} />
                      </label>
                    </div>
                  </div>
                  <div className="photo-controls">
                    <h3 className="photo-label">Profile Photo</h3>
                    <p className="photo-hint">Expand your presence with a professional photo. PNG or JPG, max 5MB.</p>
                    <div className="photo-btn-group">
                      <label htmlFor="photo-upload" className="btn-photo-upload" style={{ cursor: 'pointer' }}>
                        Change Photo
                      </label>
                      <input 
                        id="photo-upload" 
                        type="file" 
                        accept="image/*" 
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              updateProfilePhoto(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <button 
                        type="button" 
                        className="btn-photo-remove"
                        onClick={() => updateProfilePhoto(null)}
                      >
                        <Trash2 size={16} style={{ marginRight: '8px' }} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                <div className="settings-form-group">
                  <label className="settings-label">Full Name</label>
                  <input 
                    type="text" 
                    className="settings-input" 
                    defaultValue="John Doe" 
                  />
                </div>

                <div className="settings-form-group">
                  <label className="settings-label">Email Address</label>
                  <input 
                    type="email" 
                    className="settings-input" 
                    defaultValue="landrate2000@gmail.com" 
                  />
                </div>

                <div className="settings-form-group">
                  <label className="settings-label">Position</label>
                  <input 
                    type="text" 
                    className="settings-input disabled" 
                    defaultValue="Class Monitor"
                    readOnly
                    disabled 
                  />
                  <span className="settings-helper-text">Contact an administrator to change your position</span>
                </div>

                <div className="settings-form-group">
                  <label className="settings-label">Role</label>
                  <input 
                    type="text" 
                    className="settings-input disabled" 
                    defaultValue="Student"
                    readOnly
                    disabled 
                  />
                  <span className="settings-helper-text">Your account role</span>
                </div>
              </>
            ) : (
              <>
                <div className="settings-form-group">
                  <label className="settings-label">Current Password</label>
                  <input 
                    type="password" 
                    className="settings-input" 
                    placeholder="Enter your current password" 
                  />
                </div>

                <div className="settings-form-group">
                  <label className="settings-label">New Password</label>
                  <input 
                    type="password" 
                    className="settings-input" 
                    placeholder="Enter new password" 
                  />
                  <span className="settings-helper-text">Must be at least 8 characters long</span>
                </div>

                <div className="settings-form-group">
                  <label className="settings-label">Confirm New Password</label>
                  <input 
                    type="password" 
                    className="settings-input" 
                    placeholder="Re-enter new password" 
                  />
                </div>
              </>
            )}

            <button type="submit" className="settings-btn-submit">
              <Save size={20} strokeWidth={2.5} />
              {activeTab === 'profile' ? 'Save Changes' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
