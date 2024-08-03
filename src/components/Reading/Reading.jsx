import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../Reading/reading.css";
import Notification from './notif'; // Import the Notification component

const Reading = () => {
    const [data, setData] = useState([]);
    const [calculatedData, setCalculatedData] = useState([]);
    const [showCalculatedData, setShowCalculatedData] = useState(false);
    const [showAllData, setShowAllData] = useState(false);
    const [showMonthlyData, setShowMonthlyData] = useState(false);
    const [notification, setNotification] = useState(null); // State for notification

    useEffect(() => {
        // Fetch data from your new API endpoint
        axios.get('https://61fcfec8f62e220017ce4280.mockapi.io/kiyim-kechak/qishkiKiyimlar')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);

    const calculateData = () => {
        const result = data.reduce((acc, item) => {
            const date = new Date(item.dateAdded).toLocaleDateString();
            const key = `${item.name}-${date}`;

            if (!acc[key]) {
                acc[key] = {
                    productName: item.name,
                    date,
                    totalPrice: 0,
                    totalSales: 0,
                };
            }

            acc[key].totalPrice += item.price || 0;
            acc[key].totalSales += 1;

            return acc;
        }, {});

        setCalculatedData(Object.values(result));
        setShowCalculatedData(true);
        setShowAllData(false);
        setShowMonthlyData(false);
    };

    const calculateAllData = () => {
        const result = data.reduce((acc, item) => {
            const date = new Date(item.dateAdded).toLocaleDateString();
            const key = `All-${date}`;

            if (!acc[key]) {
                acc[key] = {
                    date,
                    totalPrice: 0,
                    totalSales: 0,
                };
            }

            acc[key].totalPrice += item.price || 0;
            acc[key].totalSales += 1;

            return acc;
        }, {});

        setCalculatedData(Object.values(result));
        setShowCalculatedData(false);
        setShowAllData(true);
        setShowMonthlyData(false);
    };

    const calculateMonthlyData = () => {
        const result = data.reduce((acc, item) => {
            const date = new Date(item.dateAdded);
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();
            const key = `${month}-${year}`;

            if (!acc[key]) {
                acc[key] = {
                    month,
                    year,
                    totalPrice: 0,
                    totalSales: 0,
                };
            }

            acc[key].totalPrice += item.price || 0;
            acc[key].totalSales += 1;

            return acc;
        }, {});

        setCalculatedData(Object.values(result));
        setShowCalculatedData(false);
        setShowAllData(false);
        setShowMonthlyData(true);
    };

    const handleDelete = (id) => {
        // Make API call to delete the item
        axios.delete(`https://61fcfec8f62e220017ce4280.mockapi.io/kiyim-kechak/qishkiKiyimlar/${id}`)
            .then(() => {
                // Remove the item from the state
                setData(data.filter(item => item.id !== id));
                setNotification("Maxsulot o'chirildi!"); // Show notification
                setTimeout(() => setNotification(null), 3000); // Hide notification after 3 seconds
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="reading__container">
            <h1>Sotilgan Maxsulotlar</h1>
            <button onClick={calculateData} className="calculate-button">Mahsulot bo'yicha</button>
            <button onClick={calculateAllData} className="calculate-button">Hammasi</button>
            <button onClick={calculateMonthlyData} className="calculate-button">Oylik Hisobot</button>
            {(showCalculatedData || showAllData || showMonthlyData) && (
                <div className="calculated-data">
                    <h2>{showAllData ? "Hamma Sotilgan Maxsulotlar" : showMonthlyData ? "Oylik Hisobot" : "Mahsulotlar Bo'yicha Ma'lumot"}</h2>
                    {calculatedData.map((item, index) => (
                        <div key={index} className="calculated-item">
                            <h3>{showMonthlyData ? `Oy: ${item.month} ${item.year}` : showAllData ? `Kuni: ${item.date}` : `Mahsulot: ${item.productName}`}</h3>
                            <p>Hammasi: {item.totalSales}</p>
                            <p>Umumiy Pul: {item.totalPrice.toFixed(2)} Som</p>
                        </div>
                    ))}
                </div>
            )}
            <div className="product__grid">
                {data.map((item) => (
                    <div key={item.id} className="product__info">
                        <img src={item.avatar} alt={item.name} className="product__avatar" />
                        <h2>{item.name}</h2>
                        <p>Kategoriya: {item.category}</p>
                        <p className="price">Narxi: {item.price ? item.price.toFixed(2) : 'N/A'} Som</p>
                        <p className="date">Sanasi: {new Date(item.dateAdded).toLocaleDateString()}</p>
                        <button onClick={() => handleDelete(item.id)} className="delete-button">O'chirish</button>
                    </div>
                ))}
            </div>
            <Link to={"/Crud"} className="link"> ← Bosh menyuga qaytish </Link>
            {notification && <Notification message={notification} onClose={() => setNotification(null)} />} {/* Show notification */}
        </div>
    );
}

export default Reading;
