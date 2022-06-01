import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import axios from "axios";

function TodoList() {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:3011")
			.then((res) => setTodos(res.data))
			.catch((err) => console.log(err));
	}, [todos]);

	const addTodo = (todo) => {
		if (!todo.text || /^\s*$/.test(todo.text)) {
			return;
		}

		const newTodos = [todo, ...todos];
		setTodos(newTodos);

		//console.log(...todos);
	};

	const updateTodo = (todoId, newValue) => {
		if (!newValue.text || /^\s*$/.test(newValue.text)) {
			return;
		}

		setTodos((prev) => prev.map((item) => (item.id === todoId ? newValue : item)));
		// axios.post("http://localhost:3011/", todos).catch((err) => console.log(err));
	};

	const removeTodo = (id) => {
		const removedArr = [...todos].filter((todo) => todo.id !== id);

		setTodos(removedArr);

		axios.post("http://localhost:3011/", removedArr).catch((err) => console.log(err));
	};

	const completeTodo = (id) => {
		let updatedTodos = todos.map((todo) => {
			if (todo.id === id) {
				todo.isComplete = !todo.isComplete;
			}
			return todo;
		});
		// console.log("2")
		setTodos(updatedTodos);
	};

	return (
		<>
			<h1>What's the Plan for Today?</h1>
			<TodoForm onSubmit={addTodo} todos={todos} />
			<Todo
				todos={todos}
				completeTodo={completeTodo}
				removeTodo={removeTodo}
				updateTodo={updateTodo}
			/>
		</>
	);
}

export default TodoList;
