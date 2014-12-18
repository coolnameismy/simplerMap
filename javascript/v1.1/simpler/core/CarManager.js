

define(["dojo/_base/declare", "esri/layers/GraphicsLayer", "simpler/model/CarBean","simpler/util/SMHashTable","esri/geometry/Point","esri/toolbars/draw",
    "esri/SpatialReference"],
    function (declare,GraphicsLayer,CarBean,SMHashTable,Point,Draw,SpatialReference)
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
                dojo.connect(this._map, "onMouseWheel", this.handleInfoWindowOffset);

            },
            /*
             methor
             */
            //添加car
            addCar: function(carBean) {
                //判断车辆key是否存在，不存在就添加，存在就更新
                if(this._carHashTable.contains(carBean.key))
                {
                    this.updateCar(carBean);
                }
                else{
                    this._lastAddCar = carBean.makeGraphic();
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
            //修改一组车
            updateCars: function(carBeans) {
                var carManager = this;
                dojo.forEach(carBeans, function (element, index) {
                    carManager.updateCar(element);
                });
            },
            //修改car的位置
            updateLocation: function(key,lng,lat) {
                var car = this._carHashTable.get(key);
                car.geometry.update(lng, lat, lng, lat,new SpatialReference(4326));
                car.draw();
                this._updateInfoWindow(car);
            },
            //修改car的Info
            updateInfo: function(key,attrs) {
                var car = this._carHashTable.get(key);
                if(car !=""){
                    //修改attributes
                    for(var attr in attrs){
                        if(typeof(attr) != "function"){
                            car.attributes[attr] = attrs[attr];
                        }
                    }
                    this._updateInfoWindow(car);
                }
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
                var carBeans = [];
                for(var i=0;i<keys.length;i++)
                {
                    var carBean =  this._carHashTable.get(keys[i]);
                    if(carBean != "")
                    {
                        carBeans.push(carBean);
                    }
                }
                this._map.Basic.ShowBestViews(carBeans);
            },
            //地图选择车辆
            selectCarInArea:function(callback){
                var toolbar = new Draw(this._map, { showTooltips: true });
                toolbar.activate(Draw.RECTANGLE);
                var cars = this._carHashTable.getAll();
                //回叫函数
                dojo.connect(toolbar, "onDrawEnd", function (selectGeometry) {
                    if(callback != undefined)
                    {
                        var result = [];
                        for(var i=0;i<cars.length;i++){
                            if(selectGeometry.getExtent().contains(cars[i].geometry))
                            {
                                result.push(cars[i]);
                            }
                        }
                        callback(result);
                        //var graphic = new esri.Graphic(geometry, new SimpleLineSymbol());
                        //this._drawLayer.add(graphic);
                        toolbar.deactivate();
                    }
                });
            },
            //显示气泡窗口
            showInfoWindow : function(car){
                //更新气泡窗口内容
                var title = car.getTitle();
                var content = car.getContent();
                this._map.infoWindow.setTitle(title);
                this._map.infoWindow.setContent(content);
                //更新气泡窗口位置
                var point = new esri.geometry.Point(car.geometry.x,car.geometry.y);
                this._map.infoWindow.show(point);
            },
            //私有方法  更新气泡窗口
            _updateInfoWindow : function(car){
                if(this._map.infoWindow.isShowing){
                    //更新气泡窗口内容
                    var content = car.getContent();
                    this._map.infoWindow.setContent(content);
                    //更新气泡窗口位置
                    var point = new esri.geometry.Point(car.geometry.x,car.geometry.y);
                    this._map.infoWindow.show(point);
                }
            },


            //event
            //当前地图车辆总数
            ShowCarCount:function(){
                return  this._carHashTable._count;
            },
            //click

            carOnClick :function () {
                console.log("car Click!");
            },
            //处理每次方法缩小后，重新计算infoWindow窗口的位置，否则会出现偏移
            handleInfoWindowOffset :function (e) {
                var themap = this;
                if(themap.infoWindow.isShowing){
                    var point = new esri.geometry.Point(themap.infoWindow.features[0].geometry.x,themap.infoWindow.features[0].geometry.y);
                    themap.infoWindow.show(point);
                 }
            }

        })

    })





 
 