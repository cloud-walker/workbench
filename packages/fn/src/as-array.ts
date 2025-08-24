type AsArray<T extends unknown | readonly unknown[]> = Extract<
	T,
	readonly unknown[]
> extends never
	? [T]
	: Extract<T, readonly unknown[]>

export function asArray<T extends unknown | readonly unknown[]>(
	value: T,
): AsArray<T> {
	if (Array.isArray(value)) {
		return value as never
	}
	return [value] as never
}
