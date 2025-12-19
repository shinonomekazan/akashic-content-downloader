import { download, writeByUrl } from "./utils";
import * as fs from "fs/promises";
import * as path from "path";

interface ContentJson {
	content_url: string;
}

interface AkashicAsset {
	type: string;
	path: string;
	virtualPath: string;
}

interface GameJson {
	assets: { [key: string]: AkashicAsset };
	moduleMainScripts: { [key: string]: string };
}

class ParallelDownloader {
	promises: Promise<void>[];
	parallelLimit: number;

	constructor(parallelLimit: number) {
		this.promises = [];
		this.parallelLimit = parallelLimit;
	}

	async add(promise: Promise<void>) {
		this.promises.push(promise);
		if (this.promises.length >= this.parallelLimit) {
			return this.flush();
		}
	}

	async flush() {
		if (this.promises.length > 0) {
			await Promise.all(this.promises);
			this.promises.splice(0, this.promises.length);
		}
	}
}

export async function downloadByGameJson(gameJsonURL: string, gameJson: GameJson, outputPath: string) {
	const fileBaseDir = await path.join(outputPath, "files");
	try {
		await fs.stat(outputPath);
		throw new Error(`${outputPath} はすでに存在しています`);
	} catch (e) {
		if ((e as NodeJS.ErrnoException).code !== "ENOENT") {
			throw e;
		} else {
			// ok
		}
	}
	await fs.mkdir(fileBaseDir, { recursive: true });
	const downloader = new ParallelDownloader(10);
	for (const asset of Object.values(gameJson.assets)) {
		const fileUrl = new URL(asset.path, gameJsonURL);
		const outputFilePath = path.join(outputPath, asset.path);
		await downloader.add(writeByUrl(fileUrl.toString(), outputFilePath));
	}
	for (const moduleMainScript of Object.values(gameJson.moduleMainScripts ?? {})) {
		const fileUrl = new URL(moduleMainScript, gameJsonURL);
		const outputFilePath = path.join(outputPath, moduleMainScript);
		const outputDir = path.dirname(outputFilePath);
		await fs.mkdir(outputDir, { recursive: true });
		await downloader.add(writeByUrl(fileUrl.toString(), outputFilePath));
	}
	await downloader.flush();
	return fs.writeFile(path.join(outputPath, "game.json"), JSON.stringify(gameJson, null, "\t"), "utf8");
}

/**
 * 指定されたURLからコンテンツをダウンロードする
 * @param url - ダウンロード元のURL
 * @param outputPath - 出力先のパス
 * @returns ダウンロードが成功した場合はtrue、失敗した場合はfalse
 */
export async function downloadContent(url: string, outputPath: string) {
	const firstContent = await download(url);
	const firstJsonOrGameJson = JSON.parse(firstContent.toString("utf8")) as ContentJson | GameJson;
	if ((firstJsonOrGameJson as ContentJson).content_url != null) {
		const contentJson = firstJsonOrGameJson as ContentJson;
		const gameJsonContent = await download(contentJson.content_url);
		const gameJson = JSON.parse(gameJsonContent.toString("utf8"));
		return downloadByGameJson(contentJson.content_url, gameJson, outputPath);
	}
	return downloadByGameJson(url, firstJsonOrGameJson as GameJson, outputPath);
}

/**
 * URLが有効かどうかを検証する
 * @param url - 検証するURL
 * @returns URLが有効な場合はtrue、無効な場合はfalse
 */
export function validateUrl(url: string): boolean {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
}

/**
 * ファイルパスが有効かどうかを検証する
 * @param path - 検証するパス
 * @returns パスが有効な場合はtrue、無効な場合はfalse
 */
export function validatePath(path: string): boolean {
	// 基本的な検証: 空でないこと
	return path.trim().length > 0;
}
