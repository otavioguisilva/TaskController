import electron from 'electron';
import path from 'path';
import url from 'url';
import 'regenerator-runtime/runtime';

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

// *Funcoes devem ser exportadas pra serem acessiveis ao front-end
// Executa comando do SO e retorna resultado ao front-end
// Outro processo é o IPCMaine IPCRenderer
// https://electronjs.org/docs/api/ipc-main
// https://electronjs.org/docs/api/ipc-renderer
exports.execProcess = (process, callback) => {
  const { exec } = require('child_process');
  const callExec = exec(process)

  callExec.stdout.on('data', function(data){
    callback(data)
  })
  callExec.stderr.on('data', function(data){
    callback("<b>ERROR:</b> \n" + data)
  })
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    show: false,
    width: 800,
    height: 600,
    backgroundColor: '#BBBBBA',
    icon: path.join(__dirname,  'icons/favicon.icns'),
    // Caracteristicas visuais da janela
    // autoHideMenuBar: true,
    // titleBarStyle: 'customButtonsOnHover',
    frame: true, // Retira barra superior
    useContentSize: true, // Inibe mostragem de dimensao da janela

    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.maximize();

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});