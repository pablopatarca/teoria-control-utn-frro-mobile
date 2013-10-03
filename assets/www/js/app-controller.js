/*

	This is the global module for the application

	Requires ecloud-core.js!


*/


var sessionData = {};

$(document).ready(function(){

	//fastclick
	FastClick.attach(document.body);

	Core.hideLoadingView();
	Core.blockGlobalSideMenu();
	
	//splash
	Core.fullScreen(true);

	Core.loadPageWithoutBack('home', 'splash', 'Splash');

	runApp();

});


function runApp(){

	var uuid = '0';
	if(window.device)
		uuid = window.device.uuid;

	console.log('UUID : ' + uuid);

		setTimeout(function(){

			Core.clearBackList();
			Core.defineHomeView('home', 'index', 'Main Section');
			Core.loadPage('home', 'index', 'Main Section');
			Core.fullScreen(false);

		},2000);
		
		Core.initBackButton();

}