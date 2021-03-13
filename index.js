exports.NetworkMod = function edgeUI(mod) {
  if (!global.TeraProxy.GUIMode)
    throw new Error('Proxy GUI is not running!');

  const { Host } = require('tera-mod-ui');
  const path = require("path")
  let ui = new Host(mod, 'index.html', {
    title: 'edgeui',
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    fullscreen: false,
    fullscreenable: false,
    skipTaskBar: false,
    width: 182,
    height: 182,
    resizable: false,
    center: true,
    x: mod.settings.windowPos[0],
    y: mod.settings.windowPos[1],
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    webPreferences: { nodeIntegration: true, devTools: false }
  }, false, path.join(__dirname, 'ui'))

  let opened = false,
    curEdge = 0,
    focused = null,
    focusChange = true
  mod.game.on('enter_game', () => { if (mod.game.me.class == 'warrior' && !opened) { mod.command.exec('edgeui') } })
  mod.game.on('leave_game', () => { ui.close(); mod.clearAllIntervals() })

  async function moveTop() {
    focused = await mod.clientInterface.hasFocus()
    if (!focused && focusChange) { ui.hide(); focusChange = false; }
    if (focused && !focusChange) { ui.show(); focusChange = true; }
    if (focused) ui.window.moveTop()
  }

  mod.command.add('edgeui', (arg, arg2) => {
    if (!opened && !arg || !opened && ['open', 'gui', 'ui'].includes(arg)) {
      opened = true
      ui.show();
      setTimeout(() => { ui.send('edgeLaurel', { text: mod.settings.laurel }); mod.command.exec(`edgeui scale ${mod.settings.scale}`) }, 150)
      ui.window.setPosition(mod.settings.windowPos[0], mod.settings.windowPos[1]);
      ui.window.setAlwaysOnTop(true, 'screen-saver', 1);
      ui.window.setVisibleOnAllWorkspaces(true);
      mod.setInterval(() => { moveTop() }, 500);
      ui.window.on('close', () => { mod.settings.windowPos = ui.window.getPosition(); mod.clearAllIntervals(); opened = false });
    }
    if (opened && arg == 'laurel' && ['champ', 'diamond', 'gold', 'silver', 'bronze', 'none'].includes(arg2)) {
      mod.settings.laurel = arg2
      mod.command.message(`laurel set to ${arg2}`)
      switch (arg2) {
        case 'champ': ui.send('edgeLaurel', { text: arg2 }); break;
        case 'diamond': ui.send('edgeLaurel', { text: arg2 }); break;
        case 'gold': ui.send('edgeLaurel', { text: arg2 }); break;
        case 'silver': ui.send('edgeLaurel', { text: arg2 }); break;
        case 'bronze': ui.send('edgeLaurel', { text: arg2 }); break;
        case 'none': ui.send('edgeLaurel', { text: arg2 }); break;
      }
    }
    if (opened && arg == 'scale') {
      mod.settings.scale = parseFloat(arg2)
      mod.command.message(`scale set to ${parseFloat(arg2)}`)
      ui.send('edgeResize', { text: parseFloat(arg2) })
      ui.window.setBounds({ width: Math.floor(182 * parseFloat(arg2)) + 12, height: Math.floor(178 * parseFloat(arg2)) + 12 })
    }
  })

  mod.hook('S_PLAYER_STAT_UPDATE', 14, (e) => {
    if (!mod.game.me.class == 'warrior' || !opened || curEdge == e.edge) return
    curEdge = e.edge
    ui.send('edgeUpdate', { text: e.edge })
  })

}
