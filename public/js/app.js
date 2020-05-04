var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {
  $scope.names = ["Emil", "Tobias", "Linus"];
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
            console.log(response)
            console.log(response.data.statewise);
            $scope.finalinfo=response.data.statewise.slice(1);
           
            $scope.confirmed1= response.data.statewise[0].confirmed;
            $scope.recovered1= response.data.statewise[0].recovered;   
            $scope.deaths1= response.data.statewise[0].deaths;  
            $scope.active1= $scope.confirmed1-$scope.recovered1-$scope.deaths1; 
            
            console.log($scope.finalinfo)
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    }

  }
  $scope.Total = function() { return parseInt(elem.fc) + parseInt(elem.cpc); }; 


});
