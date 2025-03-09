class Playground {
    constructor(routes) {
        this.routes = routes;
        this.onSelectionChange();
    }
    displayViz() {
        this.hubs = [...new Set(this.data.map(row => row.orig_air))]
        let dataSources = []
        for(let i = 0; i < this.hubs.length; i++) {
            let hubData = this.data.filter(row => row.orig_air === this.hubs[i])
            dataSources.push(hubData)
        }
        let colors = ["#ff3632", "orange", "#5ced73", "#add8e6", "pink", "brown", "gray", "violet", "white"]
        this.mapData = []
        for (let i = 0; i < this.hubs.length; i++) {
            this.mapData.push({'colorscale': [[0, "#fff01f"], [1, "#8c75dd"]],
            'hoverinfo': 'skip',
            'locationmode': 'ISO-3',
            'locations': dataSources[i].map(row => row.dest_iso).concat(dataSources[i][0].orig_iso),
            'showscale': false,
            'z': Array(dataSources[i].length).fill(1).concat(0),
            'type': 'choropleth'})
        }
        for (let i = 0; i < this.hubs.length; i++) {
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
                this.mapData.push(flight);
            });
        }
        for (let i = 0; i < this.hubs.length; i++) {
            dataSources[i].forEach((row) => {
                var airport = {
                    hoverinfo: 'text',
                    lat: [row.dest_lat],
                    lon: [row.dest_long],
                    marker: {
                        color: colors[i],
                        line: {color: "black", width: 1.5},
                        size: 7
                    },
                    name: '',
                    text: "<b>" + row.dest_cntry + "</b><br>" + row.dest_name + " (" + row.dest_code + ")" + "<br><b>" + row.orig_air + "</b>-" + row.dest_air,
                    type: 'scattergeo'
                }
                this.mapData.push(airport);
            });
        }
        for (let i = this.hubs.length - 1; i >= 0; i--) {
            var airport = {
                hoverinfo: 'text',
                lat: [dataSources[i][0].orig_lat],
                lon: [dataSources[i][0].orig_long],
                marker: {
                    color: colors[i],
                    line: {color: 'black', width: 2},
                    size: 10
                },
                name: '',
                text: "<b>" + dataSources[i][0].orig_cntry + "</b><br>" + dataSources[i][0].orig_name + " (" + dataSources[i][0].orig_code + ")" + "<br>" + dataSources[i][0].orig_air,
                type: 'scattergeo'
            }
            this.mapData.push(airport);
        }
        console.log(this.mapData)
    
        this.width = document.getElementById('playground-map').getBoundingClientRect().width;
        this.layout = {
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
        height: this.width * 0.55
        };
        var config = {responsive: true}
    
        Plotly.newPlot('playground-map', this.mapData, this.layout, config);

        // Call it initially to set the right size
        this.updateMarkerSize();
    }
    
    updateFilteredData() {
        this.country = d3.select("#country-select").node().value
        this.data = this.routes.filter(row => row.orig_cntry === this.country)
        this.displayViz();
    }

    onSelectionChange() {
        this.updateFilteredData();
    }

    range(start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
        }
    updateMarkerSize() {

        // Define marker size based on screen width
        let markerSize = this.width > 550 ? 7 : 4; // Larger on desktop, smaller on mobile
        let lineWidth = this.width > 550 ? 1 : 0.5;
        let fontSize = this.width > 550 ? 13 : 8;

        // Update the figure with new marker size
        Plotly.restyle('playground-map', {
            'line.width': lineWidth
        }, this.range(this.hubs.length, this.data.length + this.hubs.length - 1));
        Plotly.restyle('playground-map', {
            'marker.size': markerSize,
            'marker.line.width': markerSize / 4.5
        }, this.range(this.data.length + this.hubs.length, 2 * this.data.length + this.hubs.length - 1));
        Plotly.restyle('playground-map', {
            'marker.size': markerSize * 10/7,
            'marker.line.width': markerSize * 10/7 / 4.5
        }, this.range(this.mapData.length - this.hubs.length, this.mapData.length - 1));
        this.layout.hoverlabel.font.size = fontSize;
        Plotly.relayout('playground-map', this.layout); 
    }
}