if (listing.geometry && listing.geometry.coordinates) {
    var map = L.map('map').setView([listing.geometry.coordinates[1], listing.geometry.coordinates[0]], 9);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([listing.geometry.coordinates[1], listing.geometry.coordinates[0]]).addTo(map)
        .bindPopup(`<b>${listing.location}</b><p><b>Extact Location Will Be Provided After Booking</b> </p>`)
        .openPopup();

} else {
    console.error("Coordinates not found in listing object.");

    // Optionally, set a default view or show an error message
    var map = L.map('map').setView([0, 0], 2); // Default view
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([75.7873, 26.9124]).addTo(map)
        .bindPopup('Default Location')
        .openPopup();
}