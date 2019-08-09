import React from 'react';
import About from './About';
import LogInfo from './LogInfo';
import './Footer.scss';

const Footer = () => (
  <div className="footer">
    <About />
    <LogInfo />
    <div className="other">
      <div className="list">
        <a href="/">Groups</a>
        <a href="/">Frequently contracted</a>
        <a href="/">Preferences</a>
        <a href="/">Log out</a>
      </div>
    </div>
  </div>
);

export default Footer;
