requirejs.config({
	baseUrl: 'javascripts',
	paths: {
		'jquery': 'vendor/jquery'
	}
});

require(['jquery'], function () {

	$('#info').html('This is from the app1 main');
	console.log('This is from the app1 main');

});