
const colNames = ["hash", "status", "ports", "name"];
function getCurrentList(text: string, colNames: string[]) {
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
export async function dockerPs() {
	const { stdout, stderr } = await Bun.spawn(["docker", "ps"]);
	const res = await new Response(stdout).text();
	const err = await new Response(stderr).text();
	if (err) {
		console.log("Error: ", err);
	}

	if (res) {
		console.table(getCurrentList(res, colNames), colNames);
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
		const list = getCurrentList(res, colNames);
		const candidat = list[+i] as any;
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
		
		const list = getCurrentList(res, colNames);
		const candidat = list[+i] as any;
		if (candidat) {
			const hash = candidat.hash;
			if (hash) {
				const { stdout, stderr } = await Bun.spawn(["docker", "restart", hash]);
			}
		}
	}
}
