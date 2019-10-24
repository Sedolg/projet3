function initMap () {
    var markers = [];
    var apiLyon = "https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=2207c41e7b853dc34f77d062b9892d6dcf4f9dc0";
    var map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: 45.750000, lng: 4.850000},
        zoom: 13
    });

    ajaxGet(apiLyon, function (emplacement) {
        var station = JSON.parse(emplacement);
        station.forEach(function (emplacement){
            
            var lattitude = emplacement.position.lat;
            var longitude = emplacement.position.lng;

            var number = emplacement.number;
            var name = emplacement.name;
            var address = emplacement.address;
            var status = emplacement.status;
            var place = emplacement.bike_stands;
            var available = emplacement.available_bikes;

            marker = new google.maps.Marker({
                map: map,
                position: {lat: lattitude, lng: longitude},
            });


            marker.addListener('click', function () {
                ajaxGet('https://api.jcdecaux.com/vls/v1/stations/' + number + '?contract=Lyon&apiKey=2207c41e7b853dc34f77d062b9892d6dcf4f9dc0', function (infoStation) {
                    var stationSelect = JSON.parse(infoStation);

                    var info = Object.create(Station);
                    info.initStation(stationSelect.name, stationSelect.address, stationSelect.status, stationSelect.bike_stands, stationSelect.available_bikes);
                    info.decrire();
                    var validElt = document.getElementById('valid');
                    var boutonElt = document.getElementById('send');
                    var signature = document.getElementById('theCanvas');
                    var textSignature = document.getElementById('texteSignature');
                    var formNomPrenom = document.getElementById('form_nom_prenom');
                    boutonElt.addEventListener("click", function() {
                    formNomPrenom.style.display = "block";
                    textSignature.style.display = "block";
                    canvas.style.display = "block";
                    eraseElt.style.display = "block";
                    boutonElt.style.display = "none";
                    
                    });

                        
                    validElt.addEventListener("click", function(){

                        erase();
                        formNomPrenom.style.display = "none";
                        textSignature.style.display = "none";
                        canvas.style.display = "none";
                        eraseElt.style.display = "none";
                        validElt.style.display = "none";
                        boutonElt.style.display = "block";
                        var reserv = Object.create(Station);
                        reserv.initStation(name, address, status, place, available);

                        sessionStorage.setItem('nom', name);
                        sessionStorage.setItem('adresse', address);

                        document.getElementById('message').innerHTML = ("Vous avez réservé 1 vélo'v à  la station : " + sessionStorage.getItem('nom') + '<br>' +
                        "Rendez-vous à cette adresse pour le récupérer : " + sessionStorage.getItem('adresse'));

                     });
                    
                });

            }); 

           markers.push(marker);
        });

        var markerCluster = new MarkerClusterer(map, markers,
      {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

    });
}