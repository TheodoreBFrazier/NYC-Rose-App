const express = require("express");
// const path = require("path");
const upload = require("../multer.js");
const users = express.Router();
const { isAuth } = require("../passport/passportUtils.js");

//const resourcesController = require("./resourcesControllers.js");
//users/1/resources
//resources/1/users
//users queries functions
const {
	updateUser,
	deleteUser,
	createUser,
	getAllUsers,
	getOneUser,
} = require("../queries/users.js");

//resources queries functions
const {
	getAllResources,
	getOneResource,
	createResource,
	deleteResource,
} = require("../queries/resources.js");

//merge resources to users
//users.use("/:uid/resources", resourcesController);

//get all users  /users/
// isAuth,
users.get("/", async (req, res) => {
	const users = await getAllUsers();
	if (users[0]) {
		res.json({ success: true, result: users });
	} else res.status(500).json({ success: false, error: "server error..." });
});

//get a User   /users/1
// isAuth,
users.get("/:uid", async (req, res) => {
	const { uid } = req.params;

	const user = await getOneUser(uid);
	if (user.uid) {
		res.json({ success: true, result: user });
	} else
		res
			.status(500)
			.json({ success: false, error: `server error, no user at index ${uid}` });
});

//get all resources of a user  /users/1/resources
// isAuth
users.get("/:uid/resources", async (req, res) => {
	const { uid } = req.params;
	const resources = await getAllResources(uid);
	if (resources[0]) {
		res.json({ success: true, result: resources });
	} else res.status(500).json({ error: resources });
});

//get a resource of a specific user
users.get("/:uid/resources/:resource_id", async (req, res) => {
	const { resource_id, uid } = req.params;
	const resource = await getOneResource(uid, resource_id);
	if (resource.resource_id) {
		res.json({ success: true, result: resource });
	} else res.status(500).json({ success: false, error: resource });
});

//add uid and resource_id into the join table(user add a resource to his profile)
users.post("/:uid/resources", async (req, res) => {
	const { uid, resource_id } = req.body;

	const user_resource = await createResource(uid, resource_id);
	if (user_resource.uid) res.json({ success: true, result: user_resource });
	else
		res
			.status(500)
			.json({ success: false, error: "You already had the resource..." });
});

//delete User
users.delete("/:uid", async (req, res) => {
	const { uid } = req.params;
	const deletedUser = await deleteUser(uid);
	if (deletedUser.uid) {
		res.json({ success: true, result: deletedUser });
	} else
		res
			.status(500)
			.json({ success: false, error: `unable to delete user ${uid}` });
});

//user remove a resource from his profile
users.delete("/:uid/resources/:resource_id", async (req, res) => {
	const { uid, resource_id } = req.params;
	const removedResource = await deleteResource(uid, resource_id);
	if (removedResource.uid) res.json({ success: true, result: removedResource });
	else res.status(500).json({ success: false, error: removedResource });
});

//update a user
users.put("/:uid", async (req, res) => {
	const { uid } = req.params;
	const user = req.body;

	const updatedUser = await updateUser(uid, user);
	if (updatedUser.uid) {
		res.json({ success: true, result: updatedUser });
	} else
		res
			.status(500)
			.json({ success: false, error: `unable to update user ${uid}` });
});

//update user image
users.post("/:uid/upload", upload.single("photo"), async (req, res) => {
	if (!req.file) {
		console.log("No file uploaded");
		return res.status(400).json({ success: false, error: "No file uploaded!" });
	}
	const file = req.file;

	const { uid } = req.params;
	const user = await getOneUser(uid);
	if (user.uid) {
		user.user_image = file.filename;

		var updatedUser = await updateUser(uid, user);
	}

	try {
		if (updatedUser.uid)
			return res.json({
				success: true,
			});
	} catch (error) {
		console.log(error);
	}
});

module.exports = users;
