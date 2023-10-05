const { 
  obsiCalidrawToSvg,
} = require("./src/index");

const fs = require("fs");

const main = async () => {
  const cwd = process.cwd();
  const mdStr = fs.readFileSync(`${cwd}/diagrams/example.obsidian.compressed.md`).toString();
  const $svg = await obsiCalidrawToSvg({ mdStr, width: 512, font: 'Noto Sans Korean' });
  fs.writeFileSync(`${cwd}/ko1.svg`, $svg.outerHTML);
  return;
}

main();
