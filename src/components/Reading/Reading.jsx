import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../Reading/reading.css";
import Notification from './notif';
import * as XLSX from 'xlsx';

const Reading = () => {
    const [data, setData] = useState([]);
    const [calculatedData, setCalculatedData] = useState([]);
    const [showCalculatedData, setShowCalculatedData] = useState(false);
    const [showAllData, setShowAllData] = useState(false);
    const [showMonthlyData, setShowMonthlyData] = useState(false);
    const [notification, setNotification] = useState(null);
    const [totalRevenue, setTotalRevenue] = useState(0); // State for total revenue

    useEffect(() => {
        axios.get('https://61fcfec8f62e220017ce4280.mockapi.io/kiyim-kechak/qishkiKiyimlar')
            .then(res => setData(res.data))
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

    const exportToExcel = () => {
        const formattedData = calculatedData.map(item => ({
            'Product Name': item.productName || 'N/A',
            'Date': item.date || `${item.month} ${item.year}`,
            'Category': item.category || 'N/A',
            'Total Sales': item.totalSales || 0,
            'Total Price': item.totalPrice.toFixed(2) || 0,
        }));

        const ws = XLSX.utils.json_to_sheet(formattedData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Report Data');
        XLSX.writeFile(wb, 'ReportData.xlsx');
    };

    return (
        <div className="reading__container">
            <h1>Sotilgan Maxsulotlar</h1>
            <button onClick={calculateData} className="calculate-button">Mahsulot bo'yicha</button>
            <button onClick={calculateAllData} className="calculate-button">Hammasi</button>
            <button onClick={calculateMonthlyData} className="calculate-button">Oylik Hisobot</button>
            <button onClick={calculateTotalRevenue} className="calculate-button">Umumiy Tushum</button> {/* New button for total revenue */}
            {showMonthlyData && (
                <button onClick={exportToExcel} className="export-button">Excelga Eksport qilish</button>
            )}
             {totalRevenue > 0 && ( // Display total revenue if greater than 0
                <div className="total-revenue">
                    <h2>Umumiy Tushum: {totalRevenue.toFixed(2)} Som</h2>
                </div>
            )}
            {(showCalculatedData || showAllData || showMonthlyData) && (
                <div className="calculated-data">
                    <h2>{showAllData ? "Hamma Sotilgan Maxsulotlar" : showMonthlyData ? "Oylik Hisobot" : "Mahsulotlar Bo'yicha Ma'lumot"}</h2>
                    {calculatedData.map((item, index) => (
                        <div key={index} className="calculated-item">
                            <h3>{showMonthlyData ? `Oy: ${item.month} ${item.year}` : showAllData ? `Kuni: ${item.date}` : `Mahsulot: ${item.productName}`}</h3>
                            <p>Kategoriya: {item.category || 'N/A'}</p>
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
            {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
        </div>
    );
}

export default Reading;
