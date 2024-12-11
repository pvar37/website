let characters = [
    ["Anna", 0, 1],
    ["Stiva", -0.7818, 0.6235],
    ["Kitty", -0.9749, -0.2225],
    ["Karenin", -0.4339, -0.9010],
    ["Vronsky", 0.4339, -0.9010],
    ["Dolly", 0.9749, -0.2225],
    ["Levin", 0.7818, 0.6235]
]

let data_path = "./data/major_character_interactions.csv";
let network;
d3.csv(data_path, row => {
    row.anger = +row.anger;
    row.anticipation = +row.anticipation;
    row.char1x = +row.char1x;
    row.char1y = +row.char1y;
    row.char2x = +row.char2x;
    row.char2y = +row.char2y;
    row.disgust = +row.disgust;
    row.fear = +row.fear;
    row.joy = +row.joy;
    row.neg = +row.neg;
    row.negative = +row.negative;
    row.neu = +row.neu;
    row.pos = +row.pos;
    row.positive = +row.positive;
    row.sadness = +row.sadness;
    row.surprise = +row.surprise;
    row.trust = +row.trust;
    row.word_count = +row.word_count;
    return row;
}).then(data => {
    let full_data_path = "./data/major_character_interactions_grouped.csv";
    d3.csv(full_data_path, row => {
        row.anger = +row.anger;
        row.anticipation = +row.anticipation;
        row.char1x = +row.char1x;
        row.char1y = +row.char1y;
        row.char2x = +row.char2x;
        row.char2y = +row.char2y;
        row.disgust = +row.disgust;
        row.fear = +row.fear;
        row.joy = +row.joy;
        row.neg = +row.neg;
        row.negative = +row.negative;
        row.neu = +row.neu;
        row.pos = +row.pos;
        row.positive = +row.positive;
        row.sadness = +row.sadness;
        row.surprise = +row.surprise;
        row.trust = +row.trust;
        row.word_count = +row.word_count;
        return row;
    }).then(fullData => {
        network = new Network("mainVisContainer", characters, data, fullData);
    });
});