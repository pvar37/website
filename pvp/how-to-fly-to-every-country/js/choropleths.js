let choropleths_path = "../airports/data/choropleths.csv";
let edges_path = "../airports/data/choropleth_edges.csv";
let airports = ["NAN", "JNB", "PEK", "GUM", "HNL", "MIA", "PTY", "SIN", "DXB", "ADD", "CMN", "LIS", "VIE"];
let colors = ["#69b3e7", "#00c478", "#ece592", "#66b2b2", "#ffb2e1", "#ff4992", "#1fa7db", "#f37079", "#ce3196", "#0581e3", "#fc6a03", "#71d6a4", "#c8102e"];
function choroplethMap(choropleths, edges, hubs, number, id) {
    filteredData = choropleths.filter(row => row.viz === number)
    filteredEdges = edges.filter(row => row.viz <= number)
    filteredHubs = hubs.filter(row => airports.slice(0, number).includes(row.orig_code));
    let mapColors = [[0, "#69b3e7"]];
    airports.slice(0, number).forEach(a => {
        mapColors.push([airports.indexOf(a) / (number - 1), colors[airports.indexOf(a)]]);
    });
    let data = [{
        'colorscale': mapColors,
        'hoverinfo': 'skip',
        'locationmode': 'ISO-3',
        'locations': filteredData.map(row => row.country),
        'showscale': false,
        'z': filteredData.map(row => (row.airport - 1) / (number - 1)),
        'type': 'choropleth'
    }]
    filteredEdges.forEach((row) => {
        var flight = {
            hoverinfo: 'skip',
            lat: [row.orig_lat, row.dest_lat],
            line: {color: 'white', width: 2},
            lon: [row.orig_long, row.dest_long],
            mode: 'lines',
            type: 'scattergeo'
        }
        data.push(flight);
    });
    filteredHubs.forEach((row) => {
        var airport = {
            hoverinfo: 'text',
            lat: [row.orig_lat],
            lon: [row.orig_long],
            marker: {
                color: colors[airports.indexOf(row.orig_code)],
                line: { color: 'black', width: 12/4.5 },
                size: 12
            },
            name: '',
            text: "<b>" + row.orig_cntry + "</b><br>" + row.orig_name + " (" + row.orig_code + ")" + "<br>" + row.orig_air,
            type: 'scattergeo'
        }
        data.push(airport);
    });

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
        
        let markerSize = width > 550 ? 12 : 12*4/7; // Larger on desktop, smaller on mobile
        let lineWidth = width > 550 ? 2 : 0.7;
        let fontSize = width > 550 ? 13 : 8;

        // Update the figure with new marker size
        Plotly.restyle(id, {
            'line.width': lineWidth
        }, range(filteredData.length, filteredData.length + filteredEdges.length - 1));
        Plotly.restyle(id, {
            'marker.size': markerSize,
            'marker.line.width': markerSize / 4.5
        }, range(data.length - filteredHubs.length, data.length - 1));
        layout.hoverlabel.font.size = fontSize;
        Plotly.relayout(id, layout); 
    }

    // Listen to window resize events
    window.addEventListener('resize', updateMarkerSize);

    // Call it initially to set the right size
    updateMarkerSize();
}