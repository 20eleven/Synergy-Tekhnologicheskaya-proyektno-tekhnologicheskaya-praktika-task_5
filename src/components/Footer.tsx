import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light text-center text-muted py-3 mt-5">
      <div className="container">
        <small>{currentYear} Дневник путешествий</small>
      </div>
    </footer>
  );
};

export default Footer;