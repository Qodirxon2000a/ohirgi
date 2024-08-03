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
