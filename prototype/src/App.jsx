import React from 'react';
import './styles/client-first-base.css';

function App() {
  return (
    <div className="page-wrapper">
      
      {/* Example Section - Replace with your components */}
      <div className="section_hero">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              
              <div className="hero_component">
                <div className="hero-content">
                  <h1 className="heading-style-h1">
                    Welcome to Client-First
                  </h1>
                  <p className="text-size-regular margin-top margin-small">
                    This prototype uses Finsweet's Client-First class system for seamless Webflow translation.
                  </p>
                  <a href="#" className="button-primary margin-top margin-medium">
                    Get Started
                  </a>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;