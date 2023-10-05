const excalidrawToSvg = require("./excalidraw-to-svg");
const handleObsiCalidraw = require("./handle-obsidian-excalidraw");
const obsiCalidrawToSvg = (mdStr) => {
  const diagram = handleObsiCalidraw.getObsiCaliDiagram(mdStr);
  console.log('diagram', diagram);
  const $svg = excalidrawToSvg(diagram);
  console.log('$svg ', $svg);
  return $svg;
};

module.exports = {
  obsiCalidrawToSvg,
  excalidrawToSvg,
  ...handleObsiCalidraw,
}
