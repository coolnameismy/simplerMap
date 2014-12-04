 

define(["dojo/_base/declare", "esri/layers/GraphicsLayer", "simpler/model/CarBean","simpler/util/SMHashTable","esri/geometry/Point"],
function (declare,GraphicsLayer,CarBean,SMHashTable,Point)
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
            this._carHashTable = new SMHashTable();
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
            this._carHashTable.set(carBean.key,this._lastAddCar);
        },
        //添加 多辆车
        addCars: function(carBeans) {
            dojo.forEach(carBeans, function (element, index) {
               this.addCar(element);
            });
        },
        //删除car
        removeCar: function(key) {
            var theCar = this._carHashTable.get(key);
            this._carLayer.remove(theCar);
            this._carHashTable.remove(key);
        },
        //删除全部car
        removeAllCar: function(key) {
            map.carManager._carLayer.clear();
            this._carHashTable.clear();
        },
        //修改car
        updateCar: function(carBean) {
//            this.removeCar(carBean.key);
//            this.addCar(carBean);

        },
        //查找一辆车
        findCar:function(key){
            var theCar = this._carHashTable.get(key);
            if(theCar != "")
            {
                //map.BaseFunction.setMapCenter(car1.geometry.x,car1.geometry.y)
                //map.centerAt(new Point(car1.geometry.x,car1.geometry.y));
                this._map.setZoom(9);
                this._map.centerAt(new Point(theCar.geometry.x,theCar.geometry.y));
            }
        },
        //查找一组车
        findCars:function(keys){
            //TODO:实现最佳视图显示
            //MapBase.ShowBestView();
        },
        //event

        //click
        carOnClick :function () {
            console.log("car Click!");
        }
       
    })

})





 
 