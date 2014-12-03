

function CarData()
{
    //基础属性
    this.lat;
    this.lng;
    this.status;
    this.speed;
    this.carType;
    this.carNo;
    this.color;
    this.aspect;
    this.id;
    //图形属性
    this.graphicAngle = 0;
    this.graphicOffset = 0;
    this.icon = "http://localhost/assets/map/image/cars/greencar.png";
    //其他属性
   
    
    //私有属性

    //获取geometry
    this.getGeometry = function () {
        return new esri.geometry.Point(this.lng, this.lat);
    }
    //获取Graphic
    this.getGraphic = function () {
        this.symbol = new esri.symbol.PictureMarkerSymbol(this.icon, 20, 33).setAngle(0).setOffset(0, 0);
        this.geometry = this.getGeometry();
        this.graphic = new esri.Graphic(this.geometry, this.symbol);
        this.graphic.attributes = { "carNo": "苏A1234" };
        var inforContent =  " <div> 速度："+ this.speed +"</div>"+
                      " <div> 车辆类型："+ this.carType +"</div>"+
                      " <div>车牌号码："+ this.carNo +"</div>"+
                      " <div>车牌颜色"+ this.color +"</div>"+
                       "<div>其他：</div>"; 
        this.graphic.prototype = {
            //设置地图中心点
            title: this.carNo,
            content: inforContent
           
        }
       

        //this.graphic.on("click", function (e) {
        //    //get the associated node info when the graphic is clicked
        //    var node = e.graphic.getNode();
        //    console.log(node);
        //});

        return this.graphic;
    }
}
 