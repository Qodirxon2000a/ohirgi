import React, { useEffect, useState } from 'react';
import './notif.css'; // Import CSS for styling

const Notification = ({ message, onClose }) => {
    const [fade, setFade] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFade(true);
        }, 3000); // Trigger fade-out after 3 seconds

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (fade) {
            const closeTimer = setTimeout(onClose, 300); // Close after fade-out
            return () => clearTimeout(closeTimer);
        }
    }, [fade, onClose]);

    return (
        <div className={`notification ${fade ? 'fade-out' : 'fade-in'}`}>
            <p>{message}</p>
            <button onClick={onClose} className="notification-close-button">X</button>
        </div>
    );
};

export default Notification;
