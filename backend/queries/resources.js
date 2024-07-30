const db = require("../db/dbConfig.js");

// all resources and resources of a specific user
const getAllResources = async (uid) => {
	try {
		if (uid) {
			var resources = await db.many(
				"SELECT * FROM resources WHERE resource_id IN (SELECT resource_id FROM users_resources WHERE uid=$1)",
				uid
			);
		} else {
			var resources = await db.many("SELECT * FROM resources");
		}
		return resources;
	} catch (error) {
		return error;
	}
};

// get a resource
const getOneResource = async (uid, resource_id) => {
	try {
		//if uid is not null
		if (uid) {
			var resource = await db.one(
				"SELECT * FROM resources WHERE resource_id IN (SELECT resource_id FROM users_resources WHERE uid=$1) AND resource_id=$2",
				[uid, resource_id]
			);
		}
		//if uid is null
		else {
			var resource = await db.one(
				"SELECT * FROM resources WHERE resource_id=$1",
				resource_id
			);
		}

		return resource;
	} catch (error) {
		return error;
	}
};

// create a resourcs

// /users/uid/resources
// /resources
const createResource = async (uid, resource) => {
	try {
		//add uid and resource_id into the join table(user add a resource to his profile)

		if (uid && !isNaN(resource)) {
			const user_resource = await db.one(
				"INSERT INTO users_resources(uid, resource_id) VALUES($1,$2) RETURNING *",
				[uid, resource]
			);
			return user_resource;
		}
		//create a new resource
		else {
			const createdResouce = await db.one(
				"INSERT INTO resources(resource_name,description,resource_category,resourcefor,start_datetime, end_datetime, url) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
				[
					resource.resource_name,
					resource.description,
					resource.resource_category,
					resource.resourcefor,
					resource.start_datetime,
					resource.end_datetime,
					resource.url,
				]
			);
			return createdResouce;
		}
	} catch (error) {
		return error;
	}
};

// delete a resource

const deleteResource = async (uid, resource_id) => {
	try {
		//user removes a resource from his profile
		if (uid && resource_id) {
			const removedResource = await db.one(
				"DELETE FROM users_resources WHERE uid=$1 AND resource_id=$2 RETURNING *",
				[uid, resource_id]
			);
			return removedResource;
		}
		//delete a resource from the database
		else {
			const deletedResource = await db.one(
				"DELETE FROM resources WHERE resource_id=$1 RETURNING *",
				resource_id
			);
			return deletedResource;
		}
	} catch (error) {
		return error;
	}
};

// update a resources

const updateResource = async (resource_id, resource) => {
	try {
		const updatedResource = await db.one(
			"UPDATE resources SET resource_name=$1, description=$2, resource_category=$3, resourcefor=$4, start_datetime=$5, end_datetime=$6, url=$7, is_verified=$8 WHERE resource_id=$9 RETURNING *",
			[
				resource.resource_name,
				resource.description,
				resource.resource_category,
				resource.resourcefor,
				resource.start_datetime,
				resource.end_datetime,
				resource.url,
				resource.is_verified,
				resource_id,
			]
		);
		return updatedResource;
	} catch (error) {
		return error;
	}
};

module.exports = {
	getAllResources,
	getOneResource,
	createResource,
	deleteResource,
	updateResource,
};
