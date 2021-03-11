document.addEventListener('DOMContentLoaded', () => {
  const { Renderer } = require('tera-mod-ui');
  let mod = new Renderer;

  mod.on('edgeLaurel', (y) => {
    let laurel = document.getElementById("laurel")
    switch (y.text) {
      case 'champ': { laurel.src = 'https://i.imgur.com/xR4qrvY.png'; laurel.style = "width: 190px; transform: translate(-53%, -51%)"; } break;
      case 'diamond': { laurel.src = 'https://i.imgur.com/CXOtfxu.png'; laurel.style = "width: 172px; transform: translate(-54%, -53%)"; } break;
      case 'gold': { laurel.src = 'https://i.imgur.com/imBzVbJ.png'; laurel.style = "width: 172px; transform: translate(-54%, -53%)"; } break;
      case 'silver': { laurel.src = 'https://i.imgur.com/7sJOrC4.png'; laurel.style = "width: 172px; transform: translate(-54%, -53%)"; } break;
      case 'bronze': { laurel.src = 'https://i.imgur.com/TMIKf0z.png'; laurel.style = "width: 172px; transform: translate(-54%, -53%)"; } break;
      case 'none': laurel.src = 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Blank.png'; break;
    }
  })
  mod.on('edgeResize', (y) => {
    document.getElementById("mainBody").style.transform = `scale(${y.text})`; 
  })
  mod.on('edgeUpdate', (y) => {
    switch (y.text) {
      case 0: { document.getElementById("edgeBar").style['stroke-dashoffset'] = 460; document.getElementById("edgeCount").innerHTML = 0; document.getElementById("edgeCount").style['color'] = '#CFCFC4'; } break;
      case 1: { document.getElementById("edgeBar").style['stroke-dashoffset'] = 442; document.getElementById("edgeCount").innerHTML = 1; document.getElementById("edgeCount").style['color'] = '#C7CEEA'; } break;
      case 2: { document.getElementById("edgeBar").style['stroke-dashoffset'] = 413; document.getElementById("edgeCount").innerHTML = 2; document.getElementById("edgeCount").style['color'] = '#C7CEEA'; } break;
      case 3: { document.getElementById("edgeBar").style['stroke-dashoffset'] = 381; document.getElementById("edgeCount").innerHTML = 3; document.getElementById("edgeCount").style['color'] = '#C7CEEA'; } break;
      case 4: { document.getElementById("edgeBar").style['stroke-dashoffset'] = 349; document.getElementById("edgeCount").innerHTML = 4; document.getElementById("edgeCount").style['color'] = '#B5EAD7'; } break;
      case 5: { document.getElementById("edgeBar").style['stroke-dashoffset'] = 318; document.getElementById("edgeCount").innerHTML = 5; document.getElementById("edgeCount").style['color'] = '#B5EAD7'; } break;
      case 6: { document.getElementById("edgeBar").style['stroke-dashoffset'] = 287; document.getElementById("edgeCount").innerHTML = 6; document.getElementById("edgeCount").style['color'] = '#E2F0CB'; } break;
      case 7: { document.getElementById("edgeBar").style['stroke-dashoffset'] = 255; document.getElementById("edgeCount").innerHTML = 7; document.getElementById("edgeCount").style['color'] = '#E2F0CB'; } break;
      case 8: { document.getElementById("edgeBar").style['stroke-dashoffset'] = 221; document.getElementById("edgeCount").innerHTML = 8; document.getElementById("edgeCount").style['color'] = '#FFDAC1'; } break;
      case 9: { document.getElementById("edgeBar").style['stroke-dashoffset'] = 192; document.getElementById("edgeCount").innerHTML = 9; document.getElementById("edgeCount").style['color'] = '#FFB7B2'; } break;
      case 10: { document.getElementById("edgeBar").style['stroke-dashoffset'] = 168; document.getElementById("edgeCount").innerHTML = '<b>10</b>'; document.getElementById("edgeCount").style['color'] = '#FF6961'; } break;
    }
  })
})
