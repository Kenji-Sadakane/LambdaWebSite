var fs = require('fs');
const stringUtil   = require("util/stringUtil.js");
global.stringUtil = stringUtil;

exports.handler = async (event, context, callback) => {
    console.log('event: ' + JSON.stringify(event));
    console.log('context: ' + JSON.stringify(context));
    let filename = getTargetFileName(event.pathParameters);
    let extension = stringUtil.getExtensionFromPath(filename);
    let contentsPath = 'contents/' + extension + '/' + filename;
    console.log('filename: ' + filename);
    console.log('extension: ' + extension);
    console.log('contentsPath: ' + contentsPath);

    createResponse(callback, 200, createHeaders(extension), createContent(contentsPath));
    // return content;
};

const getTargetFileName = function(pathParameters) {
    let filename = 'index.html';
    if (pathParameters != null && pathParameters.filename != null) {
        filename = pathParameters.filename;
        if (filename.indexOf('.') == -1) {
            filename += '/index.html';
        }
    }
    return filename;
};

const createHeaders = function(extension) {
    let headers = {};
    if (extension == 'html') {
        headers = { "Content-Type" : "text/html" };
    } else if (extension == 'css') {
        headers = { "Content-Type" : "text/css" };
    } else if (extension == 'js') {
        headers = { "Content-Type" : "text/javascript" };
    }
    // let headers = { "Content-Type" : "application/json" };
    //// "Access-Control-Allow-Origin" : "*"
    return headers;
};

const createContent = function(contentsPath) {
    let data = fs.readFileSync(contentsPath);
    //let content = data.toString('ascii', 0, data.length);
    let content = data.toString();
    return content;
};

// レスポンス返却関数(Lambda統合リクエスト)
const createResponse = function(callback, statusCode, headers, content) {
    var res = {
        "statusCode": statusCode,
        "headers" : headers,
        "body": content
    };
    callback(null, res);
};