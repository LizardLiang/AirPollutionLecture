var cnt = 0;
var id_container = [];

function show_p(id){
    // 點擊按鈕後顯示
    document.getElementById(id).style.visibility='visible';
    cnt++;
    
    // to keep which card is clicked
    id_container[cnt] = id;
    
    // if there's two card clicked compare thems
    if(cnt == 2){
        var res = compare(id_container[1], id_container[2]);
        
        // if compare fail set them to hidden
        if(!res){
            $('#' + id_container[1]).css("visibility", "hidden");
            $('#' + id_container[2]).css("visibility", "hidden");
        }
        cnt = 0;
    }
}

function compare(id1, id2){
    // fetch both text
    var value_1 = $('#' + id1).text();
    var value_2 = $('#' + id2).text();
    
    if (value_1 == value_2) {
        return true;
    }
    else{
        return false;
    }
}

function hideall(){
    // if reset button is clicked set back to initial status
    $("#p1").css('visibility', 'hidden');
    $("#p2").css('visibility', 'hidden');
    $("#p3").css('visibility', 'hidden');
    $("#p4").css('visibility', 'hidden');
    $("#p5").css('visibility', 'hidden');
    $("#p6").css('visibility', 'hidden');
    cnt = 0;
}