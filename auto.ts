import { dockerPs, dockerKillByIndex } from './docker'
const args = process.argv;

if (args) {
	if (args[2] === "docker") {
		const dockerArg = args[3]
		if ( dockerArg === "ps") {
			await dockerPs();
		}
		if ( dockerArg === "kill") {
			const idx = args[4];
			await dockerKillByIndex(idx);
		}
		if (dockerArg === "restart") {
			
			const idx = args[4];
			await dockerRestartByIndex(idx)
		}
	}
}

