      var map;

      function initMap() {
          map = new google.maps.Map(document.getElementById('map'), {
              center: { lat: -34.397, lng: 150.644 },
              zoom: 8
          });
          var geocoder = new google.maps.Geocoder();
          var infowindow = new google.maps.InfoWindow;

          document.getElementById('submit').addEventListener('click', function() {
              geocodeAddress(geocoder, map, infowindow);
          });
          google.maps.event.addListener(map, 'click', function(event) {
              placeMarker(event.latLng, geocoder, infowindow);
          });
      }

      function placeMarker(location, geocoder, infowindow) {

          var marker = new google.maps.Marker({
              position: location,
              map: map
          });

          /*var latlng = {lat: parseFloat(location.lat()), lng: parseFloat(location.lng())};*/
          geocoder.geocode({ 'location': location }, function(results, status) {
              if (status === 'OK') {
                  if (results[0]) {
                      map.setZoom(8);
                      var marker = new google.maps.Marker({
                          position: location,
                          map: map
                      });
                      infowindow.setContent(results[0].formatted_address);
                      infowindow.open(map, marker);
                  } else {
                      window.alert('No results found');
                  }
              } else {
                  window.alert('Geocoder failed due to: ' + status);
              }
          });
      }

      function geocodeAddress(geocoder, resultsMap, infowindow) {
          var address = document.getElementById('address').value;
          //marker.setMap(map);
          geocoder.geocode({ 'address': address }, function(results, status) {
              if (status === 'OK') {
                  resultsMap.setCenter(results[0].geometry.location);
                  marker = new google.maps.Marker({
                      position: results[0].geometry.location,
                      map: map
                  });
                  console.log(results[0]);
                  infowindow.setContent(results[0].formatted_address);
                  infowindow.open(resultsMap, marker);
              } else {
                  alert('không tìm thấy:  ' + status);
              }
          });
      }