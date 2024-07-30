const db = require("../db/dbConfig.js");

//all users
// /users
const getAllUsers = async (resource_id) => {
	try {
		//if resource_id is available
		if (resource_id) {
			var users = await db.many(
				"SELECT * FROM users WHERE uid IN (SELECT uid FROM users_resources WHERE resource_id=$1)",
				resource_id
			);
		} else {
			var users = await db.many("SELECT * FROM users");
		}

		return users;
	} catch (error) {
		return error;
	}
};

//get a user
const getOneUser = async (uid) => {
	try {
		const user = await db.one("SELECT * FROM users WHERE uid=$1", uid);
		return user;
	} catch (error) {
		return error;
	}
};

//create a user
const createUser = async (user) => {
	try {
		const createdUser = await db.one(
			"INSERT INTO users(first_name,last_name,age,email,user_name, password,is_admin) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
			[
				user.first_name,
				user.last_name,
				user.age,
				user.email,
				user.user_name,
				user.password,
				user.is_admin ? true : false,
			]
		);
		return createdUser;
	} catch (error) {
		return error;
	}
};

//delete a user
const deleteUser = async (uid) => {
	try {
		const deletedUser = await db.one(
			"DELETE FROM users WHERE uid=$1 RETURNING *",
			uid
		);
		return deletedUser;
	} catch (error) {
		return error;
	}
};

//update a user
const updateUser = async (uid, user) => {
	try {
		const updatedUser = await db.one(
			"UPDATE users SET first_name=$1, last_name=$2, age=$3, email=$4, mentor_id=$5, user_image=$6 WHERE uid=$7 RETURNING *",
			[
				user.first_name,
				user.last_name,
				user.age,
				user.email,
				user.mentor_id ? user.mentor_id : null,
				user.user_image ? user.user_image : null,
				uid,
			]
		);
		return updatedUser;
	} catch (error) {
		return error;
	}
};
module.exports = {
	updateUser,
	deleteUser,
	createUser,
	getAllUsers,
	getOneUser,
};
