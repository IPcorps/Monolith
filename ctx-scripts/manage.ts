
import vscode from "vscode";
import fs from "fs";

const setPath = vscode.workspace.workspaceFolders![0]!.uri.fsPath + "/.vscode/settings.json";
const commandIdHttps = "ctx.https", commandIdMode = "ctx.devMode";
const iconHttps = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left),
    iconMode = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
const commandHttps = vscode.commands.registerCommand(commandIdHttps, setHttps),
    commandMode = vscode.commands.registerCommand(commandIdMode, invertMode);

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

    iconHttps.tooltip = "Switching server security";
    iconHttps.command = commandIdHttps;
    iconHttps.text = JSON.parse(fs.readFileSync(setPath).toString()).https ? "HttpS" : "Http";
    iconHttps.show();

    iconMode.tooltip = "Switching the development mode";
    iconMode.command = commandIdMode;
    iconMode.text = JSON.parse(fs.readFileSync(setPath).toString()).devMode ? "DEV" : "PROD";
    iconMode.show();

}

export function deactivate() {

    iconHttps.dispose();
    commandHttps.dispose();

    iconMode.dispose();
    commandMode.dispose();

}
