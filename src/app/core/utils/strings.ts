export function isString(value: any): boolean {
	return typeof value === 'string' || value instanceof String;
}

export const isEmptyStringValue = (value: string): boolean => {
	return value == null || value?.length == 0;
};

/** Utility function to create a K:V from a list of strings */
export function stringArrayToObject<T extends string>(o: Array<T>): { [K in T]: K } {
	return o.reduce((res, key) => {
		res[key] = key;
		return res;
	}, Object.create(null));
}

export function removeLineBreakersFromString(value: string) {
	if (!isEmptyStringValue(value)) {
		return value.replace(/\n|\r/g, ' ');
	}
	return value;
}

export function removeSpacesBeforeAndAfterFromString(value: string) {
	if (!isEmptyStringValue(value)) {
		return value.replace(/^\s+|\s+$/g, '');
	}
	return value;
}

export function removeDoubleSpacesFromString(value: string) {
	if (!isEmptyStringValue(value)) {
		return value.replace(/ +(?= )/g, '');
	}
	return value;
}

export function unifyString(value: string) {
	return removeDoubleSpacesFromString(removeSpacesBeforeAndAfterFromString(removeLineBreakersFromString(value)));
}
