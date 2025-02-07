let data_path = "../airports/data/routes.csv";
let hubs_data_path = "../airports/data/routes_hubs.csv";
let hubs_path = "../airports/data/hubs.csv";

function flightMap(routes, airport, country_color, marker_color, marker_line, airport_color, cent, id) {
    filteredData = routes.filter(row => row.orig_code === airport)
    console.log(filteredData);
    let data = [{'colorscale': [[0, country_color], [1, country_color]],
        'hoverinfo': 'skip',
        'locationmode': 'ISO-3',
        'locations': filteredData.map(row => row.dest_iso).concat(filteredData[0].orig_iso),
        'showscale': false,
        'z': Array(filteredData.length + 1).fill(1),
        'type': 'choropleth'}]
    filteredData.forEach((row) => {
        var flight = {
            hoverinfo: 'skip',
            lat: [row.orig_lat, row.dest_lat],
            line: {color: 'white', width: 2},
            lon: [row.orig_long, row.dest_long],
            mode: 'lines',
            opacity: 0.8,
            type: 'scattergeo'
        }
        data.push(flight);
    });
    filteredData.forEach((row) => {
        var airport = {
            hoverinfo: 'text',
            lat: [row.dest_lat],
            lon: [row.dest_long],
            marker: {
                color: marker_color,
                line: {color: marker_line, width: 1.5},
                size: 7
            },
            name: '',
            text: "<b>" + row.dest_cntry + "</b><br>" + row.dest_name + " (" + row.dest_code + ")" + "<br>" + row.dest_air,
            type: 'scattergeo'
        }
        data.push(airport);
    });
    var airport = {
        hoverinfo: 'text',
        lat: [filteredData[0].orig_lat],
        lon: [filteredData[0].orig_long],
        marker: {
            color: airport_color,
            line: {color: 'black', width: 2},
            size: 10
        },
        name: '',
        text: "<b>" + filteredData[0].orig_cntry + "</b><br>" + filteredData[0].orig_name + " (" + filteredData[0].orig_code + ")" + "<br>" + filteredData[0].orig_air,
        type: 'scattergeo'
    }
    data.push(airport);

    let width = document.getElementById(id).getBoundingClientRect().width;
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
        countrywidth: 1,
        center: { lon: cent},
        projection: {
            type: 'natural earth',
            rotation: {lon: cent}
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

    Plotly.newPlot(id, data, layout, config);
    console.log(data);
    function range(start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
        }
    function updateMarkerSize() {

        // Define marker size based on screen width
        let markerSize = width > 550 ? 7 : 4; // Larger on desktop, smaller on mobile
        let lineWidth = width > 550 ? 2 : 1;
        let fontSize = width > 550 ? 13 : 8;
        let countryWidth = width > 550 ? 1 : 0.5;

        // Update the figure with new marker size
        Plotly.restyle(id, {
            'line.width': lineWidth
        }, range(1, filteredData.length));
        Plotly.restyle(id, {
            'marker.size': markerSize,
            'marker.line.width': markerSize / 4.5
        }, range(filteredData.length + 1, 2 * filteredData.length));
        Plotly.restyle(id, {
            'marker.size': markerSize * 10/7,
            'marker.line.width': markerSize * 10/7 / 4.5
        }, [2 * filteredData.length + 1]);
        layout.hoverlabel.font.size = fontSize;
        layout.geo.countrywidth = countryWidth;
        Plotly.relayout(id, layout); // Update the plot layout dynamically
    }

    // Listen to window resize events
    window.addEventListener('resize', updateMarkerSize);

    // Call it initially to set the right size
    updateMarkerSize();
}

function usaMap(routes) {
    usaData = routes.filter(row => row.orig_cntry === "United States").slice(0, -5)
    console.log(usaData)
    miamiData = routes.filter(row => row.orig_air === "Miami")
    newyorkData = routes.filter(row => row.orig_air === "New York")
    honoluluData = routes.filter(row => row.orig_air === "Honolulu").slice(0, -5)
    newarkData = routes.filter(row => row.orig_air === "Newark")
    sanfranData = routes.filter(row => row.orig_air === "San Francisco")
    dataSources = [miamiData, newyorkData, honoluluData, newarkData, sanfranData]
    usaColors = ["#0bf446", "#ff6600", "#26f7fd", "violet", "#e20010"]
    let usaMapData = []
    for (i = 0; i < 5; i++) {
        usaMapData.push({'colorscale': [[0, "#fff01f"], [1, "#34858c"]],
        'hoverinfo': 'skip',
        'locationmode': 'ISO-3',
        'locations': dataSources[i].map(row => row.dest_iso).concat("USA"),
        'showscale': false,
        'z': Array(dataSources[i].length).fill(1).concat(0),
        'type': 'choropleth'})
    }
    for (i = 0; i < 5; i++) {
        dataSources[i].forEach((row) => {
            var flight = {
                hoverinfo: 'skip',
                lat: [row.orig_lat, row.dest_lat],
                line: {color: "white", width: 1},
                lon: [row.orig_long, row.dest_long],
                mode: 'lines',
                opacity: 0.8,
                type: 'scattergeo'
            }
            usaMapData.push(flight);
        });
    }
    for (i = 0; i < 5; i++) {
        dataSources[i].forEach((row) => {
            var airport = {
                hoverinfo: 'text',
                lat: [row.dest_lat],
                lon: [row.dest_long],
                marker: {
                    color: usaColors[i],
                    line: {color: "black", width: 1.5},
                    size: 7
                },
                name: '',
                text: "<b>" + row.dest_cntry + "</b><br>" + row.dest_name + " (" + row.dest_code + ")" + "<br><b>" + row.orig_air + "</b>-" + row.dest_air,
                type: 'scattergeo'
            }
            usaMapData.push(airport);
        });
    }
    for (i = 4; i >= 0; i--) {
        var airport = {
            hoverinfo: 'text',
            lat: [dataSources[i][0].orig_lat],
            lon: [dataSources[i][0].orig_long],
            marker: {
                color: usaColors[i],
                line: {color: 'black', width: 2},
                size: 10
            },
            name: '',
            text: "<b>" + dataSources[i][0].orig_cntry + "</b><br>" + dataSources[i][0].orig_name + " (" + dataSources[i][0].orig_code + ")" + "<br>" + dataSources[i][0].orig_air,
            type: 'scattergeo'
        }
        usaMapData.push(airport);
    }
    console.log(usaMapData)

    let width = document.getElementById('usa-map').getBoundingClientRect().width;
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
        countrycolor: '#555',
        center: { lon: -75},
        projection: {
            type: 'natural earth',
            rotation: {lon: -75}
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

    Plotly.newPlot('usa-map', usaMapData, layout, config);
    function range(start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
        }
    function updateMarkerSize() {

        // Define marker size based on screen width
        let markerSize = width > 550 ? 7 : 4; // Larger on desktop, smaller on mobile
        let lineWidth = width > 550 ? 1 : 0.5;

        // Update the figure with new marker size
        Plotly.restyle('usa-map', {
            'line.width': lineWidth
        }, range(5, usaData.length + 4));
        Plotly.restyle('usa-map', {
            'marker.size': markerSize,
            'marker.line.width': markerSize / 4.5
        }, range(usaData.length + 5, 2 * usaData.length + 4));
        Plotly.restyle('usa-map', {
            'marker.size': markerSize * 10/7,
            'marker.line.width': markerSize * 10/7 / 4.5
        }, [usaMapData.length - 5, usaMapData.length - 1]);
    }

    // Listen to window resize events
    window.addEventListener('resize', updateMarkerSize);

    // Call it initially to set the right size
    updateMarkerSize();
}

function franceMap(routes) {
    franceData = routes.filter(row => row.orig_cntry === "France")
    console.log(usaData)
    parisData = routes.filter(row => row.orig_air === "Paris")
    guadeloupeData = routes.filter(row => row.orig_air === "Pointe-à-Pitre")
    mayotteData = routes.filter(row => row.orig_air === "Mayotte")
    martiniqueData = routes.filter(row => row.orig_air === "Martinique")
    dataSources = [parisData, guadeloupeData, mayotteData, martiniqueData]
    franceColors = ["white", "#32a2e0", "violet", "#00a650"]
    let franceMapData = []
    for (i = 0; i < 4; i++) {
        franceMapData.push({'colorscale': [[0, "#E1000F"], [1, "#34858c"]],
        'hoverinfo': 'skip',
        'locationmode': 'ISO-3',
        'locations': dataSources[i].map(row => row.dest_iso).concat("FRA"),
        'showscale': false,
        'z': Array(dataSources[i].length).fill(1).concat(0),
        'type': 'choropleth'})
    }
    for (i = 0; i < 4; i++) {
        dataSources[i].forEach((row) => {
            var flight = {
                hoverinfo: 'skip',
                lat: [row.orig_lat, row.dest_lat],
                line: {color: "white", width: 1},
                lon: [row.orig_long, row.dest_long],
                mode: 'lines',
                opacity: 0.8,
                type: 'scattergeo'
            }
            franceMapData.push(flight);
        });
    }
    for (i = 0; i < 4; i++) {
        dataSources[i].forEach((row) => {
            var airport = {
                hoverinfo: 'text',
                lat: [row.dest_lat],
                lon: [row.dest_long],
                marker: {
                    color: franceColors[i],
                    line: {color: "black", width: 1.5},
                    size: 7
                },
                name: '',
                text: "<b>" + row.dest_cntry + "</b><br>" + row.dest_name + " (" + row.dest_code + ")" + "<br><b>" + row.orig_air + "</b>-" + row.dest_air,
                type: 'scattergeo'
            }
            franceMapData.push(airport);
        });
    }
    for (i = 3; i >= 0; i--) {
        var airport = {
            hoverinfo: 'text',
            lat: [dataSources[i][0].orig_lat],
            lon: [dataSources[i][0].orig_long],
            marker: {
                color: franceColors[i],
                line: {color: 'black', width: 2},
                size: 10
            },
            name: '',
            text: "<b>" + dataSources[i][0].orig_cntry + "</b><br>" + dataSources[i][0].orig_name + " (" + dataSources[i][0].orig_code + ")" + "<br>" + dataSources[i][0].orig_air,
            type: 'scattergeo'
        }
        franceMapData.push(airport);
    }
    console.log(franceMapData)

    let width = document.getElementById('france-map').getBoundingClientRect().width;
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
        countrycolor: '#555',
        center: { lon: 0},
        projection: {
            type: 'natural earth',
            rotation: {lon: 0}
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

    Plotly.newPlot('france-map', franceMapData, layout, config);
    function range(start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
        }
    function updateMarkerSize() {

        // Define marker size based on screen width
        let markerSize = width > 550 ? 7 : 4; // Larger on desktop, smaller on mobile
        let lineWidth = width > 550 ? 1 : 0.5;

        // Update the figure with new marker size
        Plotly.restyle('france-map', {
            'line.width': lineWidth
        }, range(4, franceData.length + 3));
        Plotly.restyle('france-map', {
            'marker.size': markerSize,
            'marker.line.width': markerSize / 4.5
        }, range(franceData.length + 4, 2 * franceData.length + 3));
        Plotly.restyle('france-map', {
            'marker.size': markerSize * 10/7,
            'marker.line.width': markerSize * 10/7 / 4.5
        }, [franceMapData.length - 4, franceMapData.length - 1]);
    }

    // Listen to window resize events
    window.addEventListener('resize', updateMarkerSize);

    // Call it initially to set the right size
    updateMarkerSize();
}

function russiaMap(routes) {
    russiaData = routes.filter(row => row.orig_cntry === "Russia")
    console.log(russiaData)
    svoData = routes.filter(row => row.orig_air === "Moscow")
    dmeData = routes.filter(row => row.orig_air === "Moscow-Domodedovo")
    vkoData = routes.filter(row => row.orig_air === "Moscow-Vnukovo")
    iktData = routes.filter(row => row.orig_air === "Irkutsk")
    vvoData = routes.filter(row => row.orig_air === "Vladivostok")
    dataSources = [svoData, dmeData, vkoData, iktData, vvoData]
    russiaColors = ["white", "#A8002C", "#ffd700", "orange", "violet"]
    let russiaMapData = []
    for (i = 0; i < 5; i++) {
        russiaMapData.push({'colorscale': [[0, "#d62718"], [1, "#34858c"]],
        'hoverinfo': 'skip',
        'locationmode': 'ISO-3',
        'locations': dataSources[i].map(row => row.dest_iso).concat("RUS"),
        'showscale': false,
        'z': Array(dataSources[i].length).fill(1).concat(0),
        'type': 'choropleth'})
    }
    for (i = 0; i < 5; i++) {
        dataSources[i].forEach((row) => {
            var flight = {
                hoverinfo: 'skip',
                lat: [row.orig_lat, row.dest_lat],
                line: {color: "white", width: 1},
                lon: [row.orig_long, row.dest_long],
                mode: 'lines',
                opacity: 0.8,
                type: 'scattergeo'
            }
            russiaMapData.push(flight);
        });
    }
    for (i = 0; i < 5; i++) {
        dataSources[i].forEach((row) => {
            var airport = {
                hoverinfo: 'text',
                lat: [row.dest_lat],
                lon: [row.dest_long],
                marker: {
                    color: russiaColors[i],
                    line: {color: "black", width: 1.5},
                    size: 7
                },
                name: '',
                text: "<b>" + row.dest_cntry + "</b><br>" + row.dest_name + " (" + row.dest_code + ")" + "<br><b>" + row.orig_air + "</b>-" + row.dest_air,
                type: 'scattergeo'
            }
            russiaMapData.push(airport);
        });
    }
    for (i = 4; i >= 0; i--) {
        var airport = {
            hoverinfo: 'text',
            lat: [dataSources[i][0].orig_lat],
            lon: [dataSources[i][0].orig_long],
            marker: {
                color: russiaColors[i],
                line: {color: 'black', width: 2},
                size: 10
            },
            name: '',
            text: "<b>" + dataSources[i][0].orig_cntry + "</b><br>" + dataSources[i][0].orig_name + " (" + dataSources[i][0].orig_code + ")" + "<br>" + (dataSources[i][0].orig_air === "Moscow" ? "Moscow-Sheremetyevo" : dataSources[i][0].orig_air),
            type: 'scattergeo'
        }
        russiaMapData.push(airport);
    }
    console.log(russiaMapData)

    let width = document.getElementById('russia-map').getBoundingClientRect().width;
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
        countrycolor: '#555',
        center: { lon: 0},
        projection: {
            type: 'natural earth',
            rotation: {lon: 0}
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

    Plotly.newPlot('russia-map', russiaMapData, layout, config);
    function range(start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
        }
    function updateMarkerSize() {

        // Define marker size based on screen width
        let markerSize = width > 550 ? 7 : 4; // Larger on desktop, smaller on mobile
        let lineWidth = width > 550 ? 1 : 0.5;

        // Update the figure with new marker size
        Plotly.restyle('russia-map', {
            'line.width': lineWidth
        }, range(5, russiaData.length + 4));
        Plotly.restyle('russia-map', {
            'marker.size': markerSize,
            'marker.line.width': markerSize / 4.5
        }, range(russiaData.length + 5, 2 * russiaData.length + 4));
        Plotly.restyle('russia-map', {
            'marker.size': markerSize * 10/7,
            'marker.line.width': markerSize * 10/7 / 4.5
        }, [russiaMapData.length - 5, russiaMapData.length - 1]);
    }

    // Listen to window resize events
    window.addEventListener('resize', updateMarkerSize);

    // Call it initially to set the right size
    updateMarkerSize();
}