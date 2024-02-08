export async function composeLog(filename: string) {
	const proc = await Bun.spawn(["docker", "compose", "-f", filename, "logs"], {
		stdout: "inherit",
	});
	const err = await new Response(proc.stderr).text();

	if (err) {
		console.log("Error: ", err);
	}
}
