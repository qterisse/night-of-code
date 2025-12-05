export type Card = {
    id: number,
    title: string,
    image: string,
    imageSource?: string,
    facts: {
			text: string,
			source: string,
			sourceURL: string,
    }[],
}