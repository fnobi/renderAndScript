
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.renderAndScript(
		'index',
		{ title: 'Express' },
		function (window, callback) {
			window.document.body.innerHTML = 'scriped..';
			callback();
		}
	);
};