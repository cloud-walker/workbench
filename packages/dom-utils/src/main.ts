/**
 * A strictier version of "document.querySelector".
 */
export const getBySelector = (
	...args: Parameters<typeof document.querySelector>
) => {
	const el = document.querySelector(...args)

	if (el == null) {
		throw Error(`${args[0]} element not found.`)
	}

	return el
}
