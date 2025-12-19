#!/usr/bin/env node

import { Command } from "commander";

/**
 * CLI アプリケーションのメインエントリーポイント
 */
function main(): void {
	const program = new Command();

	program
		.name("akashic-downloader")
		.description("Akashic Content Downloader - A CLI tool for downloading Akashic content")
		.version("0.1.0");

	// 例: download コマンド
	program
		.command("download")
		.description("Download content from specified URL")
		.argument("<url>", "URL to download content from")
		.option("-o, --output <path>", "Output directory path", "./downloads")
		.action((url: string, options: { output: string }) => {
			console.log(`Downloading content from: ${url}`);
			console.log(`Output directory: ${options.output}`);
			// ここに実際のダウンロード処理を実装
		});

	// 例: list コマンド
	program
		.command("list")
		.description("List available content")
		.option("-f, --filter <pattern>", "Filter pattern")
		.action((options: { filter?: string }) => {
			console.log("Listing available content...");
			if (options.filter) {
				console.log(`Filter: ${options.filter}`);
			}
			// ここに実際のリスト表示処理を実装
		});

	// 引数をパース
	program.parse(process.argv);

	// コマンドが指定されていない場合はヘルプを表示
	if (!process.argv.slice(2).length) {
		program.outputHelp();
	}
}

// このファイルが直接実行された場合にmain関数を実行
if (require.main === module) {
	main();
}

export { main };
