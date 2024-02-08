export async function get(path: string) {
	const res = await fetch(path);
	if (res.ok) {
		const headers = res.headers;
		const contentType = headers.get("content-type");
		console.log(`content-type: ${contentType}`);
		if (contentType.includes("text")) {
			console.log(await res.text());
			return;
		}
		if (contentType?.includes("json")) {
			const json = await res.json();
			console.table(json);
			return;
		}
	}

	console.error(`status:${res.status}. resText: ${res.statusText}`);
}

export async function req(
	path: string,
	method: "post" | "put" | "delete",
	flag: string,
	body: string,
) {
	let content = "";
	if (body) {
		if (flag === "-f") {
			content = await Bun.file(body).text();
		} else if (flag === "-c") {
			content = body;
		}
	}
	const res = await fetch(path, { method, body: content });
	if (res.ok) {
		const headers = res.headers;
		const contentType = headers.get("content-type");
		console.log(`content-type: ${contentType}`);
		if (contentType.includes("text")) {
			console.log(await res.text());
			return;
		}
		if (contentType?.includes("json")) {
			const json = await res.json();
			console.table(json);
			return;
		}
	}
	console.error(`status:${res.status}. resText: ${res.statusText}`);
}
