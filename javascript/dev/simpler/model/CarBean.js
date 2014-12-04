/**
 * Created by liuyanwei on 2014/12/3.
 */

define(["dojo/_base/declare","esri/symbols/PictureMarkerSymbol","esri/geometry/Point","esri/geometry/Point","esri/graphic"],function(declare){
    return declare("simpler.model.CarBean",null,{
//
//
        constructor: function (options) {

            //检查是否被继承，重新实现了接口
//            if(this.graphic == "undefined" ){
//               // throw new Error("需要自己实现该类的graphic属性，类型是esri.Graphic");
//            }

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

            //this.makeGraphic
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
            infoTemplate.setContent(" <div> 速度:${speed}</div> <div> 车辆类型:${carType}</div> <div> 车牌号码:${carNo}</div> <div> 车牌颜色:${color}</div> ");
            //this.graphic = new esri.Graphic(this.geometry, this.symbol);
            this.graphic = new esri.Graphic(this.geometry, this.symbol, attr, infoTemplate);
            this.graphic.prototype = {
                //设置图标扩展属性
                key: this.key
            };
            //创建图像
            return this.graphic;
        }
    })
})
