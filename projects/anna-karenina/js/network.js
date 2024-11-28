class Network {

    constructor(_parentContainer, _characters, _data) {
        this.parentContainer = _parentContainer;
        this.characters = _characters;
        this.data = _data.filter(d => d.word_count > 500);
        this.filteredData = this.data;

        console.log(this.characters);

        this.initVis();
    }

    initVis() {
        let vis = this;

        vis.margin = { top: 20, right: 20, bottom: 20, left: 20 };

        vis.width = document.getElementById(vis.parentContainer).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentContainer).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;
        vis.dim = Math.min(vis.width, vis.height)
        vis.rad = 0.8 * vis.dim

        vis.color = d3.scaleSequential()

        vis.thickness = d3.scaleLinear()
            .domain([17, 9655])
            .range([1, 10])

        // SVG drawing area
        vis.svg = d3.select("#" + vis.parentContainer).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + 0 + "," + vis.margin.top + ")");

        let chars = vis.svg.selectAll(".character")
            .data(vis.characters);

        chars.enter().append("circle")
            .attr("class", "character")
            .attr("cx", d => vis.width / 2 + d[1] * vis.rad / 2)
            .attr("cy", d => vis.height / 2 - d[2] * vis.rad / 2)
            .attr("r", vis.dim / 10)
            .style("fill", "lightgray")
            .style("stroke", "white")
            .style("stroke-width", 5)
            .style("z-index", 1)
        
        let names = vis.svg.selectAll(".name")
            .data(vis.characters);

        names.enter().append("text")
            .attr("class", "name")
            .attr("x", d => vis.width / 2 + d[1] * vis.rad / 2)
            .attr("y", d => vis.height / 2 - d[2] * vis.rad / 2)
            .style("text-anchor", "middle")
            .attr("dominant-baseline", "central")
            .style("fill", "black")
            .text(d => d[0])

        vis.wrangleData();
    }

    wrangleData() {
        let vis = this;

        let part = d3.select("#partChoice").node().value;
        this.filteredData = this.data.filter(d => d.Part === part)

        vis.updateVis();
    }

    updateVis() {
        let vis = this;

        let variable = d3.select("#variableChoice").node().value;
        if(variable === "default") {
            vis.color.domain([-0.008, 0.032])
                .interpolator(d3.interpolateRdYlGn)
        }
        else {
            vis.color.domain([
                d3.min(vis.data, function(d) { return d[variable]; }),
                d3.max(vis.data, function(d) { return d[variable]; })
            ])
            if(["anger", "disgust", "fear", "sadness"].includes(variable)) {
                vis.color.range(["white", "red"])
            }
            else {
                vis.color.range(["white", "green"])
            }
        }

        let interactions = vis.svg.selectAll(".interaction")
            .data(this.filteredData);

        interactions.enter().append("line")
            .attr("class", "interaction")
            .merge(interactions)
            .transition()
            .attr("x1", d => vis.width / 2 + d.char1x * vis.rad / 2)
            .attr("y1", d => vis.height / 2 - d.char1y * vis.rad / 2)
            .attr("x2", d => vis.width / 2 + d.char2x * vis.rad / 2)
            .attr("y2", d => vis.height / 2 - d.char2y * vis.rad / 2)
            .style("stroke", function(d) {
                if(variable === "default") {
                    return vis.color(d.positive - d.negative)
                }
                else {
                    return vis.color(d[variable])
                }
            })
            .style("stroke-width", d => vis.thickness(d.word_count) + "px")

        interactions.exit().remove();

        vis.svg.selectAll(".character").raise()
        vis.svg.selectAll(".name").raise()

    }

}