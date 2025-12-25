import express, { json } from "express";

const app = express();
const PORT = 5050;

const todos = [
	{
		id: "1",
		title: "Buy Strawberries",
		isCompleted: false,
	},
	{
		id: "2",
		title: "Recharge wifi",
		isCompleted: true,
	},
];

app.use(json());

app.all("/", (req, res) => {
	res.status(200).json({ message: "Hey I'm up !" });
});

// READ
app.get("/todos", (req, res) => {
	res.status(200).json({ data: todos });
});

// CREATE
app.post("/todos", (req, res) => {
	const todo = req.body;
	todos.push(todo);
	res.status(201).json({ data: todo });
});

// UPDATE
app.put("/todos/:id", (req, res) => {
	const todoId = req.params.id;
	const todo = req.body;

	const todoIndex = todos.findIndex((t) => t.id === todoId);

	if (todoIndex !== -1) {
		todos[todoIndex] = {
			...todo,
		};
	} else {
		res.status(400).json({ message: "Todo not found !" });
	}
	res.status(200).json({ data: todo, message: "Todo updated successfully !" });
});

// DELETE
app.delete("/todos/:id", (req, res) => {
	const todoId = req.params.id;
	const todoIndex = todos.findIndex((t) => t.id === todoId);

	if (todoIndex !== -1) {
		todos.splice(todoIndex, 1);
	} else {
		res.status(400).json({ message: "Todo not found !" });
	}

	res.status(204).json({ message: "Todo Deleted successfully !" });
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
