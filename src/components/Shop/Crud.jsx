import React, { useEffect, useState } from 'react';
import "./crud.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { productsByCategory } from './data';

const Crud = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Xod dog');
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
        alert("Maxsulot saqlandi Ishni boshlang!");
      })
      .catch((err) => {
        console.error("Eror:", err);
        alert("Saqlanmadi Serverda Muommo Bor!");
      });
  };

  const categories = ['Xod dog', 'Lavash', 'Gamburger', 'Donar', 'Suvlar'];

  const filteredProducts = productsByCategory[selectedCategory] || [];

  return (
    <div className="container">
      <div className="category-selector">
        <div className="btmasasa"></div>
        <button className="admin-button" onClick={() => navigate('/read')}>Admin</button>
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
              <div className="dish__discount">Bizda bor</div>
              <img src={product.avatar} alt={product.name} className="dish__image" />
              <h3 className="dish__name">{product.name}</h3>
              <div className="dish__rating">
                {Array(5).fill().map((_, i) => (
                  <span key={i}>&#9733;</span>
                ))}
              </div>
              <div className="dish__price">{product.price} So'm</div>
              <button className="dish__add" onClick={() => handleAddProduct(product)}>Buyurtma berish</button>
              {/* <button className="dish__delete" onClick={() => handleDelete(product.id)}>Delete</button> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Crud;
