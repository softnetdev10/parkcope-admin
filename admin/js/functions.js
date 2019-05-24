var user;
var token = GetToken();
var chartData = [];
var chartLabels = [];
var myChart;
var globalToday = new Date();
var selectedYear = globalToday.getFullYear();
var selectedMonth = selectedWeek = "";
var months = new Array();
months[0] = "Enero";
months[1] = "Febrero";
months[2] = "Marzo";
months[3] = "Abril";
months[4] = "Mayo";
months[5] = "Junio";
months[6] = "Julio";
months[7] = "Agosto";
months[8] = "Septiembre";
months[9] = "Octubre";
months[10] = "Noviembre";
months[11] = "Diciembre";
var parkinglotId;
$( document ).ready(function() {
  if(sessionStorage.user){
    user = JSON.parse(sessionStorage.user);
    $('.user-name').text(user.userName);
    parkinglotId = user.userLotId;
    var today = new Date();
    $('#year-selected').html(today.getFullYear());
    loadParkingLotSerivces(user.userLotId,today.getFullYear(),undefined,undefined,undefined,"year");
  }else{
    //FIX ME DYNAMIC LOCATION HREF SESSION LOST
    location.href = "http://parkcope.com/login.php"
  }

  $(".ranges").on('classChange', function() {
     var ranges = $('.active').html();
     changeChartRange()
});

  $("#yearpicker").datepicker({
    format: "yyyy",
    viewMode: "years", 
    minViewMode: "years"
  });

  $("#yearpicker").on('changeDate', function (event) {
    selectedYear = event.date.getFullYear();
    $('#year-selected').html(selectedYear);
    $('#month-selected').html('select a month');
    $('#week-section').hide();
    $('.datepicker ').hide();
    $('loader ').show();
    loadParkingLotSerivces(parkinglotId,selectedYear,undefined,undefined,undefined,"year")
    $('loader ').hide();
  });

  $("#monthpicker").datepicker({
    format: "mm",
    viewMode: "months", 
    minViewMode: "months"
  }).on('show', function() {
    // remove the year from the date title before the datepicker show
    var dateText  = $(".datepicker-days .datepicker-switch").text();
    var dateTitle = dateText.substr(0, dateText.length - 5);
    $(".datepicker-days .datepicker-switch").text(dateTitle);
});

  $("#monthpicker").on('changeDate', function (event) {
    selectedMonth = event.date.getMonth()+1;
    loadWeeks(selectedYear,selectedMonth);
    $('#month-selected').html(months[selectedMonth-1]);
    $('.datepicker ').hide();
    $('loader ').show();
    loadParkingLotSerivces(parkinglotId,selectedYear,selectedMonth,undefined,undefined,"month")
    $('loader ').hide();
  });

  $('#weekpicker').on('change',function(event){
    debugger;
    var selectedWeek = $(this).val();
    //load values for week
    var startDate = 1//first date of week
    var endDate = 7//last date of week
    loadParkingLotSerivces(parkinglotId,selectedYear,selectedMonth,startDate,endDate,"week")
  });

}); 

function changeChartRange(){
  var startDate = $("input[name=daterangepicker_start]").val();
  var endDate = $("input[name=daterangepicker_end]").val();
}

function loadParkingLotSerivces(parkinglotId,startYear,startMonth,startDate,endDate,range_type){
  if(typeof myChart!=="undefined"){
    myChart.destroy();
  }
  var dateRange = "";
  switch(range_type) {
    case "year":
      var firstDayOfCurrentYear = startYear+"-01-01"
      var lastDayOfCurrentYear = startYear+"-12-31"
      dateRange = "and Registro_de_Servicio.Fecha_de_Entrada>= '"+firstDayOfCurrentYear+"T00:00:00' and Registro_de_Servicio.Fecha_de_Salida<='"+lastDayOfCurrentYear+"T00:00:00'";
      break;
    case "month":
    //get month days
      var selectedMonthLastDate = new Date(startYear,startMonth,0).getDate();
      if(startMonth<10){
      startMonth = "0"+startMonth;
      }
      var firstDayOfCurrentMonth = startYear+"-"+(startMonth)+"-01"
      var lastDayOfCurrentMonth = startYear+"-"+(startMonth)+"-"+selectedMonthLastDate
      dateRange = "and Registro_de_Servicio.Fecha_de_Entrada>= '"+firstDayOfCurrentMonth+"T00:00:00' and Registro_de_Servicio.Fecha_de_Salida<='"+lastDayOfCurrentMonth+"T00:00:00'";
      break;
    case "week":
      break;
    case "day":
      break;
  }
  /*if(typeof startDate!=="undefined"){
    var dStartDate = new Date(startDate);
    var startMonth = dStartDate.getMonth()+1;
    if(startMonth<10){
      sStartMonth = "0"+startMonth;
    }
    s_startDate =  dStartDate.getFullYear()+"-"+sStartMonth+"-"+dStartDate.getDate();
    var dEndDate = new Date(endDate);
    var sEndMonth = dEndDate.getMonth()+1;
    if(sEndMonth<10){
      sEndMonth = "0"+sEndMonth;
    }
    s_endDate = dEndDate.getFullYear()+"-"+sEndMonth+"-"+dEndDate.getDate();
    dateRange = "and Registro_de_Servicio.Fecha_de_Entrada>= '"+s_startDate+"T00:00:00' and Registro_de_Servicio.Fecha_de_Salida<='"+s_endDate+"T00:00:00'";
  }else{
    //for this year
    var firstDayOfCurrentYear = new Date().getFullYear()+"-01-01"
    var lastDayOfCurrentYear = new Date().getFullYear()+"-12-31"
    dateRange = "and Registro_de_Servicio.Fecha_de_Entrada>= '"+firstDayOfCurrentYear+"T00:00:00' and Registro_de_Servicio.Fecha_de_Salida<='"+lastDayOfCurrentYear+"T00:00:00'";
  }*/
  var data = {  startRowIndex: "0",
                maximumRows:"1000",
                Where: "Registro_de_Servicio.Estacionamiento="+parkinglotId+dateRange
            };
  
 $.ajax({
    type: 'GET',
    url: "http://www.totalcase.com.mx/WebApiPARKCOPEAVA8/api/Registro_de_Servicio/ListaSelAll",
    dataType: 'json',
    async: false,
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: data,
    beforeSend:function(xhr) {
      var t = 'Bearer ' + token;        
      xhr.setRequestHeader('Authorization', t);
      xhr.setRequestHeader('Content-Type',"application/json");
    },
    success: function (data) {
      if(data.Registro_de_Servicios.length>0){
        var servicios = data.Registro_de_Servicios;
        loadParkingLotsInformation(servicios,range_type);
        initChart(servicios);
      }else{
        chartData = [0];
        chartLabels = ["No data"];
        initChart();
        $('#servicesTableBody').empty();
        $('#totalIncome').html("$0");
        $('#totalServices').html("0");
      }     
    },
    error: function(data){
        alert("error");
      }
  });
}

function loadParkingLotsInformation(servicios,range_type){
  chartData = [];
  chartLabels = [];
  var startDate = new Date(servicios[0].Fecha_de_Entrada);
  switch(range_type) {
    case "year":
      chartLabels = months;
      //get first date and set first months values, 0 because getMonth() 0-11
      var startMonth = startDate.getMonth();
      if(startMonth>0){
        var x = 0;
        while(x<startMonth){
          chartData.push(0);
          x++;
        }
      }
      break;
    case "month":
      //get month days
      var selectedMonthDates = new Date(selectedYear,selectedMonth,0).getDate();
      for (var i = 0; i < selectedMonthDates; i++) {
        chartLabels.push(i+1)
      }
      //get first date and set first months values, 1 because getDate() 1-31
      var startDay = startDate.getDate();
      if(startDay>1){
        var x = 1;
        while(x<startDay){
          chartData.push(0);
          x++;
        }
      }
      break;
    case "week":
      break;
    case "day":
      break;
  }
  var totalIncome = 0;
  var monthServices = 0;
  
  $('#servicesTableBody').empty();
  for (var i = 0; i < servicios.length; i++) {
    totalIncome += servicios[i].Total == null ? 0 : servicios[i].Total 
    htmlOut = '<tr>'+
                '<td>'+servicios[i].Folio+'</td>'+
                '<td>'+servicios[i].Usuario_Registro_de_Usuario.Nombre_Completo+'</td>'+
                '<td>'+servicios[i].Auto+'</td>'+
                '<td>'+servicios[i].Fecha_de_Entrada+'</td>'+
                '<td>'+servicios[i].Hora_de_Entrada+'</td>'+
                '<td>'+servicios[i].Fecha_de_Salida+'</td>'+
                '<td>'+servicios[i].Hora_de_Salida+'</td>'+
                '<td>'+servicios[i].Total+'</td>'+
                '<td>'+servicios[i].Calificacion+'</td>'+
                '<td>'+servicios[i].Estatus_de_Servicio_Estatus_de_Servicio.Descripcion+'</td>'+
              '</tr>';
    var serviceDate = new Date(servicios[i].Fecha_de_Entrada);
    switch(range_type) {
      case "year":
        if (startDate.getMonth()==serviceDate.getMonth()){
          monthServices +=1;
        }else{
          chartData.push(monthServices);
          //check if next service is 2 months later
          var differenceInMonths = serviceDate.getMonth()-startDate.getMonth();
          while(differenceInMonths!=1){
            chartData.push(0);
            differenceInMonths = differenceInMonths -1;
          }
          monthServices = 1;
          startDate = serviceDate;
        }   
      break;
      case "month":
        if (startDate.getDate()==serviceDate.getDate()){
          monthServices +=1;
        }else{
          chartData.push(monthServices);
          //check if next service is 2 months later
          var differenceInDates = serviceDate.getDate()-startDate.getDate();
          while(differenceInDates!=1){
            chartData.push(0);
            differenceInDates = differenceInDates -1;
          }
          monthServices = 1;
          startDate = serviceDate;
        }   
      break;
    }
    $('#servicesTableBody').append(htmlOut);
  }
  //add last month services
  chartData.push(monthServices);
  //fill all future months with 0
  switch(range_type) {
    case "year":
      var lastMonth = serviceDate.getMonth();
      while(lastMonth!=11){
        chartData.push(0);
        lastMonth++;
      }
    break;
    case "month":
      var lastDay = serviceDate.getDate();
      var selectedMonthLastDate = new Date(selectedYear,(selectedMonth),0).getDate();
      while(lastDay!=selectedMonthLastDate){
        chartData.push(0);
        lastDay++;
      }
    break;
  }

  $('#totalIncome').html("$"+totalIncome.toFixed(2));
  $('#totalServices').html(servicios.length);
  }
  


  function initChart(servicios){
      //entradas por mes
      if ($('#parkcopeChart').length ){
       var ctx = document.getElementById("parkcopeChart").getContext('2d');
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels:chartLabels,
                datasets: [{
                    label: '# de Servicios',
                    data: chartData,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
        
      }
  }


  function init_daterangepickerparkcope() {
      if( typeof ($.fn.daterangepicker) === 'undefined'){ return; }
      console.log('init_daterangepicker');
    
      var cb = function(start, end, label) {
        console.log(start.toISOString(), end.toISOString(), label);
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
      };

      var optionSet1 = {
        startDate: moment().subtract(29, 'days'),
        endDate: moment(),
        minDate: '01/01/2012',
        maxDate: '12/31/2015',
        dateLimit: {
        days: 60
        },
        showDropdowns: true,
        showWeekNumbers: true,
        timePicker: false,
        timePickerIncrement: 1,
        timePicker12Hour: true,
        ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        opens: 'left',
        buttonClasses: ['btn btn-default'],
        applyClass: 'btn-small btn-primary',
        cancelClass: 'btn-small',
        format: 'MM/DD/YYYY',
        separator: ' to ',
        locale: {
        applyLabel: 'Submit',
        cancelLabel: 'Clear',
        fromLabel: 'From',
        toLabel: 'To',
        customRangeLabel: 'Custom',
        daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        firstDay: 1
        }
      };
      
      $('#reportrange span').html(moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
      $('#reportrange').daterangepicker(optionSet1, cb);
      $('#reportrange').on('show.daterangepicker', function() {
        console.log("show event fired");
      });
      $('#reportrange').on('hide.daterangepicker', function() {
        console.log("hide event fired");
      });
      $('#reportrange').on('apply.daterangepicker', function(ev, picker) {
        console.log("apply event fired, start/end dates are " + picker.startDate.format('MMMM D, YYYY') + " to " + picker.endDate.format('MMMM D, YYYY'));
        var startDate = picker.startDate.format('MMMM D, YYYY');
        var endDate = picker.endDate.format('MMMM D, YYYY');
        loadParkingLotSerivces(parkinglotId,startDate,endDate);

      });
      $('#reportrange').on('cancel.daterangepicker', function(ev, picker) {
        console.log("cancel event fired");
      });
      $('#options1').click(function() {
        $('#reportrange').data('daterangepicker').setOptions(optionSet1, cb);
      });
      $('#options2').click(function() {
        $('#reportrange').data('daterangepicker').setOptions(optionSet2, cb);
      });
      $('#destroy').click(function() {
        $('#reportrange').data('daterangepicker').remove();
      });
    }

    /**
     * Returns count of weeks for year and month
     *
     * @param {Number} year - full year (2016)
     * @param {Number} month_number - month_number is in the range 1..12
     * @returns {number}
     */
    var loadWeeks = function(year, month_number) {
        $('#weekpicker').html('');
        var firstOfMonth = new Date(year, month_number - 1, 1);
        var day = firstOfMonth.getDay() || 6;
        day = day === 1 ? 0 : day;
        if (day) { day-- }
        var diff = 7 - day;
        var lastOfMonth = new Date(year, month_number, 0);
        var lastDate = lastOfMonth.getDate();
        if (lastOfMonth.getDay() === 1) {
            diff--;
        }
        var result = Math.ceil((lastDate - diff) / 7)+1;
        for (var i = 1; i <=result; i++) {
          $('#weekpicker').append('<option value= "'+i+'">Semana: '+i+'</option>')
        }
        //$('#week-section').show();
        return result;
    };
    
