# Akashic Content Downloader

TypeScript CLI tool template built with Commander.js for downloading Akashic content.

## Features

- 📦 TypeScript support with strict type checking
- 🔧 Commander.js for CLI functionality
- ✨ Prettier for code formatting
- 🔍 ESLint for code quality
- 🧪 Jest for testing
- 🎯 EditorConfig for consistent coding styles

## Installation

```bash
npm install
```

## Usage

### Development Mode

```bash
npm run dev -- <command> [options]
```

### Build and Run

```bash
npm run build
npm start -- <command> [options]
```

### Available Commands

#### Download Content

```bash
npm run dev -- download <url> [options]
```

Options:

- `-o, --output <path>` - Output directory path (default: "./downloads")

Example:

```bash
npm run dev -- download https://example.com -o ./my-downloads
```

#### List Content

```bash
npm run dev -- list [options]
```

Options:

- `-f, --filter <pattern>` - Filter pattern

Example:

```bash
npm run dev -- list -f "*.json"
```

## Development Scripts

- `npm run build` - Build the TypeScript code
- `npm run dev` - Run in development mode with ts-node
- `npm test` - Run linting and tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run clean` - Remove build artifacts

## Project Structure

```
.
├── src/
│   ├── __tests__/       # Test files
│   ├── index.ts         # CLI entry point
│   └── downloader.ts    # Core functionality
├── dist/                # Built output (generated)
├── .editorconfig        # Editor configuration
├── .prettierrc          # Prettier configuration
├── eslint.config.js     # ESLint configuration
├── jest.config.js       # Jest configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies and scripts
```

## License

MIT
