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
        styles: [
          {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#263c3f'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#6b9a76'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#38414e'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#212a37'}]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9ca5b3'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#746855'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#1f2835'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#f3d19c'}]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{color: '#2f3948'}]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#17263c'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#515c6d'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#17263c'}]
          }
        
    });
    infoWindow = new google.maps.InfoWindow();
    searchArea()
    
}

function display_area(data) {

    var areahtml = "";
        data.forEach(function(area, index){
        var namearea=area.Name;
        var confirmed=area.Confirmed;
        var active=area.Active;
        var recovered=area.Recovered;
        var decreased=area.Decreased;
        var p=area.page;

    areahtml +=
    `<div class="area-container">
        <div class="area-info-container">
            <div class="area-name">
                <span><a style="color:purple;" href="${p}">${namearea}</a></span>   
            </div>
            <div class="area-details">
                <span style="color :black"><b>Confirmed :</b><b> ${confirmed}</span>
                <span style="color :red"><b>Active :<b> ${active}</span>
                <span style="color :green"><b >Recovered :<b> ${recovered}</span>
                <span style="color :black"><b>Decreased :<b> ${decreased}</span>
                        </div>
        </div>
        <div class="area-number-container">
            <div class="area-number">
                ${index+1}
            </div>
        </div>
    </div>
    `
    });
    document.querySelector('.area-list').innerHTML= areahtml;

}

function showAreaMarkers(data){
    var bounds = new google.maps.LatLngBounds();
    data.forEach(function(area,index){
        var latlng = new google.maps.LatLng(
            area.lat,
            area.long);
            console.log(latlng);
    var nameLoc=area.Name;
    var conf=area.Confirmed;
    var rec=area.Recovered;
    var p=area.page;
    bounds.extend(latlng);
    createMarker(latlng,nameLoc,conf,rec,index,p);
    
        });
        map.fitBounds(bounds);
}


function createMarker(latlng, name, Conf,rec, label1,p) {
    var html = "<b>" + '<h2 style="color:#3498db;font-family:cursive"><a href="'+p+'">'
    +name+'</a></h2>'+"Confirmed Cases : "
    +Conf +"<br>"+'<p style="color:green">'+"Recovered Cases:"+rec+"</p>";
    var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      label: `${label1 +1}`
    });
      google.maps.event.addListener(marker, 'mouseover', function() {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);

    });
    markerlist.push(marker);
  }

  function setOnClickListner(){
    console.log(markerlist);
    var areaElements = document.querySelectorAll('.area-container');
    areaElements.forEach(function(elem, index){
      elem.addEventListener('mouseover', function(){
        google.maps.event.trigger(markerlist[index], 'mouseover');
      })
    }); 

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
    display_area(foundArea);
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