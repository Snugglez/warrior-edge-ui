if (!global.TeraProxy.GUIMode) throw new Error('Proxy GUI is not running!');
const { Host } = require('tera-mod-ui');
const path = require("path");

exports.NetworkMod = function edgeUI(d) {

  let ui = new Host(d, 'index.html', {
    title: 'edgeui',
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    maximizable: false,
    fullscreen: false,
    fullscreenable: false,
    skipTaskBar: false,
    width: 182,
    height: 182,
    resizable: false,
    center: true,
    x: d.settings.windowPos[0],
    y: d.settings.windowPos[1],
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    webPreferences: { nodeIntegration: true, devTools: false }
  }, false, path.join(__dirname, 'ui'))

  let opened = false,
    curEdge = 0,
    focused = null,
    focusChange = true,
    moving = false
  d.game.on('enter_game', () => { if (d.game.me.class == 'warrior' && !opened) { d.command.exec('edgeui') } })
  d.game.on('leave_game', () => { ui.close(); d.clearAllIntervals() })

  async function moveTop() {
    focused = await d.clientInterface.hasFocus()
    if (!focused && focusChange && !moving) { ui.hide(); focusChange = false; }
    if (focused && !focusChange) { ui.show(); focusChange = true; }
    if (focused) ui.window.moveTop()
  }

  d.command.add('edgeui', (arg, arg2) => {
    if (!opened && !arg || !opened && ['open', 'gui', 'ui'].includes(arg)) {
      opened = true
      ui.show();
      setTimeout(() => { ui.send('edgeLaurel', { text: d.settings.laurel }); d.command.exec(`edgeui scale ${d.settings.scale}`) }, 500)
      ui.window.setPosition(d.settings.windowPos[0], d.settings.windowPos[1]);
      ui.window.setAlwaysOnTop(true, 'screen-saver', 1);
      ui.window.setVisibleOnAllWorkspaces(true);
      d.setInterval(() => { moveTop() }, 500);
      ui.window.on('move', () => { moving = true; })
      ui.window.on('moved', () => { d.setTimeout(() => { moving = false; }, 500) })
      ui.window.on('close', () => { d.settings.windowPos = ui.window.getPosition(); d.clearAllIntervals(); opened = false });
    }
    if (opened && arg == 'laurel' && ['champ', 'diamond', 'gold', 'silver', 'bronze', 'none'].includes(arg2)) {
      d.settings.laurel = arg2
      switch (arg2) {
        case 'champ': ui.send('edgeLaurel', { text: arg2 }); break;
        case 'diamond': ui.send('edgeLaurel', { text: arg2 }); break;
        case 'gold': ui.send('edgeLaurel', { text: arg2 }); break;
        case 'silver': ui.send('edgeLaurel', { text: arg2 }); break;
        case 'bronze': ui.send('edgeLaurel', { text: arg2 }); break;
        case 'none': ui.send('edgeLaurel', { text: arg2 }); break;
      }
      d.command.message(`laurel set to ${arg2}`)
    }
    if (opened && arg == 'scale') {
      d.settings.scale = parseFloat(arg2)
      d.command.message(`scale set to ${parseFloat(arg2)}`)
      ui.send('edgeResize', { text: parseFloat(arg2) })
      ui.window.setBounds({ width: Math.floor(182 * parseFloat(arg2)) + 12, height: Math.floor(178 * parseFloat(arg2)) + 12 })
    }
  })

  d.hook('S_PLAYER_STAT_UPDATE', 16, (e) => {
    if (!d.game.me.class == 'warrior' || !opened || curEdge == e.edge) return
    curEdge = e.edge
    ui.send('edgeUpdate', { text: e.edge })
  })

}
