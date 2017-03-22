<template>
<div class="row">
    <div class="col-xs-12">
        <gmap-map
          :center="center"
          :zoom="6"
          :options="options"
          style="width: 100%; height: 800px">
          <gmap-marker
            v-for="m in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center=m.position">
          </gmap-marker>
        </gmap-map>
    </div>
</div>
</template>

<script>
import * as VueGoogleMaps from "vue2-google-maps"
import Vue from 'vue'

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyB97JNzw5cPB7uCsvVW1_jxDfQ1wRxXc3E'
    }
});

var mapStyle = [{
    "featureType": "administrative",
    "stylers": [{
        "visibility": "off"
    }]
}, {
  "featureType": "administrative.locality",
    "stylers": [{
        "visibility": "on"
    }]
}, {
    "featureType": "poi",
    "stylers": [{
        "visibility": "simplified"
    }]
}, {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [{
        "visibility": "simplified"
    }]
}, {
    "featureType": "water",
    "stylers": [{
        "visibility": "simplified"
    }]
}, {
    "featureType": "transit",
    "stylers": [{
        "visibility": "simplified"
    }]
}, {
    "featureType": "landscape",
    "stylers": [{
        "visibility": "simplified"
    }]
}, {
    "featureType": "road.highway",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "road.local",
    "stylers": [{
        "visibility": "on"
    }]
}, {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{
        "visibility": "on"
    }]
}, {
    "featureType": "water",
    "stylers": [{
        "color": "#0099dd"
    }, {
        "lightness": 60
    }]
}, {
    "stylers": [{
        "saturation": -17
    }, {
        "gamma": 0.36
    }]
}, {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [{
        "color": "#3f518c"
    }]
}];

export default {
    data() {
        return {
            center: {
                lat: 69.0,
                lng: 25.0
            },
            options: {
              styles: mapStyle,
              disableDefaultUI: true,
              draggable: false
            },
            markers: [{
                position: {
                    lat: 10.0,
                    lng: 10.0
                }
            }, {
                position: {
                    lat: 11.0,
                    lng: 11.0
                }
            }]
        }
    }
}
</script>

<style scoped>

</style>
