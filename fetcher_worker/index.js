var parser = require('feedparser'),
    request = require('request'),
    plaintext = require('html2plaintext');

module.exports = function (context) {
    var timeStamp = new Date().toISOString(),
        url = context.bindings.inputQueue.url,
        entries = [];

    context.log(context.bindings.inputQueue);
    context.log(context.bindingData);

    var req = request(url, { timeout: 10000, pool: false });
    req.setMaxListeners(50);
    req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36');
    req.setHeader('accept', 'text/html,application/xhtml+xml');

    var feedparser = new parser({
        normalize: true,
        addmeta: false
    });

    req.on('error', function (error) {
        context.log('Error fetching ' + url + ": " + error)
    });

    req.on('response', function (res) {
        var stream = this; // `this` is `req`, which is a stream

        if (res.statusCode !== 200) {
            this.emit('error', new Error('Bad status code'));
        }
        else {
            stream.pipe(feedparser);
        }
    });

    feedparser.on('error', function (error) {
        context.log('Error parsing ' + url + ": " + error)
    });

    feedparser.on('readable', function () {
        var stream = this; // `this` is `feedparser`, which is a stream
        var entry;

        while (entry = stream.read()) {
            entry.parsedate = timeStamp;
            entry.plaintext = plaintext(entry.description);
            entries.push(entry);
        }
    });

    feedparser.on('end', function () {
        context.bindings.outputQueue = entries;
        context.done();
    })
};