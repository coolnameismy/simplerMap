 

define(["dojo/_base/declare", "esri/layers/GraphicsLayer"], function (declare,GraphicsLayer)
{
    return declare("jtjd.map.util.CarLayer", GraphicsLayer, {
        //构造函数
        constructor: function () {

        },
        /*
        methor
        
        */

        //添加marker
        addmarker: function(lng, lat) {

            var symbol = new esri.symbol.PictureMarkerSymbol('http://localhost:31214/Images/orderedList0.png', 50, 50).setAngle(315).setOffset(10, 0)
            var geometry = new esri.geometry.Point(lng, lat);
            //map.graphics.add(new esri.Graphic(geometry, symbol));
            this.add(new esri.Graphic(geometry, symbol));
            
        },
        //event

        //click
        onClick :function () {
            console.log("car Click!");
        }
       
    })

})

 


//function MarkerManager(map,carLayer)
//{

//    this._map = map;
//    this._layer = carLayer;
//    this.graphics = [];

    

//    //添加marker
//    //function addmarker(lng, lat) {

//    //    var symbol = new esri.symbol.PictureMarkerSymbol('http://localhost:31214/Images/orderedList0.png', 50, 50).setAngle(315).setOffset(10, 0)
//    //    var geometry = new esri.geometry.Point(lng, lat);
//    //    //map.graphics.add(new esri.Graphic(geometry, symbol));
//    //    myLayer.add(new esri.Graphic(geometry, symbol));
//    //    setMapCenter(lng, lat);
//    //}

//    //增加地图上的车辆
//    this.addCar = function (carData) {
//        var myGraphic = carData.getGraphic();
//        this.graphics.push(myGraphic);
//        this._layer.add(myGraphic);
//    }
//    //清空地图上的车辆
//    this.clean = function () {
//        this.graphics.length = 0;
//        this._layer.clear();

//    }



  

//}







 
 