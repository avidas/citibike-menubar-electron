const electron = require('electron')
const ipc = electron.ipcRenderer
const $ = require('jquery')

const gbfs = require('gbfs-client')
const gbfsClient = new gbfs('https://gbfs.citibikenyc.com/gbfs/en/')

const $stationsList = $('.station-list')
const createStationElement = require('./support/create-station-element')

const $citbikeButton = $('#load-citibike-data')

ipc.on('show-stations', (event) => {
  addStationtoList()
})

addStationtoList = () => {
  // get gbfs format citibike information
  gbfsClient.stationInfo()
    .then(stations => {
      return getNearestNStations(stations, 5)
    })
    .then((nearestStations) => {
      showNearestNStations(nearestStations)
    })
}

notifyAvailabilty = () => {
  new Notification('Citibike Status', {
    body: "Lots of bikes currently available"
  })
}

showNearestNStations = (nearestStations) => {
  nearestStationsWithAvailability = []
  nearestStations.forEach((station) => {

    gbfsClient.stationStatus(station.station_id)
      .then( (status) => {
        station.num_bikes_available = status.num_bikes_available
        station.num_docks_available = status.num_docks_available

        nearestStationsWithAvailability.push(station)
        const $station = createStationElement(station.name, status.num_bikes_available, status.num_docks_available, station.distance)
        $stationsList.append($station)
      })
  })
  return nearestStationsWithAvailability
}

getNearestNStations = (stations, n) => {
  const stationCount = stations.length

  const position = {
    lat: 40.7055,
    lon: -74.0088
  }

  var closest_loc
  var closest_dist = 23423432

  var stationWithDist = []

  stations.forEach((station) => {
    station_distance = distance(station, position)

    stationWithDist.push({
      name: station.name,
      distance: station_distance,
      lat: station.lat,
      lon: station.lon,
      station_id: station.station_id
    })
  })

  stationCompare = (a, b) => {
    return a.distance - b.distance
  }

  stationsWithDistSort = stationWithDist.sort(stationCompare)
  const nearestN = stationsWithDistSort.slice(0, n)

  return nearestN
}

function distance(position1,position2){
    var lat1=position1.lat;
    var lat2=position2.lat;
    var lon1=position1.lon;
    var lon2=position2.lon;
    var R = 6371000; // metres
    var φ1 = toRadians(lat1);
    var φ2 = toRadians(lat2);
    var Δφ = toRadians((lat2-lat1));
    var Δλ = toRadians((lon2-lon1));

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;
    return d;
}

function toRadians(x) {
   return x * Math.PI / 180;
}

$citbikeButton.on('click', addStationtoList)

navigator.geolocation.getCurrentPosition(location => {
  console.log('getCurrentPosition')
  console.log(process.env.GOOGLE_API_KEY)
  console.log(location)
})

addStationtoList()