"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FileText, List, Shield, Bell, Settings, LogOut, LayoutDashboard, Menu, X, Search, Plus, Sparkles } from 'lucide-react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  // Close sidebar when route changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const [greeting, setGreeting] = useState("Welcome back");
  
  useEffect(() => {
    // Load persisted profile photo
    const savedPhoto = localStorage.getItem('nexa_profile_photo');
    if (savedPhoto) setProfilePhoto(savedPhoto);

    // Dynamic greeting
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    // Listen for storage changes (to sync across tabs/pages)
    const handleStorageChange = () => {
      const updatedPhoto = localStorage.getItem('nexa_profile_photo');
      setProfilePhoto(updatedPhoto);
    };
    window.addEventListener('storage', handleStorageChange);
    // Custom event for same-window updates
    window.addEventListener('profilePhotoUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('profilePhotoUpdated', handleStorageChange);
    };
  }, []);

  return (
    <div className="dashboard-layout">
      {/* Mobile Header */}
      <header className="mobile-nav-header">
        <button className="menu-toggle-btn" onClick={toggleSidebar} aria-label="Toggle Menu">
          <Menu size={24} />
        </button>
        <div className="mobile-brand">NEXA</div>
        <div style={{ width: 40 }}></div> {/* Spacer for symmetry */}
      </header>

      {/* Sidebar Overlay */}
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'visible' : ''}`} 
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo-container">
            <div className="logo-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 100 100" fill="none">
                <g>
                  {/* Inner Translucent White Triangle */}
                  <polygon points="50,26 78,75 22,75" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="3" strokeLinejoin="round" />
                  
                  {/* Faint Circles behind the dots */}
                  <circle cx="26" cy="57" r="8" fill="rgba(255,255,255,0.15)" />
                  <circle cx="67" cy="45" r="8" fill="rgba(255,255,255,0.15)" />

                  {/* Outer White Triangle (Animated) */}
                  <polygon className="logo-outer-path" points="50,15 90,85 10,85" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinejoin="round" />

                  {/* Wavy Intersecting Line (Animated) */}
                  <path className="logo-wavy-path" d="M 26 57 C 38 75, 55 30, 67 45" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />

                  {/* Solid End Dots */}
                  <circle cx="26" cy="57" r="4.5" fill="#FFFFFF" />
                  <circle cx="67" cy="45" r="4.5" fill="#FFFFFF" />

                  {/* Small Center Pulsing Dot */}
                  <circle cx="50" cy="71" r="3" fill="#FFFFFF" className="logo-pulse-dot" />
                </g>
              </svg>
            </div>
            <div className="sidebar-brand">Nexa</div>
            {/* Close button for mobile sidebar */}
            <button className="menu-toggle-btn mobile-only" onClick={toggleSidebar} style={{ display: isSidebarOpen ? 'flex' : 'none', marginLeft: 'auto' }}>
              <X size={24} />
            </button>
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link href="/dashboard" className={pathname === "/dashboard" ? "nav-item active" : "nav-item"}>
            <LayoutDashboard className="icon" size={20} />
            Dashboard
          </Link>

          <Link href="/dashboard/submit" className={pathname === "/dashboard/submit" ? "nav-item active" : "nav-item"}>
            <FileText className="icon" size={20} />
            Submit Issue
          </Link>
          
          <Link href="/dashboard/issues" className={pathname === "/dashboard/issues" ? "nav-item active" : "nav-item"}>
            <List className="icon" size={20} />
            My Issues
          </Link>

          <Link href="/dashboard/public" className={pathname === "/dashboard/public" ? "nav-item active" : "nav-item"}>
            <Shield className="icon" size={20} />
            Public Feed
          </Link>

          <Link href="/dashboard/notifications" className={pathname === "/dashboard/notifications" ? "nav-item active" : "nav-item"}>
            <Bell className="icon" size={20} />
            Notifications
            <span className="nav-badge">2</span>
          </Link>

          <Link href="/dashboard/settings" className={pathname === "/dashboard/settings" ? "nav-item active" : "nav-item"}>
            <Settings className="icon" size={20} />
            Settings
          </Link>
        </nav>

        {/* Sidebar Promo / Extra Feature */}
        <div className="sidebar-promo">
          <Sparkles className="promo-icon" size={20} color="white" style={{ marginBottom: '0.5rem', opacity: 0.8 }} />
          <div className="promo-title">Nexa Pro</div>
          <p style={{ fontSize: '0.7rem', opacity: 0.6, marginBottom: '0.8rem' }}>Unlock advanced analytics and priority support.</p>
          <button className="promo-btn">Upgrade Now</button>
        </div>

        <div className="sidebar-footer">
          <Link href="/login" className="nav-item">
            <LogOut className="icon" size={20} />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main animate-slide-up" style={{ padding: 0 }}>
        {/* Unique Top Navbar */}
        <nav className="top-navbar">
          <div className="navbar-left">
            <div className="navbar-search">
              <Search className="search-icon" size={18} />
              <input type="text" placeholder="Search for issues..." className="navbar-search-input" />
              <kbd className="search-shortcut">⌘K</kbd>
            </div>
          </div>

          <div className="navbar-right">
            <div className="navbar-actions">
              <button className="nav-action-btn" aria-label="Quick Add">
                <Plus size={20} />
              </button>
              <button 
                className="nav-action-btn" 
                aria-label="Notifications"
                onClick={() => router.push('/dashboard/notifications')}
              >
                <Bell size={20} />
                <span className="dot"></span>
              </button>
            </div>

            <div className="user-profile-section">
              <div className="user-info">
                <span className="user-name">{greeting}, Alex</span>
                <span className="user-role">Student Portal</span>
              </div>
              <div className="user-avatar">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
                ) : (
                  "AJ"
                )}
              </div>
            </div>
          </div>
        </nav>

        <div className="dashboard-content-wrapper" style={{ padding: '0 3rem 3rem 3rem' }}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
