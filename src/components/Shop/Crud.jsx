import React, { useEffect, useState } from 'react';
import "./crud.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Crud = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Xod dog');
  const navigate = useNavigate();

  // Define products for each category
  const productsByCategory = {
    'Xod dog': [
      { name: 'Xod Dog Oddiy', category: 'Xod dog', price: 8000, avatar: 'https://via.placeholder.com/150?text=XOd+Dog+Special' },
      { name: 'Xod Dog Ikktalik', category: 'Xod dog', price: 10000, avatar: 'https://via.placeholder.com/150?text=XOd+Dog+Special' },
      { name: 'Xod Dog Goshtli', category: 'Xod dog', price: 18000, avatar: 'https://via.placeholder.com/150?text=XOd+Dog+Special' },
      { name: 'Xod Dog Goshtli', category: 'Xod dog', price: 15000, avatar: 'https://via.placeholder.com/150?text=XOd+Dog+Special' },
      { name: 'Xod Dog Goshtli', category: 'Xod dog', price: 20000, avatar: 'https://via.placeholder.com/150?text=XOd+Dog+Special' },
      { name: 'Xod Dog Sirli', category: 'Xod dog', price: 12000, avatar: 'https://via.placeholder.com/150?text=XOd+Dog+Special' },
      { name: 'Xod Dog Sirli', category: 'Xod dog', price: 15000, avatar: 'https://via.placeholder.com/150?text=XOd+Dog+Special' },
      { name: 'Xod Dog Sirli', category: 'Xod dog', price: 18000, avatar: 'https://via.placeholder.com/150?text=XOd+Dog+Special' },
    ],
    'Lavash': [
      { name: 'Lavash oddiy', category: 'Lavash', price: 18000, avatar: 'https://via.placeholder.com/150?text=Lavash+Roll' },
      { name: 'Lavash Oddiy', category: 'Lavash', price: 20000, avatar: 'https://via.placeholder.com/150?text=Lavash+Roll' },
      { name: 'Lavash Zakas', category: 'Lavash', price: 25000, avatar: 'https://via.placeholder.com/150?text=Lavash+Roll' },
      { name: 'Lavash Zakas', category: 'Lavash', price: 30000, avatar: 'https://via.placeholder.com/150?text=Lavash+Roll' },
      { name: 'Lavash Sirli', category: 'Lavash', price: 25000, avatar: 'https://via.placeholder.com/150?text=Lavash+Roll' },
      { name: 'Lavash Sirli', category: 'Lavash', price: 30000, avatar: 'https://via.placeholder.com/150?text=Lavash+Roll' },
      { name: 'Lavash Tandir', category: 'Lavash', price: 25000, avatar: 'https://via.placeholder.com/150?text=Lavash+Roll' },
      { name: 'Lavash Tandir', category: 'Lavash', price: 30000, avatar: 'https://via.placeholder.com/150?text=Lavash+Roll' },
    ],
    'Gamburger': [
      { name: 'Gamburger oddiy', category: 'Gamburger', price: 15000, avatar: 'https://via.placeholder.com/150?text=GAmburger+Classic' },
      { name: 'Gamburger Zakas', category: 'Gamburger', price: 18000, avatar: 'https://via.placeholder.com/150?text=GAmburger+Classic' },
      { name: 'Gamburger Goshtli', category: 'Gamburger', price: 20000, avatar: 'https://via.placeholder.com/150?text=GAmburger+Classic' },
      { name: 'Gamburger Sirli', category: 'Gamburger', price: 18000, avatar: 'https://via.placeholder.com/150?text=GAmburger+Classic' },
      { name: 'Gamburger Sirli', category: 'Gamburger', price: 20000, avatar: 'https://via.placeholder.com/150?text=GAmburger+Classic' },
    ],
    'Donar': [
      { name: 'Donar Oddiy', category: 'Donar', price: 18000, avatar: 'https://via.placeholder.com/150?text=Donar+Classic' },
      { name: 'Donar Zakaz', category: 'Donar', price: 18000, avatar: 'https://via.placeholder.com/150?text=Donar+Special' },
      { name: 'Donar Goshtli', category: 'Donar', price: 20000, avatar: 'https://via.placeholder.com/150?text=Donar+Special' },
      { name: 'Donar Sirli', category: 'Donar', price: 18000, avatar: 'https://via.placeholder.com/150?text=Donar+Special' },
      { name: 'Donar Sirli', category: 'Donar', price: 20000, avatar: 'https://via.placeholder.com/150?text=Donar+Special' },
    ],
    'Suvlar': [
      { name: 'Coca-cola 0.5', category: 'Suvlar', price: 7000, avatar: 'https://via.placeholder.com/150?text=Sparkling+Water' },
      { name: 'Coca-cola 1', category: 'Suvlar', price: 12000, avatar: 'https://via.placeholder.com/150?text=Sparkling+Water' },
      { name: 'Coca-cola 1.5', category: 'Suvlar', price: 15000, avatar: 'https://via.placeholder.com/150?text=Sparkling+Water' },
      { name: 'Fanta 0.5', category: 'Suvlar', price: 7000, avatar: 'https://via.placeholder.com/150?text=Sparkling+Water' },
      { name: 'Fanta 1', category: 'Suvlar', price: 12000, avatar: 'https://via.placeholder.com/150?text=Sparkling+Water' },
      { name: 'Fanta 1.5', category: 'Suvlar', price: 15000, avatar: 'https://via.placeholder.com/150?text=Sparkling+Water' },
      { name: 'Pepsi 0.5', category: 'Suvlar', price: 7000, avatar: 'https://via.placeholder.com/150?text=Sparkling+Water' },
      { name: 'Pepsi 1', category: 'Suvlar', price: 12000, avatar: 'https://via.placeholder.com/150?text=Sparkling+Water' },
      { name: 'Pepsi 1.5', category: 'Suvlar', price: 15000, avatar: 'https://via.placeholder.com/150?text=Sparkling+Water' },
      { name: 'Gazlanmagan 0.5', category: 'Suvlar', price: 2000, avatar: 'https://via.placeholder.com/150?text=Sparkling+Water' },
      { name: 'Gazlanmagan 1', category: 'Suvlar', price: 3000, avatar: 'https://via.placeholder.com/150?text=Sparkling+Water' },
    ],
  };

  useEffect(() => {
    axios
      .get("https://66a87a83e40d3aa6ff582ddb.mockapi.io/Fast")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("Do you want to delete this item?");

    if (confirm) {
      axios
        .delete(`https://66a87a83e40d3aa6ff582ddb.mockapi.io/Fast/${id}`)
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
      dateAdded: new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD
    };

    axios
      .post("https://66a87a83e40d3aa6ff582ddb.mockapi.io/Fast", productWithDate)
      .then((res) => {
        setData([...data, res.data]);
        alert("Maxsulot saqlandi Ishni boshlang!");
      })
      .catch((err) => {
        console.error("Error adding product:", err);
        alert("Failed to add product");
      });
  };

  const categories = ['Xod dog', 'Lavash', 'Gamburger', 'Donar', 'Suvlar'];

  const filteredProducts = productsByCategory[selectedCategory] || [];

  return (
    <div className="container">
      <div className="category-selector">
       <div className="btmasasa">
        
        </div> 
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
              <div className="dish__discount">Popular</div>
              <img src={product.avatar} alt={product.name} className="dish__image"/>
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

      {/* Admin Button */}
      
    </div>
  );
};

export default Crud;
