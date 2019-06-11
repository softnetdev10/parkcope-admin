$(document).ready(function(){
//   alert('bienvenido administrador') ;
   
   $('#containerr').highcharts({
       chart: {type : 'line', borderwidth : 0},
       title: {text: 'Finanzas Parkcope'},
       xAxis: {title: {text:'Parkcope'}, categories: ["2018","2019", "2020", "2021"]},
       yAxis: {title: {text: 'Ganancias'}, categories: ['50','100', '150', '200','250','300','350','400','500']},
       series : [
           {name: 'Parkcope', data:[1,3,5,8]}
           
       ]      
   });   
    
});

