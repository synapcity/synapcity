import _ from "lodash";

function getUpdatedValues<T extends object>(oldObj: T, newObj: T): Partial<T> {
	return _.transform(
		newObj,
		(result, newValue, key) => {
			if (!_.isEqual(oldObj[key as keyof T], newValue)) {
				result[key as keyof T] = newValue;
			}
		},
		{} as Partial<T>
	);
}

export default getUpdatedValues;
