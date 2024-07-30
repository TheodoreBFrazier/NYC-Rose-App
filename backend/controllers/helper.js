const isIdValid = (id) => {
	return Number.isInteger(Number(id));
};

module.exports = {
	isIdValid,
};
