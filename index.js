function initMap(){

  var options = {
    zoom : 4,
    center : {lat : 20.5937,lng : 78.9629}
  }

  var map = new google.maps.Map(document.getElementById('map'),options);

  // Array for extra markers
  var markers = [];

  // Method for adding extra markers
  function addMarkersExtra(location){

      var marker = new google.maps.Marker({
          position : location.coords,
          map:map
      });

      markers.push(marker);

      if(location.content){
          var infoWindow = new google.maps.InfoWindow({
              content : location.content
          });

          marker.addListener('click',()=>{
              infoWindow.open(map,marker);
          });
      }
  }

  // Onclick events
  document.getElementById('hide').addEventListener('click',clearMarkers);
  document.getElementById('delete').addEventListener('click',deleteMarkers);
  document.getElementById('show').addEventListener('click',showMarkers);

  //  Set Map For All Extra Markers
  function setMapOnAll(map){
      for(var i=0;i<markers.length;i++){
          markers[i].setMap(map);
      }
  }

  // Clearing markers without deleting them
  function clearMarkers(){
      setMapOnAll(null);
  }

  // Clearing markers && deleting them
  function deleteMarkers(){
      clearMarkers();
      markers = [];
  }

  // Display the hidden markers
  function showMarkers(){
      setMapOnAll(map);
  }

  // add markers on clicking the map
  google.maps.event.addListener(map,'click',function(event){
      addMarkersExtra({
        coords : event.latLng,
        content : '<h1>' + event.latLng + '</h1>'
      });
  });

  // Golden Quadrilateral
  var cities = [
      {
        coords : {lat:28.6139,lng:77.2090},
        content : '<h1>New Delhi</h1>'
      },
      {
        coords : {lat:22.5726,lng:88.3639},
        content : '<h1>Kolkata</h1>'
      },
      {
        coords : {lat:13.0827,lng:80.2707},
        content : '<h1>Chennai</h1>'
      },
      {
        coords : {lat:19.0760,lng:72.8777},
        content : '<h1>Mumbai</h1>'
      }
  ];

  // Travel the G.Q in clockwise way
  for(var i = 0 ; i < cities.length ; i++){
      addMarker(cities[i]);
  }

  // addMarker method
  function addMarker(city){
      // Marker for a city
      var marker = new google.maps.Marker({
          position : city.coords,
          map : map,
      });

      if(city.content){
          var infoWindow = new google.maps.InfoWindow({
              content : city.content
          });

          marker.addListener('click', ()=> {
              infoWindow.open(map,marker);
          });
      }
    }
}
