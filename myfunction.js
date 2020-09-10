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


var info_array = ['#info_sunk', '#info_hook', '#info_paint', '#info_win', '#info_shelf', '#info_carpet', '#info_floor', '#info_spray'];


var previousCoords = [
    [
        // sunk
        876.797,
        489.472,
        977.797,
        567.472
    ],
    [
        // hoods
        1173.75,
        276.48,
        1280.75,
        467.48
    ],
    [
        // paint
        125.438,
        194.56,
        237,
        268
    ],
    [
        // window
        583,
        298,
        761,
        486
    ],
    [
        // shelf
        250,
        407,
        520,
        658
    ],
    [
        // carpet
        190,
        750,
        653,
        875
    ],
    [
        // floor
        786,
        734,
        1050,
        1024
    ],
    [
        // spray
        600,
        767,
        729,
        930
    ]
];

var previousWidth = 1280,
    previousHeight = 1024;

// random number
var list = [0, 1, 2, 3, 4, 5, 6, 7];

/* Declare a class for initialize array */
var Enable_item = function(){
    this.item = [false, false, false, false, false, false, false, false];
}

var item = new Enable_item();

// pic dic
var win_pic = ['image/win_0.png', 'image/win_1.png'];
var spray_pic = ['image/spray_0.png', 'image/spray_1.png'];

var array_f = ["#f_b_1", "#f_b_2", "#f_b_3"];
var array_s = ["#s_b_1", "#s_b_2", "#s_b_3"];
var array_c = ["#c_b_1", "#c_b_2", "#c_b_3"];

$(document).ready(function () {
    // initial when loaded
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
                    nowWidth = $('#pic').css('width').replace('px', ''),
                    nowHeight = $('#pic').css('height').replace('px', ''),
                    ratioWidth = nowWidth / previousWidth,
                    ratioHeight = nowHeight / previousHeight;
                console.log(nowWidth);

                for (n = 0; n < length; n++) {
                    for (clen = 0; clen < 4; clen++) {
                        if ((clen % 2) === 0)
                            coords[n][clen] = previousCoords[n][clen] * ratioWidth;
                        else{
                            coords[n][clen] = previousCoords[n][clen] * ratioHeight;
                        }
                    }
                    areas[n].coords = coords[n].join(',');
                }

                return true;
            };
            window.onresize = this.resize;
        },
        imageMap = new Imagemap(document.getElementById('Mymap'), document.getElementById('pic')); // set for first resize

    imageMap.resize();
    return;
}

// shuffle array
function random_five() {
    var shuffle = list,
        cnt = shuffle.length,
        j = 0;
    item = new Enable_item();

    while (cnt--) {
        // choose random position
        j = Math.floor(Math.random() * cnt);

        // swap value from chosen position to indicate position
        var swap = shuffle[j];
        shuffle[j] = shuffle[cnt];
        shuffle[cnt] = swap;
    }

    // set enable items
    for (var i = 0; i < 5; i++) {
        item.item[shuffle[i]] = true;
        if (item.item[shuffle[i]] === false) {
            set_pic(shuffle[i], false);
        }
    }

    // if item is not enable change item pic
    for (var i = 0; i < 8; i++) {
        if (item.item[i] === false) {
            set_pic(i + 1, false);
        }
    }
}

function initial_timer() {
    // initialize every component
    
    // initial button
    $('#timer_stop_b').attr('disabled', true);
    $('#timer_start_b').attr('disabled', false);
    
    $('#message_box').css('visibility', 'hidden');
    // initial score board
    $('#timer_text').text('2:00');
    var text = "得分: 0/5";
    $('#score').text(text);
    
    // intial picture
    initial_pic();
    
    // initial counter
    timer_cnt = 1;
    score = 0;
    
    // initial shuffle
    random_five();
    clearInterval(timer_ID);
}


// initial every picture
function initial_pic() {
    $('#sunk').css('visibility', 'visible');
    $('#hood').attr('src', "image/hood_1.png");
    $('#paint').css('visibility', 'visible');
    $('#win').attr('src', win_pic[1]);
    $('#spray').css('visibility', 'visible')
    var len = array_s.length;
    for (var i = 0; i < len; i++) {
        $(array_s[i]).css('visibility', 'visible');
    }
    var len = array_c.length;
    for (var i = 0; i < len; i++) {
        $(array_c[i]).css('visibility', 'visible');
    }
    var len = array_f.length;
    for (var i = 0; i < len; i++) {
        $(array_f[i]).css('visibility', 'visible');
    }
    
    for(var i = 0; i < info_array.length; i++){
        $(info_array[i]).css('visibility', 'hidden');
    }
}


// if start button is clicked
function start_timer() {
    $('#timer_start_b').attr('disabled', true);
    $('#timer_stop_b').attr('disabled', false);
    is_start = true;
    timer_ID = setInterval(timer_tick, 1000);
}


// if reset is pushed
function stop_timer() {
    is_start = false;
    initial_timer();
}


// Transfer time to Current usage
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

// Time tick count
function timer_tick() {
    SecToMin(timer - timer_cnt);
    timer_cnt++;
    if (timer_cnt > timer) {
        clearInterval(timer_ID);
        for(var i = 0; i < item.item.length; i++){
            if(item.item[i] === true){
                set_pic(i + 1, true);
            }
        }
        
        $('#message_box').text("時間到");
        $('#message_box').css('visibility', 'visible');
        //initial_timer();
    }
}

// Add Event
var map = document.querySelector('map');
map.addEventListener('click', function(e){
    mapclick(parseInt(e.target.id));
}, false);

map.addEventListener('mouseover', function(e){
    var serial = parseInt(e.target.id);
    
    // if item is not in use in this round and game is not started
    if(item.item[serial - 1] === false || is_start === false){
        return false;
    }
    
    // change cursor style
    $('#' + serial).css('cursor', 'pointer');
})


var current_index = 0;  // keep current item clicked
var is_start = false;   // indicate game status
function mapclick(serial) {
    // return if game is set or item is not enable
    if (score >= 5 || item.item[serial - 1] === false || is_start === false)
        return;
    
    // if it's clicked set it to normal
    item.item[serial - 1] = false;

    // set picture
    set_pic(serial, true);

    // set score board
    set_score();
}

// this function is use to set picture to normal mode
function set_pic(serial, isclick) {
    
    // in gaming process show info bubble
    if(isclick)
        $(info_array[serial - 1]).css('visibility', 'visible');
    
    // set picture
    switch (serial) {
        case 1:
            $('#sunk').css('visibility', 'hidden');
            break;
        case 2:
            $('#hood').attr('src', "image/hood_0.png");
            break;
        case 3:
            $('#paint').css('visibility', 'hidden');
            break;
        case 4:
            $('#win').attr('src', win_pic[0]);
            break;
        case 5:
            var len = array_s.length;
            for (var i = 0; i < len; i++) {
                $(array_s[i]).css('visibility', 'hidden');
            }
            break;
        case 6:
            var len = array_c.length;
            for (var i = 0; i < len; i++) {
                $(array_c[i]).css('visibility', 'hidden');
            }
            break;
        case 7:
            var len = array_f.length;
            for (var i = 0; i < len; i++) {
                $(array_f[i]).css('visibility', 'hidden');
            }
            break;
        case 8:
            $('#spray').css('visibility', 'hidden');
            break;
    }
}

// Scores related
var score = 0;
function set_score() {
    score++;
    var text = "得分: " + score + "/5";
    $('#score').text(text);
    if (score >= 5) {
        setTimeout(show_msg, 500);
        clearInterval(timer_ID);
    }
}

// game set
function show_msg() {
    $('#message_box').text("遊戲結束");
    $('#message_box').css('visibility', 'visible');
    //initial_timer();
}

/*
// choose tool to clean up item
function T_box_click(count) {
    // Set current index
    current_index = count;

    // Set class to every tool to make it visual
    for (var i = 0; i < 9; i++) {
        var id_name = "tool_" + i;
        if (i === (count)) {
            // use class to set bg instead of using css directly
            $('#' + id_name).removeClass('tools');
            $('#' + id_name).addClass('greyBg');
        } else
            $('#' + id_name).removeClass('greyBg');
        $('#' + id_name).addClass('tools');
    }
}
*/