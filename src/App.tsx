import React, { useState, useEffect } from 'react';
import style from './App.module.css';
import MainPage from "./pages/MainPage/MainPage";

function App() {
    const getInitialTheme = (): boolean => {
        const savedTheme = localStorage.getItem('isNightMode');
        return savedTheme ? JSON.parse(savedTheme) : true;
    };

    const [isNightMode, setIsNightMode] = useState<boolean>(getInitialTheme);

    const toggleTheme = (): void => {
        setIsNightMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem('isNightMode', JSON.stringify(newMode));
            return newMode;
        });
    };

    useEffect(() => {
        localStorage.setItem('isNightMode', JSON.stringify(isNightMode));
    }, [isNightMode]);

    return (
        <div
            className={`${style.App} ${isNightMode ? style.nightMode : style.dayMode}`}
        >
            <button onClick={toggleTheme} className={style.themeToggle}>
                {isNightMode ? 'Switch to Day Mode' : 'Switch to Night Mode'}
            </button>
            <MainPage />
        </div>
    );
}

export default App;
