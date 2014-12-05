 

define(["dojo/_base/declare", "esri/layers/GraphicsLayer", "simpler/model/CarBean","simpler/util/SMHashTable","esri/geometry/Point"],
function (declare,GraphicsLayer,CarBean,SMHashTable,Point)
{
    return declare("simpler.core.CarManager", null, {
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
            //判断车辆key是否存在，不存在就添加，存在就更新
            if(this._carHashTable.contains(carBean.key))
            {
                updateCar(carBean);
            }
            else{
                this._lastAddCar = carBean.graphic;
                this._carLayer.add(this._lastAddCar);
                this._carHashTable.set(carBean.key,this._lastAddCar);
            }
        },
        //添加 多辆车
        addCars: function(carBeans) {
            var carManager = this;
            dojo.forEach(carBeans, function (element, index) {
                carManager.addCar(element);
            });
        },
        //删除car
        removeCar: function(key) {
            var theCar = this._carHashTable.get(key);
            this._carLayer.remove(theCar);
            this._carHashTable.remove(key);
        },
        //删除 一组car
        removeCars: function(keys) {
            var carManager = this;
            dojo.forEach(keys, function (element, index) {
                carManager.removeCar(element);
            });
        },
        //删除全部car
        removeAllCar: function(key) {
            this._carLayer.clear();
            this._carHashTable.clear();
        },
        //修改car
        updateCar: function(carBean) {
            this.removeCar(carBean.key);
            this.addCar(carBean);
        },
        updateCars: function(carBeans) {
            var carManager = this;
            dojo.forEach(carBeans, function (element, index) {
                carManager.updateCar(element);
            });
        },
        //查找一辆车
        findCar:function(key,zoom){
            if(zoom == undefined)
            {
                zoom = 15;
            }
            var theCar = this._carHashTable.get(key);
            if(theCar != "")
            {
                this._map.setZoom(zoom);
                this._map.centerAt(new Point(theCar.geometry.x,theCar.geometry.y));
            }
        },
        //查找一组车
        findCars:function(keys){
            //TODO:实现最佳视图显示
            //MapBase.ShowBestView();
        },
        //event
        //当前地图车辆总数
        ShowCarCount:function(){
          return  this._carHashTable._count;
        },
        //click
        carOnClick :function () {
            console.log("car Click!");
        }
       
    })

})





 
 