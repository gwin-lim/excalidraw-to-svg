const { obsiCalidrawToSvg } = require("./src/index");

const fs = require("fs");

const main = async () => {
  const cwd = process.cwd();
  const mdStr = fs.readFileSync(`${cwd}/diagrams/p.excalidraw.md`).toString();
  const $svg = await obsiCalidrawToSvg(mdStr);
  fs.writeFileSync(`${cwd}/ko1.svg`, $svg.outerHTML);
}

main();
