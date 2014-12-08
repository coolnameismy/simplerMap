


define([
  "dojo/_base/declare",
  "esri/layers/ArcGISTiledMapServiceLayer",
  "esri/toolbars/navigation",
  "simpler/util/GisKit",
   "esri/geometry/Extent"
   
], function (
  declare, Tiled,Navigation,GisKit,Extent
) {
    return declare("simpler.util.MapBase",null, {
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
        },
        //最佳视图
        ShowBestViews: function (carBeans) {
            var points = [];
            for(var i=0;i<carBeans.length;i++)
            {
                points.push({"lng" : carBeans[i].graphic.x , "lat": carBeans[i].graphic.y });
            }
            var leftTopRightBottomPoint =  this._map.GisKit.getLeftTopRightBottomPoint(points);
            //通过extent解决最佳视图问题
            var bestExtent =  new Extent({
                "xmin":leftTopRightBottomPoint[0].lng,"ymin":leftTopRightBottomPoint[1].lat,"xmax":leftTopRightBottomPoint[1].lng,"ymax":leftTopRightBottomPoint[0].lat,
                "spatialReference":{"wkid":4326}}
            );
            this._map.setExtent(bestExtent);
        }
       

    });
});

 