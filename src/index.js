//Dependencies
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

//Server
const server = express();
server.use(cors());
server.use(express.json({ limit: '15mb' }));

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
	console.log(`Server running at port: http://localhost:${PORT}`);
});

//Data Base
const getConnection = async () => {
	const connection = await mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
	});
	connection.connect();
	return connection;
};

//ENDPOINTS
//List
server.get('/deroa/resources', async (req, res) => {
	try {
		const connectDB = await getConnection();
		const select =
			'SELECT resources.title, resources.url_resource, resources.description, resources.level, author.name_author, author.url_author FROM resources INNER JOIN author ON resources.id_resource = author.fk_resource;';
		const [result] = await connectDB.query(select);
		await connectDB.end();
		res.status(200).json({
			success: true,
			results: result,
		});
	} catch (error) {
		res.status(400).json(error);
	}
});

//Search by id
server.get('/deroa/resources/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const connectDB = await getConnection();
		const select =
			'SELECT resources.title, resources.url_resource, resources.description, resources.level, author.name_author, author.url_author FROM resources INNER JOIN author ON resources.id_resource = author.fk_resource WHERE id_resource = ?';
		const [result] = await connectDB.query(select, [id]);
		await connectDB.end();

		if (result.length === 0) {
			res.status(400).json({
				success: false,
				message: 'El id no existe en la base de datos.',
			});
		} else {
			res.status(200).json({
				success: true,
				data: result[0],
			});
		}
	} catch (error) {
		res.status(400).json(error);
	}
});

//Insert new resource
server.post('/deroa/resources', async (req, res) => {
	try {
		const connectDB = await getConnection();
		const data = req.body;

		const insertResource =
			'INSERT INTO resources (title, url_resource, description, level) VALUES (?,?,?,?)';
		const [resultsResource] = await connectDB.query(insertResource, [
			data.title,
			data.url_resource,
			data.description,
			data.level,
		]);

		const insertAuthor =
			'INSERT INTO author (name_author, url_author, fk_resource) VALUES (?,?,?)';
		const [resultsAuthor] = await connectDB.query(insertAuthor, [
			data.name_author,
			data.url_author,
			resultsResource.insertId,
		]);

		await connectDB.end();

		res.status(200).json({
			success: true,
			id: resultsResource.insertId,
		});
	} catch (error) {
		res.status(400).json(error);
	}
});

//Update resource by id
server.put('/deroa/resources/:id', async (req, res) => {
	try {
		const connectDB = await getConnection();
		const { id } = req.params;
		const newResource = req.body;

		const updateResource =
			'UPDATE resources SET title = ?, url_resource = ?, description = ?, level = ? WHERE id_resource = ?;';
		const [result] = await connectDB.query(updateResource, [
			newResource.title,
			newResource.url_resource,
			newResource.description,
			newResource.level,
			id,
		]);

		const updateAuthor =
			'UPDATE author SET name_author = ?, url_author = ? WHERE fk_resource = ?;';
		const [resultsAuthor] = await connectDB.query(updateAuthor, [
			newResource.name_author,
			newResource.url_author,
			id,
		]);

		await connectDB.end();

		if (result.affectedRows > 0) {
			res
				.status(200)
				.json({ success: true, message: 'Recurso actualizado con éxito.' });
		} else {
			res
				.status(200)
				.json({ success: false, message: 'No existe ese recurso.' });
		}
		console.log(result);
	} catch (error) {
		res.status(400).json(error);
	}
});

//Delete resource by id
server.delete('/deroa/resources/:id', async (req, res) => {
	try {
		const connectDB = await getConnection();
		const { id } = req.params;
		const deleteAuthor = 'DELETE FROM author WHERE fk_resource = ?;';
		const [resultAuthor] = await connectDB.query(deleteAuthor, [id]);
		const deleteResource = 'DELETE FROM resources WHERE id_resource = ?;';
		const [resultResource] = await connectDB.query(deleteResource, [id]);

		await connectDB.end();

		if (resultResource.affectedRows > 0 && resultAuthor.affectedRows > 0) {
			res
				.status(200)
				.json({ success: true, message: 'Recurso eliminado con éxito.' });
		} else {
			res
				.status(200)
				.json({ success: false, message: 'No existe ese recurso.' });
		}
		console.log(result);
	} catch (error) {
		res.status(400).json(error);
	}
});

// Resister
server.post('/deroa/signup', async (req, res) => {
	try {
		const connectDB = await getConnection();
		const { email, name, address, password } = req.body;
		const selectEmail = 'SELECT * FROM users WHERE email = ?';
		const [emailResult] = await connectDB.query(selectEmail, [email]);
		console.log(emailResult);

		if (emailResult.length === 0) {
			const token = await bcrypt.hash(password, 10);
			const insertUser =
				'INSERT INTO users (email, name, address, password) VALUES (?,?,?,?)';
			const [newUser] = await connectDB.query(insertUser, [
				email,
				name,
				address,
				token,
			]);
			res.status(201).json({
				success: true,
				token: token,
			});
		} else {
			res.status(200).json({
				success: false,
				message: 'El usuario ya existe',
			});
		}
		await connectDB.end();
	} catch (error) {
		res.status(400).json({ success: false, error: error });
	}
});

//Log In
server.post('/deroa/login', async (req, res) => {
	const connectDB = await getConnection();
	const { email, password } = req.body;
	const selectUser = 'SELECT * FROM users WHERE email = ?';
	const [resultUser] = await connectDB.query(selectUser, [email]);

	if (resultUser.length !== 0) {
		const samePassword = await bcrypt.compare(password, resultUser[0].password);
		if (samePassword) {
			const infoToken = { email: resultUser[0].email, id: resultUser[0].id };
			const token = jwt.sign(infoToken, 'secret_pass', {
				expiresIn: '1h',
			});
			res.status(201).json({ success: true, token: token });
		} else {
			//Incorrect password
			res
				.status(400)
				.json({ success: false, message: 'Usuario o contraseña incorrectos.' });
		}
	} else {
		//Incorrect email
		res
			.status(400)
			.json({ success: false, message: 'Usuario o contraseña incorrectos.' });
	}
});

//Middleware
const authorize = (req, res, next) => {
	//const tokenString = req.headers['authorization'];
	const tokenString = req.headers.authorization;
	if (!tokenString) {
		res.status(401).json({ success: false, message: 'Usuario no autorizado.' });
	} else {
		try {
			const token = tokenString.split(' ')[1];
			const verifyToken = jwt.verify(token, 'secret_pass');
			req.userInfo = verifyToken;
		} catch (error) {
			res.status(400).json({ success: false, error: error });
		}
		next();
	}
};

//Authorize user
server.get('/deroa/profile', authorize, async (req, res) => {
	console.log(req.userInfo);
	try {
		const connectDB = await getConnection();
		const selectUser = 'SELECT * FROM users;';
		const [result] = await connectDB.query(selectUser);
		res.status(200).json({ success: true, data: result });
	} catch (error) {
		res.status(400).json({ success: false, error: error });
	}
});
