
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.renderAndScript('index', { title: 'Express' }, function () {
		console.log('scripting!!');
	});
};