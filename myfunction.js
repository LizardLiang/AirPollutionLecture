var origin_w = window.innerWidth;
var origin_h = window.innerHeight;

var timer = 2 * 5; // timer for 2 mins
var timer_cnt = 1;
var timer_ID;
var info_title = ['臭氧(O3)',
                    '甲醛(HCHO)',
                    '總揮發性有機化合物(TVOC)',
                    '懸浮微粒(PM10)',
                    '甲醛(HCHO)',
                    '一氧化碳(CO)',
                    '總揮發性有機化合物(TVOC)',
                    '細菌(Bacteria)']

// information text
var info_text = ['避免在人員於室內時開啟，使用後加強室內通風',
                 '使用綠建材標章產品，並加強室內通風',
                 '例行清潔應減少使用木質地板蠟; 使用中及使用完畢後，加強室內通風',
                 '定期清潔地毯，避免灰塵累積',
                 '使用綠建材標章產品; 置入期間加強室內通風',
                 '使用瓦斯燃燒設備時，開啟抽油煙機並關閉同側窗戶',
                 '使用綠建材標章產品; 使用中及使用完畢後，加強室內通風',
                 '水槽保持乾燥避免微生物孳生; 廁所內裝置排風扇有助於濕氣及異味排出']


// random number
var max_item = 5;
var list = [0, 1, 2, 3, 4, 5, 6, 7]

// pic dic
var pic_target = ['/image/Spiderman-1.jpg', '/image/Spiderman-2.jpeg']

$(document).ready(function () {
    // initial when loaded
    origin_h = window.innerHeight;
    origin_w = window.innerWidth;
    initial_timer();
    var info = info_title[0] + "<br/>" + info_text[0];
    $('#explanation').html(info);
    console.log("1" + origin_w);
})

function random_five() {
    var shuffle = list;
    var cnt = shuffle.length;
    var j = 0;

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
    initial_timer()
}

function timer_tick() {
    SecToMin(timer - timer_cnt);
    timer_cnt++;
    if (timer_cnt > timer) {
        change_pic();
        initial_timer();
    }
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

// when picture is clicked toggle between two pics
$('#pic').click(
    e => e.target.src = pic_target[e.target.src.match(pic_target[0]) ? 1 : 0]);

window.addEventListener('resize', resize_container);

function resize_container() {
    // for resizing
}
