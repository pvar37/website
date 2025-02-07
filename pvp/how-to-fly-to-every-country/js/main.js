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
    d3.csv(choropleths_path, row => {
        row.viz = +row.viz;
        row.airport = +row.airport;
        return row;
    }).then(choropleths => {
        d3.csv(edges_path, row => {
            row.orig_lat = +row.orig_lat;
            row.orig_long = +row.orig_long;
            row.dest_lat = +row.dest_lat;
            row.dest_long = +row.dest_long;
            return row;
        }).then(edges => {
            d3.csv(hubs_path, row => {
                row.orig_lat = +row.orig_lat;
                row.orig_long = +row.orig_long;
                row.orig_alt = +row.orig_alt;
                return row;
            }).then(hubs => {   
                flightMap(routes, "FUN", "#8c75dd", "white", "black", "#fff01f", 180, "funafuti-map");
                flightMap(routes, "NAN", "#69b3e7", "white", "black", "#fff01f", 180, "nadi-map");
                flightMap(routes, "JNB", "#00c478", "white", "black", "#fff01f", 0, "johannesburg-map");
                choroplethMap(choropleths, edges, hubs, 2, "choro2");
                flightMap(routes, "PEK", "#ece592", "white", "black", "#fff01f", 130, "beijing-map");
                choroplethMap(choropleths, edges, hubs, 3, "choro3");
                flightMap(routes, "GUM", "#66b2b2", "white", "black", "#fff01f", 150, "guam-map");
                flightMap(routes, "HNL", "#ffb2e1", "white", "black", "#fff01f", -150, "honolulu-map");
                choroplethMap(choropleths, edges, hubs, 5, "choro5");
                flightMap(routes, "MIA", "#ff4992", "white", "black", "#fff01f", -90, "miami-map");
                choroplethMap(choropleths, edges, hubs, 6, "choro6");
                flightMap(routes, "PTY", "#1fa7db", "white", "black", "#fff01f", -90, "panama-map");
                choroplethMap(choropleths, edges, hubs, 7, "choro7");
                flightMap(routes, "SIN", "#f37079", "white", "black", "#fff01f", 90, "singapore-map");
                choroplethMap(choropleths, edges, hubs, 8, "choro8");
                flightMap(routes, "DXB", "#ce3196", "white", "black", "#fff01f", 0, "dubai-map");
                choroplethMap(choropleths, edges, hubs, 9, "choro9");
                flightMap(routes, "ADD", "#0581e3", "white", "black", "#fff01f", 0, "addis-map");
                choroplethMap(choropleths, edges, hubs, 10, "choro10");
                flightMap(routes, "CMN", "#fc6a03", "white", "black", "#fff01f", 0, "casablanca-map");
                flightMap(routes, "LIS", "#71d6a4", "white", "black", "#fff01f", 0, "lisbon-map");
                choroplethMap(choropleths, edges, hubs, 12, "choro12");
                flightMap(routes, "VIE", "#c8102e", "white", "black", "#fff01f", 0, "vienna-map");
                choroplethMap(choropleths, edges, hubs, 13, "choro13");
            });
        });
    });
});