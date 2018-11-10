import React from 'react';
import './style.scss';

const Footer = () => (
  <footer>
    <div className="inner-footer">
      <section>Copyright &copy; {new Date().getFullYear()}.</section>
      <section>Made with <span role="img" aria-label="heart-emoji">❤️</span> by
        &nbsp;
        <a href="https://au.linkedin.com/in/francisco-preller-64508a5a">
          Francisco Preller
        </a>
      </section>
    </div>
  </footer>
);

export default Footer;
