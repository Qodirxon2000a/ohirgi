import React, { useEffect, useState } from 'react';
import "./crud.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Crud = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Xod dog');
  const navigate = useNavigate();

  const productsByCategory = {
    'Xod dog': [
      { name: 'Xod Dog Oddiy', category: 'Xod dog', price: 8000, avatar: 'https://img.postershop.me/cdn-cgi/image/width=1024,format=webp/https://img.postershop.me/6520/4e0cb71a-df5f-4722-a9f2-5054d0432ec1_image.jpg' },
      { name: 'Xod Dog Ikktalik', category: 'Xod dog', price: 10000, avatar: 'https://img.postershop.me/cdn-cgi/image/width=1024,format=webp/https://img.postershop.me/6520/4e0cb71a-df5f-4722-a9f2-5054d0432ec1_image.jpg' },
      { name: 'Xod Dog Goshtli', category: 'Xod dog', price: 18000, avatar: 'https://img.postershop.me/cdn-cgi/image/width=1024,format=webp/https://img.postershop.me/6520/4e0cb71a-df5f-4722-a9f2-5054d0432ec1_image.jpg' },
      { name: 'Xod Dog Goshtli', category: 'Xod dog', price: 15000, avatar: 'https://img.postershop.me/cdn-cgi/image/width=1024,format=webp/https://img.postershop.me/6520/4e0cb71a-df5f-4722-a9f2-5054d0432ec1_image.jpg' },
      { name: 'Xod Dog Goshtli', category: 'Xod dog', price: 20000, avatar: 'https://img.postershop.me/cdn-cgi/image/width=1024,format=webp/https://img.postershop.me/6520/4e0cb71a-df5f-4722-a9f2-5054d0432ec1_image.jpg' },
      { name: 'Xod Dog Sirli', category: 'Xod dog', price: 12000, avatar: 'https://img.postershop.me/cdn-cgi/image/width=1024,format=webp/https://img.postershop.me/6520/4e0cb71a-df5f-4722-a9f2-5054d0432ec1_image.jpg' },
      { name: 'Xod Dog Sirli', category: 'Xod dog', price: 15000, avatar: 'https://img.postershop.me/cdn-cgi/image/width=1024,format=webp/https://img.postershop.me/6520/4e0cb71a-df5f-4722-a9f2-5054d0432ec1_image.jpg' },
      { name: 'Xod Dog Sirli', category: 'Xod dog', price: 18000, avatar: 'https://img.postershop.me/cdn-cgi/image/width=1024,format=webp/https://img.postershop.me/6520/4e0cb71a-df5f-4722-a9f2-5054d0432ec1_image.jpg' },
    ],
    'Lavash': [
      { name: 'Lavash oddiy', category: 'Lavash', price: 18000, avatar: 'https://anhor.uz/wp-content/uploads/2023/12/side_view_chicken_roll_grilled_chicken_lettuce_cucumber_tomato_mayo_pita_1200x675.jpg' },
      { name: 'Lavash Oddiy', category: 'Lavash', price: 20000, avatar: 'https://anhor.uz/wp-content/uploads/2023/12/side_view_chicken_roll_grilled_chicken_lettuce_cucumber_tomato_mayo_pita_1200x675.jpg' },
      { name: 'Lavash Zakas', category: 'Lavash', price: 25000, avatar: 'https://anhor.uz/wp-content/uploads/2023/12/side_view_chicken_roll_grilled_chicken_lettuce_cucumber_tomato_mayo_pita_1200x675.jpg' },
      { name: 'Lavash Zakas', category: 'Lavash', price: 30000, avatar: 'https://anhor.uz/wp-content/uploads/2023/12/side_view_chicken_roll_grilled_chicken_lettuce_cucumber_tomato_mayo_pita_1200x675.jpg' },
      { name: 'Lavash Sirli', category: 'Lavash', price: 25000, avatar: 'https://anhor.uz/wp-content/uploads/2023/12/side_view_chicken_roll_grilled_chicken_lettuce_cucumber_tomato_mayo_pita_1200x675.jpg' },
      { name: 'Lavash Sirli', category: 'Lavash', price: 30000, avatar: 'https://anhor.uz/wp-content/uploads/2023/12/side_view_chicken_roll_grilled_chicken_lettuce_cucumber_tomato_mayo_pita_1200x675.jpg' },
      { name: 'Lavash Tandir', category: 'Lavash', price: 25000, avatar: 'https://anhor.uz/wp-content/uploads/2023/12/side_view_chicken_roll_grilled_chicken_lettuce_cucumber_tomato_mayo_pita_1200x675.jpg' },
      { name: 'Lavash Tandir', category: 'Lavash', price: 30000, avatar: 'https://anhor.uz/wp-content/uploads/2023/12/side_view_chicken_roll_grilled_chicken_lettuce_cucumber_tomato_mayo_pita_1200x675.jpg' },
    ],
    'Gamburger': [
      { name: 'Gamburger oddiy', category: 'Gamburger', price: 15000, avatar: 'https://storage.kun.uz/source/3/HcqVWhomBSdXVfcpBcn5f9IM84ivkQr6.jpg' },
      { name: 'Gamburger Zakas', category: 'Gamburger', price: 18000, avatar: 'https://storage.kun.uz/source/3/HcqVWhomBSdXVfcpBcn5f9IM84ivkQr6.jpg' },
      { name: 'Gamburger Goshtli', category: 'Gamburger', price: 20000, avatar: 'https://storage.kun.uz/source/3/HcqVWhomBSdXVfcpBcn5f9IM84ivkQr6.jpg' },
      { name: 'Gamburger Sirli', category: 'Gamburger', price: 18000, avatar: 'https://storage.kun.uz/source/3/HcqVWhomBSdXVfcpBcn5f9IM84ivkQr6.jpg' },
      { name: 'Gamburger Sirli', category: 'Gamburger', price: 20000, avatar: 'https://storage.kun.uz/source/3/HcqVWhomBSdXVfcpBcn5f9IM84ivkQr6.jpg' },
    ],
    'Donar': [
      { name: 'Donar Oddiy', category: 'Donar', price: 18000, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEMhhmO1UXHWU2yEaNTY70fW1Ux75nw58Mf909aU96yAgIzAOZzIPTaGNtzvqBO1AvQTI&usqp=CAU' },
      { name: 'Donar Zakaz', category: 'Donar', price: 18000, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEMhhmO1UXHWU2yEaNTY70fW1Ux75nw58Mf909aU96yAgIzAOZzIPTaGNtzvqBO1AvQTI&usqp=CAU' },
      { name: 'Donar Goshtli', category: 'Donar', price: 20000, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEMhhmO1UXHWU2yEaNTY70fW1Ux75nw58Mf909aU96yAgIzAOZzIPTaGNtzvqBO1AvQTI&usqp=CAU' },
      { name: 'Donar Sirli', category: 'Donar', price: 18000, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEMhhmO1UXHWU2yEaNTY70fW1Ux75nw58Mf909aU96yAgIzAOZzIPTaGNtzvqBO1AvQTI&usqp=CAU' },
      { name: 'Donar Sirli', category: 'Donar', price: 20000, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEMhhmO1UXHWU2yEaNTY70fW1Ux75nw58Mf909aU96yAgIzAOZzIPTaGNtzvqBO1AvQTI&usqp=CAU' },
    ],
    'Suvlar': [
      { name: 'Coca-cola 0.5', category: 'Suvlar', price: 7000, avatar: 'https://niholjoja.uz/wa-data/public/shop/products/64/00/64/images/78/78.970.png' },
      { name: 'Coca-cola 1', category: 'Suvlar', price: 12000, avatar: 'https://niholjoja.uz/wa-data/public/shop/products/64/00/64/images/78/78.970.png' },
      { name: 'Coca-cola 1.5', category: 'Suvlar', price: 15000, avatar: 'https://niholjoja.uz/wa-data/public/shop/products/64/00/64/images/78/78.970.png' },
      { name: 'Fanta 0.5', category: 'Suvlar', price: 7000, avatar: 'https://olcha.uz/image/original/products/2023-01-17/gazirovannyy-napitok-fanta-orange-05-l-190963-0.jpg' },
      { name: 'Fanta 1', category: 'Suvlar', price: 12000, avatar: 'https://olcha.uz/image/original/products/2023-01-17/gazirovannyy-napitok-fanta-orange-05-l-190963-0.jpg' },
      { name: 'Fanta 1.5', category: 'Suvlar', price: 15000, avatar: 'https://olcha.uz/image/original/products/2023-01-17/gazirovannyy-napitok-fanta-orange-05-l-190963-0.jpg' },
      { name: 'Pepsi 0.5', category: 'Suvlar', price: 7000, avatar: 'https://1119001045.rsc.cdn77.org/wa-data/public/shop/products/86/30/3086/images/2216/Napitok_Gazirovannyy_PEPSI_05_l.650@2x.jpg' },
      { name: 'Pepsi 1', category: 'Suvlar', price: 12000, avatar: 'https://1119001045.rsc.cdn77.org/wa-data/public/shop/products/86/30/3086/images/2216/Napitok_Gazirovannyy_PEPSI_05_l.650@2x.jpg' },
      { name: 'Pepsi 1.5', category: 'Suvlar', price: 15000, avatar: 'https://1119001045.rsc.cdn77.org/wa-data/public/shop/products/86/30/3086/images/2216/Napitok_Gazirovannyy_PEPSI_05_l.650@2x.jpg' },
      { name: 'Gazlanmagan 0.5', category: 'Suvlar', price: 2000, avatar: 'https://1119001045.rsc.cdn77.org/wa-data/public/shop/products/86/30/3086/images/2216/Napitok_Gazirovannyy_PEPSI_05_l.650@2x.jpg' },
      { name: 'Gazlanmagan 1', category: 'Suvlar', price: 3000, avatar: 'https://1119001045.rsc.cdn77.org/wa-data/public/shop/products/86/30/3086/images/2216/Napitok_Gazirovannyy_PEPSI_05_l.650@2x.jpg' },
    ],
  };

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
              <div className="dish__discount">Popular</div>
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
