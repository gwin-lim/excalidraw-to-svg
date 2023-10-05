const marked = require("marked");
const jsdom = require("jsdom");
const lzString = require("lz-string");

const parseDiagram = ($code) => {
  try {
    const isCompressed = $code.classList.contains("language-compressed-json");
    const innerText = $code.innerText || $code.innerHTML;
    const jsonStr = isCompressed ?
      lzString.decompressFromBase64(innerText.replace(/(\r\n|\n|\r)/gm, ""))
      : innerText;
    const diagram = JSON.parse(jsonStr);
    return diagram;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getCodeElement = (mdStr) => {
  try {
    const { JSDOM } = jsdom;
    const htmlStr = marked.parse(mdStr);
    const dom = new JSDOM(htmlStr, { runScripts: "dangerously" });
    const $code = dom.window.document.body.querySelector("code");
    return $code;
  } catch (err) {
    console.error(err);
    return "";
  }
};

const getObsiCaliDiagram = (mdStr) => {
  const $code = getCodeElement(mdStr);
  const diagram = parseDiagram($code);
  return diagram;
};

module.exports = {
  getCodeElement,
  parseDiagram,
  getObsiCaliDiagram,
};
