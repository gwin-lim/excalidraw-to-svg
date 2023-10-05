const excalidrawToSvg = require("./excalidraw-to-svg");
const handleObsiCalidraw = require("./handle-obsidian-excalidraw");
const obsiCalidrawToSvg = ({mdStr, width, height, font}) => {
  const diagram = handleObsiCalidraw.getObsiCaliDiagram(mdStr);
  const $svg = excalidrawToSvg(diagram, width || height, height || width, font);
  return $svg;
};

module.exports = {
  obsiCalidrawToSvg,
  excalidrawToSvg,
  ...handleObsiCalidraw,
}
