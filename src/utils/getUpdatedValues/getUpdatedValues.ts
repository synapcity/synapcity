import _ from "lodash";

function getUpdatedValues<T extends object>(oldObj: T, newObj: T): Partial<T> {
	return _.transform(
		oldObj,
		(result, oldValue, key) => {
			const newValue = newObj[key as keyof T];
			if (_.has(newObj, key) && !_.isEqual(oldValue, newValue)) {
				result[key as keyof T] = newValue;
			}
		},
		{} as Partial<T>
	);
}

export default getUpdatedValues;
