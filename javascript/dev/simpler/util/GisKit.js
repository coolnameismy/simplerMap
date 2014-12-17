/**
 * Created by liuyanwei on 2014/12/8.
 */


define(["dojo/_base/declare", "esri/geometry/Extent"],function(declare,Extent){
    return declare("simpler.util.GisKit",null,{
        constructor: function(){

        },
        //获取最最上角点和右下角点
        getLeftTopRightBottomPoint : function(points){

            //使用第一个点作为初值
            var left = points[0].lng;
            var right = points[0].lng;
            var top =  points[0].lat;
            var bottom = points[0].lat;

            for(var i=1;i < points.length;i++)
            {
                if(points[i].lng < left) left = points[i].lng;
                if(points[i].lng > right) right = points[i].lng;
                if(points[i].lat > top) top = points[i].lat;
                if(points[i].lat < bottom) bottom = points[i].lat;
            }
            var result = [];
            result.push({"lng" : left , "lat": top });
            result.push({"lng" : right ,"lat": bottom});
            return result;
        },
        //获取扩展extent
        pointsToExtent : function(points,percent){

            if(percent == undefined)
            {
                percent = 1;
            }

            //使用第一个点作为初值
            var left = points[0].lng;
            var right = points[0].lng;
            var top =  points[0].lat;
            var bottom = points[0].lat;

            for(var i=1;i < points.length;i++)
            {
                if(points[i].lng < left) left = points[i].lng;
                if(points[i].lng > right) right = points[i].lng;
                if(points[i].lat > top) top = points[i].lat;
                if(points[i].lat < bottom) bottom = points[i].lat;
            }

            var fixX = (right - left) * (1-percent);
            var fixY = (top - bottom) * (1-percent);

            var result =  new Extent({
                    "xmin":new Number(left)-new Number(fixX),"ymin":new Number(bottom)-new Number(fixY),"xmax":new Number(right)+new Number(fixX),"ymax":new Number(top)+new Number(fixY),
                    "spatialReference":{"wkid":4326}}
            );

            return result;
        },
        //获取多点之间距离和
        GetPiontsDistance:function(latlngs)
        {
            var distance = 0;
            for(var i=1;i<latlngs.length;i++){
                var preLatlng = latlngs[i-1];
                var currLatlng = latlngs[i];
                var d_EarthRadius = 6378.137;
                var radLat1 = this.getRadians(preLatlng.lat);
                var radLat2 = this.getRadians(currLatlng.lat);
                var radLat = this.getRadians(preLatlng.lat) - this.getRadians(currLatlng.lat);
                var radLng = this.getRadians(preLatlng.lng) - this.getRadians(currLatlng.lng);
                var s = 2*Math.asin(Math.sqrt(Math.pow(Math.sin(radLat/2), 2) +
                    Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(radLng/2), 2)));
                s = s*d_EarthRadius;
                s = Math.round(s*10000)/10;
                distance += s;
            }
            return distance;
        },
        //获取弧度
        getRadians:function(d){
            return d*Math.PI/180.0;
        }

    })
})



