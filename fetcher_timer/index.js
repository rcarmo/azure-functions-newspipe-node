module.exports = function (context, myTimer) {
    var timeStamp = new Date().toISOString();

    if (myTimer.isPastDue) {
        context.log('JavaScript is running late!');
    }
    context.bindings.outputQueue = {
        date: timeStamp,
        url: 'https://www.reddit.com/.rss'
    }
    context.done();
};