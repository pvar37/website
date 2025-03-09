let data_path = "./data/atlas.csv";
d3.csv(data_path, row => {
    row.lat = +row.lat;
    row.long = +row.long;
    return row;
}).then(globe_data => {
    data = []
    globe_data.forEach((row) => {
        var loc = {
            hoverinfo: 'text',
            lat: [row.lat],
            lon: [row.long],
            marker: {
                color: row.color,
                line: {color: "black", width: 1.5},
                size: 7
            },
            name: '',
            text: "<b>" + row.place + "</b><br>" + row.article,
            type: 'scattergeo'
        }
        data.push(loc);
    });
    let width = document.getElementById('atlas').getBoundingClientRect().width;
    var layout = {
        showlegend: false,
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
        height: width > 550 ? width * 0.6 : width
    };
    var config = {responsive: true}
    Plotly.newPlot('atlas', data, layout, config);
});