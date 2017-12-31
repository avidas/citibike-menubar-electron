const $ = require('jquery');

module.exports = (station_name, num_bikes_available, num_docks_available, distance) => {
    return $(`
    <div class="station-list-item">
      <div class="station-text" disable="true">${station_name}</div>
      <div class="station-text" disable="true">Number of bikes available: ${num_bikes_available}</div>
      <div class="station-text" disable="true">Number of docks available: ${num_docks_available}</div>
      <div class="station-text" disable="true">Distance apart: ${distance}</div>
    </div>
  `);
};