var map;
var markerlist=[];
var infoWindow;
    function initMap() {
    var india = {
        lat: 20.5937,
        lng: 78.9629
    }
    map = new google.maps.Map(document.getElementById('map'), {
        center: india,
        zoom: 8,
        

    });
    infoWindow = new google.maps.InfoWindow();
    searchArea()
    
}



function showAreaMarkers(data){
    var bounds = new google.maps.LatLngBounds();
    data.forEach(function(area,index){
        var latlng = new google.maps.LatLng(
            area.lat,
            area.long);
            console.log(latlng);
    var nameLoc=area.Name;
    
    var p=area.page;
    bounds.extend(latlng);
    createMarker(latlng,nameLoc,p);
    
        });
        map.fitBounds(bounds);
}


function createMarker(latlng, name,p) {
    var html = "<b>" + '<h2 style="color:#3498db;font-family:cursive"><a href="'+p+'">'
    +name+'</a></h2>';
    var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      
    });
      google.maps.event.addListener(marker, 'mouseover', function() {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);

    });
    markerlist.push(marker);
  }

  

  function searchArea(){
    var foundArea=[];
    var stateN = document.getElementById('stateNameid').value;
    if(stateN){

    data.forEach(function(area){
      var x=area.Name;
      var y=area.Name.toLowerCase();
      if((x==stateN)||(x.substring(0,1)==stateN)||(x.substring(0,2)==stateN)||(x.substring(0,3)==stateN)||(x.substring(0,4)==stateN)||
      (y==stateN)||(y.substring(0,1)==stateN)||(y.substring(0,2)==stateN)||(y.substring(0,3)==stateN)||(y.substring(0,4)==stateN)){
          foundArea.push(area);
        }
    
    });
  }
  else{
        foundArea=data;
  }
    clearLocations();
    
    showAreaMarkers(foundArea);
    setOnClickListner();
  }


  function clearLocations(){
        infoWindow.close();
        for (var i=0; i< markerlist.length;i++){
          markerlist[i].setMap(null);
        }    
        markerlist.length=0;

  }