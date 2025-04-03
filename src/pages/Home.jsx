import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";

const Home = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Toggle theme function
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
    document.body.classList.toggle('dark-theme');
  };

  // Toggle sidebar function (for mobile)
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='roopa'>
    <div className={`app-container ${darkTheme ? 'dark-theme' : ''}`}>
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <img src="https://i.imgur.com/98N8lgv.jpeg" className="logo" alt="Logo" />
          
        </div>
        
        <div className="sidebar-divider">
          <span>Main Menu</span>
        </div>
        
        <nav className="side-nav">
          <ul>
            <li className="nav-item">
              <Link to='/doc' className="nav-link">
               
                <span>Try Now</span>
                <span className="badge new">New</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to='/' className="nav-link active">
                
                <span>Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to='/rec' className="nav-link">
                <span>Recent</span>
                <span className="badge count">3</span>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link to='/chat' className="nav-link">
                
                <span>About</span>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link to='/contact' className="nav-link">
                
                <span>Contact</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="sidebar-divider">
          <span>Resources</span>
        </div>
        
        <div className="sidebar-cta">
          <div className="cta-content">
            <h3>Upgrade to Pro</h3>
            <p>Get access to premium features</p>
            <button className="btn-upgrade"><Link to='/price'>
              <i className='bx bx-crown'></i> Upgrade</Link>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Top Navigation */}
        <header className="top-header">
          <div className="header-left">
            <button 
              className="menu-toggle" 
              onClick={toggleSidebar}
              aria-label="Toggle menu"
            >
              <i className='bx bx-menu'></i>
            </button>
            
          </div>
          
          <div className="header-right">
            <button 
              className="theme-toggle" 
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >☀️
              {darkTheme ? <i className='bx bx-sun'></i> : <i className='bx bx-moon'></i>}
            </button>
            
            
            
            <div className="auth-buttons">
              <Link to='/login1' className="btn-login">Login</Link>
              <Link to='/signup1' className="btn-signup">Sign Up</Link>
            </div>
            
            <button className="btn-help" aria-label="Help">
              <i className='bx bx-help-circle'></i>𝒷
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-backdrop"></div>
          <div className="hero-container">
            <div className="hero-content">
              <span className="hero-tagline">Discover What's Possible</span>
              <h1>Transform Your Experience with Our Platform</h1>
              <p>
                Unlock powerful tools and resources designed to elevate your workflow,
                boost productivity, and help you achieve more with less effort.
              </p>
              
              <div className="cta-group">
                <Link to="/doc" className="btn btn-primary">
                  Get Started <i className='bx bx-right-arrow-alt'></i>
                </Link>
                <Link to="/about" className="btn btn-secondary">
                  Learn More
                </Link>
              </div>
              
              
            </div>
            
            <div className="hero-image">
              {/* This would be replaced with an actual image in production */}
              <div className="placeholder-graphic"></div>
            </div>
          </div>
        </section>
      </main>
    </div>
    </div>
  );
};

export default Home;