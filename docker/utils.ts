import type { ContainerObj, ImageObj } from "./types";

const removeHeaderLine = (text: string) =>
	text
		.split("\n")
		.filter(Boolean)
		.filter((v, i) => i);
export const exit = process.exit;
export async function runAndHandleError(
	command: string[],
	errorHanlder?: (error: string) => void,
) {
	const { stdout, stderr } = await Bun.spawn(command);
	const err = await new Response(stderr).text();
	if (err) {
		if (errorHanlder) {
			errorHanlder(err);
			exit();
		}
		console.error("Error:", err);
		exit();
	}
	return await new Response(stdout).text();
}
export async function getCurrentContainerList(): Promise<ContainerObj[]> {
	const colNames = ["hash", "status", "ports", "name"];
	const text = await runAndHandleError(["docker", "ps"]);
	const splitted = removeHeaderLine(text);
	return splitted.map((s) =>
		s
			.split("  ")
			.filter(Boolean)
			.filter((_, i) => ![1, 2, 3].includes(i))
			.map((s) => s.trim())
			.reduce(
				(acc, curr, i) => ({ ...acc, [colNames[i]]: curr }),
				{} as ContainerObj,
			),
	);
}

export async function getCurrentImageList(): Promise<ImageObj[]> {
	const colNames = ["name", "tag", "id", "created", "size"];
	const text = await runAndHandleError(["docker", "images"]);
	const splitted = removeHeaderLine(text);
	return splitted.map((s) =>
		s
			.split("  ")
			.filter(Boolean)
			.map((s) => s.trim())
			.reduce(
				(acc, curr, i) => ({ ...acc, [colNames[i]]: curr }),
				{} as ImageObj,
			),
	);
}

export async function killContainer(hash: string): Promise<string> {
	return await runAndHandleError(["docker", "kill", hash]);
}
export async function removeImage(id: string): Promise<string> {
	return await runAndHandleError(["docker", "rmi", "-f", id]);
}
export async function restartContainer(hash: string): Promise<string> {
	return await runAndHandleError(["docker", "restart", hash]);
}
export async function startCompose(filename: string): Promise<string> {
	return await runAndHandleError([
		"docker",
		"compose",
		"-f",
		filename,
		"up",
		"-d",
	]);
}
