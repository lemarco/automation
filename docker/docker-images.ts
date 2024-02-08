import { getCurrentImageList } from "./utils";

export async function showDockerImages() {
	console.table(await getCurrentImageList());
}
