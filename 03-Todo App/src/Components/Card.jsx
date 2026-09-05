import './Card.css'
import EmptyTodo from './CardParts/EmptyTodo'
import BottomSection from './CardParts/BottomSection'
import MiddleSection from './CardParts/MiddleSection'
import TodoList from './CardParts/TodoList'
import Topsection from './CardParts/Topsection'
import AddTodoModal from './CardParts/AddTodoModal'
import { useState, useEffect } from 'react'
import Popup from './CardParts/Popup'

import {
    FaCircleCheck,
    FaPen,
    FaTrash
} from "react-icons/fa6";


const Card = () => {

    const [searchResult, setSearchResult] = useState(null)
    const [ModalShow, setModalShow] = useState(false)
    const [editTodo, setEditTodo] = useState(null)

    // =========================
    // TOAST
    // =========================

    const [showSuccess, setShowSuccess] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [successIcon, setSuccessIcon] = useState(null)


    // =========================
    // TODOS FROM LOCAL STORAGE
    // =========================

    const [todos, setTodos] = useState(() => {

        const savedTodos = localStorage.getItem("todos")

        return savedTodos
            ? JSON.parse(savedTodos)
            : []
    })


    const [workDone, setWorkDone] = useState(false)


    // =========================
    // FILTER
    // =========================

    const [filter, setFilter] = useState("all")


    // =========================
    // TOAST FUNCTION
    // =========================

    const showToast = (message, icon) => {

        setSuccessMessage(message)
        setSuccessIcon(icon)
        setShowSuccess(true)

        setTimeout(() => {
            setShowSuccess(false)
        }, 3000)
    }


    // =========================
    // SEARCH / OPEN ADD MODAL
    // =========================

    const handleSearch = (value) => {

        setSearchResult(value)

        if (value) {
            setModalShow(true)
        }
    }


    // =========================
    // ADD TODO
    // =========================

    const handleSubmit = (todo, category) => {

        const newTodo = {
            id: Date.now(),
            todo: todo,
            category: category,
            completed: false
        }

        setTodos(prev => [...prev, newTodo])

        setWorkDone(true)
        setModalShow(false)

        // CREATED TOAST
        showToast(
            "Todo created successfully!",
            <FaCircleCheck />
        )
    }


    // =========================
    // COMPLETE / UNCOMPLETE
    // =========================

    const handleComplete = (id) => {

        setTodos(prev =>
            prev.map(todo =>
                todo.id === id
                    ? {
                        ...todo,
                        completed: !todo.completed
                    }
                    : todo
            )
        )
    }


    // =========================
    // DELETE TODO
    // =========================

    const handleDelete = (id) => {

        setTodos(prev =>
            prev.filter(todo => todo.id !== id)
        )

        // DELETED TOAST
        showToast(
            "Todo deleted successfully!",
            <FaTrash />
        )
    }


    // =========================
    // EDIT TODO
    // =========================

    const handleEdit = (id) => {

        const selectedTodo = todos.find(
            todo => todo.id === id
        )

        if (!selectedTodo) return

        setEditTodo(selectedTodo)

        setModalShow(true)
    }


    // =========================
    // UPDATE TODO
    // =========================

    const handleUpdate = (id, todo, category) => {

        setTodos(prev =>
            prev.map(item =>
                item.id === id
                    ? {
                        ...item,
                        todo,
                        category
                    }
                    : item
            )
        )

        setModalShow(false)
        setEditTodo(null)

        // UPDATED TOAST
        showToast(
            "Todo updated successfully!",
            <FaPen />
        )
    }


    // =========================
    // LOCAL STORAGE
    // =========================

    useEffect(() => {

        localStorage.setItem(
            "todos",
            JSON.stringify(todos)
        )

    }, [todos])


    // =========================
    // FILTER TODOS
    // =========================

    const filteredTodos = todos.filter(todo => {

        if (filter === "active") {
            return todo.completed === false
        }

        if (filter === "completed") {
            return todo.completed === true
        }

        return true
    })


    // =========================
    // RETURN
    // =========================

    return (
        <>

            {/* =========================
                SUCCESS TOAST
            ========================= */}

            {showSuccess && (
                <Popup
                    logo={successIcon}
                    message={successMessage}
                    duration={3}
                />
            )}


            <div className="container">

                {/* =========================
                    ADD / EDIT MODAL
                ========================= */}

                {ModalShow && (

                    <AddTodoModal
                        input={editTodo ? editTodo.todo : searchResult}
                        selectedCategory={
                            editTodo
                                ? editTodo.category
                                : "General"
                        }

                        editMode={!!editTodo}
                        editId={editTodo?.id}

                        onClose={() => {
                            setModalShow(false)
                            setEditTodo(null)
                        }}

                        onSearch={handleSearch}
                        saveData={handleSubmit}
                        onUpdate={handleUpdate}
                    />

                )}


                <div className="card">

                    <div className="sections">

                        {/* =========================
                            TOP
                        ========================= */}

                        <div className="topSection">
                            <Topsection />
                        </div>


                        {/* =========================
                            MIDDLE
                        ========================= */}

                        <div className="middleSection">

                            <MiddleSection
                                workDone={workDone}
                                onSearch={handleSearch}
                            />

                        </div>


                        {/* =========================
                            BOTTOM
                        ========================= */}

                        <div className="bottomSection">

                            <BottomSection
                                filter={filter}
                                onFilter={setFilter}
                                todos={todos}
                            />


                            {/* =========================
                                TODO LIST
                            ========================= */}

                            <div className="listConatiner">

                                {filteredTodos.length === 0 ? (

                                    <EmptyTodo />

                                ) : (

                                    [...filteredTodos]
                                        .reverse()
                                        .map(todo => (

                                            <TodoList
                                                key={todo.id}

                                                id={todo.id}

                                                title={todo.todo}

                                                category={todo.category}

                                                completed={todo.completed}

                                                onComplete={handleComplete}

                                                onDelete={handleDelete}

                                                onEdit={handleEdit}
                                            />

                                        ))
                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}

export default Card