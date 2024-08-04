import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import "../Reading/reading.css";
import Notification from './notif';

Modal.setAppElement('#root'); // Set the root element for the modal

const Reading = () => {
    const [data, setData] = useState([]);
    const [calculatedData, setCalculatedData] = useState([]);
    const [showCalculatedData, setShowCalculatedData] = useState(false);
    const [showAllData, setShowAllData] = useState(false);
    const [showMonthlyData, setShowMonthlyData] = useState(false);
    const [showDailyRevenue, setShowDailyRevenue] = useState(false);
    const [showMonthlyRevenue, setShowMonthlyRevenue] = useState(false);
    const [notification, setNotification] = useState(null);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [latestDailyRevenue, setLatestDailyRevenue] = useState(0);
    const [selectedDate, setSelectedDate] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios.get('https://61fcfec8f62e220017ce4280.mockapi.io/kiyim-kechak/qishkiKiyimlar')
            .then(res => {
                setData(res.data);
                setShowDailyRevenue(false); // Reset daily revenue view when data is fetched
            })
            .catch(err => console.log(err));
    }, []);

    const calculateData = () => {
        const result = data.reduce((acc, item) => {
            const date = new Date(item.dateAdded).toLocaleDateString();
            const key = `${item.name}-${date}-${item.category}`;

            if (!acc[key]) {
                acc[key] = {
                    productName: item.name,
                    date,
                    category: item.category,
                    totalPrice: 0,
                    totalSales: 0,
                    avatar: item.avatar,
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
        setShowDailyRevenue(false);
        setShowMonthlyRevenue(false);
    };

    const calculateAllData = () => {
        const result = data.reduce((acc, item) => {
            const date = new Date(item.dateAdded).toLocaleDateString();
            const key = `All-${date}-${item.category}`;

            if (!acc[key]) {
                acc[key] = {
                    date,
                    category: item.category,
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
        setShowDailyRevenue(false);
        setShowMonthlyRevenue(false);
    };

    const calculateMonthlyData = () => {
        const result = data.reduce((acc, item) => {
            const date = new Date(item.dateAdded);
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();
            const key = `${month}-${year}-${item.category}`;

            if (!acc[key]) {
                acc[key] = {
                    month,
                    year,
                    category: item.category,
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
        setShowDailyRevenue(false);
        setShowMonthlyRevenue(false);

        const latestDate = Math.max(...data.map(item => new Date(item.dateAdded)));
        const latestRevenue = data
            .filter(item => new Date(item.dateAdded).toLocaleDateString() === new Date(latestDate).toLocaleDateString())
            .reduce((acc, item) => acc + (item.price || 0), 0);

        setLatestDailyRevenue(latestRevenue);
    };

    const calculateMonthlyRevenue = () => {
        const result = data.reduce((acc, item) => {
            const date = new Date(item.dateAdded);
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();
            const key = `${month}-${year}`;

            if (!acc[key]) {
                acc[key] = {
                    month,
                    year,
                    totalRevenue: 0,
                    items: [],
                };
            }

            acc[key].totalRevenue += item.price || 0;
            acc[key].items.push({
                name: item.name,
                category: item.category,
                price: item.price || 0,
                avatar: item.avatar,
            });

            return acc;
        }, {});

        const allMonths = [
            'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
            'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'
        ];

        const yearGroups = data.reduce((acc, item) => {
            const year = new Date(item.dateAdded).getFullYear();
            if (!acc.includes(year)) acc.push(year);
            return acc;
        }, []);

        yearGroups.forEach(year => {
            allMonths.forEach(month => {
                const key = `${month}-${year}`;
                if (!result[key]) {
                    result[key] = {
                        month,
                        year,
                        totalRevenue: 0,
                        items: [],
                    };
                }
            });
        });

        setCalculatedData(Object.values(result));
        setShowCalculatedData(false);
        setShowAllData(false);
        setShowMonthlyData(false);
        setShowDailyRevenue(false);
        setShowMonthlyRevenue(true);
    };

    const handleDelete = (id) => {
        axios.delete(`https://61fcfec8f62e220017ce4280.mockapi.io/kiyim-kechak/qishkiKiyimlar/${id}`)
            .then(() => {
                setData(data.filter(item => item.id !== id));
                setNotification("Maxsulot o'chirildi!");
                setTimeout(() => setNotification(null), 3000);
            })
            .catch(err => console.log(err));
    };

    const calculateTotalRevenue = () => {
        const total = data.reduce((acc, item) => acc + (item.price || 0), 0);
        setTotalRevenue(total);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const viewDailyRevenue = () => {
        const dailyData = data.filter(item => {
            const itemDate = new Date(item.dateAdded).toLocaleDateString();
            const selectedItemDate = new Date(selectedDate).toLocaleDateString();
            return itemDate === selectedItemDate;
        });

        const result = dailyData.reduce((acc, item) => {
            const key = `${item.name}-${item.price}`;
            if (!acc[key]) {
                acc[key] = {
                    productName: item.name,
                    price: item.price || 0,
                    quantity: 0,
                };
            }

            acc[key].quantity += 1;

            return acc;
        }, {});

        // Calculate the total revenue for the selected date
        const totalRevenueForDate = dailyData.reduce((acc, item) => acc + (item.price || 0), 0);

        setCalculatedData(Object.values(result));
        setShowDailyRevenue(true);
        setShowCalculatedData(false);
        setShowAllData(false);
        setShowMonthlyData(false);
        setShowMonthlyRevenue(false);
        setIsModalOpen(true);

        // Set the total revenue in the state
        setTotalRevenue(totalRevenueForDate);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Sort data by dateAdded in descending order
    const sortedData = [...data].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));

    return (
        <div className="reading__container">
            <Link to={"/Crud"} className="link"> ← Bosh menyuga qaytish </Link>
            {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
            <br />
            <br />
            <h1>Sotilgan Maxsulotlar</h1>
            <button onClick={calculateData} className="calculate-button">Mahsulot bo'yicha</button>
            <button onClick={calculateAllData} className="calculate-button">Hammasi</button>
            <button onClick={calculateMonthlyData} className="calculate-button">Oylik Hisobot</button>
            <button onClick={calculateTotalRevenue} className="calculate-button">Umumiy Tushum</button>
            <button onClick={calculateMonthlyRevenue} className="calculate-button">Yopish</button>
            <div>
                <br /><br />
                <label>Kun:
                    <input type="date" value={selectedDate} onChange={handleDateChange} />
                </label>
                <button onClick={viewDailyRevenue} className="calculate-button">Kunlik Tushumni Tekshirish</button>
            </div>
            {totalRevenue > 0 && (
                <div className="total-revenue">
                    <h2>Umumiy Tushum: {totalRevenue ? totalRevenue.toFixed(2) : '0.00'} Som</h2>
                </div>
            )}
            {(showCalculatedData || showAllData || showMonthlyData) && (
                <div className="calculated-data">
                    <h2>{showAllData ? "Hamma Sotilgan Maxsulotlar" : showMonthlyData ? "Oylik Hisobot" : "Mahsulotlar Bo'yicha Ma'lumot"}</h2>
                    {calculatedData.map((item, index) => (
                        <div key={index} className="calculated-item">
                            <h3>{showMonthlyData ? `Oy: ${item.month} ${item.year}` : showAllData ? `Kuni: ${item.date}` : `Mahsulot: ${item.productName}`}</h3>
                            <p>Kategoriya: {item.category || 'N/A'}</p>
                            <p>Hammasi: {item.totalSales || 0}</p>
                            <p>Umumiy Pul: {item.totalPrice ? item.totalPrice.toFixed(2) : '0.00'} Som</p>
                            {showMonthlyData && item.items && (
                                <div className="monthly-items">
                                    {item.items.map((subItem, subIndex) => (
                                        <div key={subIndex} className="monthly-item">
                                            <img src={subItem.avatar} alt={subItem.name} className="product__avatar" />
                                            <h4>{subItem.name}</h4>
                                            <p>Kategoriya: {subItem.category}</p>
                                            <p>Narxi: {subItem.price ? subItem.price.toFixed(2) : '0.00'} Som</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
            {showDailyRevenue && (
                <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Kunlik Tushum">
                    <h2>Kunlik Tushum</h2>
                    <button onClick={closeModal} className="close-button">Yopish</button>
                    <h3>Kunlik Umumiy Tushum: {totalRevenue ? totalRevenue.toFixed(2) : '0.00'} Som</h3>
                    {calculatedData.length > 0 ? (
                        calculatedData.map((item, index) => (
                            <div key={index} className="daily-revenue-item">
                                <h3>Mahsulot: {item.productName}</h3>
                                <p>Narxi: {item.price ? item.price.toFixed(2) : ''} Som</p>
                                <p>Soni: {item.quantity || 0}</p>
                                <p>Umumiy Tushum: {(item.price && item.quantity) ? (item.price * item.quantity).toFixed(2) : '0.00'} Som</p>
                            </div>
                        ))
                    ) : (
                        <p>Ma'lumot mavjud emas</p>
                    )}
                </Modal>
            )}
            <div className="product__grid">
                {sortedData.map((item) => (
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
        </div>
    );
};

export default Reading;
