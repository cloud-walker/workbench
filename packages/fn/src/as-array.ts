export function asArray<const T>(value: T | T[]): T[] {
	if (Array.isArray(value)) {
		return value
	}
	return [value]
}

export function asArray2<const T>(value: T): T extends unknown[] ? T : T[] {
	if (Array.isArray(value)) {
		return value as never
	}
	return [value] as never
}
