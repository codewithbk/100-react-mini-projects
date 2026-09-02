import { IoSearchSharp } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import './Css/Searchbar.css'
import Card from "./Card";
import projects from '../data/source.json';
import { use, useState, useEffect, useRef } from "react";
import Noresult from "./Noresult";

const searchString = (str) => {
    return str.replace(/\s+/g, "").toLowerCase();
};


const Searchbar = () => {

    const inputRef = useRef(null);

    const [data, setData] = useState(projects)
    const [input, setInput] = useState('')
    const [filteredData, setFilteredData] = useState(projects);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedDifficulty, setSelectedDifficulty] = useState("all");
    const dropdownRef = useRef(null);



    const easyCount = projects.filter(
        project => project.difficulty === "easy"
    ).length;

    const intermediateCount = projects.filter(
        project => project.difficulty === "medium"
    ).length;

    const advancedCount = projects.filter(
        project => project.difficulty === "hard"
    ).length;

    const allCount = projects.length;





    useEffect(() => {

        const result = data.filter((item) => {
            if (selectedDifficulty === 'all') {
                return item
            }
            const level = searchString(item.difficulty).includes(selectedDifficulty);
            return level;
        });

        setFilteredData(result);

    }, [selectedDifficulty])

    document.addEventListener('keydown', (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
            event.preventDefault(); // Stop the browser's default save dialog
            inputRef.current.focus();
        }
    });

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setIsFilterOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearch = () => {
        const userSearch = searchString(input);

        // agar search box khali hai to poori list wapas dikhao
        if (userSearch === "") {
            setFilteredData(data);
            return;
        }

        // First try to find in heading
        const result = data.filter((item) => {
            const titleMatch = searchString(item.title).includes(userSearch);
            const paraMatch = searchString(item.para).includes(userSearch);
            const tagMatch = item.tags.some((tag) => searchString(tag).includes(userSearch));
            return titleMatch || paraMatch || tagMatch;
        });

        setSelectedDifficulty('all')
        setFilteredData(result);



    }

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    useEffect(() => {
        handleSearch();
    }, [input]);


    const clearinput = () => {
        setInput('')
    }

    return (
        <>
            <section className='searchbar'>
                <div className="searcharea">
                    <div className="inputsection">
                        <form className="searchBox" onSubmit={(e) => { e.preventDefault() }} action="/">
                            <span className="searchIcon">
                                <IoSearchSharp />
                            </span>
                            <input type="text" value={input} onChange={handleInputChange} ref={inputRef} placeholder="Search projects, concepts, or features..." />
                            <span className="searchShortcut">
                                Ctrl + K
                            </span>
                            <span className='searchBtnBox'>
                                <button onClick={input.length > 2 ? clearinput : handleSearch} className="searchButton" type="submit"> {(input.length > 2) ? 'Clear' : 'Search'} </button>
                            </span>
                        </form>
                    </div>

                    <div className="dropdown" ref={dropdownRef}>
                        <div className="filtertag">
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className="filterBtn"
                            >
                                <FaFilter />
                                <span className="filtertext">Filters</span>
                                {(selectedDifficulty != 'all' ?
                                    <span className="filterCount">1</span>
                                    : '')}
                            </button>
                        </div>

                        {isFilterOpen && (
                            <div className="dropdownmenu">

                                {/* Header */}
                                <div className="difficultyHeader">
                                    <h3>Select Difficulty</h3>
                                    <button onClick={() => setSelectedDifficulty("all")} className="clearBtn">
                                        Clear
                                    </button>
                                </div>

                                {/* All Levels */}
                                <label className={`difficultyOption ${selectedDifficulty === "all" ? "active" : ""
                                    }`}>
                                    <input type="radio" checked={selectedDifficulty === "all"}
                                        onChange={() => setSelectedDifficulty("all")} name="difficulty" />

                                    <span className="radioCircle"></span>

                                    <div className={`difficultyInfo ${selectedDifficulty === "all" ? "active" : ""
                                        }`}>
                                        <span className="difficultyName">All Levels</span>
                                    </div>
                                    <span className="difficultyCount">{allCount}</span>

                                </label>

                                {/* Beginner */}
                                <label className={`difficultyOption ${selectedDifficulty === "easy" ? "active" : ""
                                    }`}>
                                    <input checked={selectedDifficulty === "easy"}
                                        onChange={() => setSelectedDifficulty("easy")} type="radio" name="difficulty" />

                                    <span className="radioCircle"></span>

                                    <span className="difficultyDot beginner"></span>

                                    <div className="difficultyInfo">
                                        <span className="difficultyName">Easy</span>
                                        <span className="difficultyDesc">
                                            Easy to start
                                        </span>
                                    </div>

                                    <span className="difficultyCount">{easyCount}</span>
                                </label>

                                {/* Intermediate */}
                                <label className={`difficultyOption ${selectedDifficulty === "medium" ? "active" : ""
                                    }`}>
                                    <input checked={selectedDifficulty === "medium"}
                                        onChange={() => setSelectedDifficulty("medium")} type="radio" name="difficulty" />

                                    <span className="radioCircle"></span>

                                    <span className="difficultyDot intermediate"></span>

                                    <div className="difficultyInfo">
                                        <span className="difficultyName">Meduim</span>
                                        <span className="difficultyDesc">
                                            Good for practice
                                        </span>
                                    </div>

                                    <span className="difficultyCount">{intermediateCount}</span>
                                </label>

                                {/* Advanced */}
                                <label className={`difficultyOption ${selectedDifficulty === "hard" ? "active" : ""
                                    }`}>
                                    <input checked={selectedDifficulty === "hard"}
                                        onChange={() => setSelectedDifficulty("hard")} type="radio" name="difficulty" />

                                    <span className="radioCircle"></span>

                                    <span className="difficultyDot advanced"></span>

                                    <div className="difficultyInfo">
                                        <span className="difficultyName">Hard</span>
                                        <span className="difficultyDesc">
                                            Challenge yourself
                                        </span>
                                    </div>

                                    <span className="difficultyCount">{advancedCount}</span>
                                </label>

                            </div>
                        )}
                    </div>

                </div>
            </section>
            <section className='cards' >
                <div className="displayCards">
                    <div className="cardsArea">
                        {(filteredData.length <= 0) ? <Noresult input={input} /> : filteredData.map(p => <Card
                            key={p.id}
                            id={p.id}
                            title={p.title}
                            img={p.img}
                            para={p.para}
                            difficulty={p.difficulty}
                            tags={p.tags}
                            githublink={p.githubLink}
                            liveLink={p.liveLink}
                        />)}

                    </div>
                </div>
            </section>

        </>
    )
}

export default Searchbar