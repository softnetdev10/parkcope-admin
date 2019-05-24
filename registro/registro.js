//var cognito = require('amazon-cognito-identity-js');
$(document).ready(function(){
    
    var poolData = {
        UserPoolId : 'us-east-1_HG0uHwzZJ',
        ClientId : 'ro7fg14h9b9mbpn3hunkj0830'
    };
//    var AmazonCognitoIdentity = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
    $('#insertar').on('click', function(){
        
        var name = $('#inpNombre').val();
        var middle_name = $('#inpApellido_p').val();
        var family_name = $('#inpApellido_m').val();
        var email = $('#inpEmail').val();
        var phone_number = $('#inpTelefono').val();
        var password = $('#inpContrasenia').val();
        console.log(name);
        
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        console.log(userPool);
        var attributeList = [];
        
        var dataName = {
            Name : 'name',
            Value :name
        };
        console.log(dataName);
        
        var formData = $(this).serializeArray();
        console.log(formData);
        event.preventDefault();
        
    });
    
});

