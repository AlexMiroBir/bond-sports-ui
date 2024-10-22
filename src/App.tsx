import React, { useState } from 'react';
import style from './App.module.css';
import MainPage from "./pages/MainPage/MainPage";

function App() {
    const [isNightMode, setIsNightMode] = useState<boolean>(true);

    const toggleTheme = ():void => {
        setIsNightMode(prevMode => !prevMode);
    };

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
