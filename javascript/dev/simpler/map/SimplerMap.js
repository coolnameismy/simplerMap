
define(["dojo/_base/declare", "esri/map", "simpler/util/MapBase", "esri/layers/ArcGISTiledMapServiceLayer", "simpler/core/CarManager",
        "esri/layers/GraphicsLayer","simpler/util/GisKit","simpler/core/DrawGrahicManager","esri/SpatialReference"],
    function (declare, Map, MapBase,Tiled,CarLayerManager,GraphicsLayer,UnitGisKit,DrawGrahicManager,SpatialReference) {
        return declare("simpler.map.SimplerMap", Map, {
            //构造函数
            constructor: function () {
                //初始化默认地图图层
                this.InitService();
                //初始化基础功能类库
                this.Basic = new MapBase(this);
                //车辆管理服务类
                this.CarManager = new CarLayerManager(this);
                //画图层
                this.DrawManager = new DrawGrahicManager(this);
                //GisKit工具
                this.GisKit = new UnitGisKit();
                //定义空间坐标系
                this.sr4326 = new SpatialReference(4326);
            },
            
            //地图服务配置
            InitService: function () {
                var tiled = new Tiled("http://www.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer");
                this.addLayer(tiled);
                //mapLayers.push(tiled);

            },
            //地图外观配置
            InitMapStyle : function (map) {
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
            },

            //地图事件
//            onClick: function () {
//                //客户端增加地图时间监听方法 dojo.connect(map, "onClick", clickHander);
//                var mp = evt.mapPoint;
//                var screenPt = map.toScreen(mp);
//                //alert("屏幕坐标(x,y):" + "(" + screenPt.x + "," + screenPt.y + ")");
//                //alert("地图坐标(x,y):" + "(" + mp.x + "," + mp.y + ")");
//            },
            onLoad:function () {
                 //alert("123");
                //初始化地图样式
                this.InitMapStyle(this);

            }
        })
    })












