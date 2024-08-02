import React, { useEffect, useState } from 'react';
import './date.css';
import axios from 'axios';

const DateComponent = () => {
  const [data, setData] = useState([]);
  const [newGame, setNewGame] = useState({
    date: '',
    time: '',
    homeTeam: '',
    awayTeam: '',
    venue: '',
    stream: ''
  });

  useEffect(() => {
    axios
      .get('https://66a87a83e40d3aa6ff582ddb.mockapi.io/Date')
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm('Admin Aminmisiz');

    if (confirm) {
      axios
        .delete(`https://66a87a83e40d3aa6ff582ddb.mockapi.io/Date/${id}`)
        .then(() => {
          alert('Muvofiqiyatli uchirildi');
          setData(data.filter((item) => item.id !== id));
        })
        .catch((err) => console.log(err));
    }
  };

  const handleChange = (e) => {
    setNewGame({ ...newGame, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://66a87a83e40d3aa6ff582ddb.mockapi.io/Date', newGame)
      .then((res) => {
        setData([...data, res.data]);
        setNewGame({ date: '', time: '', homeTeam: '', awayTeam: '', venue: '', stream: '' });
        alert('Oyin qo‘shildi');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="table__container">
      
      <table>
        <thead>
          <tr>
            <th>Sana</th>
            <th>Vaqt</th>
            <th>Uy jamoasi</th>
            <th>Mehmon jamoasi</th>
            <th>Stadion</th>
            <th>Stream</th>
            <th>Ammalar</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>{item.homeTeam}</td>
                <td>{item.awayTeam}</td>
                <td>{item.venue}</td>
                <td>{item.stream}</td>
                <td>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Malumot yuklanmadi</td>
            </tr>
          )}
        </tbody>
      </table>
          <div className="add">
          <h2>O'yin qoshish</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="date"
          value={newGame.date}
          onChange={handleChange}
          placeholder="Sana"
          required
        />
        <input
          type="time"
          name="time"
          value={newGame.time}
          onChange={handleChange}
          placeholder="Vaqt"
          required
        />
        <input
          type="text"
          name="homeTeam"
          value={newGame.homeTeam}
          onChange={handleChange}
          placeholder="Uy jamoasi"
          required
        />
        <input
          type="text"
          name="awayTeam"
          value={newGame.awayTeam}
          onChange={handleChange}
          placeholder="Mehmon jamoasi"
          required
        />
        <input
          type="text"
          name="venue"
          value={newGame.venue}
          onChange={handleChange}
          placeholder="Stadion"
          required
        />
        <input
          type="text"
          name="stream"
          value={newGame.stream}
          onChange={handleChange}
          placeholder="Stream (Bor/Yo'q)"
          required
        />
        <button type="submit">Oyin qo'shish</button>
      </form>
          </div>
    </div>
  );
};

export default DateComponent;
