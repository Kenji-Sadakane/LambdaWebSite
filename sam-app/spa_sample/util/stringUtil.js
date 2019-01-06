// ファイルパスから拡張子を抽出
exports.getExtensionFromPath = function(path) {
    let pathArray = path.split('.');
    return pathArray[pathArray.length - 1];
};

