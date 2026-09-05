import "./EmptyTodo.css";

const EmptyTodo = () => {
    return (
        <div className="emptyTodo">
            <div className="emptyTodoIcon">
                📝
            </div>

            <h3>No Todos Yet</h3>

            <p>
                Looks like your todo list is empty.
                Add something to get started!
            </p>
        </div>
    );
};

export default EmptyTodo;