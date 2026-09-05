import {
    FaRegCircle,
    FaCheckCircle
} from "react-icons/fa"


import {
    FaBriefcase,
    FaUser,
    FaBookOpen,
    FaHeart,
    FaWallet,
    FaTag
} from "react-icons/fa6";

import {
    FiEdit3,
    FiTrash2
} from "react-icons/fi";

import "./TodoList.css";



const TodoList = ({
    id,
    title,
    category = "General",
    completed = false,
    onComplete,
    onDelete,
    onEdit
}) => {

  const getCategoryIcon = () => {
    switch (category) {
        case "Work":
            return <FaBriefcase />;

        case "Personal":
            return <FaUser />;

        case "Learning":
            return <FaBookOpen />;

        case "Health":
            return <FaHeart />;

        case "Finance":
            return <FaWallet />;

        default:
            return <FaTag />;
    }
};

   const cleanTitle = title?.trim() || "";
const words = cleanTitle.split(/\s+/).filter(Boolean);

const displayTitle = words.length > 10 
  ? words.slice(0, 10).join(" ") + "..." 
  : cleanTitle;

    // Complete / Uncomplete
    const handleComplete = () => {
        onComplete(id)
    }


    // Edit
    const handleEdit = () => {
    onEdit(id);
};


    return (

        <div className={`list ${completed ? "completed" : ""}`}>

            {/* CHECKBOX */}

            <button
                className={`todoCheck ${completed ? "active" : ""}`}
                onClick={handleComplete}
            >

                {completed ? (
                    <FaCheckCircle />
                ) : (
                    <FaRegCircle />
                )}

            </button>


            {/* TODO TITLE */}

            <span className="todoTitle">
                {displayTitle}
            </span>


            {/* CATEGORY */}

         <span className={`todoCategory category-${category.toLowerCase()}`}>
    {getCategoryIcon()}
    <span>{category}</span>
</span>


            {/* ACTIONS */}

            <div className="todoActions">

                <button
    className={`todoEdit ${completed ? "disabled" : ""}`}
    disabled={completed}
    onClick={handleEdit}
>
    <FiEdit3 />
</button>

                <button
                onClick={() => onDelete(id)}
                    className={`todoDelete ${
                        completed ? "completedDelete" : ""
                    }`}
                >
                    <FiTrash2 />
                </button>

            </div>

        </div>
    )
}


export default TodoList