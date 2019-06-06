
$(document).ready(function(){

    var poolData = {
        UserPoolId : 'us-east-1_HG0uHwzZJ',
        ClientId : 'ro7fg14h9b9mbpn3hunkj0830'
    };

    $('#btnLogin').on('click', function(){
        
       var  email = $('#inputUsername').val();
       var  password = $('#inputPassword').val();
       
       var authenticationData = {
           Username : email,
           Password : password
       };
       
       var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
       var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
       
       var userData = {
           Username : email,
           Pool : userPool
       };
       
       var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
       
       cognitoUser.authenticateUser(authenticationDetails, {
           onSuccess: function (result){
               var accessToken = result.getAccessToken().getJwtToken();
               var idToken = result.idToken.jwtToken;
               
               alert('Inicio sesion con exito!!!');
               window.location='http://localhost/parkcope-admin/admin/index.html';
           },
           
           onFailure: function (err){
               alert(err.message);
               console.log(err);
           },
       });       
       
       
    });
    
    $('#btnRecuperar').on('click', function(){
        var email = $('#inpRecupCorreo').val();
        if (email == '') {
            alert('favor de ingresar un correo');
            return false;
        }
        
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        
        var userData = {
            Username : email,
            Pool : userPool
        }
        var userData = {
            Username : email,
            Pool : userPool
        };
        
        var cognitoUser = AmazonCognitoIdentity.CognitoUser(userData);
        
        cognitoUser.forgotPassword({
           onSuccess: function(res){
               alert('Favor de iniciar sesion');
               window.location='http://localhost/parkcope-admin/login/login.html';
//               $('#forModal').modal('hide');
//               $('#modalForCogigo').modal('hide');
//               $('#modalNewPassword').modal('hide');               
           },
           onFailure: function(err){
               concole.log(err);
               alert(err.message);
           },
           inputVerificationCode(){
               $('#modalForCogigo').modal('hide');
               var verificationCode = $('#inpuCodigo').val();
               var newPassword = $('#inpcontrasenia').val();
               cognitoUser.confirmPassword(verificationCode, newPassword, this);
           }
        });
        
    });
    
//    $('form').on('click', function(event){
//        event.preventDefault();
//    });
});

//function submitContactForm(){
//    $('#modalForCogigo').modal('show');
//    var correo = $('#inpCorreo').val();
//    $('#inpuCodigo').val(correo);
//}
//
//function modalNewPassword(){
//    $('#modalNewPassword').modal('show');
//    var codigo = $('#inpuCodigo').val();
//    $('#inpcontrasenia').val(codigo);
//}

