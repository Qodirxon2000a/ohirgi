import React, { useState } from "react";
import "./create.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [inputData, setInputData] = useState({
    name: "",
    lastname: "",
    avatar: "", // Changed from 'number' to 'avatar'
    email: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("https://66a6197023b29e17a1a1ba9a.mockapi.io/group", inputData)
      .then((res) => {
        alert("Data posted successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error posting the data:", error);
        alert("Error posting data");
      });
  };

  return (
    <div className="create__container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Sarlavha:</label>
        <input
          type="text"
          name="name"
          id="name"
          className="form-control"
          value={inputData.name}
          onChange={(e) => setInputData({ ...inputData, name: e.target.value })}
        />
        
        <label htmlFor="lastname">Qoshimcha:</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          className="form-control"
          value={inputData.lastname}
          onChange={(e) => setInputData({ ...inputData, lastname: e.target.value })}
        />

        <label htmlFor="avatar">Avatar URL:</label>
        <input
          type="text"
          name="avatar"
          id="avatar"
          className="form-control"
          value={inputData.avatar}
          onChange={(e) => setInputData({ ...inputData, avatar: e.target.value })}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          className="form-control"
          value={inputData.email}
          onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
        />
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Create;
