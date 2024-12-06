# Your code, perfectly anchored.

## Repodock: Effortless GitHub Repository Management

Tired of losing track of your local GitHub repositories? Repodock is your personal code navigation assistant. Instantly create a centralized, symlinked directory that maps all your projects, making repository discovery as simple as a single command.

## Installation

Create the directory as your main repodock directory to store github repo symlinks

!!! WINDOWS USER: [you may have to active windows developer mode in order to work](https://www.howtogeek.com/292914/what-is-developer-mode-in-windows-10) !!!

Forgot using git init, use red init!

```bash
npm install -g repodock

red --help
red init -> git init and track to repodock
red set <your-repodock-path>
red . -> alias is automatically set to the directory name
red . my-project-alias
red <your-absolute-path> -> alias is automatically set to the directory name
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
