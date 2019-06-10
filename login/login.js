
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
               window.location='https://softnetdev10.github.io/parkcope-admin/admin/index.html';
//               window.location='http://localhost/parkcope-admin/admin/index.html';
           },
           
           onFailure: function (err){
               alert(err.message);
               console.log(err);
           },
       });       
       
       
    });     
//    $('form').on('click', function(event){
//        event.preventDefault();
//    });
});
