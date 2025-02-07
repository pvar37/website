d3.csv(hubs_data_path, row => {
    row.dest_alt = +row.dest_alt;
    row.dest_lat = +row.dest_lat;
    row.dest_long = +row.dest_long;
    row.dist = +row.dist;
    row.orig_alt = +row.orig_alt;
    row.orig_lat = +row.orig_lat;
    row.orig_long = +row.orig_long;
    row.orig_hub = row.orig_hub === "TRUE";
    row.dest_hub = row.dest_hub === "TRUE";
    return row;
}).then(routes => {
    d3.csv(hubs_path, row => {
        row.latitude = +row.latitude;
        row.longitude = +row.longitude;
        row.altitude = +row.altitude;
        return row;
    }).then(hubs => {
        let data = []
        routes.forEach((row) => {
            var flight = {
                hoverinfo: 'skip',
                lat: [row.orig_lat, row.dest_lat],
                line: {color: 'white', width: 0.2},
                lon: [row.orig_long, row.dest_long],
                mode: 'lines',
                type: 'scattergeo'
            }
            data.push(flight);
        });
        console.log(data.length)
        hubs.forEach((row) => {
            var airport = {
                hoverinfo: 'text',
                lat: [row.orig_lat],
                lon: [row.orig_long],
                marker: {
                    color: "green",
                    line: {color: "white", width: 1.5},
                    size: 7
                },
                name: '',
                text: "<b>" + row.orig_cntry + "</b><br>" + row.orig_name + " (" + row.orig_code + ")" + "<br>" + row.orig_air,
                type: 'scattergeo'
            }
            data.push(airport);
        });

        let width = document.getElementById("flight-map").getBoundingClientRect().width;
        var layout = {
        showlegend: false,
        geo: {
            lakecolor: 'white',
            showlakes: false,
            showland: true,
            subunitcolor: 'white',
            resolution: 110,
            showcountries: true,
            fitbounds: false,
            bgcolor: '#1c1d26',
            landcolor: '#333',
            oceancolor: '#1c1d26',
            lakecolor: '#1c1d26',
            countrycolor: '#555',
            projection: {
                type: 'natural earth',
            },
            showframe: true,
            showcoastlines: false,
            showocean: true
            },
        hoverlabel: {
            font: {family: 'Barlow', size: 13}
        },
        margin: {l: 10, r: 10, b: 0, t: 0},
        plot_bgcolor: '#1c1d26',
        paper_bgcolor: '#1c1d26',
        height: width * 0.55
        };
        var config = {responsive: true}

        Plotly.newPlot("flight-map", data, layout, config);

        function range(start, end) {
            return Array(end - start + 1).fill().map((_, idx) => start + idx)
            }
        function updateMarkerSize() {

            // Define marker size based on screen width
            let markerSize = width > 550 ? 7 : 4; // Larger on desktop, smaller on mobile
            let lineWidth = width > 550 ? 0.2 : 0.1;
            let fontSize = width > 550 ? 13 : 8;

            // Update the figure with new marker size
            Plotly.restyle("flight-map", {
                'line.width': lineWidth
            }, range(0, routes.length - 1));
            Plotly.restyle("flight-map", {
                'marker.size': markerSize,
                'marker.line.width': markerSize / 4.5
            }, range(routes.length, routes.length + hubs.length - 1));
            layout.hoverlabel.font.size = fontSize;
            Plotly.relayout('flight-map', layout);
        }

        // Listen to window resize events
        window.addEventListener('resize', updateMarkerSize);

        // Call it initially to set the right size
        updateMarkerSize();
    });
});