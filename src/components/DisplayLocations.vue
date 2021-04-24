<template>
    <div>
        <h3>WatchPosition</h3>
        <ul>
            <li v-for="position in positions" :key="position">{{ position }}</li>
        </ul>
    </div>

    <div>Total WatchLocations Array: {{ getArraySizeWatchLocations }}</div>
    
    <div>
        <h3>CurrentPosition</h3>
        <p>{{ positionCurrent }}</p>
    </div>
    
    <div>Distance: {{ calculateDistance }} M</div>
    
    <div>{{ isReachedDestination }}</div>
</template>

<script>
export default {
    name: 'DisplayPositions',
    props: ['positions', 'positionCurrent'],
    computed: {
        getArraySizeWatchLocations() {
            return this.positions.length
        },
        isReachedDestination(){
            if ( this.calculateDistance >= 100 ) {
                // window.localStorage.setItem('coordinates', 'REACHED')
                return alert("Reached Destination")
            }
        },
        calculateDistance() {
            if (this.getArraySizeWatchLocations > 1) {
                const lat1 = this.positionCurrent[0].lat;
                const lon1 = this.positionCurrent[0].lng; 
                const lat2 = this.positions[(this.getArraySizeWatchLocations) - 1 ].lat; 
                const lon2 = this.positions[(this.getArraySizeWatchLocations) - 1 ].lng;

                Number.prototype.toRad = function() {
                return this * Math.PI / 180;
                }

                var R = 6371; // km
                var dLat = (lat2 - lat1).toRad();
                var dLon = (lon2 - lon1).toRad(); 
                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
                        Math.sin(dLon / 2) * Math.sin(dLon / 2); 
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
                var d = R * c;
                return (d * 1000).toFixed(0);
            }

            return 0;
        },
    },
}
</script>

<style>
    div {
        margin-top: 10px;
        padding: 5px;
    }
</style>