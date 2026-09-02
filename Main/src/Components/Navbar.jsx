import { FaGithub } from "react-icons/fa"
import { MdDarkMode, MdLightMode } from "react-icons/md";
import './Css/Navbar.css'
import { useState } from "react";

const Navbar = () => {

    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark', !isDarkMode);
    };

    return (
    <nav className='navbar'>
        <div className='navContainer'>
            <div className="rightNavComponents">
                <a href="#"><h1 className="logoTxt" ><span className='bold'>100</span> <span className='highlight'>React Mini Projects</span> </h1></a>
            </div>
            <div className="leftNavComponents"> 
                <button className='gitrepobtn'> <a href="https://github.com" className="hidedefaultlink" target="_blank" rel="noopener noreferrer"> <FaGithub /> <span className="gitrepotxt"
                 >Github</span></a></button>
                <button className='toogle' onClick={toggleDarkMode}> {isDarkMode ? <MdLightMode /> : <MdDarkMode />} </button>
            </div>
        </div>
    </nav>
)
}

export default Navbar