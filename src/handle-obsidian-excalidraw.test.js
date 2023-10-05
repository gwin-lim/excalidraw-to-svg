const fs = require("fs");
const cwd = process.cwd();

const {
  getCodeElement,
  parseDiagram,
} = require("./handle-obsidian-excalidraw");


describe("extract excalidraw diagram from markdown", () => {
  const excalidrawMdStr = fs.readFileSync(`${cwd}/diagrams/example.obsidian.md`).toString();
  const $code = getCodeElement(excalidrawMdStr);

  it("get 'code' element", async () => {
    expect($code?.tagName).toBe("CODE");
  });
  it("get diagram from 'code' element's inner text", async () => {
    const diagram = parseDiagram($code);
    expect(Object.keys(diagram).length > 0).toBe(true);
  });
});

describe("extract excalidraw diagram from compressed markdown", () => {
  const compressedMdStr = fs.readFileSync(`${cwd}/diagrams/example.obsidian.compressed.md`).toString();
  const $code = getCodeElement(compressedMdStr);
  
  it("get 'code' element", async () => {
    expect($code?.tagName).toBe("CODE");
  });
  it("get diagram from 'code' element's compressed text", async () => {
    const diagram = parseDiagram($code);
    expect(Object.keys(diagram).length > 0).toBe(true);
  });
});


