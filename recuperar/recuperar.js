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
        
        cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        
        cognitoUser.forgotPassword({
           onSuccess: function(res){
               console.log(res);
//               alert('Favor de iniciar sesion');
               window.location='http://localhost/parkcope-admin/login/login.html';                           
           },
           onFailure: function(err){
               console.log(err);
               alert(err.message);
           },
           inputVerificationCode: function(res){
               console.log(res);
                $('#modalForCogigo').modal('show');               
               
           }
        });
        
    });
    
    $('form').on('click', function(event){
        event.preventDefault();
    });
    
    $('#btnRecuperarr').on('click', function(event){
        var codigo = inpuCodigo.value;
        if (codigo === '') {
            console.log('campo vacio');
            return false;
        }
        $('#modalForCogigo').modal('hide');
        
    });
    
    $('#modalForCogigo').on('hidden.bs.modal', function (e) {
        $('#inputUsername').empty();
        $('#modalNewPassword').modal('show');
        
        $('#btnFinalizarr').on('click', function(){
        var btn = $(this).button('loading');
        btn.button('reset');
        var verificationCode = inpuCodigo.value;
        var password = inpcontrasenia.value;
        var password2 = inpcontrasenia2.value;
        
        if (password != '' || password2 != '') {
            if (validapass(password) || validapass(password2)) {
                if (password === password2) {
                    $('.alert').removeClass('alert-danger');
                    $('.alert').addClass('alert-success');
                    $('.alert').toggle().html('<strong>Exito! </strong>  Las contraseñas coinciden.');                 
                   
                    cognitoUser.confirmPassword(verificationCode, password, {
                        onFailure: (err) => {
                            console.log(err);
                        },
                        onSuccess: () => {
                            console.log("Success");
                            $('#modalNewPassword').modal('hide');
                            $('#inputUsername').empty();                            
                        }
                    });
                   
                    setTimeout(function(){
                        $('#mialerta').hide('fade');
                      
                    }, 2500);
                }else{
                    $('.alert').removeClass('alert-success');
                    $('.alert').addClass('alert-danger');
                    $('.alert').toggle().html('<strong>Error! </strong>  Las contraseñas no coinciden.');
                    setTimeout(function(){
                        $('#mialerta').hide('fade'); 
                    }, 2500);
                }                         
            }else{
                $('.alert').removeClass('alert-success');
                $('.alert').addClass('alert-danger');
                $('.alert').toggle().html('<strong>Error! </strong>  Minimo 5 digitos, obligatorio una letra Mayuscula y un numero.');
                setTimeout(function(){
               $('#mialerta').hide('fade'); 
            }, 2500);
            }
        }else{
            $('.alert').removeClass('alert-success');
            $('.alert').addClass('alert-danger');
            $('.alert').toggle().html('<strong>Error! </strong>  Favor de llenar todos los campos.');
            setTimeout(function(){
               $('#mialerta').hide('fade'); 
            }, 2500);
        }


        });
    });
    
    $('#modalNewPassword').on('hidden.bs.modal', function (e){
        $('#modalExito').modal('show');
        $('#inputUsername').empty();
        
    });
});

function validapass(codigo){
    var re = /^[a-z\d]{8,}$/i; 
    var nre = /^([A-Z]{8,}|[a-z]{8,}|\d{8,}|[A-Z\d]{8,}|[A-Za-z]{8,}|[a-z\d]{8,})$/;
    return (re.test(codigo) && !nre.test(codigo));
}

