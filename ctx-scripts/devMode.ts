
import vscode from "vscode";
import fs from "fs";

const setPath = vscode.workspace.workspaceFolders![0]!.uri.fsPath + "/.vscode/settings.json";
const commandID = "ctx.devMode";
const iconMode = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
const commandMode = vscode.commands.registerCommand(commandID, invertMode);

function invertMode() {
    let settings = JSON.parse(fs.readFileSync(setPath).toString());
    settings.devMode = !settings.devMode;
    iconMode.text = settings.devMode ? "DEV" : "PROD";
    fs.writeFileSync(setPath, JSON.stringify(settings, null, "\t"));
}

export function activate() {
    iconMode.tooltip = "Switching the development mode";
    iconMode.command = commandID;
    iconMode.text = JSON.parse(fs.readFileSync(setPath).toString()).devMode ? "DEV" : "PROD";
    iconMode.show();
}

export function deactivate() {
    iconMode.dispose();
    commandMode.dispose();
}
