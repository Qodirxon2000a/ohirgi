import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./update.css"; // Ensure you have a CSS file for styling

const Update = () => {
  const { id } = useParams();
  const [inputData, setInputData] = useState({
    name: "",
    lastname: "",
    email: "",
    avatar: "" // Added avatar field
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://66a6197023b29e17a1a1ba9a.mockapi.io/group/${id}`)
      .then((res) => {
        setInputData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch data:", err);
        setError("Failed to load data.");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputData.name || !inputData.lastname || !inputData.email) {
      setError("All fields are required.");
      return;
    }

    axios
      .put(`https://66a6197023b29e17a1a1ba9a.mockapi.io/group/${id}`, inputData)
      .then(() => {
        alert("Data updated successfully");
        navigate("/");
      })
      .catch((err) => {
        console.error("Failed to update data:", err);
        setError("Failed to update data.");
      });
  };

  return (
    <div className="update__container">
      <h2>Update Data</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message" aria-live="assertive">{error}</p>}
          
          <label htmlFor="avatar">Avatar URL:</label>
          <input
            type="text"
            name="avatar"
            id="avatar"
            className="form-control"
            value={inputData.avatar}
            onChange={(e) => setInputData({ ...inputData, avatar: e.target.value })}
          />
          
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={inputData.name}
            onChange={(e) => setInputData({ ...inputData, name: e.target.value })}
            required
          />
          
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            className="form-control"
            value={inputData.lastname}
            onChange={(e) => setInputData({ ...inputData, lastname: e.target.value })}
            required
          />
          
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={inputData.email}
            onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
            required
          />
          
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
};

export default Update;
