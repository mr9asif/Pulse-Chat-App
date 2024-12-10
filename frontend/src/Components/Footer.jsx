import React from 'react';

const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-4">
    <aside>
      <p className='text-center font-mono text-gray-600'>Copyright © {new Date().getFullYear()} - All right reserved by Pulse</p>
    </aside>
  </footer>
  );
};

export default Footer;
