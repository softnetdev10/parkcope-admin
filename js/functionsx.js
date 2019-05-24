var token="";
$( document ).ready(function() {
   //Load countries dd
    token = GetToken();
    parameters= {}
    methodType= 'GET'
    urlService= 'Pais/GetAll'
    htmlElement="getCountries"
    ajaxCall(methodType,urlService,parameters,token,htmlElement);
    urlService= 'Estado/GetAll'
    htmlElement="getStates"
    ajaxCall(methodType,urlService,parameters,token,htmlElement);
    urlService= 'Municipio/GetAll'
    htmlElement="getCities"
    ajaxCall(methodType,urlService,parameters,token,htmlElement);
});
function GetToken()
	{
		var parameters = {
			username: 'admin',
			password: 'admin',
			grant_type: 'password'
		}
		$.ajax({
			url: 'http://totalcase.com.mx/webapimvcparkcope/oauth/token',
			type: 'POST',
			dataType: 'json',
			async: false,
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			data: parameters,
			success: function (data) {
				token = data.access_token;
				//debugger;
			}
		});
		return token;
	}


function ajaxCall(methodType,urlService,parameters,token,htmlElement){
	 $.ajax({
			type: methodType,
			url: 'http://totalcase.com.mx/webapiparkcopeava8/api/'+urlService,
			dataType: 'json',
			async: false,
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			data: JSON.stringify(parameters),
			beforeSend:function(xhr) {
				var t = 'Bearer ' + token;				
				xhr.setRequestHeader('Authorization', t);
				xhr.setRequestHeader('Content-Type',"application/json");
			},
			success: function (data) {
				if(htmlElement!=""){
					switch(true) {
						case (htmlElement=="getCountries"):
							for (var i = 0; i < data.length; i++) {
								$('select[name=establishment_country]').append('<option value ="'+data[i].Clave+'">'+data[i].Nombre+'</option>');
							}
						break;
						case (htmlElement=="getStates"): 
							for (var i = 0; i < data.length; i++) {
								$('select[name=establishment_state]').append('<option value ="'+data[i].Clave+'">'+data[i].Nombre+'</option>');
							}
							$('select[name=establishment_state]').val(19)
						break;
						case (htmlElement=="getCities"): 
							for (var i = 0; i < data.length; i++) {
								if(data[i].Estado==19)
								$('select[name=establishment_city]').append('<option value ="'+data[i].Clave+'">'+data[i].Nombre+'</option>');
							}
							$('select[name=establishment_city]').val(986)
						break;
					}
				}
			}

		});
}

$("#").click(function() {

    //www.totalcase.com.mx/webapimvcparkcope
    // validate inputs
    var validForm	=	validateInputs();
    if(validForm){
    var date = new Date();
    //Registro usuario
    var user_parameters = {	"Fecha_de_Registro":date,
    					"Hora_de_Registro":date.getHours()+":"+date.getMinutes(),
					"Nombre":$('[name="fname"]').val(),
					"Estacionamiento":"data_recived",
					"Apellido_Paterno":$('[name="lname"]').val(),
					"Apellido_Materno":$('[name="lname"]').val(),
					"Nombre_Completo":$('[name="fname"]').val()+" "+$('[name="lname"]').val(),
					"Correo_Electronico":$('[name="email"]').val(),
					"Telefono":$('[name="phn_number"]').val(),
					"Usuario":$('[name="username"]').val(),
					"Contrasena":$('[name="password"]').val()
				}
	var establishment_parameters = {	"Hora_de_Registro":date.getHours()+":"+date.getMinutes(),
					//"Usuario_que_Registra":id_usuario,
					"Fecha_de_Registro":date,
					"Nombre":$('[name="establishment_name"]').val(),
					"Pais":$('[name="establishment_country"]').val(),
					"Estado":$('[name="establishment_state"]').val(),
					"Municipio":$('[name="establishment_city"]').val(),
					"Colonia":$('[name="establishment_colony"]').val(),
					"Calle":$('[name="establishment_street"]').val(),
					"Numero":$('[name="establishment_number"]').val(),
					"Codigo_Postal":$('[name="establishment_zip_code"]').val(),
					"Longitud":$('[name="longitud"]').val(),
					"Latitud":$('[name="latitud"]').val(),
					//"Dueno":id_usuario,
					"Costo":$('[name="price"]').val(),
					"Tipo_de_Cobro":$('[name="charge_type"]').val(),
					"Foto":"",
					"Telefono":$('[name="phn_number"]').val(),
					"Estatus":"1",//$('[name=""]').val(),
					"Afiliado":"0",
					"Cajones_Totales":$('[name="slots"]').val(),
					"Techado":$('[name="roof"]').val(),
					"Pension":$('[name="pension"]').val(),
					"Valet_Parking":$('[name="valet"]').val(),
					"Seguridad":$('[name="security"]').val(),
					"General":$('[name="general"]').val(),
					"Limpieza":$('[name="clean"]').val(),
					"Atencion":$('[name="attention"]').val(),
					"Rapidez":$('[name="speed"]').val(),
				}
   }
   RegisterStablishment(establishment_parameters,user_parameters,token)
});


function RegisterStablishment(establishment_parameters,user_parameters,token){
	 $.ajax({
			type: 'POST',
			url: 'http://totalcase.com.mx/webapiparkcopeava8/api/Registro_de_Estacionamiento/Post',
			dataType: 'json',
			async: false,
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			data: JSON.stringify(establishment_parameters),
			beforeSend:function(xhr) {
				var t = 'Bearer ' + token;				
				xhr.setRequestHeader('Authorization', t);
				xhr.setRequestHeader('Content-Type',"application/json");
			},
			success: function (data) {
				user_parameters["Estacionamiento"]= data
				registerUser(user_parameters,token);
			}
		});
}

function registerUser(user_parameters,token){
	 $.ajax({
			type: 'POST',
			url: 'http://totalcase.com.mx/webapiparkcopeava8/api/Registro_de_Encargado/Post',
			dataType: 'json',
			async: false,
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			data: JSON.stringify(user_parameters),
			beforeSend:function(xhr) {
				var t = 'Bearer ' + token;				
				xhr.setRequestHeader('Authorization', t);
				xhr.setRequestHeader('Content-Type',"application/json");
			},
			success: function (data) {
				alert("Se registraon satisfactoriamente los datos")
			}
		});
}
		function validateInputs(){
			return true;
		}
