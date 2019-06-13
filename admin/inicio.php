
    <!--<div class="right_col" role="main">-->                 
             <h2 style="text-align: left">Inicio</h2>
             <div id="containerr" style="width:100%; height:100%;"></div>              
     <!--</div>-->

<script src="inicio.js"></script>
<script type="text/javascript">
    $('#containerr').highcharts({
       chart: {type : 'line', borderwidth : 5},
       title: {text: 'Finanzas'},
       xAxis: {title: {text:'Años'}, categories: ["2018","2019", "2020", "2021"]},
       yAxis: {title: {text: 'Ganancias'}, categories: ['50','100', '150', '200','250','300','350','400','500']},
       series : [
           {name: 'Parkcope', data:[0,400,350,500]}

           
       ]      
   });   
</script>