<script setup lang='ts'>
  import { useLocationStore } from "@/stores/location";
  import type { Coordinates, FeaturesByTypes, LocationPin, LocationType } from "@/customTypings/Location";
  import { onUnmounted, watch } from "vue";
  import { getLondonSpots, postSpot } from "@/ApiService";
  import locationIcon from './icons/locationIcon.svg'
  import locationIconBack from './icons/locationIconBack.svg'
  import { storeToRefs } from "pinia";
  import router from "@/router";

  // Get location store
  const location = useLocationStore();
  const { currentlocation, tracking } = storeToRefs(location);

  // Define global vars
  let map: google.maps.Map;
  let currentMarker: google.maps.Marker;
  let currentMarkerBackground: google.maps.Marker;
  let watchID: number;
  let markers: google.maps.marker.AdvancedMarkerElement[] = [];


  // Init Map
  initMap(currentlocation.value)

  // Track location if tracking state true
  watch(tracking, toggleTracking)



  // Functions
  // Setup map
  async function initMap(center: Coordinates): Promise<void> {
    const { Map, InfoWindow } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;


    let infowindow = new google.maps.InfoWindow;
    let collisionBehavior = google.maps.CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY;

    map = new Map(document.getElementById("map") as HTMLElement, {
      center,
      zoom: 13,
      mapId: '777af55e9dcc2cb5',
      zoomControl: false,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
      },
      scaleControl: true,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false
    })
    map.setClickableIcons(false);

    /*
    // Collision Behaviour
    // @ts-ignore
    const select = new mdc.select.MDCSelect(
      document.querySelector(".mdc-select") as HTMLElement
    );

    select.listen("MDCSelect:change", () => {
      collisionBehavior = select.value;
      markers.forEach((marker) => {
        marker.collisionBehavior = collisionBehavior;
      });
    });

    select.value = collisionBehavior;
    */

    // Close infowindow when map is clicked or add new spot
    let newSpotCoords: number[];

    google.maps.event.addListener(map, "click", (mapsMouseEvent: any) => {
      if (isInfoWindowOpen(infowindow)) {
        infowindow.close();
        infowindow.setPosition(undefined);
        // console.log('Is this working???');
      }
      else {
        // console.log(event.MouseEvent);
        newSpotCoords = mapsMouseEvent.latLng;
        const newMarker = new google.maps.marker.AdvancedMarkerElement({
          position: mapsMouseEvent.latLng,
          map,
          content: new google.maps.marker.PinElement({
            background: '#000000',
            scale: 0.7
          }).element
        });
        // newMarker.setAnimation(google.maps.Animation.DROP)
        infowindow.setContent(
          '<div id="new-spot-form">' +
            '<form method="POST" id="spot-form" action="" name="form_canvas" style=""  >' +
              '<label for="spot-name" style="align-self: center;"><b>New Spot!</b></label>' +
              '<input id="spot-name" name="spot-name" type="text" value="" placeholder="name..." autocomplete="off" >' +
              '<select name="spot-type" id="spot-type">' +
                '<option value="">--Please select spot type--</option>' +
                '<option value="Outdoor Spots">Outdoor Spot</option>' +
                '<option value="Parkour Gyms">Parkour Gym</option>' +
                '<option value="Parkour Parks">Parkour Parks</option>' +
                '<option value="Under Cover Spots">Under Cover Spot</option>' +
              '</select>' +
              '<button id="submit-button" type="submit" style="border: none; background-color: #000000; color: #ffffff">Add</button>' +
            '</form>' +
          '</div>'
        )

        infowindow.open({
          anchor: newMarker,
          map
        })
        setTimeout(() => {
          document.querySelector('#submit-button')!.addEventListener('click', (e) => onSubmit(newSpotCoords, e));

        }, 100)
        infowindow.focus
      }
    });

    // Set current location marker
    currentMarker = new google.maps.Marker({
      position: center,
      map,
      icon: {
        url: locationIcon,
        anchor: new google.maps.Point(25,25)
      }
    });
    currentMarker.setVisible(false);

    currentMarkerBackground = new google.maps.Marker({
      position: center,
      map,
      icon: {
        url: locationIconBack,
        anchor: new google.maps.Point(25,25)
      }
    });
    currentMarkerBackground.setVisible(false);

    // Get data and add to map
    const londonSpots: LocationPin[] = await getLondonSpots()
    for (let spot of londonSpots) {

      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: {
          lat: spot.geometry.coordinates[1],
          lng: spot.geometry.coordinates[0]
        },
        map,
        collisionBehavior: collisionBehavior,
        content: new google.maps.marker.PinElement({
          background: '#000000',
          scale: 0.7
        }).element
        // title: spot.properties.Name
      })

      marker.addListener('click', () => {
        // router.push(`/details/${spot._id}`)
        infowindow.setContent(
          '<div id="content">' +
            `<h3 id="firstHeading" class="heading">${spot.properties.Name}</h3>` +
            '<div id="bodyContent">' +
              `<a href='/details/${spot._id}'>Details</a> ` +
              "</div>" +
              "</div>"
              )
              //`<router-link to="/details/${spot._id}">DEEETZ</router-link>`
        infowindow.open({
          anchor: marker,
          map
        })
        infowindow.focus
      })
      markers.push(marker);
    }
    // Marker animation
    pulseMarker()
  }


  function onSubmit(newSpotCoords: number[], e: any) {
    e.preventDefault();

    const spotName = (<HTMLInputElement>document.getElementById('spot-name')).value;
    const spotType = (<HTMLInputElement>document.getElementById('spot-type')).value;

    (<HTMLInputElement>document.getElementById('spot-name')).value = '';
    (<HTMLInputElement>document.getElementById('spot-name')).value = '';
    console.log(spotName, spotType);
    postSpot({ spotName, spotType, coordinates: newSpotCoords})
  }


  function isInfoWindowOpen(infoWindow: google.maps.InfoWindow){
    var map = infoWindow.getPosition();
    // console.log(map);
    return (map !== null && typeof map !== "undefined");
}

  function toggleTracking() {
    if (tracking.value && map) {
      // Get and watch user location to set markers
      watchID = navigator.geolocation.watchPosition(pos => success(pos, map), error => console.log(error), {
        maximumAge: 30000,
        timeout: 15000,
        enableHighAccuracy: true // BUG tracks location after toggle if false
      })
      // Show markers
      currentMarker.setVisible(true)
      currentMarkerBackground.setVisible(true)
      map.setZoom(16)

    } else if (!tracking.value && map) {
      // Clear watch and hide markers
      navigator.geolocation.clearWatch(watchID)
      currentMarker.setVisible(false)
      currentMarkerBackground.setVisible(false)
    }
  }

  // Marker animation
  function pulseMarker() {
    let scale = 1.1;
    let direction = 1;
    let minScale = 0.7;
    let maxScale = 1.1;

    setInterval(function () {
        if (scale > maxScale || scale < minScale) direction *= -1;
        scale += direction * 0.01;

        let anchor = new google.maps.Point(25 * scale, 25 * scale);

        currentMarker.setIcon({
            url: locationIcon,
            scaledSize: new google.maps.Size(50 * scale, 50 * scale),
            anchor: anchor
        });
      }, 20);
    }


  function success(pos: GeolocationPosition, map: google.maps.Map) {
    // Make latlng obj
    const newLocation = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
    }
    console.log(pos);
    if (map) {
      // Set markers at current postion when watch comes through
      currentMarker.setPosition(newLocation)
      currentMarkerBackground.setPosition(newLocation)
      currentMarkerBackground.setZIndex(10)

      // If marker moves out of map view pan map to location
      if (!map.getBounds()?.contains(newLocation)) {
        map.panTo(newLocation);
      }
    }
    // Update location state
    currentlocation.value = newLocation;
  }

  // Stop tracking on unmount
  onUnmounted(() => {
    navigator.geolocation.clearWatch(watchID)
  })
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
  #map {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .vue-map-container {
    height: 100%;
  }

</style>