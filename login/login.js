
$(document).ready(function(){
    
    var poolData = {
        UserPool : 'us-east-1_HG0uHwzZJ',
        ClientId : 'ro7fg14h9b9mbpn3hunkj0830'
    };
    
    $('#btnLogin').on('click', function(){
        
       var  email = $('#inputUsername').val();
       var  password = $('#inputPassword').val();
       
       var authenticationData = {
           Username = email,
           Password = password
       };
       console.log(authenticationData);
       
       var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
       var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
       
       var userData = {
           Username : email,
           Pool : userPool
       };
       console.log(userData);
       
       var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
       
       cognitoUser.authenticateUser(authenticationDetails, {
           onSuccess: function (result){
               var accessToken = result.getAccessToken().getJwtToken();
               var idToken = result.idToken.jwtToken;
               
               alert('Inicio sesion con exito!!!');
               window.location='index.html';
           },
           
           onFailure: function (err){
               alert(err.message);
               console.log(err);
           },
       });       
       
       
    });
    
    $('form').on('click', function(event){
        event.preventDefault();
    });
});


