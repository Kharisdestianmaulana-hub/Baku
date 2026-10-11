const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(`<!DOCTYPE html><html lang="en"><body><div id="editor"></div><script src="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.js"></script></body></html>`, {
    runScripts: "dangerously",
    resources: "usable"
});

dom.window.onload = () => {
    try {
        const Quill = dom.window.Quill;
        const Parchment = Quill.import('parchment');
        console.log("Parchment keys:", Object.keys(Parchment));
        
        const AlignStyle = Quill.import('attributors/style/align');
        console.log("AlignStyle:", !!AlignStyle);
        if (AlignStyle) console.log("AlignStyle constructor:", !!AlignStyle.constructor);
        
        const StyleClass = Parchment.StyleAttributor || (AlignStyle ? AlignStyle.constructor : null) || (Parchment.Attributor && Parchment.Attributor.Style);
        console.log("StyleClass:", !!StyleClass);
        
        const LineHeightStyle = new StyleClass('lineheight', 'line-height', {
            scope: Parchment.Scope.BLOCK,
            whitelist: ['1', '1.15', '1.5', '2']
        });
        console.log("SUCCESS");
    } catch (e) {
        console.error("ERROR:", e);
    }
};
