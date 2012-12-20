
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.renderAndScript('index', { title: 'Express' }, [
		'/javascripts/jquery-1.8.2.js',
		function (window, callback) {
			var $ = window.$;

			$('body').append('scripted..');

			callback();
		}
	]);
};