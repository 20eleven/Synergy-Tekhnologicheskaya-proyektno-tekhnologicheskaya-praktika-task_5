import React, { useEffect, useState } from 'react';
import { Travel } from '../../types/types';
import Loader from '../Loader';

const TravelList: React.FC = () => {
  const [travels, setTravels] = useState<Travel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTravels = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const saved = JSON.parse(sessionStorage.getItem('travels') || '[]');
      setTravels(saved);
      setLoading(false);
    };

    fetchTravels();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container mt-4">
      <h2 className="text-center">Путешествия пользователей</h2>
      {travels.length === 0 ? (
        <p className="text-center">Пока нет путешествий - поделитесь своими впечатлениями</p>
      ) : (
        <div className="row">
          {travels.map((t) => (
            <div key={t.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{t.username}</h5>
                  <p><strong>Стоимость:</strong> {t.cost}</p>
                  <p><strong>Места:</strong> {t.places.join(', ')}</p>
                  <p>
                    <strong>Оценки:</strong><br />
                    Удобство: {t.mobility}, Безопасность: {t.safety},<br />
                    Населённость: {t.population}, Растительность: {t.vegetation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TravelList;