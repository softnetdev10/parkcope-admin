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
//        console.log(name);
        
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        var attributeList = [];
        
        var dataName = {
            Name : 'name',
            Value :name
        };
        var dataMiddleName = {
            Name : 'middle_name',
            Value : middle_name
        };
        var dataFamilyName = {
            Name : 'family_name',
            Value : family_name
        };
        var dataEmail = {
            Name : 'email',
            Value : email
        };
        var dataPhoneNumber = {
            Name : 'phone_number',
            Value : phone_number
        };
        
        var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);
        var attributeMiddleName = new AmazonCognitoIdentity.CognitoUserAttribute(dataMiddleName);
        var attributeFamilyName = new AmazonCognitoIdentity.CognitoUserAttribute(dataFamilyName);
        var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
        var attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhoneNumber);
        
        attributeList.push(attributeName);
        attributeList.push(attributeMiddleName);
        attributeList.push(attributeFamilyName);
        attributeList.push(attributeEmail);
        attributeList.push(attributePhoneNumber);
        
        if (name == '' || middle_name == '' || family_name == '' || password == '') {
            console.log('Favor ingrese todos los datos requeridos(*).');
            alert('Favor ingrese todos los datos requeridos(*).');
            return false;
        }
        
        userPool.signUp(email, password, attributeList, null, function(error, result){
            if (error) {
                console.log(error);
                alert(error.message);
                return;
            }else{
                console.log(result);
                alert('Usuario creado con éxito!');
                window.location='https://softnetdev10.github.io/parkcope-admin/index.html';
            }

        });                
        
    });
    
    $('form').on('submit', function (event) {
            event.preventDefault();
      });
    
});

