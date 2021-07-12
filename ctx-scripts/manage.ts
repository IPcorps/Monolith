
import vscode, { ThemeColor } from "vscode";
import fs from "fs";

const setPath = vscode.workspace.workspaceFolders![0]!.uri.fsPath + "/.vscode/settings.json";
const commandIdMini = "ctx.miniTs", commandIdHttps = "ctx.https", commandIdMode = "ctx.devMode";
const iconMiniTs = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left),
    iconHttps = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left),
    iconMode = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
const commandMiniTs = vscode.commands.registerCommand(commandIdMini, setMiniTs),
    commandHttps = vscode.commands.registerCommand(commandIdHttps, setHttps),
    commandMode = vscode.commands.registerCommand(commandIdMode, invertMode);

function setMiniTs() {
    let settings = JSON.parse(fs.readFileSync(setPath).toString());
    settings.miniTs = !settings.miniTs;
    iconMiniTs.text = settings.miniTs ? "MiniTS" : "NotMiniTS";
    iconMiniTs.backgroundColor = settings.miniTs ? undefined : new ThemeColor("statusBarItem.errorBackground");
    fs.writeFileSync(setPath, JSON.stringify(settings, null, "\t"));
}

function setHttps() {
    let settings = JSON.parse(fs.readFileSync(setPath).toString());
    settings.https = !settings.https;
    iconHttps.text = settings.https ? "HttpS" : "Http";
    fs.writeFileSync(setPath, JSON.stringify(settings, null, "\t"));
}

function invertMode() {
    let settings = JSON.parse(fs.readFileSync(setPath).toString());
    settings.devMode = !settings.devMode;
    iconMode.text = settings.devMode ? "DEV" : "PROD";
    fs.writeFileSync(setPath, JSON.stringify(settings, null, "\t"));
}

export function activate() {

    const settings = JSON.parse(fs.readFileSync(setPath).toString());

    iconMiniTs.tooltip = "Minification after TypeScript compilation";
    iconMiniTs.command = commandIdMini;
    iconMiniTs.text = settings.miniTs ? "MiniTS" : "NotMiniTS";
    iconMiniTs.backgroundColor = settings.miniTs ? undefined : new ThemeColor("statusBarItem.errorBackground");
    iconMiniTs.show();

    iconHttps.tooltip = "Switching server security";
    iconHttps.command = commandIdHttps;
    iconHttps.text = settings.https ? "HttpS" : "Http";
    iconHttps.show();

    iconMode.tooltip = "Switching the development mode";
    iconMode.command = commandIdMode;
    iconMode.text = settings.devMode ? "DEV" : "PROD";
    iconMode.show();

}

export function deactivate() {

    iconMiniTs.dispose();
    commandMiniTs.dispose();

    iconHttps.dispose();
    commandHttps.dispose();

    iconMode.dispose();
    commandMode.dispose();

}
