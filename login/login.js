
$(document).ready(function(){
    var poolData = {
        UserPool = 'us-east-1_HG0uHwzZJ',
        ClientId = 'ro7fg14h9b9mbpn3hunkj0830'
    };
    $('#btnLogin').on('click', function(){
       var  email = $('#username').val();
       var  password = $('#inputPassword').val();
       
       var authenticationData = {
           Username = email,
           Password = password
       };
    });
    
    
});


