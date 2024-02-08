import { dockerPs } from "./docker-ps";

export async function composeDown(filename: string) {
	const { stdout, stderr } = await Bun.spawn([
		"docker",
		"compose",
		"-f",
		filename,
		"down",
	]);
	const res = await new Response(stdout).text();
	const err = await new Response(stderr).text();
	if (err) {
		console.log("Error: ", err);
	}

	if (res) {
		console.log(res);
		console.log("Compose started");
		await dockerPs();
	}
}
