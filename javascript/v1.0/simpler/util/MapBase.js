


define([
  "dojo/_base/declare",
  "esri/layers/ArcGISTiledMapServiceLayer",
   "esri/toolbars/navigation"
   
], function (
  declare, Tiled
) {
    return declare("jtjd.map.util.MapBase",null, {
        constructor: function (map) {
            this._map = map;
            this._mapLayers = [];
            this._mapNavigation = new esri.toolbars.Navigation(map);
        },
       
            
        //设置地图级别
        setMapZoom : function (zoom) {
            this._map.setZoom(zoom);
        },
        //设置地图中心点
        setMapCenter : function (lng, lat) {
            this._map.centerAt(new esri.geometry.Point(lng, lat));
        },
        //删除当前地图
        removeAllMapLayers: function () {
            var map = this._map;
            dojo.forEach(this._mapLayers, function (element, index) {
                map.removeLayer(element);
            });
        },
        //切换地图
        changeMapLayer : function (type) {
            this.removeAllMapLayers();
            if (type == "HX") {
                //鸿信地图
                var hxLayers = new Tiled("http://202.102.112.17:6080/arcgis/rest/services/mapmercator/MapServer");
                this._map.addLayer(hxLayers);
                this._mapLayers.push(hxLayers);
            }
            if (type == "OSM") {
                //街景地图层 OSM
                var osmLayers = new esri.layers.OpenStreetMapLayer();
                this._map.addLayer(osmLayers);
                this._mapLayers.push(osmLayers);
            }
            if (type == "DX") {
                //地形地图 TODO暂时不能使用
                var dxLayers = new Tiled("http://server.arcgisonline.com/ArcGIS/rest/services/NGS_Topo_US_2D/MapServer");
                this._map.addLayer(dxLayers,999);
                this._mapLayers.push(dxLayers);
            }
        },
        //上一视图
        ShowNextViews: function () {
            this._mapNavigation.zoomToNextExtent();
        },
        //下一视图
        ShowPrevViews: function () {
            this._mapNavigation.zoomToPrevExtent();
        }

       

    });
});


//function MapBase(map)
//{
//    require([
//       "esri/layers/ArcGISTiledMapServiceLayer"
//    ],
//    function (Tiled) {

//        this._map = map;
//        //私有方法和属性


//        //设置地图级别
//        this.setMapZoom = function (zoom) {
//            this._map.setZoom(zoom);
//        }
//        //设置地图中心点
//        this.setMapCenter = function (lng, lat) {
//            map.centerAt(new esri.geometry.Point(lng, lat));
//        }

//        //地图鹰眼显示
//        //this.addOverviewMap = function() {
//        //    var over = 
//        //    {
//        //        map: this._map,
//        //        attachTo: "bottom-right",
//        //        color: "#D84E13",
//        //        expandFactor:2,
//        //        baseLayer:new esri.layers.ArcGISTiledMapServiceLayer(carLayer)
//        //        };
//        //        var MapViewer = new esri.dijit.OverviewMap(over, dojo.byId("OverViewDiv"));
//        //        MapViewer.startup();
//        //    }

//        //删除当前地图
//        this.removeAllMapLayers = function () {
//            dojo.forEach(mapLayers, function (element, index) {
//                map.removeLayer(element);
//            });
//        }
//        //切换地图
//        this.changeMapLayer = function (type) {
//            require([
//           "esri/layers/ArcGISTiledMapServiceLayer"
//            ],
//             function (Tiled) {
//                 this.removeAllMapLayers();

//                 if (type == "HX") {
//                     //鸿信地图
//                     var hxLayers = new Tiled("http://202.102.112.17:6080/arcgis/rest/services/mapmercator/MapServer");
//                     map.addLayer(hxLayers);
//                     mapLayers.push(hxLayers);
//                 }
//                 if (type == "OSM") {
//                     //街景地图层 OSM
//                     var osmLayers = new esri.layers.OpenStreetMapLayer();
//                     map.addLayer(osmLayers);
//                     mapLayers.push(osmLayers);
//                 }
//             })
//        }
//        //切换地图
//        this.changeMapLayer1 = function (type) {
//            this.removeAllMapLayers();
//            if (type == "HX") {
//                //鸿信地图
//                var hxLayers = new esri.layers.ArcGISTiledMapServiceLayer("http://202.102.112.17:6080/arcgis/rest/services/mapmercator/MapServer");
//                map.addLayer(hxLayers);
//                mapLayers.push(hxLayers);
//            }
//            if (type == "OSM") {
//                //街景地图层 OSM
//                var osmLayers = new esri.layers.OpenStreetMapLayer();
//                map.addLayer(osmLayers);
//                mapLayers.push(osmLayers);
//            }
//        }


//    })
//}
    
 













//共有方法和属性
//MapBase.prototype =
//{
//     设置地图中心点
//    setMapCenter: function (lng, lat) {
//        map.centerAt(new esri.geometry.Point(lng, lat));
//    }
//}
//静态方法
//MapBase.info = function () {
//    console.log("thie is map base function")
//}


 