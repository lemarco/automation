import { dockerPs } from ".";
import { startCompose } from "./utils";

export async function composeStart(filename: string) {
	await startCompose(filename);
	console.log("Compose started");
	await dockerPs();
}
