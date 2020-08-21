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
                    '細菌(Bacteria)']

var info_text = ['避免在人員於室內時開啟，使用後加強室內通風',
                 '使用綠建材標章產品，並加強室內通風',
                 '例行清潔應減少使用木質地板蠟; 使用中及使用完畢後，加強室內通風',
                 '定期清潔地毯，避免灰塵累積',
                 '使用綠建材標章產品; 置入期間加強室內通風',
                 '使用瓦斯燃燒設備時，開啟抽油煙機並關閉同側窗戶',
                 '使用綠建材標章產品; 使用中及使用完畢後，加強室內通風',
                 '水槽保持乾燥避免微生物孳生; 廁所內裝置排風扇有助於濕氣及異味排出']

var max_item = 5;
var list = [0, 1, 2, 3, 4, 5, 6, 7]

$(document).ready(function () {
    initial_timer();
    var info = info_title[0] + "<br/>" + info_text[0];
    $('#explanation').html(info);
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
    $('#timer_stop_b').attr('disabled', true);
    $('#timer_start_b').attr('disabled', false);
    $('#timer_text').text('2:00');
    timer_cnt = 1;
    random_five();
}

function start_timer() {
    $('#timer_start_b').attr('disabled', true);
    $('#timer_stop_b').attr('disabled', false);
    timer_ID = setInterval(timer_tick, 1000);
}

function stop_timer() {
    clearInterval(timer_ID);
    initial_timer()
}

function timer_tick() {
    SecToMin(timer - timer_cnt);
    timer_cnt++;
    if (timer_cnt > timer) {
        initial_timer()
    }
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
