'use strict';

var https = require('https');
var Table = require('cli-table');
var args = process.argv.slice(2);

module.exports = function () {
	var basePath = 'https://nodejs.org/api/';

	var parseJson = function (str, cb) {
		var url = basePath + str + '.json';

		// parse the url and pass the json data to callback
		var result = https.get(url, function (res) {
			var body = '';
			res.on('data', function (d) {
				body = body + d;
			});

			res.on('end', function () {
				var jsonData = JSON.parse(body);
				cb(jsonData);
			});

		});

		result.on('error', function (e) {
			console.error(e);
		});
	};

	var showIndex = function (data) {
		var table = new Table({
			head: ['Content', 'link'], colWidths: [50, 50]
		});

		for(var i = 0; i < data.length; i++) {
			var item = data[i]
			if(item.type === 'text') {
				var t = item.text.replace(/[\[\]]+/g, '');
				var textAndHtml = t.replace(')', '').split('(');
				//console.log(textAndHtml[0] + " " + basePath + textAndHtml[1]);
				table.push([textAndHtml[0], basePath + textAndHtml[1]]);
			}
		}
		console.log(table.toString());
	};

	var routes = function () {
		if (args[0] === 'index') {
			// server index
			parseJson('index', function (data) {
				showIndex(data.desc);
			});
		} else {
			// serve other
		}
	};

	routes();

}();
