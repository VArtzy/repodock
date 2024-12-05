#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var path = require("path");
var os = require("os");
var fs = require("fs");
var commander_1 = require("commander");
var RepoLinker = /** @class */ (function () {
    function RepoLinker() {
        this.configPath = path.join(os.homedir(), '.repodock.json');
        this.config = this.loadConfig();
    }
    RepoLinker.prototype.loadConfig = function () {
        if (!fs.existsSync(this.configPath)) {
            var defaultConfig = {
                ghDir: path.join(os.homedir(), 'github'),
                repo: {}
            };
            fs.writeFileSync(this.configPath, JSON.stringify(defaultConfig));
            return defaultConfig;
        }
        return JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
    };
    RepoLinker.prototype.saveConfig = function () {
        fs.writeFileSync(this.configPath, JSON.stringify(this.config));
    };
    RepoLinker.logError = function (msg) {
        console.error("\u001B[31m ".concat(msg, " \u001B[0m"));
    };
    RepoLinker.prototype.add = function (repoPath, alias) {
        var fullRepoPath = repoPath === '.' ? process.cwd() : path.resolve(repoPath);
        if (!fs.existsSync(fullRepoPath) || !fs.lstatSync(fullRepoPath).isDirectory()) {
            RepoLinker.logError('Invalid repository path');
            return;
        }
        var repoName = alias || path.basename(fullRepoPath);
        var symlinkPath = path.join(this.config.ghDir, repoName);
        fs.opendir(this.config.ghDir, function (err) { return err ? RepoLinker.logError(err.message) : null; });
        fs.symlink(fullRepoPath, symlinkPath, function (err) { return err ? RepoLinker.logError(err.message) : null; });
        this.config.repo[repoName] = fullRepoPath;
        this.saveConfig();
        console.log("\u001B[32m Repository linked: ".concat(repoName, " -> ").concat(fullRepoPath, " \u001B[0m"));
    };
    RepoLinker.prototype.list = function () {
        if (Object.keys(this.config.repo).length === 0) {
            console.log("\u001B[33m No repositories linked \u001B[0m");
            return;
        }
        console.log("\u001B[34m Linked repositories:  \u001B[0m");
        Object.entries(this.config.repo).forEach(function (_a) {
            var alias = _a[0], path = _a[1];
            console.log("  \u001B[32m".concat(alias, "\u001B[0m: ").concat(path));
        });
    };
    RepoLinker.prototype.remove = function (alias) {
        if (!this.config.repo[alias]) {
            RepoLinker.logError("Repository ".concat(alias, " not found"));
        }
        var symlinkPath = path.join(this.config.ghDir, alias);
        fs.rm(symlinkPath, function (err) { return err ? RepoLinker.logError(err.message) : null; });
        delete this.config.repo[alias];
        this.saveConfig();
    };
    RepoLinker.prototype.set = function (newPath) {
        fs.opendir(this.config.ghDir, function (err) { return err ? RepoLinker.logError(err.message) : null; });
        this.config.ghDir = newPath;
        this.saveConfig();
        console.log("\u001B[32m GitHub directory updated to: ".concat(newPath, " \u001B[0m"));
    };
    return RepoLinker;
}());
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var linker;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    linker = new RepoLinker();
                    commander_1.program
                        .version('1.0.0')
                        .description('Instantly create a centralized, symlinked directory that maps all your projects, making repository discovery as simple as a single command.');
                    commander_1.program
                        .command('add <repoPath>')
                        .description('Add a repository symlink')
                        .option('-a, --alias <alias>', 'Optional alias for the repository')
                        .action(function (repoPath, options) { return linker.add(repoPath, options.alias); });
                    commander_1.program
                        .command('list')
                        .description('List all linked repositories')
                        .action(function () { return linker.list(); });
                    commander_1.program
                        .command('rm <alias>')
                        .description('Remove a repository symlink')
                        .action(function (alias) { return linker.remove(alias); });
                    commander_1.program
                        .command('set <path>')
                        .description('Set the GitHub directory for symlinks')
                        .action(function (path) { return linker.set(path); });
                    return [4 /*yield*/, commander_1.program.parseAsync(process.argv)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main()["catch"](console.error);
