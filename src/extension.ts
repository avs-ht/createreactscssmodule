import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {

  const addModule = (type: 'scss' | 'css', uri: vscode.Uri) => {
    const fileName = path.basename(uri.fsPath, uri.fsPath.endsWith('.tsx') ? '.tsx' : '.jsx');
    const configuration = vscode.workspace.getConfiguration("crsm");
    const prefix: string | undefined = configuration.get('startOfStyle');
    const dirName = path.dirname(uri.fsPath);
    const newFileName = `${fileName}.module.${type}`;
    const newFilePath = path.resolve(dirName, newFileName); 

    if (fs.existsSync(newFilePath)) {
      vscode.window.showErrorMessage(`Файл ${newFileName} уже создан!`);
      return;
    }

    fs.readFile(uri.fsPath, (err, data) => {
      if (err) {throw err;}

      const fileData = data.toString();
      const newLine = `import ${prefix} from './${newFileName}'\n`;
      const newFileData = newLine + fileData;
      
      fs.writeFile(uri.fsPath, newFileData, (err) => {
        if (err) {throw err;}
      });

      const regex = new RegExp(`${prefix}\\.\\w+`, 'g'); 
      let matches = fileData.match(regex)?.toString().split(',').map(el => {
        const className = el.substring(prefix!.length+1, el.length);
        return (`.${className} {\n\n}`);
      });
      if (matches === undefined) {
        matches = [""];
      }
      fs.writeFile(newFilePath, matches.join('\n'), (err) => {
        if (err) {throw err;}
      });
    });

    vscode.window.showInformationMessage(`${newFileName} был создан!`);
  };
  const addModuleSCSS = vscode.commands.registerCommand("crsm.addModuleSCSS", (uri : vscode.Uri) => addModule('scss', uri));
  const addModuleCSS = vscode.commands.registerCommand("crsm.addModuleCSS", (uri : vscode.Uri) => addModule('css', uri));
  let pasteStyle = vscode.commands.registerCommand("crsm.pasteStyle", () => {
    const prefix: string | undefined = vscode.workspace.getConfiguration("crsm").get('startOfStyle');
    const textToInsert = `className={${prefix}.}`;
    const editor = vscode.window.activeTextEditor;
    if (!editor) {return;}
    const currPosition = editor.selection.active;
  
    editor.edit(editBuilder => {
      editBuilder.insert(currPosition, textToInsert);
    }).then(() => {
      const newPosition = editor.document.positionAt(editor.document.offsetAt(currPosition) + textToInsert.length - 1);
      const newSelection = new vscode.Selection(newPosition, newPosition);
      editor.selection = newSelection;
      editor.revealRange(newSelection);
    });
  });
  context.subscriptions.push(addModuleSCSS);
  context.subscriptions.push(addModuleCSS);
  context.subscriptions.push(pasteStyle);
}

export function deactivate() {}