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
    let data = []
    let territories = ["American Samoa", "Anguilla", "Bermuda",
                 "British Virgin Islands", "Cayman Islands", "Christmas Island",
                 "Cocos (Keeling) Islands", "Cook Islands", "Falkland Islands",
                 "Faroe Islands", "French Polynesia", "Gibraltar",
                 "Greenland", "Guam", "Guernsey", "Isle of Man",
                 "Jersey", "Montserrat", "New Caledonia", "Niue",
                 "Norfolk Island", "Northern Mariana Islands", "Puerto Rico",
                 "Saint Barthélemy",
                 "Saint Helena, Ascension and Tristan da Cunha",
                 "Saint Martin", "Saint Pierre and Miquelon", "Svalbard",
                 "Turks and Caicos Islands", "United States Virgin Islands",
                 "Wallis and Futuna", "Western Sahara"]
    routes.filter(row => !territories.includes(row.orig_cntry) && !territories.includes(row.dest_cntry)).forEach((row) => {
        var flight = {
            hoverinfo: 'skip',
            lat: [row.orig_lat, row.dest_lat],
            line: {color: '#ffd700', width: 0.2},
            lon: [row.orig_long, row.dest_long],
            opacity: 0.5,
            mode: 'lines',
            type: 'scattergeo',
            hovertext: `<b>${row.orig_cntry} - ${row.dest_cntry}</b><br>${row.orig_air} (${row.orig_code}) - ${row.dest_air} (${row.dest_code})`
        }
        data.push(flight);
    });

    let width = document.getElementById("flight-map").getBoundingClientRect().width;
    var layout = {
    showlegend: false,
    geo: {
        lakecolor: 'white',
        showlakes: true,
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
        font: {family: 'Barlow'}
    },
    margin: {l: 10, r: 10, b: 0, t: 0},
    plot_bgcolor: '#1c1d26',
    paper_bgcolor: '#1c1d26',
    height: width * 0.55
    };
    var config = {responsive: true}

    Plotly.newPlot("flight-map", data, layout, config);
});