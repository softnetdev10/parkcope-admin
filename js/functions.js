//var token="";
//$( document ).ready(function() {
//   //Load countries dd
//    token = GetToken();
//    parameters= {}
//    methodType= 'GET'
//    urlService= 'Pais/GetAll'
//    htmlElement="getCountries"
//    ajaxCall(methodType,urlService,parameters,token,htmlElement);
//    urlService= 'Estado/GetAll'
//    htmlElement="getStates"
//    ajaxCall(methodType,urlService,parameters,token,htmlElement);
//    urlService= 'Municipio/GetAll'
//    htmlElement="getCities"
//    ajaxCall(methodType,urlService,parameters,token,htmlElement);
//});
//function GetToken()
//	{
//		var parameters = {
//			username: 'admin',
//			password: 'admin',
//			grant_type: 'password'
//		}
//		$.ajax({
//			url: 'http://totalcase.com.mx/webapimvcparkcope/oauth/token',
//			type: 'POST',
//			dataType: 'json',
//			async: false,
//			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
//			data: parameters,
//			success: function (data) {
//				token = data.access_token;
//				//debugger;
//			}
//		});
//		return token;
//	}
//
//
//function ajaxCall(methodType,urlService,parameters,token,htmlElement){
//	 $.ajax({
//			type: methodType,
//			url: 'http://totalcase.com.mx/webapiparkcopeava8/api/'+urlService,
//			dataType: 'json',
//			async: false,
//			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
//			data: JSON.stringify(parameters),
//			beforeSend:function(xhr) {
//				var t = 'Bearer ' + token;				
//				xhr.setRequestHeader('Authorization', t);
//				xhr.setRequestHeader('Content-Type',"application/json");
//			},
//			success: function (data) {
//				if(htmlElement!=""){
//					switch(true) {
//						case (htmlElement=="getCountries"):
//							for (var i = 0; i < data.length; i++) {
//								$('select[name=establishment_country]').append('<option value ="'+data[i].Clave+'">'+data[i].Nombre+'</option>');
//							}
//						break;
//						case (htmlElement=="getStates"): 
//							for (var i = 0; i < data.length; i++) {
//								$('select[name=establishment_state]').append('<option value ="'+data[i].Clave+'">'+data[i].Nombre+'</option>');
//							}
//							$('select[name=establishment_state]').val(19)
//						break;
//						case (htmlElement=="getCities"): 
//							for (var i = 0; i < data.length; i++) {
//								if(data[i].Estado==19)
//								$('select[name=establishment_city]').append('<option value ="'+data[i].Clave+'">'+data[i].Nombre+'</option>');
//							}
//							$('select[name=establishment_city]').val(986)
//						break;
//					}
//				}
//			}
//
//		});
//}
//
