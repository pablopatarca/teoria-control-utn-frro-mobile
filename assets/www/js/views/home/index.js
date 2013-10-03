
$(document).ready(function(){

	$('#yes-button').click(function(){
		Core.UI.loadPage('search','index','Search Part');
	});
	$('#no-button').click(function(){
		Core.UI.loadPage('picture','index','Picture Part');
	});

	Core.UI.placeHolderReplace('img/Hero-3.png','hero-img');

	Core.UI.defineHomeView('home','index','Home');


/*	Core.UI.initModalWindow();

	$('#modal-btn-ok').click(function(){
		console.log('Ok button pressed');
		Core.UI.hideModalWindow();
	});

	$('#modal-btn-cancel').click(function(){
		console.log('Cancel button pressed');
		Core.UI.hideModalWindow();
	});

	$('#btn-open-modal').click(function(){
		Core.UI.showModalWindow();
	});*/


});
