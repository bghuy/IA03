const { readFile } = require("fs/promises")

const renderReplace = (renderData, params) => {
    const regex = /21615{(\w+)}/g;
    return renderData.replace(regex, (match, variable) => {
        const result = params[variable] || "";
        return result;
    });
};

const renderIf = (renderData, params) => {
    const regex = /21615\{if (.*?) \}(.*?)\{else\}(.*?)\{\/if\}/;
    return renderData.replace(regex, (match) => {
        let X = match[1];
        let TRUE = match[2];
        let FALSE = match[3];
        const result = params[variable] || "";
        return result;
    });
}


const renderWebsite = async (path, opt, callback) => {

    try {
        const params = opt.params;
        let renderFile = await readFile(path, { encoding: "utf-8" });
        let renderData = renderFile;
        renderData = renderReplace(renderData, params);
        // if (opt.view === "home") {

        // }
        return callback(null, renderData);
    }
    catch (error) {
        return callback(error);
    }
}
module.exports = renderWebsite;