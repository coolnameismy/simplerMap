/**
 * Created by liuyanwei on 2014/12/12.
 */
/**
 * Created by liuyanwei on 2014/12/3.
 */

define(["dojo/_base/declare","simpler/model/BeanBase","esri/symbols/PictureMarkerSymbol","esri/geometry/Point","esri/geometry/Point","esri/graphic"],function(declare,BeanBase){
    return declare("simpler.model.CluterBeanBase",BeanBase,{
//
        constructor: function (options) {
            //属性
            this.beans = [];
            this.isClustered = true;
            this.icon = "http://static.arcgis.com/images/Symbols/Shapes/GreenPin1LargeB.png";
        },
        //获取Graphics
        makeGraphics:function(){
            throw new Error("需要自己实现该类的makeGraphics()方法，返回类型是esri.Graphic的数组");
        }
        /* ,
        //获取Graphic
        makeGraphic:function(){

        }*/
    })
})
