import React, { useEffect, useState } from 'react';
import "./crud.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { productsByCategory } from './data';
import LoadingPage from './loading'; // Import the LoadingPage component
import Notification from './notification'; // Import the Notification component

const Crud = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Xod dog');
  const [loading, setLoading] = useState(false); // State for loading
  const [notification, setNotification] = useState(null); // State for notification
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://61fcfec8f62e220017ce4280.mockapi.io/kiyim-kechak/qishkiKiyimlar")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("Anqmi?");

    if (confirm) {
      axios
        .delete(`https://61fcfec8f62e220017ce4280.mockapi.io/kiyim-kechak/qishkiKiyimlar/${id}`)
        .then(() => {
          alert("Zakas Bekor qilindi");
          setData(data.filter((item) => item.id !== id));
        })
        .catch((err) => console.log(err));
    }
  };

  const handleAddProduct = (product) => {
    const productWithDate = {
      ...product,
      dateAdded: new Date().toISOString().split('T')[0]
    };

    axios
      .post("https://61fcfec8f62e220017ce4280.mockapi.io/kiyim-kechak/qishkiKiyimlar", productWithDate)
      .then((res) => {
        setData([...data, res.data]);
        setNotification("Maxsulot saqlandi Ishni boshlang!"); // Show notification
        setTimeout(() => setNotification(null), 3000); // Hide notification after 3 seconds
      })
      .catch((err) => {
        console.error("Eror:", err);
        alert("Saqlanmadi Serverda Muommo Bor!");
      });
  };

  const categories = ['Xod dog', 'Lavash', 'Gamburger', 'Donar', 'Suvlar'];

  const filteredProducts = productsByCategory[selectedCategory] || [];

  const handleAdminClick = () => {
    setLoading(true);
    setTimeout(() => { // Simulate a shorter delay of 0.5 seconds
      navigate('/');
      setLoading(false);
    }, 200); // Adjusted delay to 0.5 seconds
  };

  return (
    <div className="container">
      {loading && <LoadingPage />} {/* Show loading page when in loading state */}
      {notification && <Notification message={notification} onClose={() => setNotification(null)} />} {/* Show notification */}

      <div className="category-selector">
        <div className="btmasasa"></div>
        <button className="admin-button" onClick={handleAdminClick}>Admin</button>
        <h2>Bo'limni tanlang</h2>
        <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="popular-dishes">
        <h2>Ro'yxat</h2>
        <div className="dishes__list">
          {filteredProducts.map((product, index) => (
            <div className="dish__item" key={index}>
              <div className="dish__discount">LAVASH-XIT</div>
              <img src={product.avatar} alt={product.name} className="dish__image" />
              <h3 className="dish__name">{product.name}</h3>
              <div className="dish__rating">
                {Array(5).fill().map((_, i) => (
                  <span key={i}>&#9733;</span>
                ))}
              </div>
              <div className="dish__price">{product.price} So'm</div>
              <button className="dish__add" onClick={() => handleAddProduct(product)}>Sotish  </button>
              {/* <button className="dish__delete" onClick={() => handleDelete(product.id)}>Delete</button> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Crud;
