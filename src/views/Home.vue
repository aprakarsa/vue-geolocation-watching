<template>
  <div>
    <DisplayLocations :positions="positions" :positionCurrent="positionCurrent" />
  </div>
</template>

<script>
import DisplayLocations from '@/components/DisplayLocations'

export default {

  name: 'Home',
  
  components: {
    DisplayLocations,
  },

  methods: {
    trackPosition() {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(this.successPosition, this.failurePosition, {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        })
        // if (localStorage.getItem('coordinates') && localStorage.getItem('coordinates') === 'REACHED' ) {
        //   navigator.geolocation.clearWatch()
        //   window.localStorage.removeItem('coordinates')
        // }
      } else {
        alert(`Browser doesn't support Geolocation`)
      }
    },
    currentPosition() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.successPositionCurrent, this.failurePosition, {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        })
      } else {
        alert(`Browser doesn't support Geolocation`)
      }
    },
    successPositionCurrent: function(position) {
      this.positionCurrent.push({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
      this.centerPosition = {lat: position.coords.latitude, lng: position.coords.longitude}
    },
    successPosition: function(position) {
      this.positions.push({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
      this.centerPosition = {lat: position.coords.latitude, lng: position.coords.longitude}
    },
    failurePosition: function(err) {
      alert('Error Code: ' + err.code + ' Error Message: ' + err.message)
    },
  },
  
  computed: {},
  data: () => ({
    centerPosition: {
      lat: 10.762622,
      lng: 106.660172,
    },
    zoom: 16,
    positions: [],
    positionCurrent: [],
  }),
  
  mounted() {
    this.trackPosition();
    this.currentPosition();
  },

}
</script>