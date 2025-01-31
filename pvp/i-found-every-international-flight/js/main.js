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
    flightMap(routes, "IST", "#e30a17", "white", "black", "#fff01f", 0, "istanbul-map");
});