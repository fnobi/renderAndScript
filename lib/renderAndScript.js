var jsdom = require('jsdom'),
    async = require('async');

// renderして、クライアントサイドのスクリプトを実行してから返す
var renderAndScript = function (view, options, script) {
	var self = this;

	// options省略処理
	if (typeof options == 'function') {
		script = options;
		options = {};
	}

	async.waterfall([function (next) {
		// render engineによるレンダリング
		self.render(view, options, next);
	}, function (html, next) {
		// レンダリング結果をもとにjsdom環境を作る
		jsdom.env(html, [], next);
	}, function(window, next) {
		// scriptを実行 実行後のwindowを次へ渡す
		script(window, function (err) {
			next(err, window);
		});
	}, function(window, next) {
		// windowからhtmlを再度取り出して、send
		var document = window.document;
		var result = [
			document._doctype._fullDT,
			document.outerHTML
		].join('\n');

		self.send(result);

		next();
	}], function (err) {
		if (err) {
			self.req.next(err);
		}
	});
};

// app.useで使われる設計
module.exports = function (req, res, next) {
	res.renderAndScript = renderAndScript;
	next();
};