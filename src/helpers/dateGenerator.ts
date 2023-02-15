type DateTransformFn = (date: string) => string;

export const dateTransform: DateTransformFn = (dateString) => {
	const dateSplitted = dateString.split('/');

	let day = dateSplitted[0];
	let month = dateSplitted[1];
	const year = dateSplitted[2];

	day = Number(day) > 9 ? day : `0${day}`;
	month =
		Number(month) + 1 > 9
			? (Number(month) + 1).toString()
			: `0${Number(month) + 1}`;

	const newDate = `${day}.${month}.${year}`;

	return newDate;
};
