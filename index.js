'use strict';

var Stream = require('stream');
var Path = require('path');
var crypto = require('crypto')

function render(tpl, data) {
	return tpl.replace(/\{([^{}]*)\}/g, function (m, expr) {
		if (!expr) throw Error('illegal expresssion:\n', tpl)
		return data[expr.trim()] || ''
	})
}
function getHash(t) {
	return crypto.createHash('md5').update(t, 'utf-8').digest('hex')
}
function hashName(obj) {

	var template = obj.template || '{name}_{hash}{ext}'
	var hashLength = obj.hashLength
	var stream = new Stream.Transform({
		objectMode: true
	});

	function parsePath(file, contents) {
		var path = file.relative
		var extname = Path.extname(path);
		var hs = getHash(contents.toString())
		return {
			dir: Path.dirname(path),
			name: Path.basename(path, extname),
			ext: extname,
			hash: hashLength ? hs.slice(0, hashLength) : hs
		};
	}

	stream._transform = function (originalFile, unused, callback) {


		var file = originalFile.clone({
			contents: false
		});
		var parsedObj = parsePath(file, originalFile.contents);
		file.path = Path.join(file.base, render(template, parsedObj));
		callback(null, file);
	};

	return stream;
}

module.exports = hashName;