# Your code, perfectly anchored.

## Repodock: Effortless GitHub Repository Management

Tired of losing track of your local GitHub repositories? Repodock is your personal code navigation assistant. Instantly create a centralized, symlinked directory that maps all your projects, making repository discovery as simple as a single command.

## Installation

Create the directory as your main repodock directory to store github repo symlinks

```bash
npm install -g repodock

red --help
red set <your-repodock-path>
red add . -> alias is automatically set to the directory name
red add . my-project-alias
red add <your-absolute-path> -> alias is automatically set to the directory name
red rm <alias>
red list
```

You can also custom your command, instead of "red" set to "rd" in package.json "bin"

## Features

Key Features:

Centralize repository locations
Create instant symlinks
Manage multiple project directories
Quick repository discovery
Minimal configuration

Use Cases:

Developers with complex project structures
Freelancers managing multiple client repositories
Teams with distributed codebases
