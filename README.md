# Your Code, Perfectly Anchored

## Repodock: Effortless GitHub Repository Management

Tired of losing track of your local GitHub repositories? Repodock is your personal code navigation assistant. Instantly create a centralized, symlinked directory that maps all your projects, making repository discovery as simple as a single command.

## Installation

To get started with Repodock, follow these steps:

1. **Install Repodock Globally**  
   Use npm to install Repodock globally on your system:
   ```bash
   npm install -g repodock
   ```

2. **Set Up Your Repodock Directory**  
   Create a directory where all your repository symlinks will be stored. This will serve as your centralized "Repodock directory." You can choose any location on your system for this purpose.

   **Windows Users:**  
   If you're using Windows, you might need to enable [Developer Mode](https://www.howtogeek.com/292914/what-is-developer-mode-in-windows-10) to allow symbolic link creation.

3. **Initialize Repodock**  
   Replace `git init` with `red init` for initializing and automatically tracking repositories in Repodock.  
   Run the following command inside your project directory:
   ```bash
   red init
   ```

4. **Set Your Repodock Directory Path**  
   Link your chosen Repodock directory by running:
   ```bash
   red set <your-repodock-path>
   ```

5. **Manage Repositories with Ease**  
   - Add a repository with an alias:
     ```bash
     red .             # Automatically uses the directory name as the alias
     red . my-project  # Specify a custom alias
     ```
   - Add a repository from an absolute path:
     ```bash
     red <your-absolute-path>  # Alias is set to the directory name by default
     ```
   - Remove a repository by alias:
     ```bash
     red rm <alias>
     ```
   - List all or search tracked repositories:
     ```bash
     red ls
     red ls | fzf
     ```
  6. **Need help?**
     ```bash
     red --help
     ```

---

## Customizing Commands

If you prefer a different command instead of `red`, you can customize it.  
Modify the `"bin"` field in the `package.json` file to use your preferred alias, e.g., `"rd"`.

---

## Features

### Key Features:
- Centralized repository management.
- Instant symlinks for repositories.
- Support for managing multiple project directories.
- Simplified repository discovery.
- Minimal configuration for maximum productivity.

### Use Cases:
- Developers with complex project structures.
- Freelancers managing multiple client repositories.
- Teams with distributed codebases.
