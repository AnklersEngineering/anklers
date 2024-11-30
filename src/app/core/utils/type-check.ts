export function identityType<Type>() {
	return undefined as Type;
}

/**
 * Usage:
 * const foo = isInstanceOfByKeys<{testKey:string}>(someObjValue, ['testKey']);
 * const bar = isInstanceOfByKeys<{testKey:string,testKey2:string}>(someObjValue, ['testKey','testKey2']);
 */
export function isInstanceOfByKeys<T>(object: any, keys: string[]): object is T {
	for (let i = 0; i < keys.length; i++) {
		if (!(keys[i] in object)) {
			return false;
		}
	}
	return true;
}

/**
 * Usage:
 * var isNumber = OfType<any, number>(value, Number);
 */
export function isTypeOf<T, U extends Function>(value: T, arg: U): boolean {
	// extract the name of the class
	// used to match primitive types
	const typeName = (/function\s*([^(]*)/i.exec(arg + '') as any)[1].toLocaleLowerCase();

	let isOfType = typeof value === typeName;
	if (!isOfType) {
		try {
			isOfType = value instanceof arg;
		} catch (ex) {}
	}
	return isOfType;
}

/**
 * Usage:
 * var numbers = OfType<any, number>(list, Number);
 * var foos = OfType<any, Foo>(list, Foo);
 */
export function OfType<T, U>(list: T[], arg: Function): U[] {
	const result: U[] = [];

	list.forEach((e) => {
		// extract the name of the class
		// used to match primitive types
		const typeName = (/function\s*([^(]*)/i.exec(arg + '') as any)[1].toLocaleLowerCase();

		let isOfType = typeof e === typeName;

		// if it is not primitive or didn't match the type
		// try to check if it is an instanceof
		if (!isOfType) {
			try {
				isOfType = e instanceof arg;
			} catch (ex) {}
		}

		if (isOfType) {
			result.push(e as any as U);
		}
	});

	return result as any[];
}

