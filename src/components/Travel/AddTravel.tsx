import React, { useState } from 'react';
import { Travel } from '../../types/types';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddTravel: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [cost, setCost] = useState<number>(0);
  const [places, setPlaces] = useState<string[]>([]);
  const [placeInput, setPlaceInput] = useState<string>('');
  const [mobility, setMobility] = useState<number>(3);
  const [safety, setSafety] = useState<number>(3);
  const [population, setPopulation] = useState<number>(3);
  const [vegetation, setVegetation] = useState<number>(3);
  const [loading, setLoading] = useState(false);

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const handleAddPlace = () => {
    if (placeInput.trim()) {
      setPlaces([...places, placeInput.trim()]);
      setPlaceInput('');
    }
  };

  const handleRemovePlace = (index: number) => {
    setPlaces(places.filter((_, i) => i !== index));
  };

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      setCost(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    const newTravel: Travel = {
      id: Date.now().toString(),
      userId: currentUser.id,
      username: currentUser.username,
      cost,
      places,
      mobility,
      safety,
      population,
      vegetation,
    };

    const travels = JSON.parse(sessionStorage.getItem('travels') || '[]');
    sessionStorage.setItem('travels', JSON.stringify([...travels, newTravel]));

    alert('Путешествие добавлено!');
    setLoading(false);

    setCost(0);
    setPlaces([]);
    setMobility(3);
    setSafety(3);
    setPopulation(3);
    setVegetation(3);
  };

  return (
    <div className="container mt-4">
      <div className="col-lg-8 mx-auto">
        <div className="card p-4 shadow">
          <h2 className="text-center">Добавить путешествие</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Стоимость путешествия</label>
              <input
                type="number"
                className="form-control"
                value={cost}
                onChange={handleCostChange}
                min="0"
                required
              />
            </div>

            <div className="mb-3">
              <label>Места для посещения</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={placeInput}
                  onChange={(e) => setPlaceInput(e.target.value)}
                  placeholder="Введите место"
                />
                <button type="button" className="btn btn-outline-secondary" onClick={handleAddPlace}>
                  Добавить
                </button>
              </div>
              <ul className="list-group mt-2">
                {places.map((p, i) => (
                  <li key={i} className="list-group-item d-flex justify-content-between">
                    {p}
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemovePlace(i)}
                    >
                      Удалить
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-3">
              <label>Удобство передвижения (1-5)</label>
              <input
                type="range"
                min="1"
                max="5"
                value={mobility}
                onChange={(e) => setMobility(Number(e.target.value))}
                className="form-range"
              />
              <span>{mobility}</span>
            </div>

            <div className="mb-3">
              <label>Безопасность (1-5)</label>
              <input
                type="range"
                min="1"
                max="5"
                value={safety}
                onChange={(e) => setSafety(Number(e.target.value))}
                className="form-range"
              />
              <span>{safety}</span>
            </div>

            <div className="mb-3">
              <label>Населённость (1-5)</label>
              <input
                type="range"
                min="1"
                max="5"
                value={population}
                onChange={(e) => setPopulation(Number(e.target.value))}
                className="form-range"
              />
              <span>{population}</span>
            </div>

            <div className="mb-3">
              <label>Растительность (1-5)</label>
              <input
                type="range"
                min="1"
                max="5"
                value={vegetation}
                onChange={(e) => setVegetation(Number(e.target.value))}
                className="form-range"
              />
              <span>{vegetation}</span>
            </div>

            <button type="submit" className="btn btn-success w-100" disabled={loading}>
              {loading ? 'Сохранение...' : 'Сохранить путешествие'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTravel;