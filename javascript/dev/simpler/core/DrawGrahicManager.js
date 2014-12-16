/**
 * Created by liuyanwei on 2014/12/16.
 */


define(["dojo/_base/declare", "esri/layers/GraphicsLayer","esri/geometry/Point","esri/toolbars/draw","esri/symbols/SimpleLineSymbol","simpler/util/GisConverter"],
    function (declare,GraphicsLayer,Point,Draw,SimpleLineSymbol,GisConverter)
    {
        return declare("simpler.core.DrawGrahicManager", null, {
            //构造函数
            constructor: function (map) {
                //初始化数据
                this._map =  map;
                //添加绘图层
                this._drawLayer = new GraphicsLayer();
                this._map.addLayer(this._drawLayer);
            },

            /*
             methor
             */
            //添加多边形
            drawPloyLine: function(callback) {
                var toolbar = new Draw(this._map, { showTooltips: true });
                toolbar.activate(Draw.POLYLINE);
                //回叫函数
                dojo.connect(toolbar, "onDrawEnd", function (geometry) {
                    if(callback != undefined)
                    {
                        callback(GisConverter.ConvertToLatlngArray(geometry));
                        //var graphic = new esri.Graphic(geometry, new SimpleLineSymbol());
                        //this._drawLayer.add(graphic);
                        toolbar.deactivate();
                    }
                });
            }

        })

    })






