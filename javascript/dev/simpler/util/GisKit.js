/**
 * Created by liuyanwei on 2014/12/8.
 */


define(["dojo/_base/declare"],function(declare){
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
        }

    })
})



