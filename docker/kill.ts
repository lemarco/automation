import { getCurrentContainerList, killContainer } from "./utils";

export async function dockerKillByIndex(i: string) {
	const list = await getCurrentContainerList();
	const candidat = list[+i];
	if (candidat) {
		const hash = candidat.hash;
		if (hash) {
			await killContainer(hash);
		}
	}
}
