 

define(["dojo/_base/declare", "esri/layers/GraphicsLayer", "simpler/model/CarBean"],
function (declare,GraphicsLayer,CarBean)
{
    return declare("simpler.util.CarManager", null, {
        //构造函数
        constructor: function (map) {
            //初始化数据
            this._map =  map;
            //添加车辆层
            this._carLayer = new GraphicsLayer();
            this._map.addLayer(this._carLayer);
            //当前地图添加的车辆
            this._currCars = [];
            //最后一次添加的车辆
            this._lastAddCar;
            //注册车辆点击事件
            dojo.connect(this._carLayer, "onClick", this.carOnClick);

        },
        /*
        methor
        
        */

        //添加car
        addCar: function(carBean) {
            this._lastAddCar = carBean.makeGraphic();
            this._carLayer.add(this._lastAddCar);
            this._currCars.push(this._lastAddCar);

        },

        //event

        //click
        carOnClick :function () {
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







 
 