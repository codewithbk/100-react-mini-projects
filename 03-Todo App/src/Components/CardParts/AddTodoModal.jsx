import Popup from "./Popup";
import { createPortal } from "react-dom";

import {
    FaPlus,
    FaXmark,
    FaPen,
    FaBriefcase,
    FaUser,
    FaBookOpen,
    FaHeart,
    FaWallet,
    FaTag
} from "react-icons/fa6";

import "./AddTodoModal.css";
import { useEffect, useState } from "react";
import { CiCircleInfo } from "react-icons/ci";


const AddTodoModal = ({
    onClose,
    input,
    onSearch,
    saveData,

    editMode = false,
    editId = null,
    selectedCategory = "General",
    onUpdate
}) => {

    const [category, setCategory] = useState(
        selectedCategory || "General"
    );

    const [isDisabled, setIsDisabled] = useState(true);

    const [data, setData] = useState(input || "");

    const [isEmpty, setEmpty] = useState(false);
    const [isLess, setLess] = useState(false);
    const [isMore, setMore] = useState(false);

    const [popupKey, setPopupKey] = useState(0);


    // =========================
    // RESET WHEN MODAL OPENS
    // =========================

    useEffect(() => {

        setData(input || "");
        setCategory(selectedCategory || "General");

        setIsDisabled(true);

        setEmpty(false);
        setLess(false);
        setMore(false);

    }, [input, selectedCategory, editMode]);


    // =========================
    // CLOSE / SKIP
    // =========================

    const handleClose = () => {

        // Reset local changes
        setData(input || "");
        setCategory(selectedCategory || "General");

        setEmpty(false);
        setLess(false);
        setMore(false);

        setIsDisabled(true);

        // IMPORTANT:
        // No saveData
        // No onUpdate
        // No onSearch

        onClose();
    };


    // =========================
    // EDIT BUTTON
    // =========================

    const handleEditBtn = () => {

        setIsDisabled(false);
    };


    // =========================
    // SUBMIT
    // =========================

    const handleSubmit = () => {

        const trimmedData = data.trim();

        const words = trimmedData
            .split(/\s+/)
            .filter(Boolean)
            .length;


        // =========================
        // EMPTY INPUT
        // =========================

        if (trimmedData === "") {

            setEmpty(true);
            setLess(false);
            setMore(false);

            setPopupKey(prev => prev + 1);

            return;
        }


        // =========================
        // WORD LIMIT
        // =========================

        if (words >= 20) {

            setEmpty(false);
            setLess(true);
            setMore(false);

            setPopupKey(prev => prev + 1);

            return;
        }


        // =========================
        // MINIMUM WORDS
        // =========================

        if (words <= 2) {

            setEmpty(false);
            setLess(false);
            setMore(true);

            setPopupKey(prev => prev + 1);

            return;
        }


        // =========================
        // EDIT TODO
        // =========================

        if (editMode) {

            onUpdate(
                editId,
                trimmedData,
                category
            );

            return;
        }


        // =========================
        // ADD TODO
        // =========================

        onSearch(trimmedData);

        saveData(
            trimmedData,
            category
        );

        onClose();
    };


    return createPortal(

        <div>

            {/* =========================
                POPUPS
            ========================= */}

            {isEmpty && (
                <Popup
                    key={`empty-${popupKey}`}
                    logo={<CiCircleInfo />}
                    message="Input cannot be Empty"
                    duration={4}
                />
            )}

            {isLess && (
                <Popup
                    key={`less-${popupKey}`}
                    logo={<CiCircleInfo />}
                    message="Input cannot be greater than 20 words"
                    duration={4}
                />
            )}

            {isMore && (
                <Popup
                    key={`more-${popupKey}`}
                    logo={<CiCircleInfo />}
                    message="Your Input can be greater than 2 words"
                    duration={4}
                />
            )}


            {/* =========================
                MODAL
            ========================= */}

            <div className="modalOverlay">

                <div className="addTodoCard">


                    {/* =========================
                        HEADER
                    ========================= */}

                    <div className="modalHeader">

                        <div className="modalIcon">
                            <FaPlus />
                        </div>


                        <div className="modalHeading">

                            <h2>
                                {editMode
                                    ? "Edit Your Todo"
                                    : "Your New Todo"
                                }
                            </h2>

                            <p>
                                {editMode
                                    ? "Update your title, choose a category, and save it."
                                    : "Add a title, choose a category, and make it yours."
                                }
                            </p>

                        </div>


                        <button
                            className="modalClose"
                            onClick={handleClose}
                        >
                            <FaXmark />
                        </button>

                    </div>


                    {/* =========================
                        TODO TITLE
                    ========================= */}

                    <div className="modalField">

                        <label>
                            Todo Title
                        </label>


                        <div
                            className={`modalInput ${
                                isDisabled ? "disabled" : ""
                            }`}
                        >

                            <FaPen />

                            <input
                                type="text"
                                value={data}
                                placeholder="What do you want to do?"
                                onChange={(e) =>
                                    setData(e.target.value)
                                }
                                disabled={isDisabled}
                            />

                        </div>

                    </div>


                    {/* =========================
                        CATEGORY LABEL
                    ========================= */}

                    <div className="modalField">

                        <label>
                            Choose a Category
                        </label>

                    </div>


                    {/* =========================
                        CATEGORY OPTIONS
                    ========================= */}

                    <div className="categoryOptions">

                        <button
                            className={`categoryOption ${
                                category === "Work"
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() => setCategory("Work")}
                        >
                            <FaBriefcase />
                            <span>Work</span>
                        </button>


                        <button
                            className={`categoryOption ${
                                category === "Personal"
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() => setCategory("Personal")}
                        >
                            <FaUser />
                            <span>Personal</span>
                        </button>


                        <button
                            className={`categoryOption ${
                                category === "Learning"
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() => setCategory("Learning")}
                        >
                            <FaBookOpen />
                            <span>Learning</span>
                        </button>


                        <button
                            className={`categoryOption ${
                                category === "Health"
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() => setCategory("Health")}
                        >
                            <FaHeart />
                            <span>Health</span>
                        </button>


                        <button
                            className={`categoryOption ${
                                category === "Finance"
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() => setCategory("Finance")}
                        >
                            <FaWallet />
                            <span>Finance</span>
                        </button>


                        <button
                            className={`categoryOption ${
                                category === "General"
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() => setCategory("General")}
                        >
                            <FaTag />
                            <span>General</span>
                        </button>

                    </div>


                    {/* =========================
                        FOOTER
                    ========================= */}

                    <div className="modalFooter">


                        {/* SKIP / CANCEL */}

                        <button
                            type="button"
                            className="skipBtn"
                            onClick={handleClose}
                        >
                            Skip
                        </button>


                        {/* EDIT BUTTON */}

                        <button
                            type="button"
                            className={`editBtn ${
                                !isDisabled
                                    ? "editing"
                                    : ""
                            }`}
                            onClick={handleEditBtn}
                            disabled={!isDisabled}
                        >
                            Edit
                        </button>


                        {/* ADD / UPDATE BUTTON */}

                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="addTodoBtn"
                        >
                            {editMode
                                ? "Update Todo"
                                : "Add Todo"
                            }
                        </button>

                    </div>

                </div>

            </div>

        </div>,

        document.body
    );
};


export default AddTodoModal;