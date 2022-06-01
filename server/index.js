const fs = require("fs");
const express = require("express");

const PORT = 3011;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
	fs.readFile(
		"/Users/oleg/WebstormProjects/docker_lab/server/todos.txt",
		"utf8",
		(err, data) => {
			if (err) throw err;
			res.send(JSON.parse(data));
		}
	);
});

app.post("/", (req, res) => {
	const object = req.body;
	fs.writeFile(
		"/Users/oleg/WebstormProjects/docker_lab/server/todos.txt",
		JSON.stringify(object, null, 2),
		(err) => {
			if (err) {
				return console.log(err);
			}
		}
	);
});

app.listen(PORT, () => {
	console.log(`Example app listening on http://localhost:${PORT}`);
});

// const object = [
// 	{
// 		message: "1111",
// 	},
// 	{
// 		message: "222",
// 		name: "admin",
// 	},
// 	{
// 		message: "333",
// 		name: "admsdasin",
// 	},
// ];
