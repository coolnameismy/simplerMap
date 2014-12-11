/**
 * Created by liuyanwei on 2014/12/3.
 */

define(["dojo/_base/declare","simpler/model/BeanBase","esri/symbols/PictureMarkerSymbol","esri/geometry/Point","esri/geometry/Point","esri/graphic"],function(declare,BeanBase){
    return declare("simpler.model.CarBean",BeanBase,{
//
//
        constructor: function (options) {

             //属性
             this.status = options.status || 0;
             this.speed = options.speed || 0;
             this.carType = options.carType || "car";
             this.carNo = options.carNo || "";
             this.color = options.color || 1;
             this.aspect = options.aspect || 0;
             this.icon =  options.icon || "";

        },
        //获取Graphic
        makeGraphic:function(){
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
})
