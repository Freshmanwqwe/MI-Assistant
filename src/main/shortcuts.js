const {dialog, globalShortcut} = require('electron')

export function createGlobalShortcuts() { 

  globalShortcut.register('CommandOrControl+Alt+I', () => {
      dialog.showMessageBox({
          type: 'info',
          message: 'Miaa : Medical Image AI Assistant by HCI@ISCAS',
          buttons: ['OK']
      })
  })

}

