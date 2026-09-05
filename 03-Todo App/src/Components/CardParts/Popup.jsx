import { useState, useEffect, useRef } from 'react';
import './Popup.css';
import { MdCancel } from "react-icons/md";
import { createPortal } from 'react-dom';

const Popup = ({ logo, duration, message }) => {
    
    const [isShow, setShow] = useState(true);
    const containerRef = useRef(document.querySelector('.container'));


    // Auto-hide after `duration` seconds, with proper cleanup
    useEffect(() => {
        if (!duration) return;

        setTimeout(() => {
            setShow(false);
        }, Number(duration) * 1000);

    }, [duration]);

    if (!containerRef.current) return null;

    return createPortal(
        <>
            {isShow && (
                <div className="errorAlert">
                    <div className="errorAlertIcon">{logo}</div>
                    <div className="errorAlertMessage">{message}</div>
                    <button onClick={() => setShow(false)} className="errorAlertClose">
                        <MdCancel />
                    </button>
                    <div
                        style={{ "--alert-duration": `${duration}s` }}
                        className="alertProgress"
                    ></div>
                </div>
            )}
        </>,
        containerRef.current
    );
};

export default Popup; 