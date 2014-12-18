/**
 * Created by liuyanwei on 2014/12/11.
 */



define(["dojo/_base/declare","esri/geometry/webMercatorUtils","esri/symbols/PictureMarkerSymbol","esri/geometry/Point","esri/geometry/Point","esri/graphic"],
    function(declare,webMercatorUtils){
    return declare("simpler.model.BeanBase",null,{

        constructor: function (options) {
            //基础属性
            this.key = options.key || 0;
            this.lat = options.lat || 0;
            this.lng = options.lng || 0;

            //检查是否被继承，重新实现了接口
            if(options.key == undefined || options.key ==""){
                throw new Error("BeanBase初始化Key不能为空 （key为生成的Graphic 的主键)");
            }
            if(options.lat == undefined || options.lat ==""){
                throw new Error("BeanBase初始化lat不能为空 （lat:纬度)");
            }
            if(options.lng == undefined || options.lng ==""){
                throw new Error("BeanBase初始化lng不能为空 （lng:经度)");
            }
        },
        //获取Graphic
        makeGraphic:function(){
            throw new Error("需要自己实现该类的makeGraphic()方法，返回类型是esri.Graphic");
        },
        //显示在图层上
        show:function(layer){
            layer.add();
        },
        //获取mercator坐标
        getMercatorX:function(){
            //墨卡托坐标
            var mercator =  webMercatorUtils.lngLatToXY(this.lng,this.lat);
            return  mercator[0];
        },
        getMercatorY:function(){
            //墨卡托坐标
            var mercator =  webMercatorUtils.lngLatToXY(this.lng,this.lat);
            return  mercator[1];
        }

    })
})
