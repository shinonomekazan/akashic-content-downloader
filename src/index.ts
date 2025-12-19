#!/usr/bin/env node

import { Command } from "commander";
import { downloadContent } from "./downloader";

function main(): void {
	const program = new Command();

	program
		.name("akashic-content-downloader")
		.description("Akashic Content Downloader - A CLI tool for downloading Akashic content")
		.version("0.1.0");

	program
		.command("download")
		.description("Akashic Contentをダウンロードします")
		.argument("<url>", "game.jsonまたはcontent.jsonのURL")
		.option("-o, --output <path>", "出力先ファイルパス", "./content")
		.action(async (url: string, options: { output: string }) => {
			await downloadContent(url, options.output);
		});

	// 引数をパース
	program.parse(process.argv);

	if (!process.argv.slice(2).length) {
		program.outputHelp();
	}
}

// このファイルが直接実行された場合にmain関数を実行
if (require.main === module) {
	main();
}

export { main };
