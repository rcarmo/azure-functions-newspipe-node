const fs = require("fs"),
    path = require('path'),
    mime = require('mime-types');

module.exports = function (context, req) {
    var file = context.bindingData.file;
    if (!file) {
        file = 'index.html'
    }

    // prepend the site root to any file argument
    var fileName = path.join(process.env.HOME, 'site', 'wwwroot', 'public_html', file)

    // I'd ordinarily use fs.access, but the size is handy
    fs.stat(fileName, function (err, stats) { 
        if (err) {
            context.log(err)
            context.res = {
                status: 404,
                headers: {
                    'content-type': 'text/plain'
                },
                body: "Not found."
            }
        } else {
            context.res = {
                isRaw: true,
                headers: {
                    'content-type': mime.contentType(path.extname(fileName)) || 'application/octet-stream',
                    'content-length': stats.size,
                    'cache-control': 'public, max-age=3600'
                },
                // TODO: change this to a stream when Azure Functions can deal with stream bindings
                body: fs.readFileSync(fileName, null) 
            }
        }
        context.done();
    });
}