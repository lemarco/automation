import { getCurrentContainerList } from "./utils";

export async function dockerPs() {
	const data = await getCurrentContainerList();
	console.table(data, ["hash", "status", "ports", "name"]);
}
