var origin_w = window.innerWidth;
var origin_h = window.innerHeight;

var timer = 2 * 60; // timer for 2 mins
var timer_cnt = 1;
var timer_ID;
var info_title = ['臭氧(O3)',
                    '甲醛(HCHO)',
                    '總揮發性有機化合物(TVOC)',
                    '懸浮微粒(PM10)',
                    '甲醛(HCHO)',
                    '一氧化碳(CO)',
                    '總揮發性有機化合物(TVOC)',
                    '細菌(Bacteria)'];

// information text
var info_text = ['避免在人員於室內時開啟，使用後加強室內通風',
                 '使用綠建材標章產品，並加強室內通風',
                 '例行清潔應減少使用木質地板蠟; 使用中及使用完畢後，加強室內通風',
                 '定期清潔地毯，避免灰塵累積',
                 '使用綠建材標章產品; 置入期間加強室內通風',
                 '使用瓦斯燃燒設備時，開啟抽油煙機並關閉同側窗戶',
                 '使用綠建材標章產品; 使用中及使用完畢後，加強室內通風',
                 '水槽保持乾燥避免微生物孳生; 廁所內裝置排風扇有助於濕氣及異味排出'];


var previousCoords = [
    [
        20,
        45,
        320,
        375
    ],
    [
        400,
        45,
        620,
        375
    ],
    [
        720,
        45,
        820,
        375
    ],
    [
        920,
        45,
        1220,
        375
    ],
    [
        20,
        630,
        320,
        985
    ],
    [
        400,
        630,
        620,
        985
    ],
    [
        720,
        630,
        820,
        985
    ],
    [
        920,
        630,
        1220,
        985
    ]
];

var previousWidth = 1920,
    previousHeight = 1024;

// random number
var max_item = 5;
var list = [0, 1, 2, 3, 4, 5, 6, 7];

// pic dic
var pic_target = ['/image/Spiderman-1.jpg', '/image/Spiderman-2.jpeg'];

$(document).ready(function () {
    // initial when loaded
    origin_h = window.innerHeight;
    origin_w = window.innerWidth;
    initial_timer();
    var info = info_title[0] + "<br/>" + info_text[0];
    $('#explanation').html(info);
});

window.onload = function () {
    var Imagemap = function (map, img) {
            var n = 0,
                areas = map.getElementsByTagName('area'),
                length = areas.length,
                coords = [];

            for (n = 0; n < length; n++) {
                // Get coords
                coords[n] = areas[n].coords.split(',');
            }
        
            this.resize = function () {
                var n = 0,
                    m, clen,
                    nowWidth = $('#pic').innerWidth(),
                    nowHeight = $('#pic').innerHeight(),
                    ratioWidth = nowWidth / previousWidth,
                    ratioHeight = nowHeight / previousHeight,
                    ratio = ratioHeight > ratioWidth ? ratioWidth : ratioHeight;
                
                for (n = 0; n < length; n++) {
                    for (clen = 0; clen < 4; clen++) {
                        coords[n][clen] = previousCoords[n][clen] * ratio;
                    }
                    areas[n].coords = coords[n].join(',');
                }
                
                pic_resize(ratio);
                return true;
            };
            window.onresize = this.resize;
        },
        imageMap = new Imagemap(document.getElementById('Mymap'), document.getElementById('pic'));          // set for first resize
    
    imageMap.resize();
    return;
}

function pic_resize(ratio){
    var originWidth = 300,
        originHeight = 335,
        originX = 20,
        originY = 45,
        curWidth = originWidth * ratio,
        curHeight = originHeight * ratio,
        curX = originX * ratio,
        curY = originY * ratio;
    
    $('#pic_1').css('width', curWidth);
    $('#pic_1').css('height', curHeight);
    $('#pic_1').css('top', curY);
    $('#pic_1').css('left', curX);
    
}

function random_five() {
    var shuffle = list,
        cnt = shuffle.length,
        j = 0;

    while (cnt--) {
        // choose random position
        j = Math.floor(Math.random() * cnt);

        // swap value from chosen position to indicate position
        var swap = shuffle[j];
        shuffle[j] = shuffle[cnt];
        shuffle[cnt] = swap;
    }

    return shuffle;
}

function initial_timer() {
    // initialize every component
    $('#timer_stop_b').attr('disabled', true);
    $('#timer_start_b').attr('disabled', false);
    $('#timer_text').text('2:00');
    timer_cnt = 1;
    random_five();
    clearInterval(timer_ID);
}

function start_timer() {
    $('#timer_start_b').attr('disabled', true);
    $('#timer_stop_b').attr('disabled', false);
    timer_ID = setInterval(timer_tick, 1000);
}

function stop_timer() {
    initial_timer();
}

function change_pic() {
    // set picture
    $('#pic').attr('src', '/image/Spiderman-2.jpeg');
}

function SecToMin(time) {
    var mins = Math.floor(time / 60);
    var secs = time % 60;
    var sec_s = secs.toString();

    if (secs < 10) {
        sec_s = '0' + sec_s;
    }

    var TimeString = mins + ':' + sec_s;
    $('#timer_text').text(TimeString);
}

function timer_tick() {
    SecToMin(timer - timer_cnt);
    timer_cnt++;
    if (timer_cnt > timer) {
        change_pic();
        initial_timer();
    }
}

// when picture is clicked toggle between two pics
/*
$('#pic').click(
    e => e.target.src = pic_target[e.target.src.match(pic_target[0]) ? 1 : 0]);
*/

function mapclick(count) {
    console.log(count);
}
