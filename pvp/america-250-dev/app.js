const width = 960;
const height = 600;

const svg = d3.select("#map-container")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

const mapLayer = svg.append("g");
const tooltip = d3.select("#tooltip");

let tooltipTimeout;

const isMobile = window.innerWidth <= 768;

const baseRadius = isMobile ? 11 : 5;
const activeRadius = isMobile ? 16 : 10;

function getEffectiveScale(k) {
    return isMobile ? Math.pow(k, 0.85) : k;
}

const mapScale = isMobile ? 1080 : 1200;
const mapTranslate = isMobile ? [width / 2 + 25, height / 2 - 5] : [width / 2, height / 2];

const projection = d3.geoAlbersUsaTerritories()
    .scale(mapScale)
    .translate(mapTranslate);

const path = d3.geoPath().projection(projection);
const maxZoomLevel = isMobile ? 1000 : 100;

const zoom = d3.zoom()
    .scaleExtent([1, maxZoomLevel])
    .translateExtent([[-100, -100], [width + 100, height + 100]])
    .on("zoom", zoomed);

svg.call(zoom);

tooltip.on("click", (event) => event.stopPropagation());

function hideTooltip() {
    if (isMobile) {
        tooltip.html("");
    } else {
        tooltip.style("opacity", 0).style("visibility", "hidden");
    }
}

// --- NOTIFICATION LOGIC ---
let notificationTimeout;

function showNotification(message) {
    const notif = document.getElementById("custom-notification");
    if (!notif) return;

    notif.innerText = message;
    notif.classList.add("show");

    clearTimeout(notificationTimeout);

    notificationTimeout = setTimeout(() => {
        notif.classList.remove("show");
    }, 4000);
}

function zoomed(event) {
    const { transform } = event;
    mapLayer.attr("transform", transform);

    mapLayer.selectAll("circle")
        .attr("r", function () {
            return d3.select(this).classed("active") ? activeRadius / getEffectiveScale(transform.k) : baseRadius / getEffectiveScale(transform.k);
        })
        .style("stroke-width", 0.5 / transform.k);

    mapLayer.selectAll(".projection-borders").style("stroke-width", (0.5 / transform.k) + "px");
    mapLayer.selectAll(".state-borders").style("stroke-width", (0.5 / transform.k) + "px");
    mapLayer.selectAll(".state-path").style("stroke-width", (1 / transform.k) + "px");

    if (!isMobile) {
        hideTooltip();
    }
}

const colorScale = d3.scaleLinear()
    .domain([1776, 1850, 1940, 2026])
    .range(["#cbb682", "#b05f4e", "#6b4c64", "#253494"])
    .clamp(true);

function setOptimalTooltipPosition(pageX, pageY, clientX, clientY) {
    if (isMobile) return;

    tooltip.style("visibility", "visible").style("transform", "none");

    const tooltipNode = tooltip.node();
    const tw = tooltipNode.offsetWidth;
    const th = tooltipNode.offsetHeight;
    const offset = 25;

    let leftPos = (clientX > window.innerWidth / 2) ? pageX - tw - offset : pageX + offset;
    let topPos = pageY - (th / 2);

    const vTop = window.scrollY + 10;
    const vBottom = window.scrollY + window.innerHeight - 10;
    const vRight = window.scrollX + window.innerWidth - 10;
    const vLeft = window.scrollX + 10;

    if (topPos < vTop) topPos = vTop;
    if (topPos + th > vBottom) topPos = vBottom - th;
    if (leftPos < vLeft) leftPos = vLeft;
    if (leftPos + tw > vRight) leftPos = vRight - tw;

    tooltip.style("left", leftPos + "px")
        .style("top", topPos + "px")
        .transition()
        .duration(200)
        .style("opacity", 1);
}

if (!isMobile) {
    tooltip.on("mouseenter", () => {
        clearTimeout(tooltipTimeout);
    }).on("mouseleave", () => {
        tooltipTimeout = setTimeout(() => {
            hideTooltip();
            const currentZoom = d3.zoomTransform(svg.node()).k;
            mapLayer.selectAll("circle").classed("active", false).attr("r", baseRadius / getEffectiveScale(currentZoom)).attr("stroke", "#5c4738");
        }, 300);
    });
}

// --- TOOLTIP HTML GENERATOR ---
function generateTooltipHTML(eventData) {
    const allFeatures = window.eventsData.features;
    const currentIndex = allFeatures.findIndex(f => f.properties.year === eventData.properties.year);
    const prevYear = currentIndex > 0 ? allFeatures[currentIndex - 1].properties.year : null;
    const nextYear = currentIndex < allFeatures.length - 1 ? allFeatures[currentIndex + 1].properties.year : null;

    const prevHtml = prevYear ? `<span class="nav-link" onclick="loadEvent(${prevYear})">&larr; ${prevYear}</span>` : `<span class="nav-link disabled">&larr; Prev</span>`;
    const nextHtml = nextYear ? `<span class="nav-link" onclick="loadEvent(${nextYear})">${nextYear} &rarr;</span>` : `<span class="nav-link disabled">Next &rarr;</span>`;

    const titleSize = isMobile ? '17px' : '16px';
    const metaSize = isMobile ? '14px' : '12px';

    return `
        <span style="font-weight:700; font-size: ${titleSize};">${eventData.properties.year}</span>
        <span style="font-weight:500; font-size: ${titleSize};">${eventData.properties.event}</span><br>
        <div style="font-style:italic; font-size: ${metaSize}; color: #5d4e46; margin-top: 4px; margin-bottom: 6px;">
            ${eventData.properties.date ? eventData.properties.date + ' | ' : ''}${eventData.properties.location}, ${eventData.properties.state}
        </div>
        ${eventData.properties.image ? `<img src="${eventData.properties.image}" alt="${eventData.properties.event}" class="tooltip-img" style="object-position: ${eventData.properties.imagePosition || 'center'};"/>` : ''}
        <p class="tooltip-desc">${eventData.properties.description.trim()}${eventData.properties.link ? `&nbsp;<a href="${eventData.properties.link}" target="_blank" style="text-decoration: none; color: #b05f4e; font-weight: bold; font-size: 14px;">&raquo;</a>` : ''}</p>
        <div class="tooltip-nav">
            ${prevHtml}
            ${nextHtml}
        </div>
    `;
}

Promise.all([
    d3.json("us.json"),
    d3.json("events.geojson")
]).then(([us, eventsData]) => {

    window.eventsData = eventsData;

    mapLayer.append("g")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .join("path")
        .attr("class", "state-path")
        .attr("d", path)
        .attr("fill", "rgba(220, 200, 170, 0.4)")
        .attr("stroke", "#5c4738")
        .attr("stroke-width", "1px");

    mapLayer.append("path")
        .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
        .attr("d", path)
        .attr("class", "state-borders")
        .attr("fill", "none")
        .attr("stroke", "#5c4738")
        .attr("stroke-width", "0.5px")
        .attr("stroke-dasharray", "2,2");

    mapLayer.append("path")
        .datum(projection.getCompositionBorders())
        .attr("class", "projection-borders")
        .attr("d", path)
        .attr("fill", "none")
        .attr("stroke", "#5c4738")
        .attr("stroke-width", "0.5px");

    const loadingOverlay = document.getElementById("loading-overlay");
    if (loadingOverlay) {
        loadingOverlay.style.opacity = "0";
        setTimeout(() => loadingOverlay.style.display = "none", 500);
    }

    mapLayer.append("g")
        .selectAll("circle")
        .data(eventsData.features)
        .join("circle")
        .attr("r", baseRadius / getEffectiveScale(d3.zoomTransform(svg.node()).k))
        .attr("transform", d => {
            const coords = projection(d.geometry.coordinates);
            return coords ? `translate(${coords[0]}, ${coords[1]})` : null;
        })
        .attr("fill", d => colorScale(d.properties.year))
        .attr("stroke", "#5c4738")
        .style("stroke-width", 0.5 / d3.zoomTransform(svg.node()).k)
        .style("cursor", "pointer")
        .on("mouseover", function (event, d) {
            if (isMobile) return;

            clearTimeout(tooltipTimeout);
            const currentZoom = d3.zoomTransform(svg.node()).k;

            mapLayer.selectAll("circle").classed("active", false).attr("r", baseRadius / getEffectiveScale(currentZoom)).attr("stroke", "#5c4738");

            d3.select(this)
                .raise()
                .classed("active", true)
                .transition().duration(200)
                .attr("r", activeRadius / getEffectiveScale(currentZoom)).attr("stroke", "#000");

            tooltip.html(generateTooltipHTML(d));
            tooltip.node().scrollTop = 0;
            setOptimalTooltipPosition(event.pageX, event.pageY, event.clientX, event.clientY);
        })
        .on("mouseout", function () {
            if (isMobile) return;

            const currentZoom = d3.zoomTransform(svg.node()).k;
            d3.select(this).transition().duration(200).attr("r", baseRadius / getEffectiveScale(currentZoom)).attr("stroke", "#5c4738");

            tooltipTimeout = setTimeout(() => {
                hideTooltip();
                d3.select(this).classed("active", false);
            }, 300);
        })
        .on("click", function (event, d) {
            event.stopPropagation();
            if (isMobile) {
                window.loadEvent(d.properties.year, this);
            }
        });
});

window.loadEvent = function (year, nodeElement = null) {
    clearTimeout(tooltipTimeout);

    const eventData = window.eventsData.features.find(f => f.properties.year === year);
    if (!eventData) return;

    const slider = document.getElementById("timeline-slider");
    if (year > parseInt(slider.value)) {
        slider.value = year;
        d3.select("#timeline-year-display").text(year);
        mapLayer.selectAll("circle").style("display", d => d.properties.year <= year ? "block" : "none");
    }

    const targetCircleNode = nodeElement || mapLayer.selectAll("circle").filter(d => d.properties.year === year).node();
    if (!targetCircleNode) return;

    const showTooltipAndHighlight = () => {
        const circleRect = targetCircleNode.getBoundingClientRect();
        const clientX = circleRect.left + (circleRect.width / 2);
        const clientY = circleRect.top + (circleRect.height / 2);
        const pageX = clientX + window.scrollX;
        const pageY = clientY + window.scrollY;

        tooltip.html(generateTooltipHTML(eventData));
        tooltip.node().scrollTop = 0;
        setOptimalTooltipPosition(pageX, pageY, clientX, clientY);

        const t = d3.zoomTransform(svg.node());
        mapLayer.selectAll("circle").classed("active", false).attr("r", baseRadius / getEffectiveScale(t.k)).attr("stroke", "#5c4738");

        d3.select(targetCircleNode)
            .raise()
            .classed("active", true)
            .transition().duration(200).attr("r", (activeRadius + 5) / getEffectiveScale(t.k)).attr("stroke", "#000")
            .transition().duration(200).attr("r", activeRadius / getEffectiveScale(t.k));
    };

    const currentZoom = d3.zoomTransform(svg.node());

    if (!nodeElement && (currentZoom.k !== 1 || currentZoom.x !== 0 || currentZoom.y !== 0)) {
        svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity).on("end", showTooltipAndHighlight);
    } else {
        showTooltipAndHighlight();
    }
};

function performSearch() {
    const yearInput = document.getElementById('year-input').value;
    const year = parseInt(yearInput);

    if (!window.eventsData || isNaN(year)) {
        return showNotification("Please enter a valid year.");
    }

    if (year === 2026) {
        return showNotification("2026 marks America's 250th anniversary! This map chronicles the 250 years leading up to it. Try searching for a year between 1776 and 2025.");
    } else if (year < 1776 || year > 2025) {
        return showNotification("Please enter a year between 1776 and 2025.");
    }

    window.loadEvent(year);
}

function resetView() {
    svg.transition().duration(1000).call(zoom.transform, d3.zoomIdentity);
    hideTooltip();

    mapLayer.selectAll("circle")
        .classed("active", false)
        .attr("r", baseRadius)
        .attr("stroke", "#5c4738")
        .style("display", "block");

    document.getElementById("timeline-slider").value = 2026;
    document.getElementById("timeline-year-display").innerText = "2026";
}

d3.select("#search-btn").on("click", performSearch);
d3.select("#reset-btn").on("click", resetView);
d3.select("#year-input").on("keypress", (e) => { if (e.key === "Enter") performSearch(); });

d3.select("#timeline-slider").on("input", function () {
    const selectedYear = +this.value;
    d3.select("#timeline-year-display").text(selectedYear);

    mapLayer.selectAll("circle")
        .style("display", d => d.properties.year <= selectedYear ? "block" : "none");

    const activeNode = mapLayer.selectAll("circle.active").node();
    if (activeNode) {
        const activeData = d3.select(activeNode).datum();
        if (activeData.properties.year > selectedYear) {
            hideTooltip();
            d3.select(activeNode).classed("active", false);
        }
    }
});

// --- MODAL LOGIC ---
const modal = document.getElementById("about-modal");
const infoBtn = document.getElementById("info-btn");
const closeBtn = document.getElementById("close-modal");
const startBtn = document.getElementById("start-btn");

if (!localStorage.getItem("america250_visited")) {
    modal.classList.remove("hidden");
}

function closeAndSave() {
    modal.classList.add("hidden");
    localStorage.setItem("america250_visited", "true");
}

if (infoBtn) {
    infoBtn.addEventListener("click", () => modal.classList.remove("hidden"));
}

if (closeBtn) {
    closeBtn.addEventListener("click", closeAndSave);
}

if (startBtn) {
    startBtn.addEventListener("click", closeAndSave);
}

if (modal) {
    modal.addEventListener("click", (event) => {
        if (event.target === modal) closeAndSave();
    });
}