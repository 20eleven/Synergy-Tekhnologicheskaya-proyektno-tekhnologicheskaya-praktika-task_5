import React from 'react';

const Loader: React.FC = () => (
  <div className="d-flex justify-content-center mt-5">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Загрузка...</span>
    </div>
  </div>
);

export default Loader;