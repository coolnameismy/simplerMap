/// <reference path="../jsapi_vsdoc_v31c.js" />

//基础地图
var map;
//地图车辆图层
var carLayer;
//地图服务组件
var mapBase, makerManager;
//当前地图数组
var mapLayers = [];
//地图导航
var mapNavigation;

 
//初始化地图代码
dojo.ready(mapInit);

//地图初始化
function mapInit() {

    require([
      "esri/map",
      "esri/layers/ArcGISTiledMapServiceLayer",
      "esri/layers/GraphicsLayer",
      "dojo/parser",
      "dojo/dom",
      "dojo/dom-construct",
      "esri/dijit/PopupMobile",
      "dojo/domReady!",

      "http://localhost/Demo/myModules/InfoWindow.js",
       "/Scripts/map/util/MapBase.js",
       "/Scripts/map/core/CarLayer.js",
       "/Scripts/map/PureMap.js"

    ],
        function (Map, Tiled, GraphicsLayer, parser,dom,
       domConstruct,
       PopupMobile,
       domReady,

       InfoWindow, MapBase, CarLayer, PureMap) {

            parser.parse();

            map = new Map("map", {
                center: [118, 30.5],
                zoom: 4,
                logo: false,
                //设置地图级别
                minZoom: 4,
                maxZoom:18
              
            });

          
            //var infoWindow = new InfoWindow({
            //    domNode: domConstruct.create("div", null, dom.byId("map"))
            //});
            //map.infoWindow = infoWindow;


            ////初始化地图服务
            var tiled = new Tiled("http://www.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer");
            map.addLayer(tiled);
            mapLayers.push(tiled);
          
            
            //初始化自定义图层
            carLayer = new CarLayer();//地图层
            map.addLayer(carLayer);
         

            //地图加载完成事件
            map.on("load", function () {
                console.log("地图加载完成");
                

                //初始化地图样式
                InitMapStyle();

                //初始化各种组件
                mapBase = new MapBase(map);
                markerManager = new MarkerManager(map,carLayer);

                //增加地图时间监听
                dojo.connect(map, "onClick", showCoordinates);

                //测试方法
                testAddCar();
                testAddInfowindows();
            });
            
        }
      );
}

//测试添加marker
function testAddCar() {

    var bean = new CarData();
    bean.lat = "32";
    bean.lng = "118";
    bean.status = "0";
    bean.speed = "80";
    bean.carType = "car";
    bean.carNo = "苏A21332";
    bean.color = "1";
    bean.aspect = "5";
    bean.id = bean.carNo + "_" + bean.color;

    markerManager.addCar(bean);
    //mapBase.setMapCenter(bean.lng,bean.lat);

}
//测试添加信息窗口
function testAddInfowindows() {

    var template = new esri.InfoTemplate();
    
    //template.setTitle(getTextTitle);
    template.setTitle("${carNo}");
    template.setContent(getTextContent);
    carLayer.setInfoTemplate(template);
    map.infoWindow.resize(200, 100);

}

function getTextContent(graphic) {
    return graphic.prototype.content;
}
function getTextTitle(graphic) {
    return graphic.prototype.title;
}

//地图外观配置
this.InitMapStyle = function (type) {
    require([
        "esri/dijit/OverviewMap",
        "esri/dijit/Scalebar"
       
    ],
     function (OverviewMap, Scalebar) {

         //设置比例尺
         var scalebar = new esri.dijit.Scalebar({ map: map, attachTo: "bottom-left" })
         //设置地图鹰眼
         var overviewMapDijit = new OverviewMap({
             map: map,
             attachTo: "bottom-right",
             color: " #D84E13",
             opacity: .40
         });
         overviewMapDijit.startup(function () {
         });
        
     })
}

//地图事件

//地图点击事件
function showCoordinates(evt) {
    var mp = evt.mapPoint;
    var screenPt = map.toScreen(mp);

    //alert("屏幕坐标(x,y):" + "(" + screenPt.x + "," + screenPt.y + ")");
    //alert("地图坐标(x,y):" + "(" + mp.x + "," + mp.y + ")");
 
}
  