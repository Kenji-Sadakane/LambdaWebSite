// ファイルパスから拡張子を抽出
exports.getExtensionFromPath = function(path) {
    let extension = '';
    let pathArray = path.split('.');
    if (pathArray.length > 1) {
        extension = pathArray[pathArray.length - 1];
    }
    return extension;
};

