$(document).ready(function(){

	var mail = document.getElementById('inputEmail');
	var pass = document.getElementById('inputPassword');

	$('#signup').click(function(){
		Core.UI.loadPage('home', 'signup', 'Sign Up');
	});

	$('#signin').click(function(){
		if (mail.value!='' && pass.value!=''){
			//TODO : Quitar el signo ! para que funcione el validador de usuario
			if (validateMail(mail)) {
				validateLogIn(mail, pass);
			}
		}else{
			Core.UI.showOkOnlyModal('You must complete all fields.');
		}

	});
});

//Validate Funtions
function validateMail(mail) {
//var regExPattern = /^[0-9a-z_\-\.]+@[0-9a-z\-\.]+\.[a-z]{2,4}$/i;
	var regExPattern = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
	if (!regExPattern.test(mail.value)){
		Core.UI.showOkOnlyModal('Incorrect Email Format');
		mail.focus();
	}
	return regExPattern.test(mail.value);
}

function validateLogIn(user, password){

	var uuid = '0';
	if(window.device)
		uuid = window.device.uuid;

	var data = {
		user : user.value,
		password : password.value,
		uuid: uuid
	};

	API.postData('/users/signin', data, loadSuccess, onError);
}

function loadSuccess(response){

	if (response.success){

		zooCoach.user = response.user;
		zooCoach.pet = response.pet;
		
		console.log(response);
		Core.UI.loadPageWithoutBack('home', 'splash', 'Splash');
		setTimeout(function(){
			Core.UI.clearBackList();
			Core.UI.defineHomeView('zoofile', 'index', 'Zoofile');
			Core.UI.loadPage('zoofile', 'index', 'Zoofile');
			Core.UI.fullScreen(false);
		},0);
		}else{
			console.log(response);
			Core.UI.showOkOnlyModal("Datos incorrectos");
		}
};

function onError(response){

	zooCoach.user = {
		userId: '1000',
		email: 'gcasuso@zoocoach.com',
		firstName: 'Guadalupe',
		lastName: 'Casuso',
		uuid: '1234456789',
		password: 'zoocoach'
	};
	
	zooCoach.pet = {
    "petId": "001",
    "name": "Gala",
    "profilePic": "img/profile-pic.jpg",
    "type": "cat",
    "race": "Birman",
    "sex": "female",
    "age": "8",
    "color": "Black and White",
    "weight": 4,
    "height": 23,
    "description": "He s very social but in all of the wrong ways! He likes to pounce on the other two cats we have and they want nothing to do with him. He also likes to beg for food but my room mates are not very entertained by it."
  };
	
	Core.UI.showOkOnlyModal('Conection error');
	Core.UI.loadPageWithoutBack('home', 'splash', 'Splash');
	setTimeout(function(){
		Core.UI.clearBackList();
		Core.UI.defineHomeView('zoofile', 'index', 'Zoofile');
		Core.UI.loadPage('zoofile', 'index', 'Zoofile');
		Core.UI.fullScreen(false);
	},0);
}