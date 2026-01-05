var config = {
    style: 'mapbox://styles/pvar37/cmc3uamtp021n01s2c6lt7k52',
    // leave commented to use Mapbox Standard Style
    accessToken: 'pk.eyJ1IjoicHZhcjM3IiwiYSI6ImNtYmxxYm1pazEzbnMya3EzN3lvYTV2amUifQ.GkpmtF_2qdxD0PHzyEPEbQ',
    showMarkers: false,
    markerColor: '#3FB1CE',
    //projection: 'equirectangular',
    //Read more about available projections here
    //https://docs.mapbox.com/mapbox-gl-js/example/projections/
    inset: false,
    insetOptions: {
        markerColor: 'orange'
    },
    insetPosition: 'bottom-right',
    theme: 'dark',
    use3dTerrain: true, //set true for enabling 3D maps.
    auto: false,
    title: 'WE SPEEDRAN THE BOSTON SUBWAY SYSTEM',
    subtitle: 'In May, three friends and I set out in pursuit of a world record:\nvisiting all 125 MBTA rail line stops as quickly as possible.\nThis is the story of how it went down.',
    byline: '<a href="/" target="_blank" style="font-weight: 500">Pranay Varada</a> <i>and</i> <a href="https://graysonmmartin.github.io/" target="_blank" style="font-weight: 500">Grayson Martin</a> | January 5, 2026<p style="font-size: 0.8em; margin-top: -1em; font-weight: 200;"><i>with</i> <a href="https://aryan-naveen.github.io" target="_blank">Aryan Naveen</a> <i>and</i> <a href="https://www.linkedin.com/in/rohan-rajeev-43a143145" target="_blank">Rohan Rajeev</a></p>',
    subtextleft: '&darr; Scroll through story on left',
    subtextcenter: 'Full desktop view recommended',
    subtextright: 'Interact with map on right &darr;',
    chapters: [
        {
            id: 'intro',
            alignment: 'left',
            hidden: false,
            title: 'It was 6:20 am on Tuesday, May 20, 2025, when we set out to conquer Boston.',
            description: '<p style="margin-top:6px">Well… that’s one way of putting it. A more accurate description would be that we were about to ride buses and trains up and down eastern Massachusetts for an undeniably ridiculous amount of time. Exactly how ridiculous would be determined by the accuracy of a computer program we had run the night before.</p><p>It was a program developed with one goal in mind: to visit all 125 of Boston’s rail line stops as quickly as possible. Those 125 stops are the dots you see in the map on the right, spread out across eleven cities, four lines, and nearly a hundred square miles. We were going to pay a visit to all of them in one day—perhaps even setting a world record in the process.</p><p>What follows is the oral history of our expedition. Here to help me recount it is one of my fellow travelers, <b>Grayson Martin.</b> Grayson was involved in the programming and route development, which he’ll discuss later. Also along for the ride were Grayson’s roommates, our friends <b>Aryan Naveen</b> and <b>Rohan Rajeev.</b></p><p>This whole thing was borne out of a text I sent to Aryan in May 2023. I’d just come across a 2020 <a href="https://mitadmissions.org/blogs/entry/we-visited-every-station-on-the-mbta/" target="_blank">blog post</a> written by a couple MIT students who visited every MBTA station.<sup><a href="#fn1" class="footnote-ref" data-tooltip="The MBTA is the name of the region’s public transportation agency, known colloquially as the “T.”">1</a></sup> “Most MIT thing I’ve ever read,” I messaged him. He texted back, “DUDE we should do this senior year.” Almost immediately, the conversation turned towards not just doing it, but doing it better. Two years later, with senior year coming to a close and with no more academic responsibilities to distract us from setting a world record for riding trains, the time had come. And by bringing programming into the mix, we were, in a way, out-MITing the MIT students. (Fittingly, Aryan is now getting his PhD at MIT.)</p><p>Rohan joined the team last, about a week before we were set to make this trip. He was our unofficial expedition photographer; many of the pictures you’ll see in this article were taken by him.</p><p>Okay, with introductions out of the way, meet us at the neighborhood Dunkin’. We’ll read you in on the plan.',
            image: '../images/mbta/intro.jpg',
            location: {
                center: [-71.2721, 42.33446],
                zoom: 10.4,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'mbta_stations',
                    opacity: 1,
                },
                {
                    layer: 'mbta_lines',
                    opacity: 1,
                },
                {
                    layer: 'mbta_path_lines',
                    opacity: 0
                },
                {
                    layer: 'mbta-order',
                    opacity: 0
                },
                {
                    layer: 'base-camp-text',
                    opacity: 0
                },
                {
                    layer: 'base-camp',
                    opacity: 0
                }
            ],
            onChapterExit: []
        },
        {
            id: 'base-camp',
            alignment: 'left',
            hidden: false,
            title: '<span style="color: #fff01f">BASE CAMP</span><br>DUNKIN’ DONUTS, HARVARD SQUARE<br>6:25-6:40 AM',
            subtitle: 'Stations reached: 0/125<br>Time to start: 1 hour 23 minutes',
            description: '<p>Dunkin’, better known as Dunkin’ Donuts, is the pride and joy of the Greater Boston area. A true New England institution. It was here that we began to pay homage to this city that we had called home for the past few years. My turkey sausage, egg & cheese was to be my sole source of fuel for this run.<sup><a href="#fn2" class="footnote-ref" data-tooltip="You’d think Boston of all places would remember that we gained our independence, but Dunkin’ refuses to use the Oxford comma. Which, by the way, I just learned is also called the “Harvard comma,” and more people should call it that, because America.">2</a></sup></p><p>The conditions were optimal. Despite the fact that it was mid-May, the sky was overcast, with temperatures in the upper 40s to low 50s. We had all dressed for the occasion, except Rohan, who was wearing jeans for some reason. (He would come to regret this decision.)</p><p>We had gotten up this early because we had decided to start our attempt at Riverside, a Green Line station 10 miles west of downtown Boston. We’d have to take a bus and then a train to get there by 8 am. You see, we had a plan, and we were going to follow it to a T.<sup><a href="#fn3" class="footnote-ref" data-tooltip="Pun fully intended.">3</a></sup> We had crafted this plan the night before at Harvard’s Science and Engineering Complex, better known as the SEC.</p><p>In the days leading up to this run, I had done some sketching of my own to determine whether we could design a route that would improve upon previous attempts. The thing about Boston is that there aren’t many options for the optimal route. Unlike systems in New York and Paris, for example, the MBTA subway is designed purely to shuffle riders into and out of downtown. The <span class="red-line">Red</span>, <span class="orange-line">Orange</span>, <span class="blue-line">Blue</span>, and <span class="green-line">Green</span> lines radiate out of Boston and intersect only in a tiny region of the city, while their ends are often miles apart. If you zoom out on the right side of your screen, you’ll see what I mean. The system’s spread necessitates the use of either uninspired strategies, like riding the same train out and back into downtown, or unorthodox methods, like running.</p><p>There was also a dearth of prior strategy to go off of. Besides the MIT blog post, which included excellent documentation of the exact times the intrepid Alan and CJ had visited each stop, I found just two other recent attempts: Maya Jonas-Silver’s 2021 record of <a href="https://www.cbsnews.com/boston/news/mbta-boston-world-record-fastest-time-traveled-maya-jonas-silver/" target="_blank">7:04:29</a>, and Heshan de Silva-Weeramuni’s <a href="https://wbznewsradio.iheart.com/content/jamaica-plain-man-sets-new-record-visiting-every-mbta-stop-in-one-day/" target="_blank">13:10:10</a>, including the <span class="silver-line">Silver Line</span> bus routes. Neither of these quite matched what we were planning to do, since the Green Line had added seven new stops up north since 2021, and bus stops were outside of our purview. The MIT attempt (which wasn’t described as a record but may well have been at the time) was sort of a blend of these two runs, preceding the Green Line Extension but including the Silver Line, which took <a href="https://mitadmissions.org/blogs/entry/we-visited-every-station-on-the-mbta/" target="_blank">10:44:40</a>. So we decided we were setting a new record. Not that we were going to take it easy—we wanted to figure out a route so optimal it would be impossible to beat.</p><p>Using the MIT route as inspiration and using my intuition to fit the Green Line Extension into the puzzle, I started finding ways to do it all in about seven and a half hours. But Aryan and Grayson, ever the CS majors, felt we could do better with the power of computational graph theory.</p><p>And they were right. Scroll down and I’ll show you the whole route. I’ll let Grayson tell you how we came up with it.</p>',
            location: {
                center: [-71.1225, 42.3718],
                zoom: 17,
                pitch: 10,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'mbta_stations',
                    opacity: 1,
                },
                {
                    layer: 'mbta_lines',
                    opacity: 1,
                },
                {
                    layer: 'mbta_path_lines',
                    opacity: 0
                },
                {
                    layer: 'mbta-order',
                    opacity: 0
                },
                {
                    layer: 'base-camp-text',
                    opacity: 1
                },
                {
                    layer: 'base-camp',
                    opacity: 1
                }
            ],
            onChapterExit: []
        },
        {
            id: 'our-path',
            alignment: 'left',
            hidden: false,
            title: 'THE PLAN',
            description: '<p><b>GRAYSON MARTIN:</b> We decided to create a relaxed version of the <a href="https://www.lancaster.ac.uk/stor-i-student-sites/libby-daniells/2020/04/21/the-travelling-salesman-problem/" target="_blank">traveling salesman problem</a> (TSP) to find the fastest route. For context, the TSP is a famous optimization problem in which an imaginary salesman wants to find the shortest route through a list of cities without visiting the same city twice, starting from and returning to their origin city. To model the problem, you construct a "graph" using cities as nodes and the distances between cities as edge weights. In our case, the T stops were the nodes, and time to travel between them (as scraped using some random <a href="https://www.mbta.com/developers/v3-api" target="_blank">public transit API</a> Aryan found) were the edge weights. We added a few additional edges to represent feasible inter-stop runs, assuming a 6 mph pace.</p><p>This problem is computationally expensive to solve, but in our favor was the fact that some of the constraints from the TSP problem did not apply in our case. We could pass through stations multiple times and did not care about returning to the station we started at. Knocking these constraints off of the typical <a href="https://en.wikipedia.org/wiki/Integer_programming" target="_blank">integer linear programming</a> formulation for the TSP, Aryan used ChatGPT to generate code that took in our edge weight matrix and solved for the shortest route. Concurrently, I used ChatGPT to cook up a slightly different formulation using Google’s <a href="https://developers.google.com/optimization/routing/tsp" target="_blank">OR-Tools API</a>. With both of our programs arriving at the same solution, our path was set.</p><p><b>PRANAY:</b> So, putting it all together, this is the plan we came up with, finalized just six hours before we arrived at that Harvard Square Dunkin’. This map is fully interactive—you can pan, zoom, go 3D,<sup><a href="#fn4" class="footnote-ref" data-tooltip="To rotate or go 3D, hold down the Control key while moving your mouse.">4</a></sup> or hover over the stations to see their names!</p><p>The name of the game for us: quadrant by quadrant.</p><ul><li>First, the west: 59 <span class="green-line">Green Line</span> stations, with medium-length runs (in black) to connect the B, C, D, and E branches.</li><li>Second, the northern reaches of the <span class="red-line">Red</span> and <span class="orange-line">Orange</span> Lines, plus the <span class="green-line">Green Line Extension</span>. This would include our longest run of the day, a 1.8-miler from Alewife to Tufts.</li><li>Third, the <span class="blue-line">Blue Line</span> out east, past the airport and back.</li><li>And finally, a long journey into the south: completing the <span class="orange-line">Orange Line</span>, taking a <b style="background-color: white; color: #ffc72c; padding: 4px; font-family: \'Helvetica Neue\'">bus to Mattapan</b>, and finishing the <span class="red-line">Red Line</span> all the way out in Braintree.</li></ul><p>If all went to plan, we’d start out from Riverside (<b>1</b>) at 8:03 am and make it to Braintree (<b>125</b>) at 2:57 pm, just in time for a late lunch to celebrate our world record. 125 stations in 6 hours and 54 minutes. All we needed was some nice train connections, a few bursts of speed, and a little bit of luck. The recipe for transit immortality.</p><p>With the promise of eternal glory on our minds, we packed up our breakfast and got to the bus stop at 6:45 am. We took the 86 bus through Allston and Brighton en route to the Reservoir MBTA station. From there, we hopped on the Green Line train to our starting point at Riverside—a little practice run, if you will. We would begin in the west.</p>',
            location: {
                center: [-71.2721, 42.33446],
                zoom: 10.4,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'mbta_stations',
                    opacity: 1,
                },
                {
                    layer: 'mbta_lines',
                    opacity: 0,
                },
                {
                    layer: 'mbta_path_lines',
                    opacity: 1
                },
                {
                    layer: 'mbta-order',
                    opacity: 1
                },
                {
                    layer: 'base-camp-text',
                    opacity: 0
                },
                {
                    layer: 'base-camp',
                    opacity: 0
                }
            ],
            onChapterExit: []
        },
        {
            id: 'leg1',
            alignment: 'left',
            hidden: false,
            title: 'GREEN LINE D, RIVERSIDE-RESERVOIR<br>8:03-8:20 AM',
            subtitle: 'Stations reached: 8/125 (+8)<br>Time since start: 17 minutes',
            description: '<p style="margin-top:6px"><b>PV:</b> We arrived at Riverside around 7:30, time enough to eat and for Rohan to try desperately to find a bathroom before our scheduled 8:03 start time.<sup><a href="#fn5" class="footnote-ref" data-tooltip="In hindsight, we could’ve just started as soon as we got there, and it probably wouldn’t have slowed us down. But our planned route started at 8:03, so that’s what we went with, expecting everything to go perfectly.">5</a></sup> Look at us, so optimistic and up so early! As the clock struck 8, we sidled our way up the stairs to the aboveground station and boarded the waiting train. At 3 minutes and 26 seconds past the hour, our Green Line train left Riverside station heading east. Our attempt had officially begun. 1 station down, 124 to go.</p><p>Our light rail train darted through the woods at a relentless 30 miles per hour, a reminder that not only were we not in Boston, we wouldn’t be anywhere near downtown for a while.<sup><a href="#fn6" class="footnote-ref" data-tooltip="As Aryan later discovered, the “B” in “MBTA” does not stand for Boston. It stands for “Bay,” as in “Massachusetts Bay Transportation Authority.” Never mind the fact that the MBTA’s commuter rail system extends into Worcester County and Rhode Island.">6</a></sup> In fact, our journey began in the western suburb of Newton, with its expansive golf courses and quiet residential neighborhoods. For the moment, we had joined office commuters on their way into the city. We, however, had no intention of working on this Tuesday.</p><img src="../images/mbta/woods.jpeg" style="margin-top: 6px"><p>The train line was mostly walled off by trees, obstructing our view of the city beyond. We passed through six Newton stations in about 15 minutes before crossing the county line into Brookline, a city best known for being the birthplace of a man by the name of John F. Kennedy. We pulled into Reservoir at 8:20, one minute <i>before</i> we had projected. If the first leg had offered any omens for the rest of our run, they were solely good ones.',
            image: '../images/mbta/riverside.jpg',
            location: {
                center: [-71.193, 42.36374],
                zoom: 12,
                bearing: 90,
                pitch: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'leg2',
            alignment: 'left',
            hidden: false,
            title: 'RUN, RESERVOIR-CLEVELAND CIRCLE<br>8:20-8:23 AM',
            subtitle: 'Stations reached: 9/125 (+1)<br>Time since start: 20 minutes',
            description: '<p><b>PV:</b> But with five stops left to go on the western Green Line D branch, we willingly got off the train and walked around the block.</p><p>The reason for this is that the Green Line is really weird out west. Right here, just east of the Chestnut Hill Reservoir that gives Reservoir station its name, three separate branches of the Green Line come to a chokepoint less than 2,000 feet wide. This gave us an opportunity: while we had started out on the D branch because it extended the furthest west, we also wanted to be on this line later because it was closest to the E branch. If we stayed on our train, we’d have a much longer run a couple hours from now. That’s why you see the translucent green line heading east to Beaconsfield: this is a train connection that exists, but isn’t one we took.</p><p>So instead, we literally walked around the block to get on a new train at Cleveland Circle. We waited opposite a CVS before our train pulled around and we walked off the street onto our new train. It was a couple minutes late, but that was alright. <i>For now.</i>',
            location: {
                center: [-71.159, 42.33503],
                zoom: 14,
                bearing: 0,
                pitch: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'leg3',
            alignment: 'left',
            hidden: false,
            title: 'GREEN LINE C, CLEVELAND CIRCLE-HYNES CONVENTION CENTER<br>8:28-8:52 AM',
            subtitle: 'Stations reached: 23/125 (+14)<br>Time since start: 49 minutes',
            description: '<p><b>PV:</b> The Boston “subway system” is really a hodgepodge of several forms of above- and below-ground transit. The Green Line C, for one, is a streetcar that runs straight down the middle of Beacon Street into downtown. It was the first line we would complete that day.</p><p>It was a quick way to rack up some stations for sure. In fact, from Cleveland Circle to Saint Mary’s Street, the Green Line C runs through 13 stations in just a 2.3-mile stretch. Less than a month ago, this was the same route taken by runners of the Boston Marathon as they approached the finish line. Despite being on foot, they had probably been moving faster than we were now. Only in America can you take a train and wonder whether it would have made more sense to run.</p><p>As we departed Saint Mary’s Street and crossed back into Boston, we had a decision to make. According to my Maps app, there wouldn’t be another B branch train heading outbound from Kenmore for a while. If we got out at Kenmore, we might be able to catch it and save time, but it would mean having to hit the Hynes Convention Center stop later.</p><p>It was a tough call, but we decided to stay the course, unsure of whether we could successfully double back to Hynes later. Thus, we took our first trip underground, right near Interstate 90. Things were getting real.</p>',
            location: {
                center: [-71.12313, 42.362],
                zoom: 12.6,
                bearing: 70,
                pitch: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'leg4',
            alignment: 'left',
            hidden: false,
            title: 'GREEN LINE B, HYNES CONVENTION CENTER-BOSTON COLLEGE<br>9:05-9:37 AM',
            subtitle: 'Stations reached: 39/125 (+16)<br>Time since start: 1 hour 34 minutes',
            description: '<p style="margin-top:6px"><b>PV:</b> It became evident almost immediately that we were very, very wrong to trust the MBTA to be on time. It was going to be a while until that B train showed up. 6 hours, 54 minutes was already beginning to seem laughable. We had pulled into Hynes a minute later than scheduled, but that was fine, because we were supposed to get on the train to Boston College at 8:54. This train did not arrive until 9:05, which is how we had enough time to get someone to take this picture.</p><p>The strategy would stay the same. The Green Line B would give us our biggest haul of stations of any leg of the run—16 after we passed through Kenmore again. We got on the train and ascended out of the depths onto Commonwealth Avenue. Again, it was a streetcar adapted into a light rail line.</p><p>Boston has always loved its streetcars. In fact, the subway was developed in the late 1890s in part because streetcars were “clogging the streets.” You may have noticed that the Green Line has B, C, D, and E branches but no A branch, and that’s because the A branch streetcar was discontinued in 1969. And that was a streetcar system so old it started out with horses pulling the cars in the late 1850s. So yeah, Boston has been doing this for a while.</p><p>Some days I wonder whether the horse would have been more reliable.</p><p>Making the 32-minute journey west to Boston College gave us some time to investigate historical tidbits like these, because we realized we had already run out of bits for Aryan’s livestream of our speedrun, and so we had to find new ones. For example, did you know that all four MBTA rail line colors <a href="https://www.bostonmagazine.com/news/2016/08/25/mbta-color-history/?" target="_blank">actually mean something</a>?</p><ul><li>The <span class="green-line">Green Line</span> was named for the parks it passes by, especially the chain of green areas known as the Emerald Necklace;</li><li>The <span class="red-line">Red Line</span> was named as such because it runs through Harvard, the mighty Crimson (take that MIT);</li><li>The <span class="blue-line">Blue Line</span> was given its name because it runs under Boston Harbor and out to the Atlantic Ocean;</li><li>And the <span class="orange-line">Orange Line</span> took its name from the street it ran under at the time.</li></ul><p>Rumor has it the Orange Line was actually supposed to be yellow, and the Silver Line was given its name for the bewildering reason that it was supposed to be one of the fastest bus systems, and apparently silver means speed. As someone who has taken the Silver Line many times to get to and from Logan Airport, I can confidently tell you this line is not worthy of its moniker.</p><p>Anyway, as we neared Boston College, ready to run to Beaconsfield with all the silver speed we could muster, I noticed that there would supposedly not be another train heading east from Beaconsfield for the next half hour. To the five people on the livestream, our message was quite clear.</p><p>“Chat. Are we cooked?”</p><p>Grayson, take it away.',
            image: '../images/mbta/hynes.jpeg',
            location: {
                center: [-71.13024, 42.32020],
                zoom: 12.3,
                bearing: -90,
                pitch: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'leg5',
            alignment: 'left',
            hidden: false,
            title: 'RUN, BOSTON COLLEGE-BEACONSFIELD<br>9:37-9:58 AM',
            subtitle: 'Stations reached: 40/125 (+1)<br>Time since start: 1 hour 55 minutes',
            description: '<p><b>GM:</b> Arriving at Boston College, we started on what may be the least intuitive leg of our journey—a 1.5-mile run from the B line all the way past the C to the D. However, this end of the Green Line was always going to be messy and this is what our algorithm came up with. This was our first real run of the journey, and thus the start of a theme in this article—me complaining about running.</p><p>We immediately got off to a bad start as our fearless leader and navigator PV sent us a couple hundred yards west on Commonwealth Avenue before realizing the mistake and backtracking. Still, it was nice to see BC’s campus and a new part of the city. However, the sweatshirt that was previously protecting me from the chilly air soon began to feel excessively hot, and I could feel my breath fall out of sync much more quickly than I had expected. Perhaps I had a few too many Noch’s slices that semester.<sup><a href="#fn7" class="footnote-ref" data-tooltip="Pinocchio’s, better known as Noch’s, is a Harvard Square pizza institution and the fact that there was ever a debate between Noch’s and the NYC impostor Joe’s is a travesty. -PV">7</a></sup></p><p>Each time we resumed running after taking a walking break, I could only think ahead to the many more legs to be completed on foot throughout the day, for a total of six miles. My only solace was an equally winded Aryan running beside me. By the time we reached Beaconsfield, I imagine I looked disheveled enough to draw the suspicion of MBTA commuters.</p>',
            location: {
                center: [-71.15153, 42.34624],
                zoom: 14,
                bearing: 90,
                pitch: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'leg6',
            alignment: 'left',
            hidden: false,
            title: 'GREEN LINE D, BEACONSFIELD-FENWAY<br>10:04-10:13 AM',
            subtitle: 'Stations reached: 44/125 (+4)<br>Time since start: 2 hours 10 minutes',
            description: '<p><b>GM:</b> Having arrived several minutes later than expected, we were devastated to see a wait time of 20 minutes for the next train. Mulling over how much time we just lost by being out of shape, we were surprised to see the next D train roll up to the station five minutes after we got there. There was still hope.</p>',
            location: {
                center: [-71.12674, 42.35035],
                zoom: 13.3,
                bearing: 70,
                pitch: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'leg7',
            alignment: 'left',
            hidden: false,
            title: 'RUN, FENWAY-HEATH STREET<br>10:13-10:32 AM',
            subtitle: 'Stations reached: 45/125 (+1)<br>Time since start: 2 hours 29 minutes',
            description: '<p style="margin-top:6px"><b>GM:</b> Hopping off of the train at Fenway, we now had a 1.4-mile run ahead of us. The last run’s difficulties were still fresh in our minds, but this one proved much better. We were motivated by the previous embarrassment and naturally provided breaks by Boston traffic at crosswalks.</p><p>Passing through the Longwood area, we got to see the various medical facilities where pre-med Harvard students go to get their volunteering hours (Rohan frequented Boston Children’s). In what would turn out to be a rare occurrence, we made it to Heath Street with plenty of time to spare before the next train.</p><img src="../images/mbta/longwood.jpeg" style="margin-top: 6px">',
            image: '../images/mbta/fenway.jpeg',
            location: {
                center: [-71.10056, 42.33055],
                zoom: 14.3,
                bearing: -135,
                pitch: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'leg8',
            alignment: 'left',
            hidden: false,
            title: 'GREEN LINE E, HEATH STREET-PARK STREET<br>10:36-11:10 AM',
            subtitle: 'Stations reached: 59/125 (+14)<br>Time since start: 3 hours 7 minutes',
            description: '<p><b>PV:</b> I cannot convey to you how slow the E branch train is. It is <i>so slow.</i> Google Maps suggests that biking from Heath Street to Park Street along the same route would have been seven minutes faster, and I fully believe it.</p><p>I finished my turkey sausage, egg & cheese™ watching outside the window for some Boston landmarks: the Museum of Fine Arts, Northeastern University, Symphony Hall. After the amount of exploration we did out west, this burst of familiarity was a breath of fresh air. Over three hours in, we were about to complete the western Green Line.</p><p>To finish it off, we went back underground, finally past Hynes Convention Center into Copley. All four branches of the Green Line run through this rail segment. In fact, the tunnel into Park Street is part of the 1897 Tremont Street subway, the oldest subway tunnel in all of North America. Still functioning well over a century later!</p><p>Despite the fact that we were now half an hour behind schedule, we were excited to get to Park Street. Not just because we were tired of the Green Line, but because we would be returning to Harvard on the next leg. It felt like we could have a fresh start in Cambridge.</p>',
            location: {
                center: [-71.107, 42.36017],
                zoom: 12.7,
                bearing: 45,
                pitch: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'leg9',
            alignment: 'left',
            hidden: false,
            title: 'RED LINE, PARK STREET-ALEWIFE<br>11:16-11:38 AM',
            subtitle: 'Stations reached: 66/125 (+7)<br>Time since start: 3 hours 35 minutes',
            description: '<p><b>PV:</b> The run from the Green Line train down to the Red Line platform for Alewife—this was a run all of us had done many times before. But because we couldn’t have anything nice, our train left as soon as we got to the platform, leaving us waiting an extra five minutes.</p><p>Nevertheless, a huge milestone was coming up: the halfway point. And poetically, we’d hit it at Harvard, the 63rd stop of 125. Our train jumped out of the underground once again to cross the Longfellow Bridge over the Charles, quite possibly the most scenic stretch of the MBTA, before going back down again, past MIT and Central Square in Cambridge.</p><p>Five hours ago, we were ordering our breakfast at the Harvard Square Dunkin’ at dawn. Now, we were back at Harvard. It felt like a full day had passed. The idea that this was just <i>half</i> of the run—and not even in terms of duration—was unfathomable. But we tried not to think about that. We would be back here later today, no matter what. Exactly when was an open question.</p><p>Our train made a beeline for Alewife, a glorified parking garage emerging out of parkland. We strapped our backpacks into sport mode. Once again, it was time to run!</p>',
            location: {
                center: [-71.12430, 42.34968],
                zoom: 12,
                bearing: -60,
                pitch: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'leg10',
            alignment: 'left',
            hidden: false,
            title: 'RUN, ALEWIFE-MEDFORD/TUFTS<br>11:38 AM-12:02 PM',
            subtitle: 'Stations reached: 67/125 (+1)<br>Time since start: 3 hours 59 minutes',
            description: '<p><b>GM:</b> Having reached the northern terminal of the Red Line, a daunting task lay in front of us in the form of our longest run of the journey. Well, daunting for those of us who hadn’t completed a half-marathon last weekend (Mr. PV of PVP Productions himself).<sup><a href="#fn8" class="footnote-ref" data-tooltip="Yeah so I ran a half in Rhode Island two days before doing this… my legs did not thank me. -PV">8</a></sup> The 1.8 mile stretch started with navigating the concrete-forward Alewife station to find a suitable exit that would put us on the road to Medford/Tufts. Future record-attemptees take note: decide which exit to take <i>before</i> reaching the station.</p><p>Outside, I flipped my backpack around to the front (as if that would make a difference) and set off jogging with my compatriots. Soon after we crossed from North Cambridge into West Somerville, where I saw something devastating. Hills? I thought they didn’t have those in Massachusetts. It was around this point we cut the livestream to spare our two viewers several minutes of panting and heavy footsteps.</p><p>For the rest of the run, I was only thinking two things: “Man, Tufts is in a nice neighborhood” and “I hope someone else asks for a walking break so I don’t have to be that guy.” My hopes were answered when Aryan asked to slow down once we reached a bush halfway up one of the hills by the Tufts campus. Reinvigorated at the top of the hill, we finished out the short remaining distance back at jogging pace, only to <i>again</i> see our coveted Green Line train pull out of the station as we reached the top of the stairs.</p><p>Hindsight being 20/20, perhaps we should have instead taken the Red Line back to Davis, completed a mere 0.9 mile run to Medford/Tufts, and potentially saved five minutes—more than enough to catch that train.</p>',
            location: {
                center: [-71.14138, 42.39255],
                zoom: 13.6,
                bearing: -30,
                pitch: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'leg11',
            alignment: 'left',
            hidden: false,
            title: 'GREEN LINE E, MEDFORD/TUFTS-EAST SOMERVILLE<br>12:09-12:17 PM',
            subtitle: 'Stations reached: 71/125 (+4)<br>Time since start: 4 hours 14 minutes',
            description: '<p><b>GM:</b> At this point, I would like to tell you that we rode the Green Line from Tufts to North Station to start checking off Orange Line stops. However, standing between us and Green Line completion was yet another fork in the road. In its 2022 extension, the Green Line added a station at Cambridge’s Union Square that separates from the main branch between East Somerville and Lechmere. So, four stops after boarding our delayed Green Line E train, it was time for yet another run.</p>',
            location: {
                center: [-71.13338, 42.38148],
                zoom: 12.3,
                bearing: 0,
                pitch: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'leg12',
            alignment: 'left',
            hidden: false,
            title: 'RUN, EAST SOMERVILLE-UNION SQUARE<br>12:17-12:26 PM',
            subtitle: 'Stations reached: 72/125 (+1)<br>Time since start: 4 hours 23 minutes',
            description: '<p><b>GM:</b> Perhaps it was the fact that this was our very last run of the Green Line that encouraged my faster pace as we departed from East Somerville. We started down a shared pedestrian and bike path, with a steep bridge looming in the foreground and the Boston skyline in the background. Luckily, our route abruptly turned us to the right before its incline could take a toll on us.</p><p>Much like the Green Line itself, this route was quite strange. A construction site flanked our right, forcing us into the road to the presumed annoyance of a couple of passing cars. Luck was then briefly on our side as we were able to cross McGrath Highway without waiting at any crosswalks.</p><p>Finally, we dashed through a Target parking lot, no doubt looking suspicious with our matching Harvard SEAS backpacks, only to see our train through the Union Station fences, leaving without us <i>again.</i> We were used to seeing the back of a Green Line train at this point, but the nearly 15 minutes we spent waiting there were especially annoying as our mindset shifted from “Let’s set a crazy record” to “Let’s not set an embarrassing time.”</p>',
            location: {
                center: [-71.07970, 42.37830],
                zoom: 14.2,
                bearing: 180,
                pitch: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'leg13',
            alignment: 'left',
            hidden: false,
            title: 'GREEN LINE D, UNION SQUARE-NORTH STATION<br>12:40-12:51 PM',
            subtitle: 'Stations reached: 75/125 (+3)<br>Time since start: 4 hours 48 minutes',
            description: '<p style="margin-top:6px"><b>GM:</b> Finally boarding, we departed in the same direction from which the train arrived due to the branching nature of the Green Line. Vibes were low, but we were happy to be on our last leg of what was, by far, the most complicated line to complete in this challenge. This section of rail was elevated and provided views of a new section of the city.</p><img src="../images/mbta/elevated.jpeg" style="margin-top: 6px; margin-bottom: 6px;"><p>Since our tone up to this point has largely been one of disappointment, I’ll lighten the mood here by sharing that Union Square is home to the <a href="https://www.flufffestival.com" target="_blank">Somerville Fluff Festival</a>, celebrating Marshmallow Fluff—a key ingredient in New England’s favorite fluffernutter sandwiches, which were formerly produced in the area. The more you know.</p>',
            image: '../images/mbta/unionsquare.jpeg',
            location: {
                center: [-71.06993, 42.38443],
                zoom: 13.5,
                bearing: 108,
                pitch: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'leg14',
            alignment: 'left',
            hidden: false,
            title: 'ORANGE LINE, NORTH STATION-OAK GROVE<br>12:51-1:05 PM',
            subtitle: 'Stations reached: 81/125 (+6)<br>Time since start: 5 hours 2 minutes',
            description: '<p><b>PV:</b> At North Station, we ran up the stairs to the Orange Line platform in the direction of Oak Grove, and there was the train, doors <i>open.</i> There was just enough time for us to run in. There’s no better feeling in the world than narrowly making a train. Perhaps with the Celtics now out of the playoffs, they had bestowed their athleticism in us, down from TD Garden into the station.<sup><a href="#fn9" class="footnote-ref" data-tooltip="The Celtics lost to the Knicks in the Western Conference Semifinals four days before this run. And yes, TD Garden is located directly above North Station.">9</a></sup></p><p>We had some time to relax now as we headed up to parts of town we rarely visited: Malden, Medford, Somerville. Just look at the map: this part of the Orange Line, and the Blue Line to follow, is so far from everything else. The gray overlay you see signifies the next leg, the same journey back to North Station. There were no timetables to look at, no runs to make. Just a train up north and back. So we crossed the Mystic River and just watched the city pass us by. The stopwatch ticked past the five-hour mark.</p><img src="../images/mbta/mystic.jpeg" style="margin-top: 6px">',
            location: {
                center: [-71.11306, 42.40021],
                zoom: 11.9,
                bearing: 0,
                pitch: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'leg15',
            alignment: 'left',
            hidden: false,
            title: 'ORANGE LINE, OAK GROVE-HAYMARKET<br>1:09-1:24 PM',
            subtitle: 'Stations reached: 82/125 (+1)<br>Time since start: 5 hours 21 minutes',
            description: '<p><b>PV:</b> We literally just rode the train back so I have nothing more to say. So instead here’s a picture of Aryan with the Encore casino and what appears to be a landfill. Some of the truly underrated sights in Boston.</p><p>Oh, and there was a new target time. Eight hours.</p>',
            image: '../images/mbta/aryan.jpeg',
            location: {
                center: [-71.11306, 42.40021],
                zoom: 11.9,
                bearing: 0,
                pitch: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'leg16',
            alignment: 'left',
            hidden: false,
            title: 'RUN, HAYMARKET-BOWDOIN<br>1:24-1:30 PM',
            subtitle: 'Stations reached: 83/125 (+1)<br>Time since start: 5 hours 27 minutes',
            description: '<p><b>PV:</b> I don’t really think Bowdoin needs to exist as a station. None of us had ever been to Bowdoin or ever heard of anyone going there. I know there’s a map right next to this showing you exactly where it is, but I’m still not convinced I know where it is, or that it ever existed outside the context of this speedrun.</p><p>It was a quick walk/run down Sudbury Street to get there, and it afforded us five minutes to step out into the open air and experience downtown. Then it was back down into the Bostonian underbelly.</p><img src="../images/mbta/bowdoin.jpeg" style="margin-top: 6px">',
            image: '../images/mbta/state.jpeg',
            location: {
                center: [-71.05341, 42.36085],
                zoom: 15.53,
                bearing: 135.94,
                pitch: 65
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'leg17',
            alignment: 'left',
            hidden: false,
            title: 'BLUE LINE, BOWDOIN-WONDERLAND<br>1:35-2:02 PM',
            subtitle: 'Stations reached: 94/125 (+11)<br>Time since start: 5 hours 59 minutes',
            description: '<p><b>PV:</b> Much like Alice, we had fallen down a rabbit hole and were heading to Wonderland. We were leaving a dingy station in an old train car, returning above ground where it was cold and gloomy. And yet, even in mid-May, there was nothing more quintessentially Boston.</p><p>I had only ever taken the Blue Line once, to the New England Aquarium. The Red and Blue lines pass within fractions of a mile in downtown Boston, but never actually meet. Past Aquarium station, the Blue Line runs under Boston Harbor to oft-forgotten East Boston. Ever the innovators, Boston built North America’s first underwater subway tunnel in 1904. A century later, plans to build another tunnel under Boston Harbor would result in one of the most infamous boondoggles in recent American history. <a href="https://appel.nasa.gov/2020/07/23/the-big-dig-learning-from-a-mega-project-2/" target="_blank">But that’s a story for another time.</a></p><p>We passed under East Boston’s Maverick Square<sup><a href="#fn10" class="footnote-ref" data-tooltip="As a recovering Dallas sports fan, I should note that I did not enjoy seeing a blue and white sign with the word MAVERICK on it.">10</a></sup> and came up for air at Airport station. <span class="highlight">I couldn’t tell you why this station exists, considering you have to take a shuttle from this station to actually get to Logan Airport. The airport in Providence, Rhode Island—which has an MBTA commuter rail stop—might honestly have better public transport to Boston. After Airport was Wood Island, which was not an island but took its name from a park that was destroyed to expand Logan Airport.</span></p><p>To be honest, we were kind of tapped out at this point. There was nothing for us to do but ride this train to Wonderland and back. If we hadn’t run out of things to say on the livestream at 9 am, we were definitely finished now. I mean, look at Grayson. I swear he did not say a word for a full hour.</p><img src="../images/mbta/grayson.jpeg" style="margin-top: 6px; margin-bottom: 6px;"><p>The week that we were doing this was our Senior Week. It was supposed to be our last hurrah before graduation and the lack of sense of purpose in the world that would soon follow. Luckily for us, we were beginning to understand the pointlessness of everything quite clearly. There was an event scheduled for 2 pm, a class trip to Revere Beach. It had been canceled due to how god-awful the weather was.</p><p>I checked my watch as we arrived at Revere Beach station. 1:59 pm. We were early.</p><p>Wonderland was far from wonderful. Its name comes from an <a href="https://www.boston.com/news/wickedpedia/2023/05/31/how-did-wonderland-station-get-name/" target="_blank">amusement park</a> that existed in the area from 1906 to 1911, when it was torn down. Apparently it was the “premier place to be” at the time, according to its sole historian, Stephen Wilk. Wonderland hasn’t existed for one hundred fourteen years. And yet we’re still calling it that. All that’s left is a desolate train station on the shores of an empty beach.</p>',
            image: '../images/mbta/wonderland.jpeg',
            location: {
                center: [-71.07461, 42.39848],
                zoom: 12.2,
                bearing: 15,
                pitch: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'leg18',
            alignment: 'left',
            hidden: false,
            title: 'BLUE LINE, WONDERLAND-STATE<br>2:08-2:33 PM',
            subtitle: 'Stations reached: 94/125 (+0)<br>Time since start: 6 hours 30 minutes',
            description: '<p><b>PV:</b> While I was doing research for this story, I came across a song written in 1949 for the mayoral campaign of Progressive Party candidate Walter A. O’Brien, who wanted to simplify the MBTA fare system. It’s called <a href="https://web.mit.edu/jdreed/www/t/charlie.html" target="_blank">“Charlie on the M.T.A.”</a> In lieu of an account of what happened on this leg, I’ll reproduce the first three stanzas of this song, in the hopes that they will convey how we felt at this point in the run more effectively than anything I could say.<p><i>Let me tell you the story<br>Of a man named Charlie<br>On a tragic and fateful day<br>He put ten cents in his pocket<br>Kissed his wife and family<br>Went to ride on the MTA</i></p><p><i>Charlie handed in his dime<br>At the Kendall Square Station<br>And he changed for Jamaica Plain<br>When he got there the conductor told him,<br>“One more nickel.”<br>Charlie could not get off that train.</i></p><p><i>[Chorus]<br>Did he ever return,<br>No he never returned<br>And his fate is still unlearn’d<br>He may ride forever<br>’Neath the streets of Boston<br>He’s the man who never returned.</i></p><p>You should know that the name of the smart card that MBTA riders now use to pay those fares is called the CharlieCard. After Charlie. From the song. The guy who rode the T and was never seen again.</p><p>Do you know how messed up that is?</p>',
            location: {
                center: [-71.07461, 42.39848],
                zoom: 12.2,
                bearing: 15,
                pitch: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'leg19',
            alignment: 'left',
            hidden: false,
            title: 'ORANGE LINE, STATE-FOREST HILLS<br>2:37-3:00 PM',
            subtitle: 'Stations reached: 105/125 (+11)<br>Time since start: 6 hours 57 minutes',
            description: '<p><b>GM:</b> While we had just completed another line, we were exhausted and low on morale. Passing our 100th stop at Ruggles didn’t feel like much of a victory. I believe we began discussing dinner plans here, the Dunkin’ breakfast sandwiches being a faint memory from nearly seven hours prior when I had bright eyes and a clean sweatshirt.</p><p>You might imagine that this section was quite dull. However, it is at this point that I get to recount to you a story that we have since only referred to as “The Incident.” Do you know how wild something has to be for us to call it “The Incident” after everything that transpired on this journey?</p><p>It all starts when this group of teenagers enters our Orange Line car, going between cars as the train is moving. Apparently, they have the impression that this middle-aged guy (MAG) standing in front of us had recorded them. A yelling and shoving match ensues between the two groups. The leader of this gaggle of teenagers then proceeds to pull out a toy gun and pretends to shoot the MAG??? Truly puzzling behavior. Eventually, they get off—a victory for MAG and Orange Line commuters alike.</p><p>I wish it ended there, but no more than two stops later the group of teenagers returns, this time with more members. A second MAG joins the first and the combination of his presence, combined with the teenagers’ girlfriends yelling at them to have some sense, drives them out of the train soon thereafter. The two MAGs then dap each other up, the second stating, “Back in my day we fought fair. Not ten on one.” Inspiring stuff.</p><p>Having moved back to the Boston area post-graduation, I count this as the most degenerate behavior I’ve witnessed in five years here, which is actually very solid. Finally arriving at Forest Hills<sup><a href="#fn11" class="footnote-ref" data-tooltip="Shoutout J. Cole. -PV">11</a></sup> after the excitement, we saw several police officers on our way to the bus station, perhaps watching out for unruly groups of teens.',
            location: {
                center: [-71.12935, 42.34281],
                zoom: 12.2,
                bearing: 15,
                pitch: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'leg20',
            alignment: 'left',
            hidden: false,
            title: 'BUS ROUTE 31, FOREST HILLS-MATTAPAN<br>3:01-3:26 PM',
            subtitle: 'Stations reached: 106/125 (+3)<br>Time since start: 7 hours 23 minutes',
            description: '<p><b>GM:</b> Our next leg was the only bus journey of the official record-attempt run. We sprinted down the Forest Hills station stairs, only to watch our bus pulling out without us. Tired of constantly being 5 seconds too late, we (along with a stranger) sprinted after it and were mercifully let on.</p><p>It turned out there was no need to sprint as the traffic on Blue Hill Avenue was crippling. Pranay suggested we hop off and run again to save time, but was quickly outnumbered. The only other notable parts of this bus ride were a guy playing Ms. Lauryn Hill on his loudspeaker (Rohan and I are fans), and a small second incident where a guy shrieked and punched the bus driver’s glass when getting off of the bus.</p>',
            location: {
                center: [-71.13127, 42.27628],
                zoom: 12.5,
                bearing: -30,
                pitch: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'leg21',
            alignment: 'left',
            hidden: false,
            title: 'MATTPAN TROLLEY, MATTAPAN-ASHMONT<br>3:31-3:39 PM',
            subtitle: 'Stations reached: 113/125 (+7)<br>Time since start: 7 hours 36 minutes',
            description: '<p><b>PV:</b> The Mattapan Trolley is so goofy. It was a much-needed dose of humor, getting to ride on this weird 1940s streetcar that by all rights should be in an amusement park or museum but yet is officially part of a subway system. I joke, but like many of the trains we wanted to take that day, it also left the station just as we got there. Picture <i>that</i> running away from you at 10 miles per hour.<sup><a href="#fn12" class="footnote-ref" data-tooltip="Incredibly, this line was once called the “Ashmont-Mattapan High-Speed Line.” Top speed: 25 mph.">12</a></sup></p><img src="../images/mbta/trolley.jpeg" style="margin-top: 6px; margin-bottom: 6px;"><p>The trolley is so anachronistic yet outfitted with all the hallmarks of modernity. Pullman-Standard, the company that built these streetcars in 1945-46, has been defunct for over 50 years. Even though the MBTA had added air conditioning and tap-to-pay technology to the cars over the years, we felt like we had taken a trip back in time.</p><p>Adding seven more stops to our docket, we traveled between the Boston neighborhoods of Mattapan and Dorchester via the suburb of Milton, which to be honest I had never heard of before this trip. Some of these stations were barely used: according to the <a href="https://cdn.mbta.com/sites/default/files/2023-06/2023-06-20-mattapan-public-information-meeting_0.pdf" target="_blank">MBTA’s statistics</a> from spring 2023, average weekday boardings at Valley Road stood at 10. These were the hinterlands. Our soundtrack was set by a guy on the trolley who had brought in a speaker and was blasting this song by some rapper named Vin Jay. We hurtled through the absolutely immense Cedar Grove Cemetery, with graves stretching through the forest for what felt like miles on either side of the tracks. The incongruity of the music and the graveyard and the 80-year-old streetcar and the fact that we were now seven and a half hours in was something to behold.</p><p>Those eight minutes were a fever dream. We had fully lost our sense of time and place. We had become one with Boston.</p><p>Trolley problem: solved.</p>',
            image: '../images/mbta/mattapan.jpeg',
            location: {
                center: [-71.09120, 42.28358],
                zoom: 13.5,
                bearing: 30,
                pitch: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'leg22',
            alignment: 'left',
            hidden: false,
            title: 'RED LINE, ASHMONT-SOUTH STATION<br>3:42-3:57 PM',
            subtitle: 'Stations reached: 120/125 (+8)<br>Time since start: 7 hours 54 minutes',
            description: '<p><b>PV:</b> <i>Ashmont.</i> It was a name we had seen so many times, taking the Red Line out of Harvard into Boston. Every Red Line train is either an Ashmont or a Braintree train, depending on which branch it takes. We would always get off many stops before Ashmont, of course. But now we were here, the first sign that the end was near.</p><p>We hustled down the stairs from the trolley platform into the station. The guy with the speaker followed us into the train, keeping the vibes up. But at some point, the music and our livestream cut out: we had lost service going underground after JFK/UMass.<sup><a href="#fn13" class="footnote-ref" data-tooltip="My guess is it’s named that because “John Fitzgerald Kennedy Presidential Library and Museum / University of Massachusetts Boston” was too long to put on the sign.">13</a></sup> For the fourth time today, we were heading back into downtown Boston.</p><p>Our destination was South Station, that venerated hub of intermodality. There would be buses: heading to other parts of Boston, to the airport, to New York and beyond. Amtrak, too. But we would stick to the Red Line. We passed through Southie, one of Boston’s most famous neighborhoods, featuring my sleeper pick for funniest name of an MBTA station, which is Andrew. Then there was Broadway, and at last South Station. Our target arrival time was 2:57 pm. It was now 3:57. Part of me just wanted to stay on the train and ride back to Harvard.</p><p>But somehow, the longer it went, the more our sense of achievement had grown. The last leg beckoned.</p>',
            location: {
                center: [-71.09924, 42.32020],
                zoom: 12.1,
                bearing: 0,
                pitch: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'leg23',
            alignment: 'left',
            hidden: false,
            title: 'RED LINE, SOUTH STATION-BRAINTREE<br>4:00-<span style="background-color: white;">4:34 PM</span>',
            subtitle: 'Stations reached: 125/125 (+5)<br>Time since start: <span style="background-color: white;">8 hours 31 minutes</span>',
            description: '<p><b>PV:</b> You’ll notice we’ve zoomed out a bit. That’s because our final leg of the journey was also the longest. Braintree was a myth to us, so far from everything that felt like Boston. After doubling back through Broadway, Andrew, and JFK/UMass, an eerie silence descended as we entered a 3.5-mile-long stretch with no stations. We entered the city of Quincy (pronounced KWIN-zee for some reason) with just five stations to go.</p><p>We had never been more ready for anything in our lives. The train was scarcely populated, and for those few riding alongside us, this was just a commute. For us, it was completion.</p><p><b>GM:</b> Even in this very last leg of the journey, we were plagued with an extremely slow train as we approached the Braintree stop. I recall coming to a complete stop at least twice as Pranay’s stopwatch kept counting well beyond our initial estimated time. To be fair, this could be completely normal given that we were headed to the very far end of the Red Line, but to this day I haven’t been back to see if that is really the case.</p><p><b>PV:</b> 4:32. 4:33. The clock ticked past the eight and a half hour mark as the train stalled. The MBTA, it seemed, was insistent upon having the last laugh. The end was literally in sight. And then, a lurch forward. For the 125th and final time, our train pulled into a new station. The promised land. Braintree. We were already on our feet. Aryan stepped out first, then Grayson, then Rohan. I pressed the stop button on my watch.</p><p>8:31:05. <i>Beep.</i> New world record.</p><hr><p><b>GM:</b> As we stepped out onto the final platform, we were exhausted, but shared a sense of satisfaction in our accomplishment. We also found quite a bit of humor in the fact that we now had a roughly 40 minute ride back up the Red Line to Harvard.</p><p><b>PV:</b> Grayson, ever the understater. I’ll say it if he won’t: <i>Paul Revere. Tom Brady. Grayson Martin.</i> Boston legends. We crossed the platform, Aryan and Rohan leading the celebrations, <a href="https://www.youtube.com/watch?v=BYxJhT1l3zY" target="_blank">Jayson Tatum-style</a>: “WE DID IT!!!” “WHAT THEY GONNA SAY NOW?!” Within seconds of getting off, they instinctively walked into the northbound train waiting on the opposite side of the platform.</p><p>I suggested that maybe we take a photo before we go. That was when the doors shut. I could only watch as the train carrying Aryan, Rohan, and Grayson left the station.</p><p style="margin-bottom: 20px;">The Boston train gods have one wicked sense of humor.</p><video width="300" height="533" controls><source src="../images/mbta/braintree.MOV" type="video/mp4"></video>',
            location: {
                center: [-71.2721, 42.33446],
                zoom: 10.4,
                bearing: 0,
                pitch: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'conclusion',
            alignment: 'left',
            hidden: false,
            title: '<i style="color: #fff01f">EPILOGUE</i><br>RED LINE, BRAINTREE-HARVARD<br>4:35-5:27 PM',
            description: '<p><b>PV:</b> Was I to be Charlie, doomed to ride forever ‘neath the streets of Boston? Well, as I write this from the platform at Braintree… no, I’m kidding, the four of us reunited at Quincy Adams to take the Red Line back to Harvard. We were exhausted, sweat-drenched, hungry, but also elated. We had done it.</p><img src="../images/mbta/completion.jpeg" style="margin-top: 6px; margin-bottom: 6px;"><p>125 stations. 10 cities. 8.5 hours. 4 lines. The journey of a lifetime.</p><p>Boston, this was for you. <span style="color: #fff01f">∎</span></p><p style="font-size: 0.8em; margin-top: 20px;">Data source: <a href="https://github.com/mbta/gtfs-documentation/blob/master/reference/gtfs.md#stopstxt" target="_blank">MBTA GTFS</a>, spreadsheet <a href="https://docs.google.com/spreadsheets/d/11X18vYtoTq6ILp2z6srH9sfwHoEnWA3IjaFPyQNoqpo/edit?usp=sharing" target="_blank">here</a>. Created using <a href="https://github.com/mapbox/storytelling" target="_blank">Mapbox Storytelling</a> template.<br>&copy; 2026 PVP PRODUCTIONS. All rights reserved.<br><i>If you break this record, let me know at <a href="mailto:productionsbypvp@gmail.com">productionsbypvp@gmail.com</a>! I’ll forgive you.</i></p>',
            location: {
                center: [-71.2721, 42.33446],
                zoom: 10.4,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'mbta_stations',
                    opacity: 1,
                },
                {
                    layer: 'mbta_lines',
                    opacity: 0,
                },
                {
                    layer: 'mbta_path_lines',
                    opacity: 1
                },
                {
                    layer: 'mbta-path-23',
                    opacity: 0
                },
                {
                    layer: 'mbta-path-23-lines',
                    opacity: 0
                },
                {
                    layer: 'mbta-path-23-stations',
                    opacity: 0
                }
            ],
            onChapterExit: []
        },
    ]
};