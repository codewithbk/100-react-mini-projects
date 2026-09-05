import './Topsection.css'
import { GoChecklist } from "react-icons/go";
import { GoSun } from "react-icons/go";
import { CiDark } from "react-icons/ci";
import { useEffect, useState } from 'react';


const Topsection = () => {

    // =========================
    // THEME FROM LOCAL STORAGE
    // =========================

    const [currentTheme, setcurrentTheme] = useState(() => {

        const savedTheme = localStorage.getItem("theme");

        return savedTheme === "dark";
    });


    // =========================
    // APPLY THEME
    // =========================

    useEffect(() => {

        document.body.classList.toggle(
            'dark',
            currentTheme
        );

        localStorage.setItem(
            "theme",
            currentTheme ? "dark" : "light"
        );

    }, [currentTheme]);


    // =========================
    // SWITCH THEME
    // =========================

    function switchTheme(target) {

        setcurrentTheme(target);

    }


    return (

        <div className="topSectionArea">

            <div className="lft">

                <div className="logo">
                    <GoChecklist />
                </div>

            </div>


            <div className="cent">

                <div className="text">

                    <h2 className='herotxt'>
                        My Todos
                    </h2>

                    <span className='des'>
                        Stay organized, get things done
                    </span>

                </div>

            </div>


            <div className="rtl">

                {/* LIGHT MODE */}

                <div
                    onClick={() => switchTheme(false)}
                    className={`daytoogle toogle ${
                        currentTheme === false
                            ? 'actives'
                            : ''
                    }`}
                >
                    <GoSun />
                </div>


                {/* DARK MODE */}

                <div
                    onClick={() => switchTheme(true)}
                    className={`daytoogle toogle ${
                        currentTheme === true
                            ? 'actives'
                            : ''
                    }`}
                >
                    <CiDark />
                </div>

            </div>

        </div>
    )
}

export default Topsection