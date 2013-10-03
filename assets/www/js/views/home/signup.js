

$(document).ready(function(){

	var userName = document.getElementById('input-name');
	var userCompany = document.getElementById('input-company');
	var userPhone = document.getElementById('input-phone');
	var userEmail = document.getElementById('input-email');


/*
	$('#sign-up').click(function(){
		if (fname.value!='' && lname.value!='' && mail.value!='' && pass.value!='' && confirmPass.value!=''){
			if( validateMail(mail) && validatePass(pass,confirmPass) ){
				console.log('Inside the validation');
				Core.UI.popBackStack();
				validateSignUp(fname,lname,mail,pass);
			}
		}
		else{
			alert('You must complete all fields.');
		}
	});
*/
	$('#done-button').click(function(){
		//API.postData('/');
		validateSignUp(userName, userCompany, userPhone, userEmail);
		loadData(userName, userCompany, userPhone, userEmail);
		Core.UI.loadPage('home', 'index', 'Index');
	});

	//document.getElementById('input-name').focus();

});

function loadData(name, company, phone, email){
	rpdSessionData.user.name = name;
	rpdSessionData.user.company = company;
	rpdSessionData.user.phone = phone;
	rpdSessionData.user.email = email;
}

function validateSignUp(name, company, phone, email){

	console.log('Inside the validateSignUp');

	var uuid = '0';
	if(window.device)
		uuid = window.device.uuid;

	var data = {
		name: name.value,
		company: company.value,
		email: email.value,
		phone: phone.value,
		uuid: uuid
	};

	console.log('Inside the validateSignUp');

	API.postData('api/signup', data, loadSuccess, onError);
}


function loadSuccess(response){

	if (response.success){

		rpdSessionData.user = response.user;
		
		console.log(response);
		Core.UI.loadPageWithoutBack('home', 'splash', 'Splash');
		setTimeout(function(){
			Core.UI.clearBackList();
			Core.UI.defineHomeView('home', 'index', 'Principal');
			Core.UI.loadPage('home', 'index', 'Principal');
		},0);
		}else{
			console.log(response);
			Core.UI.showOkOnlyModal("Datos incorrectos");
		}
}

function onError(response){

	console.log('Inside the onError');
	Core.UI.showOkOnlyModal('Conection error');

}

//Validate Funtions
function validateMail(mail) {
//var regExPattern = /^[0-9a-z_\-\.]+@[0-9a-z\-\.]+\.[a-z]{2,4}$/i;

var regExPattern = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
	if (!regExPattern.test(mail.value)){
		alert('Incorrect Email Format');
		mail.focus();
	}
	return regExPattern.test(mail.value);

}

function validatePass(pass,confirm) {
	//TODO - Modificar expresion regular y el return
    var regExPattern = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,10})$/;
    if (pass.value != confirm.value){
		alert('Passwords do not match');
		pass.focus();
		return true;
	}
	else if (!regExPattern.test(pass.value)){
		alert('Weak Password');
		pass.focus();
    	return regExPattern.test(pass.value);
    }else{
		return true;
    }
	
}


