// renderして、クライアントサイドのスクリプトを実行してから返す
var renderAndScript = function (view, options, script, callback) {
	var self = this;
	var req = self.req;

	this.render(view, options, function (err, html) {
		if (err) {
			return req.next(err);
		}
		console.log(html);
		self.send(html);
	});
};

// app.useで使われる設計
module.exports = function (req, res, next) {
	res.renderAndScript = renderAndScript;
	next();
};