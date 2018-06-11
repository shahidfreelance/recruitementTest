var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var websiteAddressArray = [];
var titleArray = [];

function addhttp(url) {
    if (!/^(f|ht)tps?:\/\//i.test(url)) {
        url = "http://" + url;
    }
    return url;
}

app.get('/i/want/title', function (req, res) {
    // Let's scrape Anchorman 2
    var requestUrl = req.url;
    if (requestUrl.indexOf('&') > -1) {
        querySize = Object.keys(req.query.address).length;
        for (var counter = 0; counter < querySize; counter++) {
            url = addhttp(req.query.address[counter]);
            request(url, function (error, response, html) {
                if (!error) {
                    $ = cheerio.load(html);
                    titleArray[counter] = $('title').text();
                } else {
                    titleArray[counter] = "Error: " + error
                }

                console.log('URL is: ' + url + ' Title is: ' + titleArray[counter])
            })
        }

        res.send('Check your console!')
    }
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
