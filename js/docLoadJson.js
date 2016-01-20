//Weather App jQuery


//***********************************************
//Preloader

$(document).ready(function() {

$(".preloader i").css("display", "none");
});

//***********************************************
//Varibables des dates

var toDayDate = new Date();
        
var weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


var nextDay = weekDays[toDayDate.getDay()+1];

var nextDayPlusOne = weekDays[toDayDate.getDay()+2];

var nextDayPlusTwo = weekDays[toDayDate.getDay()+3];var nxtDays ='<div class="col-md-4 nextDays"><h5>'+ nextDay +'</h5></div>';

nxtDays +='<div class="col-md-4 nextDays"><h5>'+ nextDayPlusOne +'</h5></div>';

nxtDays += '<div class="col-md-4 nextDays"><h5>'+ nextDayPlusTwo +'</h5></div>';

var nxtDays ='<div class="col-md-4 nextDays"><h5>'+ nextDay +'</h5></div>';

nxtDays +='<div class="col-md-4 nextDays"><h5>'+ nextDayPlusOne +'</h5></div>';

nxtDays += '<div class="col-md-4 nextDays"><h5>'+ nextDayPlusTwo +'</h5></div>';
        

//**********************************************
//Variables de l'api(urls, icones, temperatures, noms des villes)

var idCity ='';

var nameCity='';

var capNameCity ='';
    
var cityUrl='';
    
var nextWeatherUrl ='';
    
var idApi = '';//Ajouter l'ID de votre API Openweathermap
    
var baseUrl = 'http://api.openweathermap.org/data/2.5/weather?id=';
    
var forcastUrl ='http://api.openweathermap.org/data/2.5/forecast/daily?id=';

var metric = '&units=metric';

var format ='&mode=json';

var lang ='&lang=fr';

var cnt = '&cnt=3';

var curentTemp = '';

//**********************************************

$(document).ready(function() {

    
    //Lecture du fichier cities-fr.json et complilation de la balise <select>
    
    $.getJSON('js/cities-fr.json',function(data){
            $.each(data,function(index,c){
              $('#selec').append('<option value ='+ c.id +'>' + c.nm + '</option>');
               
            });
          
          });

    //Change <select>
    
    $( "#selec" ).change(function () {
        
        $('#nextMin,#nextMax,#nextIcons,#nextWeather,#cTemp,#iconWeather,#cityName').hide(0).delay(3000).show(0);
        $(".preloader i").css("display", "block").delay(2990).hide(0);
            
        //Supprimer les <div>
            
        $('.cityName').remove();
        
        $('.iconCustom').remove();
        
        $('.curTemp').remove();
        
        $('.nextDays').remove();
        
        $('.colRemove').remove();
        
        //Nom de la ville
        
        $( "#selec option:selected" ).each(function() {
          
          idCity = $( this ).val();
          nameCity = $( this ).text();
          capNameCity = nameCity.toUpperCase();//retourne le nom de la ville en majuscules    
          cityUrl = baseUrl + idCity + lang + metric + idApi;
          nextWeatherUrl = forcastUrl + idCity + lang + metric + cnt + idApi;
         
          $('#cityName').append('<div  class="col-md-12 cityName"><h4>'+ capNameCity +'</h4></div>');        
            
        });

    //La meteo du jour
        
    $.getJSON(cityUrl,function(data){
           
        $.each(data.weather,function(indexWeather,w){
              
              var curentIcon = w.id;
              var curentDescription = w.description;//peut etre utile pour une V1
              
              $('#iconWeather').append('<i class="wi wi-icon-' + curentIcon + ' iconCustom"></i>');  
            
               
        });
           
           curentTemp = data.main.temp;
                           
           $('#cTemp').append('<div class="curTemp"><h1>'+ curentTemp +'</h1></div>');
               
            
    });
        
        
    //Les previsions   
        
    $.getJSON(nextWeatherUrl,function(data){
           
            //Ajout des dates
            
            $('#nextWeather').append(nxtDays);   

            
        $.each(data.list,function(indexForcast,f){
               
                
                var tempMax = f.temp.max;
                
                var tempMin = f.temp.min;
                
                var iconObj = f.weather[0];
                
                var iconsNext = iconObj.id;
                
                
                var maxForecast = '<div class="col-md-4 colRemove" align="center"><h5>'+ tempMax +'</h5></div>';
                
                var minForecast = '<div class="col-md-4 colRemove" align="center"><h5>'+ tempMin +'</h5></div>';   
                
                $('#nextIcons').append('<div class="col-md-4 colRemove" align="center"><i class="wi wi-icon-' + iconsNext + ' fortcastIcons"></i></div>');
                                
                $('#nextMax').append(maxForecast);
                   
                $('#nextMin').append(minForecast);
            });
       });
        
        
    }).change();

});    
    
   
    


  
   
