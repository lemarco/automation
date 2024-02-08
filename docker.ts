const colNames = ["hash", "status", "ports", "name"];
function getCurrentContainerList(text: string, colNames: string[]) {
	const splitted = text
		.split("\n")
		.filter(Boolean)
		.filter((v, i) => i);

	const result = [];
	for (const s of splitted) {
		result.push(
			s
				.split("  ")
				.filter(Boolean)
				.filter((val, i) => {
					if ([1, 2, 3].includes(i)) {
						return false;
					}
					return true;
				})
				.map((s) => s.trim())
				.reduce((acc, curr, i) => {
					// biome-ignore lint/performance/noAccumulatingSpread: <explanation>
					return { ...acc, [colNames[i]]: curr };
				}, {}),
		);
	}
	return result;
}

async function getCurrentImageList() {
	const { stdout, stderr } = await Bun.spawn(["docker", "images"]);
	const res = await new Response(stdout).text();
	const err = await new Response(stderr).text();
	if (err) {
		console.log("Error: ", err);
	}
	const colNames = ["name", "tag", "id", "created", "size"];

	const splitted = res
		.split("\n")
		.filter(Boolean)
		.filter((v, i) => i);
	const result = [];
	for (const s of splitted) {
		result.push(
			s
				.split("  ")
				.filter(Boolean)
				.map((s) => s.trim())
				.reduce((acc, curr, i) => {
					// biome-ignore lint/performance/noAccumulatingSpread: <explanation>
					return { ...acc, [colNames[i]]: curr };
				}, {}),
		);
	}
	return result;
}

export async function showDockerImages() {
	const res = await getCurrentImageList();
	if (res) {
		console.table(res);
	}
}

export async function dockerPs() {
	const { stdout, stderr } = await Bun.spawn(["docker", "ps"]);
	const res = await new Response(stdout).text();
	const err = await new Response(stderr).text();
	if (err) {
		console.log("Error: ", err);
	}

	if (res) {
		console.table(getCurrentContainerList(res, colNames), colNames);
	}
}

export async function dockerKillWithImageRemove(i: string) {
	const { stdout, stderr } = await Bun.spawn(["docker", "ps"]);
	const res = await new Response(stdout).text();
	const err = await new Response(stderr).text();
	if (err) {
		console.log("Error: ", err);
	}

	if (res) {
		const list = getCurrentContainerList(res, colNames);
		const candidat = list[+i] as { hash: string };
		if (candidat) {
			const hash = candidat.hash;
			const { stdout, stderr } = await Bun.spawn([
				"docker",
				"inspect",
				`--format='{{index .Config.Image }}`,
				hash,
			]);

			const res = await new Response(stdout).text();
			const err = await new Response(stderr).text();
			if (err) {
				console.log("Error while image inspecting: ", err);
			}
			let name = "";
			if (res) {
				name = res.includes(":") ? res.split(":")?.[0] : res;
				name = name.replaceAll("'", "");
				const list = (await getCurrentImageList()) as {
					name: string;
					id: string;
				}[];
				const candidat = list.find((c) => {
					return c.name.trim() === name.trim();
				});
				if (candidat) {
					name = candidat.id;
				}
			}

			if (hash) {
				const { stdout, stderr } = await Bun.spawn(["docker", "kill", hash]);

				const res = await new Response(stdout).text();
				const err = await new Response(stderr).text();
				if (err) {
					console.log("Error while removing container");
				}
			}
			if (name) {
				await Bun.spawn(["docker", "rmi", "-f", name]);
			}
		}
	}
}
export async function dockerKillByIndex(i: string) {
	const { stdout, stderr } = await Bun.spawn(["docker", "ps"]);
	const res = await new Response(stdout).text();
	const err = await new Response(stderr).text();
	if (err) {
		console.log("Error: ", err);
	}

	if (res) {
		const list = getCurrentContainerList(res, colNames);
		const candidat = list[+i] as { hash: string };
		if (candidat) {
			const hash = candidat.hash;
			if (hash) {
				const { stdout, stderr } = await Bun.spawn(["docker", "kill", hash]);
			}
		}
	}
}
export async function dockerRestartByIndex(i: string) {
	const { stdout, stderr } = await Bun.spawn(["docker", "ps"]);
	const res = await new Response(stdout).text();
	const err = await new Response(stderr).text();
	if (err) {
		console.log("Error: ", err);
	}

	if (res) {
		const list = getCurrentContainerList(res, colNames);
		const candidat = list[+i] as { hash: string };
		if (candidat) {
			const hash = candidat.hash;
			if (hash) {
				const { stdout, stderr } = await Bun.spawn(["docker", "restart", hash]);
			}
		}
	}
}
export async function composeStart(filename: string) {
	const { stdout, stderr } = await Bun.spawn([
		"docker",
		"compose",
		"-f",
		filename,
		"up",
		"-d",
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
export async function composeLog(filename: string) {
	const proc = await Bun.spawn(["docker", "compose", "-f", filename, "logs"], {
		stdout: "inherit",
	});
	const err = await new Response(proc.stderr).text();

	if (err) {
		console.log("Error: ", err);
	}
}

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
