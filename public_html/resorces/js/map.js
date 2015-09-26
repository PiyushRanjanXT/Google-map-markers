/* 
 * File TO work with map feature
 */
var APIkey = 'AIzaSyBN_MYt4aT7yrZPqeNnMIDq6twN81-y-Fs';
var config = {
    'currentcity':{lat: 28.6100, lng: 77.2300}, // "28.6100° N, 77.2300° E",
    'locations':{},
    'ads':{},
    'redius':0,
    'gethtml': function(ads){
        return '<div class="ad-area"><h2>'+ads.title+'</h2><div>'+ads.discription+'<br><br>'+ads.address+'<br>Phone:'+ads.phone+'</div>';
    },
    'category':'all',
    markerArray:new Array()
    
}


function initMap() {
  var myLatLng = config.currentcity;

  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    scrollwheel: false,
    zoom: 10,
    navigationControl: true
  });
  
 
  var ads = config.ads,marker;
  var infoWindow = new google.maps.InfoWindow()
 // Loop through our array of markers & place each one on the map  
 var bounds = new google.maps.LatLngBounds();
 
   $.each(ads,function(index,markers) {
       
        if(config.category=='all'){
            var position = new google.maps.LatLng(markers.lat, markers.lang);
            bounds.extend(position);
            marker = new google.maps.Marker({
                position: position,
                map: map,
                animation: google.maps.Animation.DROP,
                title: markers.address
            });

            // Allow each marker to have an info window    
            google.maps.event.addListener(marker, 'click', (function(marker, index) {
                return function() {
                    infoWindow.setContent(config.gethtml(config.ads[index]));
                    infoWindow.open(map, marker);
                }
            })(marker, index));
            config.markerArray.push(marker)
            // Automatically center the map fitting all markers on the screen
            map.fitBounds(bounds);
        }else if(config.category=='bike' && markers.category =='bike'){
             var position = new google.maps.LatLng(markers.lat, markers.lang);
            bounds.extend(position);
            marker = new google.maps.Marker({
                position: position,
                map: map,
                animation: google.maps.Animation.DROP,
                title: markers.address
            });

            // Allow each marker to have an info window    
            google.maps.event.addListener(marker, 'click', (function(marker, index) {
                return function() {
                    infoWindow.setContent(config.gethtml(config.ads[index]));
                    infoWindow.open(map, marker);
                }
            })(marker, index));
            config.markerArray.push(marker)
            // Automatically center the map fitting all markers on the screen
            map.fitBounds(bounds);
        }else if(config.category=='car' && markers.category =='car'){
             var position = new google.maps.LatLng(markers.lat, markers.lang);
            bounds.extend(position);
            marker = new google.maps.Marker({
                position: position,
                map: map,
                animation: google.maps.Animation.DROP,
                title: markers.address
            });

            // Allow each marker to have an info window    
            google.maps.event.addListener(marker, 'click', (function(marker, index) {
                return function() {
                    infoWindow.setContent(config.gethtml(config.ads[index]));
                    infoWindow.open(map, marker);
                }
            })(marker, index));
            config.markerArray.push(marker)
            // Automatically center the map fitting all markers on the screen
            map.fitBounds(bounds);
        }
    });
    
    

//  // Create a marker and set its position.
//  var marker = new google.maps.Marker({
//    map: map,
//    position: myLatLng,
//    title: 'Hello World!'
//  });



//function createRadius(dist) {
//     var markerArray = config.markerArray;
//    var myCircle = new google.maps.Circle({
//        center: config.markerArray[config.markerArray.length - 1].getPosition(),
//        map: map,
//        radius: dist,
//        strokeColor: "#FF0000",
//        strokeOpacity: 0.8,
//        strokeWeight: 2,
//        fillColor: "#FF0000",
//        fillOpacity: 0.35
//    });
//    var myBounds = myCircle.getBounds();
//
//    //filters markers
//    for(var i=markerArray.length;i--;){
//         if(!myBounds.contains(markerArray[i].getPosition()))
//             markerArray[i].setMap(null);
//    }
//    map.setCenter(markerArray[markerArray.length - 1].getPosition());
//    map.setZoom(map.getZoom()+1);
//}
//
//if(config.redius){
//    createRadius(config.redius)
//    
//}
};
var oxlMapFiltter = function(){
    $(document).ready(function(){
        $.get('/olx/resorces/data/locations.json',function(json){
            config.locations =json.locations;
            config.ads =json.locations[0].ads;
            $.each(json.locations,function(index,value){
                $('#city').append('<option value="'+index+'">'+value.city+'</option>'); 
                
            });
             $(document).on('change','#city',function(){
                var city = $(this).val();
                config.currentcity.lat = config.locations[city].lat;
                config.currentcity.lng = config.locations[city].lang;
                config.ads = config.locations[city].ads;
                initMap();
            });
            
//             $(document).on('change','#redius',function(){
//                config.redius = $(this).val();
//                initMap();
//            });
             $(document).on('change','#category',function(){
                config.category = $(this).val();
                initMap();
            });
            
            
            
        })
       
    });
}();


