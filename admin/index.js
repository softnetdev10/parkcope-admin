$(document).ready(function(){
   
   $('#btnPerfil').on('click', function(){
       $.ajax({
            type: "POST",
            url: "perfil.php",
            success: function(response) {
                $('#inicio').html(response);
            }
        });
    });
   $('#btnEstacionamiento').on('click', function(){
       $.ajax({
            type: "POST",
            url: "estacionamiento.php",
            success: function(response) {
                $('#inicio').html(response);
            }
        });
    });
   $('#btnOperativa').on('click', function(){
       $.ajax({
            type: "POST",
            url: "operativa.php",
            success: function(response) {
                $('#inicio').html(response);
            }
        });
    });
   $('#btnPersonal').on('click', function(){
       $.ajax({
            type: "POST",
            url: "personal.php",
            success: function(response) {
                $('#inicio').html(response);
            }
        });
    });
      
   $('#containerr').highcharts({
       chart: {type : 'line', borderwidth : 5},
       title: {text: 'Finanzas'},
       xAxis: {title: {text:'Años'}, categories: ["2018","2019", "2020", "2021"]},
       yAxis: {title: {text: 'Ganancias'}, categories: ['50','100', '150', '200','250','300','350','400','500']},
       series : [
           {name: 'Parkcope', data:[0,400,350,500]}

           
       ]      
   });
   
   $('#btnEditarPerfil').on('click', function(){
       alert('editar usuario');
   });
   $('#btnInicio').on('click', function(){
       $.ajax({
            type: "POST",
            url: "inicio.php",
            success: function(response) {
//            console.log(response);
                $('#inicio').html(response);
            }
        });


    });
    
});

function editar (){
    var user = $('#inputUsername').val();
    alert('editar  ' + user);
}

