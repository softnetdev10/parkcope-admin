$(document).ready(function(){

    var poolData = {
        UserPoolId : 'us-east-1_HG0uHwzZJ',
        ClientId : 'ro7fg14h9b9mbpn3hunkj0830'
    };
    var cognitoUser;
    var e_mail = $('#inputUsername')[0];
    var inpuCodigo = $('#inpuCodigo')[0];
    var inpcontrasenia = $('#inpcontrasenia')[0];
    var inpcontrasenia2 = $('#inpcontrasenia2')[0];
    
    
    
    $('#btnRecuperar').on('click', function(){
        var email = e_mail.value;
        if (email == '') {
            $('.alerta-correo').toggle().html('<strong>Error! </strong>  Debe de ingresar un correo.');
            setTimeout(function(){
                    $('#mialerta3').hide('fade');
            }, 2500);
            return false;
        }
        
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        
        var userData = {
            Username : email,
            Pool : userPool
        }
        
        cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        
        cognitoUser.forgotPassword({
           onSuccess: function(res){
               console.log(res);
               window.location='http://localhost/parkcope-admin/login/login.html';                           
           },
           onFailure: function(err){
               console.log(err);
               $('.alerta-correo').toggle().html('<strong>Error! </strong> '+err.message+'');
                setTimeout(function(){
                        $('#mialerta3').hide('fade');
                }, 2500);
           },
           inputVerificationCode: function(res){
               console.log(res);
                $('#modalNewPassword').modal('show');               
               
           }
        });
        
    });  
    
    $('form').on('click', function(event){
        event.preventDefault();
    });
      
        
    $('#btnFinalizar').on('click', function(){

        var verificationCode = inpuCodigo.value;
        var password = inpcontrasenia.value;
        var password2 = inpcontrasenia2.value;
        var valid = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,})$/;

    if (password != '' || password2 != '') {
        if (password.match(valid) || password2.match(valid)) {
            if (password === password2) {
                $('.alert-park-succe').toggle().html('<strong>Exito! </strong>  Las contraseñas coinciden.');                 
                setTimeout(function(){
                    $('#mialerta').hide('fade');
                }, 2000);
                cognitoUser.confirmPassword(verificationCode, password, {
                    onFailure: (err) => {
                        $('.alert-parkcope').toggle().html('<strong>Error! </strong> '+err.message+' ');
                        setTimeout(function(){
                            $('#mialerta2').hide('fade'); 
                        }, 2000);
                    },
                    onSuccess: (res) => {
                        console.log("Success");
                        alert('Operacion Exitosa!');
                        $('#modalNewPassword').modal('hide');
                        $('#inputUsername').empty();                            
                        $('#inputUsername').val('');
                        window.location='https://softnetdev10.github.io/parkcope-admin/login/login.html';
                    }
                });                
            }else{
                $('.alert-parkcope').toggle().html('<strong>Error! </strong>  Las contraseñas no coinciden.');
                setTimeout(function(){
                    $('#mialerta2').hide('fade'); 
                }, 2000);
            }                         
        }else{
            $('.alert-parkcope').toggle().html('<strong>Error! </strong>  Minimo 8 digitos, obligatorio una letra y un numero.');
            setTimeout(function(){
           $('#mialerta2').hide('fade'); 
        }, 2000);
        }
    }else{
        $('.alert-parkcope').toggle().html('<strong>Error! </strong>  Favor de llenar todos los campos.');
        setTimeout(function(){
           $('#mialerta2').hide('fade'); 
        }, 2000);
    }


    });
    
    $('#btnCerrarCodigo').click(function(){
        $('#modalForCogigo').modal('hide');
        $('#modalNewPassword').modal('hide');
        $('#modalExito').modal('hide');
    });
    
    $('#btnCerrarContra').click(function(){
        $('#modalNewPassword').modal('hide');
        $('#modalExito').modal('hide');            
    });
    
});

