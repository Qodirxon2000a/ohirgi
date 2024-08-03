const exportToExcel = () => {
    // Format data to include product name, category, total sales, and total price
    const formattedData = calculatedData.map(item => ({
        'Product Name': item.name || 'Nomalum',
        'Date': item.date || `${item.month} ${item.year}`,
        'Turi': item.category || 'N/A',
        'Umumiy sotilgan Miqdor': item.totalSales || 0,
        'Umumiy summa': item.totalPrice.toFixed(2) || 0,
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Report Data');
    XLSX.writeFile(wb, 'ReportData.xlsx');
};
