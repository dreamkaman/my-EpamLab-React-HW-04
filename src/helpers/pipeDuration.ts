type DurationTransformFn = (data: number) => string;

export const durationTransform: DurationTransformFn = (duration) => {
	const hours = Math.floor(duration / 60);
	const minutes = duration - 60 * hours;

	const hoursStr = hours > 9 ? hours : `0${hours}`;
	const minutesStr = minutes > 9 ? minutes : `0${minutes}`;

	return `${hoursStr}:${minutesStr}`;
};
