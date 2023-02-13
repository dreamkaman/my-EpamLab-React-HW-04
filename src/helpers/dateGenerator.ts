type DateTransformFn = (date: string) => string;

export const dateTransform: DateTransformFn = (dateString) => {
	const dateObject = new Date(dateString);
	let day = dateObject.getDate().toString();
	let month = dateObject.getMonth().toString();
	const year = dateObject.getFullYear().toString();

	day = Number(day) > 9 ? day : `0${day}`;
	month =
		Number(month) + 1 > 9
			? (Number(month) + 1).toString()
			: `0${Number(month) + 1}`;

	const newDate = `${day}.${month}.${year}`;

	return newDate;
};
