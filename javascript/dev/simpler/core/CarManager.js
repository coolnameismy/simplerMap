 

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
            //this._carMap = new
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
            this._lastAddCar = carBean.graphic;
            this._carLayer.add(this._lastAddCar);
            this._currCars.push(this._lastAddCar);

        },
        //删除car
        removeCar: function(key) {
             for(var i=0;i<this._currCars.length;i++){
                 if(key == this._currCars[i].prototype.key){
                     this._carLayer.remove(this._currCars[i]);
                 }
             }

        },
        //修改car
        UpdateCar: function(carBean) {
//            this.removeCar(carBean.key);
//            this.addCar(carBean);

        },
        //event

        //click
        carOnClick :function () {
            console.log("car Click!");
        }
       
    })

})





 
 