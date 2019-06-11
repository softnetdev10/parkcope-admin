$(document).ready(function(){
//   alert('bienvenido administrador') ;
   
   $('#containerr').highcharts({
       chart: {type : 'line', borderwidth : 5},
       title: {text: 'Finanzas'},
       xAxis: {title: {text:'Años'}, categories: ["2018","2019", "2020", "2021"]},
       yAxis: {title: {text: 'Ganancias'}, categories: ['50','100', '150', '200','250','300','350','400','500']},
       series : [
           {name: 'Parkcope', data:[0,400,350,500]}
//           {name: 'Parkcope', data:[50,350,100,400]},
//           {name: 'Parkcope', data:[50,150,100,400]},
//           {name: 'Parkcope', data:[50,200,100,400]},
//           {name: 'Parkcope1', data:[50,200,450,400]},
//           {name: 'Parkcope', data:[50,150,100,200]}
           
       ]      
   });   
    
});

