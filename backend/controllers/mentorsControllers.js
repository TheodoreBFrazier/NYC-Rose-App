const express = require("express");
const path = require("path");
const mentors = express.Router();
//multer
const upload = require("../multer.js");

const {
	getAllMentors,
	getOneMentor,
	createMentor,
	updateMentor,
	deleteMentor,
} = require("../queries/mentors.js");
const { isIdValid } = require("./helper.js");

// Get all mentors
mentors.get("/", async (req, res) => {
	try {
		const allMentors = await getAllMentors();
		if (allMentors[0]) {
			res.json({ success: true, result: allMentors });
		}
	} catch (err) {
		res.status(500).json({ success: false, error: err });
	}
});

// Get one mentor
mentors.get("/:mid", async (req, res) => {
	try {
		const { mid } = req.params;
		if (!isIdValid(mid)) {
			return res.status(404).json({ error: "the id is not valid" });
		}
		const mentor = await getOneMentor(mid);
		if (mentor.mentor_id) {
			res.json({ success: true, result: mentor });
		}
	} catch (err) {
		res.status(500).json({
			success: false,
			error: `server error, no mentor at index ${mid}`,
		});
	}
});

// Create a mentor
mentors.post("/", async (req, res) => {
	const mentor = req.body;
	const createdMentor = await createMentor(mentor);
	if (createdMentor.mentor_id) {
		res.json({ success: true, result: mentor });
	} else {
		res
			.status(500)
			.json({ success: false, error: "unable to create mentor..." });
	}
});
//update mentor image

mentors.post("/:mentor_id/upload", upload.single("photo"), async (req, res) => {
	const { mentor_id } = req.params;

	const file = req.file;

	const mentor = await getOneMentor(mentor_id);

	if (mentor.mentor_id) {
		mentor.mentor_image = file.filename;

		var updatedMentor = await updateMentor(mentor_id, mentor);
	}

	try {
		if (!isIdValid(mid)) {
			return res.status(404).json({ error: "the id is not valid" });
		}
		if (updatedMentor.mentor_id)
			return res.json({
				success: true,
			});
	} catch (error) {
		console.log(error);
	}
});

// Update a mentor
mentors.put("/:mid", async (req, res) => {
	const mentor = req.body;
	const { mid } = req.params;
	const updatedMentor = await updateMentor(mid, mentor);
	try {
		if (!isIdValid(mid)) {
			return res.status(404).json({ error: "the id is not valid" });
		}
		if (updatedMentor.mentor_id) {
			res.json({ success: true, result: updatedMentor });
		}
	} catch (err) {
		res
			.status(500)
			.json({ success: false, error: `unable to update mentor ${mid}` });
	}
});

// Delete a mentor
mentors.delete("/:mid", async (req, res) => {
	const { mid } = req.params;
	const deletedMentor = await deleteMentor(mid);
	try {
		if (!isIdValid(mid)) {
			return res.status(404).json({ error: "the id is not valid" });
		}
		if (deletedMentor.mentor_id) {
			res.json({ success: true, result: deletedMentor });
		}
	} catch (err) {
		res
			.status(500)
			.json({ success: false, error: `unable to delete mentor ${mid}` });
	}
});

module.exports = mentors;
