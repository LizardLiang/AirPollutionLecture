Date: 20200828

1. use map to add buttons on image
    <img src="source" usemap="#mapname">
    <map name="workmap">
      <area shape="rect" 
            coords="start_left,start_top,end_right,end_button" 
            alt="Text" 
            href="computer.htm">
      <area shape="circle" 
            coords="start_left,start_top,radius" 
            alt="Text" 
            href="computer.htm">
      <area shape="poly" 
            coords="give as many coords as you want" 
            alt="Text" 
            href="computer.htm">
    </map>
    
    size cat:
        rect    -   defines a rectangular region
        circle  -   defines a circular region
        poly    -   defines a polygonal region
        default -   defines the entire region
        
2. Need to change coords according to responsive html might change size settings

3. 為了計算Map 的座標, 需要先知道原圖大小後, 比較現圖的大小, 計算出比例, 必算出縮放後的原點座標, 以及新長寬
   並寫入到 Map 當中。
   
4. 字置中 -> 選擇 display: flex; justify-content: center; align-items: center;

5. 如果想要切換背景顏色 最好是更改他的class 而不是用set 的方式，會導致之前設定的其他效果被覆蓋
    使用 $().removeClass() Or $().addClass()