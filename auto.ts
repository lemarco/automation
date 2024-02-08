import {
	composeDown,
	composeLog,
	composeStart,
	dockerKillByIndex,
	dockerKillWithImageRemove,
	dockerPs,
	dockerRestartByIndex,
	showDockerImages,
} from "./docker";
import { get, req } from "./request";
const args = process.argv;
const exit = process.exit;

if (args) {
	const second = args[2];
	const third = args[3];
	if (second === "get") {
		await get(args[3]);
		exit();
	}
	if (second === "post" || second === "put" || second === "delete") {
		const flag = args[4];
		const body = args[5];
		await req(third, second, flag, body);
		exit();
	}
	if (second === "docker") {
		if (third === "compose-start") {
			await composeStart(args[4]);
		}
		if (third === "compose-logs") {
			console.log("file= ", args[4]);
			await composeLog(args[4]);
			exit();
		}
		if (third === "compose-down") {
			await composeDown(args[4]);
			exit();
		}
		if (third === "ps") {
			await dockerPs();
			exit();
		}
		if (third === "kill") {
			const idx = args[4];
			await dockerKillByIndex(idx);
			exit();
		}
		if (third === "images") {
			await showDockerImages();
			exit();
		}
		if (third === "fkill") {
			const idx = args[4];
			await dockerKillWithImageRemove(idx);
			exit();
		}
		if (third === "restart") {
			const idx = args[4];
			await dockerRestartByIndex(idx);
			exit();
		}
	}
}
