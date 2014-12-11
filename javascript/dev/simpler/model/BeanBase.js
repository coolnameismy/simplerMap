/**
 * Created by liuyanwei on 2014/12/11.
 */
/*

define(["dojo/_base/declare","esri/symbols/PictureMarkerSymbol","esri/geometry/Point","esri/geometry/Point","esri/graphic"],function(declare){
    return declare("simpler.model.BeanBase",null,{
//
//
        constructor: function (options) {

            //基础属性
            this.key = options.key || 0;
            this.lat = options.lat || 0;
            this.lng = options.lng || 0;
            this.status = options.status || 0;
            this.speed = options.speed || 0;
            this.carType = options.carType || "car";
            this.carNo = options.carNo || "";
            this.color = options.color || 1;
            this.aspect = options.aspect || 0;
            this.icon =  options.icon || "";
            this.graphic = this._makeGraphic();
            //图形属性
//            this.graphicAngle = 0;
//            this.graphicOffset = 0;
//            this.icon = "http://localhost/assets/map/image/cars/greencar.png";
            //其他属性

            //检查是否被继承，重新实现了接口
            if(this.graphic == undefined ){
                throw new Error("需要自己实现该类的graphic属性，类型是esri.Graphic");
            }
            if(options.key == undefined || options.key ==""){
                throw new Error("CarBean初始化Key不能为空 （key是主键，图层管理中删除、更新、查找方法的依据)");
            }
        },
        //获取Graphic
        _makeGraphic:function(){
            this.symbol = new esri.symbol.PictureMarkerSymbol(this.icon, 20, 33).setAngle(0).setOffset(0, 0);
            this.geometry = esri.geometry.Point(this.lng, this.lat);
            var attr = {
                "carNo": this.carNo,
                "speed":this.speed,
                "lat": this.lat,
                "lng": this.lng,
                "status": this.status,
                "carType": this.carType,
                "color": this.color,
                "aspect": this.aspect
            };
            //信息窗口
            var infoTemplate = new esri.InfoTemplate();
            infoTemplate.setTitle("${carNo}");
            infoTemplate.setContent(" <div> 速度:${speed}</div> <div> 车辆类型:${carType}</div> <div> 车牌号码:${carNo}</div> <div> 车牌颜色:${color}</div> " +
                "<div> 经度:${lng}   纬度:${lat}</div> ");
            //this.graphic = new esri.Graphic(this.geometry, this.symbol);
            this.graphic = new esri.Graphic(this.geometry, this.symbol, attr, infoTemplate);

            //创建图像
            return this.graphic;
        }
    })
})*/




define(["dojo/_base/declare","esri/symbols/PictureMarkerSymbol","esri/geometry/Point","esri/geometry/Point","esri/graphic"],function(declare){
    return declare("simpler.model.BeanBase",null,{

        constructor: function (options) {
            //基础属性
            this.key = options.key || 0;
            this.lat = options.lat || 0;
            this.lng = options.lng || 0;
            //this.graphic = this.makeGraphic();

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
        _makeGraphic:function(){
            throw new Error("需要自己实现该类的makeGraphic()方法，返回类型是esri.Graphic");
        }
    })
})
