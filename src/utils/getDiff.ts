/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from "lodash";

function getDiff(obj1: Record<string, any>, obj2: Record<string, any>) {
	return _.transform(
		obj1,
		(result, value, key) => {
			if (!_.isEqual(value, obj2[key])) {
				result[key] = { from: value, to: obj2[key] };
			}
		},
		{} as Record<string, { from: any; to: any }>
	);
}

export default getDiff;
