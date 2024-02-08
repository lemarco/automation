import { getCurrentContainerList, restartContainer } from "./utils";

export async function dockerRestartByIndex(i: string) {
	const list = await getCurrentContainerList();
	const candidat = list[+i];
	if (candidat) {
		const hash = candidat.hash;
		if (hash) {
			await restartContainer(hash);
		}
	}
}
