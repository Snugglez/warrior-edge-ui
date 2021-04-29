document.addEventListener('DOMContentLoaded', () => {
  const { Renderer } = require('tera-mod-ui');
  let mod = new Renderer;
  let edgeCount = document.getElementById("edgeCount"),
    edgeBar = document.getElementById("edgeBar")

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
      case 0: {
        edgeBar.style['stroke-dashoffset'] = 460;
        edgeCount.innerHTML = 0;
        edgeCount.style['color'] = '#CFCFC4';
        setTimeout(() => { edgeCount.style['animation'] = '0.1 noShake'; }, 100);
      } break;
      case 1: { edgeBar.style['stroke-dashoffset'] = 442; edgeCount.innerHTML = 1; edgeCount.style['color'] = '#C7CEEA'; } break;
      case 2: { edgeBar.style['stroke-dashoffset'] = 413; edgeCount.innerHTML = 2; edgeCount.style['color'] = '#C7CEEA'; } break;
      case 3: { edgeBar.style['stroke-dashoffset'] = 381; edgeCount.innerHTML = 3; edgeCount.style['color'] = '#C7CEEA'; } break;
      case 4: { edgeBar.style['stroke-dashoffset'] = 349; edgeCount.innerHTML = 4; edgeCount.style['color'] = '#B5EAD7'; } break;
      case 5: { edgeBar.style['stroke-dashoffset'] = 318; edgeCount.innerHTML = 5; edgeCount.style['color'] = '#B5EAD7'; } break;
      case 6: { edgeBar.style['stroke-dashoffset'] = 287; edgeCount.innerHTML = 6; edgeCount.style['color'] = '#E2F0CB'; } break;
      case 7: { edgeBar.style['stroke-dashoffset'] = 255; edgeCount.innerHTML = 7; edgeCount.style['color'] = '#E2F0CB'; } break;
      case 8: { edgeBar.style['stroke-dashoffset'] = 221; edgeCount.innerHTML = 8; edgeCount.style['color'] = '#FFDAC1'; } break;
      case 9: { edgeBar.style['stroke-dashoffset'] = 192; edgeCount.innerHTML = 9; edgeCount.style['color'] = '#FFB7B2'; } break;
      case 10: {
        edgeBar.style['stroke-dashoffset'] = 168;
        edgeCount.innerHTML = '<b>10</b>';
        edgeCount.style['color'] = '#FF6961';
        edgeCount.style['animation'] = '0.2s shake infinite';
      } break;
    }
  })
})
