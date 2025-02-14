let dest_path = "../airports/data/country_dest_count.csv";
d3.csv(data_path, row => {
    row.dest_alt = +row.dest_alt;
    row.dest_lat = +row.dest_lat;
    row.dest_long = +row.dest_long;
    row.dist = +row.dist;
    row.orig_alt = +row.orig_alt;
    row.orig_lat = +row.orig_lat;
    row.orig_long = +row.orig_long;
    row.orig_hub = row.orig_hub === "TRUE";
    return row;
}).then(routes => {
    flightMap(routes, "IKA", "#da0000", "white", "black", "#fff01f", 0, "tehran-map");
    flightMap(routes, "IST", "#e30a17", "white", "black", "#fff01f", 0, "istanbul-map");
    d3.csv(dest_path, row => {
        row.dest_cntry = +row.dest_cntry;;
        return row;
    }).then(globe_data => {
        let color_data = [{
            'colorscale': 'haline',
            'autocolorscale': false,
            'reversescale': false,
            'locationmode': 'country names',
            'locations': globe_data.map(row => row.orig_cntry),
            'showscale': true,
            'z': globe_data.map(row => row.dest_cntry),
            'type': 'choropleth',
            'colorbar': {'title': 'Connections'},
            'marker': {'line': {'color': '#888'}}
        }]
        console.log(color_data);
        let width = document.getElementById('globe').getBoundingClientRect().width;
        var layout = {
            geo: {
                resolution: 110,
                showcountries: true,
                fitbounds: false,
                bgcolor: '#1c1d26',
                oceancolor: '#192841',
                projection: {
                    type: 'orthographic',
                },
                showframe: false,
                showcoastlines: false,
                showocean: true,
                },
            hoverlabel: {
                font: {family: 'Barlow'}
            },
            font: {
                family: 'Barlow',
                color: 'white',
                size: width > 550 ? 14 : 8
            },
            margin: width > 550 ? {l: 10, r: 10, b: 20, t: 20} : {l: 10, r: 10, b: 10, t: 10},
            plot_bgcolor: '#1c1d26',
            paper_bgcolor: '#1c1d26',
            height: width * 0.55
        };
        var config = {responsive: true}
        Plotly.newPlot('globe', color_data, layout, config);
    });
    usaMap(routes);
    flightMap(routes, "CCS", "#00247d", "white", "black", "#fff01f", 0, "caracas-map");
    flightMap(routes, "DOH", "#8A1538", "white", "black", "#fff01f", 0, "doha-map");
    franceMap(routes);
    russiaMap(routes);
    flightMap(routes, "SEZ", "#fed141", "white", "black", "#fff01f", 0, "seychelles-map");
    flightMap(routes, "ASB", "#00853a", "white", "black", "#fff01f", 0, "ashgabat-map");
});