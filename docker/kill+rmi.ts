import type { ContainerObj, ImageObj } from "./types";
import {
	getCurrentContainerList,
	getCurrentImageList,
	killContainer,
	removeImage,
	runAndHandleError,
} from "./utils";

async function getImageNameByContainerHash(hash: string): Promise<string> {
	return await runAndHandleError([
		"docker",
		"inspect",
		`--format='{{index .Config.Image }}`,
		hash,
	]);
}

export async function dockerKillWithImageRemove(i: string) {
	const list = await getCurrentContainerList();
	const candidat = list[+i] as ContainerObj;
	if (candidat.hash) {
		let id = "";
		const hash = candidat.hash;
		let name = await getImageNameByContainerHash(hash);
		name = name.includes(":") ? name.split(":")?.[0] : name;
		name = name.replaceAll("'", "");
		const imageList = await getCurrentImageList();
		const image = imageList.find((c) => c.name.trim() === name.trim());
		if (image) {
			id = image.id;
		}
		if (candidat.hash) {
			await killContainer(candidat.hash);
		}
		if (id) {
			await removeImage(id);
		}
	}
}
