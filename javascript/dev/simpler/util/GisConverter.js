//静态工具类

define(["dojo/_base/declare","esri/geometry/webMercatorUtils"],function(declare,webMercatorUtils){
    return ("simpler.util.GisConverter", null, {

        //将一组grometry的路径转化为一组经纬度数组
        ConvertToLatlngArray:function(geometry)
        {
            var latlngArray = [];
            for(var i=0;i<geometry.paths[0].length;i++)
            {
                var point = webMercatorUtils.xyToLngLat(geometry.paths[0][i][0], geometry.paths[0][i][1]);
                var latlng = {lng:point[0],lat:point[1]};
                latlngArray.push(latlng);
            }
             return latlngArray
        }

    }) 
})