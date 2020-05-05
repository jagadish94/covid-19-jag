var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {
 // $scope.names = ["Emil", "Tobias", "Linus"];
  $scope.confirmed="";
  var global_data="";
  $scope.sortcolumn= "Select";
  
  //$scope.finalinfo="";
  app.directive('commaseparator', function($filter) {  
    'use strict';  
    return {  
        require: 'ngModel',  
        link: function(scope, elem, attrs, ctrl) {  
            if (!ctrl) {  
                return;  
            }  
            ctrl.$formatters.unshift(function() {  
                return $filter('number')(ctrl.$modelValue);  
            });  
            ctrl.$parsers.unshift(function(viewValue) {  
                var plainNumber = viewValue.replace(/[\,\.\-\+]/g, ''),  
                    b = $filter('number')(plainNumber);  
                elem.val(b);  
                return plainNumber;  
            });  
        }  
    };  
}); 
  $http.get('/TotalCases').success(function(response){
    $scope.confirmed=response.confirmed.value;
    $scope.recovered=response.recovered.value;   
    $scope.deaths=response.deaths.value;   
    $scope.active= $scope.confirmed-$scope.recovered-$scope.deaths; 
	});
  
  $http.get('/countryNames').success(function(response){
     console.log();
     var countryNames=[]; 
     for (i = 0; i < response.countries.length-1; i++) {
      countryNames.push(response.countries[i].name)
    }
    $scope.names =countryNames;
    //$scope.recovered=response.recovered.value;   
   // $scope.deaths=response.deaths.value;   
  });

  $scope.dropDownSelect1 = function(value) 
	{
    //var x = document.getElementById("mySelect").value;
    //document.getElementById("demo").innerHTML = "You selected: " + x;
   // let massPopChart=null;

    var data =
	     {
			countryName : value
       };
   
       if(value!='India')
       {
        $scope.finalinfo=null;
       console.log(value)
       $http.get('/countryDetails',{params:data}).success(function(response){
         console.log(response)
        $scope.confirmed1=response.confirmed.value;
        $scope.recovered1=response.recovered.value;   
        $scope.deaths1=response.deaths.value;  
        $scope.active1= $scope.confirmed1-$scope.recovered1-$scope.deaths1; 
        const confirmed_chart=$scope.confirmed1;
        const active_chart=$scope.active1;
        const recovered_chart =$scope.recovered1;
        const deaths_chat =$scope.deaths1;
        console.log(confirmed_chart)
        console.log(recovered_chart)
        console.log(deaths_chat)
        document.querySelector("#chartReport").innerHTML = '<canvas id="myChart"></canvas>';
        let myChart = document.getElementById('myChart').getContext('2d');
const chart_text= value  + " COVID-19 Cases"
// Global Options
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = '#777';

 let massPopChart = new Chart(myChart, {
  type:'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
  data:{
    labels:['confirmed', 'active', 'recovered','deaths'],
    datasets:[{
        label:'confirmed',
      data:[
        confirmed_chart,
        active_chart,
        recovered_chart,
        deaths_chat,
        
      ],
      //backgroundColor:'green',
      backgroundColor:[
        'orange',
        'blue',
        'green',
        'red',

      ],
      borderWidth:1,
      borderColor:'#777',
      hoverBorderWidth:3,
      hoverBorderColor:'#000'
    }]
  },
  options:{
    title:{
      display:true,
      text:chart_text,
      fontSize:25
    },
    legend:{
      display:true,
      position:'right',
      labels:{
        fontColor:'#000'
      }
    },
    layout:{
      padding:{
        left:50,
        right:0,
        bottom:0,
        top:0
      }
    },
    tooltips:{
      enabled:true
    }
  }
});     
massPopChart.destroy();
massPopChart = new Chart(myChart, {
  type:'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
  data:{
    labels:['confirmed', 'active', 'recovered','deaths'],
    datasets:[{
        label:'confirmed',
      data:[
        confirmed_chart,
        active_chart,
        recovered_chart,
        deaths_chat,
        
      ],
      //backgroundColor:'green',
      backgroundColor:[
        'orange',
        'blue',
        'green',
        'red',

      ],
      borderWidth:1,
      borderColor:'#777',
      hoverBorderWidth:3,
      hoverBorderColor:'#000'
    }]
  },
  options:{
    title:{
      display:true,
      text:chart_text,
      fontSize:25
    },
    legend:{
      display:true,
      position:'right',
      labels:{
        fontColor:'#000'
      }
    },
    layout:{
      padding:{
        left:50,
        right:0,
        bottom:0,
        top:0
      }
    },
    tooltips:{
      enabled:true
    }
  }
});   
       
      });
     
     

    }
    else{
        
        $http({
            method: 'GET',
            url:  'https://api.covid19india.org/data.json'
    
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
            // $scope.weatherResult =response.data;

            const chart_text= value  + " COVID-19 Cases"
            console.log(response)
            console.log(response.data.statewise);
            $scope.finalinfo=response.data.statewise.slice(1);
           
            $scope.confirmed1= response.data.statewise[0].confirmed;
            $scope.recovered1= response.data.statewise[0].recovered;   
            $scope.deaths1= response.data.statewise[0].deaths;  
            $scope.active1= $scope.confirmed1-$scope.recovered1-$scope.deaths1; 
            document.querySelector("#chartReport").innerHTML = '<canvas id="myChart"></canvas>';
            const confirmed_chart=$scope.confirmed1;
            const recovered_chart =$scope.recovered1;
            const active_chart=$scope.active1;
            const deaths_chat =$scope.deaths1;
            console.log(confirmed_chart)
            console.log(recovered_chart)
            console.log(deaths_chat)
            let myChart = document.getElementById('myChart').getContext('2d');
    
    // Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#777';
    
    
    let massPopChart = new Chart(myChart, {
      type:'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
        labels:['confirmed', 'active', 'recovered','deaths'],
        datasets:[{
          label:'confirmed',
          data:[
            confirmed_chart,
            active_chart,
            recovered_chart,
            deaths_chat,
            
          ],
          //backgroundColor:'green',
          backgroundColor:[
            'orange',
            'blue',
            'green',
            'red',
          ],
          borderWidth:1,
          borderColor:'#777',
          hoverBorderWidth:3,
          hoverBorderColor:'#000'
        }]
      },
      options:{
        title:{
          display:true,
          text:chart_text,
          fontSize:25
        },
        legend:{
          display:true,
          position:'right',
          labels:{
            fontColor:'#000'
          }
        },
        layout:{
          padding:{
            left:50,
            right:0,
            bottom:0,
            top:0
          }
        },
        tooltips:{
          enabled:true
        }
      }
    });
    
            
            console.log($scope.finalinfo)
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    }

  }
  $scope.Total = function() { return parseInt(elem.fc) + parseInt(elem.cpc); }; 


});
