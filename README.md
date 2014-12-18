simplerMap
==========

基于arcgis开发的一套gis底层api，简化arcgis复杂api的使用,适合GIs相关应用开发

================当前版本更新=================================================================
版本：v1.1
1: 增加最佳视图方法，并可以设置最佳视图的百分比
2：增加查找多辆车，自动配置最佳视图
3：增加图标汇聚图层
4：增加汇聚图标示例，更新原有示例文件，并加入新功能展示
5：精简汇聚图层代码
6：添加画图方法（多边形、矩形、圆形），返回值转换为latlng数组并返回
7：添加测距、测周长功能
8：车辆管理层，增加地图区域选车功能
9：解决地图放大后arcgis气泡窗口偏移的问题
10：增加更新车辆位置的方法（不需要重新绘制graphic）
11：增加更新车辆信息窗口方法（不需要重新绘制graphic）
12：修改或增加了多个工具类方法，以实现1.1版本功能
13：继承tile，实现显示百度地图

================预计后续版本更新=================================================================
1：图标汇聚图层开发
--1)不处理非可视范围内的点
--2)优化汇聚计算范围，去除每次拖动鼠标都重新计算
--3）添加、删除、更新、查找单个或多个车辆方法等
2：添加复杂功能组件
--1) 单车监控
--2）轨迹回放
--3）多车监控

================历史版本更新=================================================================
v1.0
2014年12月5日
1：基于arcgisv3.11 创建版本库
2: 完成地图基础功能
--1)地图初始化,鹰眼、比例尺、地图级别、最大最小缩放级别，坐标系、常用组件初始化等等
--2）上一视图下一视图、设置中心点和地图级别、地图切换功能
3:车辆管理功能等
--1）添加、删除、更新、查找单个或多个车辆方法等

================其他信息=================================================================
example地址：http://115.29.226.138:8083/simplerMap/example/javascript/
sdk引用地址：
http://115.29.226.138:8083/simplerMap/javascript/v1.0/init.js
http://115.29.226.138:8083/simplerMap/javascript/v1.0/dijit/themes/tundra
http://115.29.226.138:8083/simplerMap/javascript/v1.0/esri/css/esri.css
sdk下载地址：
http://115.29.226.138:8083/simplerMap/download
使用文档地址：
http://115.29.226.138:8083/simplerMap/doc
