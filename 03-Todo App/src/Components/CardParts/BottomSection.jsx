import React, { useState } from 'react'
import './BottomSection.css'
import { MdDelete } from "react-icons/md";

const BottomSection = ({ filter, onFilter, todos }) => {

    const handleClear = () => {
        onFilter("all")
    }

    const allCount = todos.length
    const activeCount = todos.filter(todo => !todo.completed).length
    const completedCount = todos.filter(todo => todo.completed).length

    return (
        <div className="filterBtns">

            <div className="filtBtn">

                <button
                    className={`filterBtn ${filter === "all" ? "active" : ""}`}
                    onClick={() => onFilter("all")}
                >
                    All <span>{(allCount != 0 ) ? (allCount) : 
                    '' }</span>
                </button>

                <button
                    className={`filterBtn ${filter === "active" ? "active" : ""}`}
                    onClick={() => onFilter("active")}
                >
                    Active <span>{(activeCount != 0 ) ? (activeCount) : 
                    '' }</span>
                </button>

                <button
                    className={`filterBtn ${filter === "completed" ? "active" : ""}`}
                    onClick={() => onFilter("completed")}
                >
                    Completed <span>{(completedCount != 0 ) ? (completedCount) : 
                    '' }</span>
                </button>

            </div>

            <div className="clrBtn">
                <button
                    className="clearCompleted"
                    onClick={handleClear}
                >
                    <MdDelete /> Clear
                </button>
            </div>

        </div>
    )
}

export default BottomSection