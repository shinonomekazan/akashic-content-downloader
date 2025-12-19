import * as https from "https";
import * as fs from "fs";

export function download(url: string) {
	return new Promise<Buffer>((resolve, reject) => {
		const result: Buffer[] = [];
		https
			.get(url, (res) => {
				res.on("data", (chunk) => {
					result.push(chunk);
				});
				res.on("end", () => {
					resolve(Buffer.concat(result));
				});
			})
			.on("error", (e) => {
				reject(e);
			});
	});
}

export function writeByUrl(url: string, outputPath: string) {
	return new Promise<void>((resolve, reject) => {
		const stream = fs.createWriteStream(outputPath);
		https
			.get(url, (res) => {
				res.pipe(stream);
				res.on("end", () => {
					stream.close();
					resolve();
				});
			})
			.on("error", (e) => {
				reject(e);
			});
	});
}
