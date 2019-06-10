$(document).ready(function(){
//   alert('bienvenido administrador') ;
   
   $('#containerr').highcharts({
       chart: {type: 'bar'},
       title: {text: 'Grafica de prueba'},
       xAxis: {title: {text:'frutas'}, Categorias: ['manzana', 'platyano', 'naranjas']},
       yAxis: {title: {text: 'Frutas comidas'}},
       series : [
           {name: 'richi', data:[1,1,4]},
           {name: 'jose', data:[5,8,2]}
       ]
   });
});

