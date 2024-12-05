import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import { program } from 'commander';

interface Config {
    ghDir: string;
    repo: {
        [key: string]: string;
    }
}

class RepoLinker {
    private configPath: string;
    private config: Config;

    constructor() {
        this.configPath = path.join(os.homedir(), '.repodock.json');
        this.config = this.loadConfig();
    }

    private loadConfig(): Config {
        if (!fs.existsSync(this.configPath)) {
            const defaultConfig: Config = {
                ghDir: path.join(os.homedir(), 'github'),
                repo: {}
            }
            fs.writeFileSync(this.configPath, JSON.stringify(defaultConfig))
            return defaultConfig
        }
        return JSON.parse(fs.readFileSync(this.configPath, 'utf8'))
    }

    private saveConfig() {
        fs.writeFileSync(this.configPath, JSON.stringify(this.config))
    }

    private static logError(msg: string) {
        console.error(`\x1b[31m ${msg} \x1b[0m`)
    }

    add(repoPath: string, alias?: string) {
        const fullRepoPath = repoPath === '.' ? process.cwd() : path.resolve(repoPath)
        if (!fs.existsSync(fullRepoPath) || !fs.lstatSync(fullRepoPath).isDirectory()) {
            RepoLinker.logError('Invalid repository path')
            return
        }

        const repoName = alias || path.basename(fullRepoPath)
        const symlinkPath = path.join(this.config.ghDir, repoName)

        fs.opendir(this.config.ghDir, err => err ? RepoLinker.logError(err.message): null)

        fs.symlink(fullRepoPath, symlinkPath, err => err ? RepoLinker.logError(err.message) : null)

        this.config.repo[repoName] = fullRepoPath
        this.saveConfig()

        console.log(`\x1b[32m Repository linked: ${repoName} -> ${fullRepoPath} \x1b[0m`)
    }

    list() {
        if (Object.keys(this.config.repo).length === 0) {
            console.log(`\x1b[33m No repositories linked \x1b[0m`)
            return
        }

        console.log(`\x1b[34m Linked repositories:  \x1b[0m`)
        Object.entries(this.config.repo).forEach(([alias, path]) => {
            console.log(`  \x1b[32m${alias}\x1b[0m: ${path}`)
        })
    }

    remove(alias: string) {
        if (!this.config.repo[alias]) {
            RepoLinker.logError(`Repository ${alias} not found`)
        }

        const symlinkPath = path.join(this.config.ghDir, alias)

        fs.rm(symlinkPath, err => err ? RepoLinker.logError(err.message) : null)

        delete this.config.repo[alias]
        this.saveConfig()
    }

    set(newPath: string) {
        fs.opendir(this.config.ghDir, err => err ? RepoLinker.logError(err.message): null)

        this.config.ghDir = newPath
        this.saveConfig()

        console.log(`\x1b[32m GitHub directory updated to: ${newPath} \x1b[0m`)
    }
}

async function main() {
    const linker = new RepoLinker()

    program
    .version('1.0.0')
    .description('Instantly create a centralized, symlinked directory that maps all your projects, making repository discovery as simple as a single command.')

    program
    .command('add <repoPath>')
    .description('Add a repository symlink')
    .option('-a, --alias <alias>', 'Optional alias for the repository')
    .action((repoPath, options) => linker.add(repoPath, options.alias))

    program
    .command('list')
    .description('List all linked repositories')
    .action(() => linker.list())

    program
    .command('rm <alias>')
    .description('Remove a repository symlink')
    .action(alias => linker.remove(alias))

    program
    .command('set <path>')
    .description('Set the GitHub directory for symlinks')
    .action(path => linker.set(path))

    await program.parseAsync(process.argv)
}

main().catch(console.error)
