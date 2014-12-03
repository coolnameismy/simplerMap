
var map, myLayer;

$(function () {
    //初始化地图代码
    mapInit()
  
})

//地图初始化
function mapInit() {

    require([
      "esri/map",
      "esri/layers/ArcGISTiledMapServiceLayer",
      "esri/layers/GraphicsLayer",
      "dojo/parser",


      "dojo/domReady!"
      
    ],
        function (Map, Tiled, GraphicsLayer, parser) {

            parser.parse();

            map = new Map("map", {
                center: [118, 34.5],
                zoom: 8,
                basemap: "topo"

            });
            //mymap = new Map("map");
            ////初始化地图服务
            var tiled = new Tiled("http://202.102.112.17:6080/arcgis/rest/services/mapmercator/MapServer");
            map.addLayer(tiled);
            //初始化自定义图层
            myLayer = new esri.layers.GraphicsLayer();
            map.addLayer(myLayer);

            //地图加载完成事件
            map.on("load", function () {
                console.log("load");
            });
        }
      );

}


       //画一条线的方法

        function addLine() {
            var markerSymbol = new esri.symbol.MarkerSymbol();
            var myLine = {
                geometry: {
                    "paths": [[[116.328125, 32.40625], [119.3359375,36.328125]]],
                    "spatialReference": { "wkid": 4326 }
                },
                "symbol": { "color": [0, 0, 0, 255], "width": 1, "type": "esriSLS", "style": "esriSLSSolid" }
            };
            var myGraphic = new esri.Graphic(myLine);
            myLayer.add(myGraphic);
        }

        //添加一个marker
        function addmarker(lng, lat) {

            var symbol = new esri.symbol.PictureMarkerSymbol('http://localhost:31214/Images/orderedList0.png', 50, 50).setAngle(315).setOffset(10, 0)
            var geometry = new esri.geometry.Point(lng, lat);
            //map.graphics.add(new esri.Graphic(geometry, symbol));
            myLayer.add(new esri.Graphic(geometry, symbol));
            setMapCenter(lng, lat);
        }
      