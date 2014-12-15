define(["dojo/_base/declare"],function(declare){
    return declare("simpler.util.GisConverter", null, {
        //构造函数
        constructor: function () {

        },
        //投影坐标转换为地理坐标
        MercatorToLngLat:function(X,Y) {
        var PI = Math.PI;
        var  x = parseFloat(X)/20037508.34*180;  
        var y = parseFloat(Y) / 20037508.34 * 180;
        y = 180 / parseFloat(PI) * (2 * Math.atan(Math.exp(parseFloat(y) * parseFloat(PI) / 180)) - parseFloat(PI) / 2);
        return x + ":" + y;
        },
        LngLatToMercator : function(X,Y) {
            var PI = Math.PI;
            var  x = parseFloat(X) * 20037508.34*180;
            var  y = parseFloat(Y) *  20037508.34 * 180;
            y = 180 / parseFloat(PI) * (2 * Math.atan(Math.exp(parseFloat(y) * parseFloat(PI) / 180)) - parseFloat(PI) / 2);
            return x + ":" + y;
       }
    }) 
})