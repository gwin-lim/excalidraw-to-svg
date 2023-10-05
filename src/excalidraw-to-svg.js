const fs = require("fs"); // used to read in node_module as script
const jsdom = require("jsdom"); // used to create mock web interface (which excalidraw-utils depends on)

/**
 * Function to convert an excalidraw JSON file to an SVG
 * @param {string | object} diagram excalidraw diagram to convert
 * @returns SVG XML Node
 */
const excalidrawToSvg = (diagram, w, h, font) => {
  const { JSDOM } = jsdom;

  const react = fs.readFileSync(
    "./node_modules/react/umd/react.production.min.js",
    "utf8"
  );

  const reactDom = fs.readFileSync(
    "./node_modules/react-dom/umd/react-dom.production.min.js",
    "utf8"
  );

  const path2dPolyfill = fs.readFileSync(
    "./node_modules/path2d-polyfill/dist/path2d-polyfill.esm.js",
    "utf8"
  );

  const excalidrawUtils = fs.readFileSync(
    "./node_modules/@excalidraw/excalidraw/dist/excalidraw.production.min.js",
    "utf8"
  );

  const stringDiagram = typeof diagram === "string" ? diagram : JSON.stringify(diagram);

  const exportScript = `
		<body>
			<script>
        ${path2dPolyfill}
        ${react}
        ${reactDom}
				${excalidrawUtils}

        const { exportToSvg } = ExcalidrawLib

        const width = ${w}
        const height = ${h}
        const diagram = ${stringDiagram}
        const font = '${font}'

        const $svg = exportToSvg(diagram).then(($svg) => {
          if (width || height) {
            $svg.setAttribute('width', width || height)
            $svg.setAttribute('height', height || width)
          }
          const $style = $svg.querySelector('.style-fonts')
          if ($style) $style.remove()
          return $svg
        }).then(($svg) => {
          $svg
          .querySelectorAll('[font-family]')
          .forEach(($text) => {
            const oldAttr = $text.getAttribute('font-family')
            const containsVirgil = /virgil/ig.test(oldAttr)
            $text.setAttribute('font-family', containsVirgil ? 'virgil, ' + font : font)
          })
          return $svg
        }).then(($svg) => document.body.appendChild($svg))
			</script>
		</body>
	`;

  const dom = new JSDOM(exportScript, { runScripts: "dangerously" });

  // pull the svg and return that Node
  // since this happens asyncronously, we will wait for it to be available
  const svgPromise = new Promise(async (resolve, reject) => {
    let checks = 3;
    const sleepTime = 1000;
    while (checks > 0) {
      checks--;
      const excalidrawSvg = dom.window.document.body.querySelector("svg");
      if (excalidrawSvg) {
        checks = 0;
        return resolve(excalidrawSvg);
      }
      await new Promise((resolve) => {
        console.log('checks',checks);
        setTimeout(resolve, sleepTime);
      });
    }
    return reject("svg was not created after expected period");
  });

  return svgPromise;
};

module.exports = excalidrawToSvg;
