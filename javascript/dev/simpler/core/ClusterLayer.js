/**
 * Created by liuyanwei on 2014/12/11.
 */


define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "esri/Color",
    "dojo/_base/connect",

    "esri/SpatialReference",
    "esri/geometry/Point",
    "esri/graphic",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/TextSymbol",

    "esri/dijit/PopupTemplate",
    "esri/layers/GraphicsLayer"
], function (
    declare, arrayUtils, Color, connect,
    SpatialReference, Point, Graphic, SimpleMarkerSymbol, TextSymbol,
    PopupTemplate, GraphicsLayer
    ) {
    return declare([GraphicsLayer], {
        constructor: function (options) {

            this._clusterTolerance = options.distance || 50;
            this._clusterNumberCondition = options.clusterNumberCondition || 2;
            this._beanData = options.data || [];
            this._CbeanData = [];
            this._clusterLabelColor = options.labelColor || "#000";
            // labelOffset can be zero so handle it differently
            this._clusterLabelOffset = (options.hasOwnProperty("labelOffset")) ? options.labelOffset : -5;
            // graphics that represent a single point
            this._singles = []; // populated when a graphic is clicked
            this._showSingles =  true;
            this._clusterResolution = options.resolution;
            //指定聚集和非聚合的bean类型
            this._CbeanType = options.CbeanType;
            this._beanType = options.beanType;
        },

        // override esri/layers/GraphicsLayer methods
        _setMap: function (map, surface) {
            // calculate and set the initial resolution
            this._clusterResolution = map.extent.getWidth() / map.width; // probably a bad default...
            this._clusterGraphics();

            // connect to onZoomEnd so data is re-clustered when zoom level changes
            this._zoomEnd = connect.connect(map, "onZoomEnd", this, function () {
                // update resolution
                this._clusterResolution = this._map.extent.getWidth() / this._map.width;
                this.clear();
                this._clusterGraphics();
            });

            // GraphicsLayer will add its own listener here
            var div = this.inherited(arguments);
            return div;
        },

        _unsetMap: function () {
            this.inherited(arguments);
            connect.disconnect(this._zoomEnd);
        },

        // public ClusterLayer methods
        add: function (p) {
            // Summary:  The argument is a data point to be added to an existing cluster. If the data point falls within an existing cluster, it is added to that cluster and the cluster's label is updated. If the new point does not fall within an existing cluster, a new cluster is created.
            //
            // if passed a graphic, use the GraphicsLayer's add method
            if (p.declaredClass) {
                this.inherited(arguments);
                return;
            }

            // add the new data to _beanData so that it's included in clusters
            // when the map level changes
            this._beanData.push(p);
            var clustered = false;
            // look for an existing cluster for the new point
            for (var i = 0; i < this._CbeanData.length; i++) {
                var c = this._CbeanData[i];
                if (this._clusterTest(p, c)) {
                    // add the point to an existing cluster
                    this._clusterAddPoint(p, c);
                    // update the cluster's geometry
                    this._updateClusterGeometry(c);
                    // update the label
                    this._updateLabel(c);
                    clustered = true;
                    break;
                }
            }

            if (!clustered) {
                this._clusterCreate(p);
                p.attributes.clusterCount = 1;
                this._showCluster(p);
            }
        },

        clear: function () {
            // Summary:  Remove all clusters and data points.
            this.inherited(arguments);
            this._CbeanData.length = 0;
        },

        clearSingles: function (singles) {
            // Summary:  Remove graphics that represent individual data points.
            var s = singles || this._singles;
            arrayUtils.forEach(s, function (g) {
                this.remove(g);
            }, this);
            this._singles.length = 0;
        },


        // internal methods
        _clusterGraphics: function () {
            // first time through, loop through the points
            for (var j = 0, jl = this._beanData.length; j < jl; j++) {
                // see if the current feature should be added to a cluster
                var bean = this._beanData[j];
                var clustered = false;
                var numClusters = this._CbeanData.length;
                for (var i = 0; i < this._CbeanData.length; i++) {
                    var cbean = this._CbeanData[i];
                    if (this._clusterTest(bean, cbean)) {
                        this._clusterAddPoint(bean, cbean);
                        clustered = true;
                        break;
                    }
                }

                if (!clustered) {
                    this._clusterCreate(bean);
                }
            }
            this._showAllClusters();
        },



        _clusterTest: function (bean, cbean) {

            //墨卡托坐标
            bean.x =  bean.getMercatorX();
            bean.y =  bean.getMercatorY();
            cbean.x = cbean.getMercatorX();
            cbean.y = cbean.getMercatorY();
            var distance = (
                Math.sqrt(
                        Math.pow((cbean.x - bean.x), 2) + Math.pow((cbean.y - bean.y), 2)
                ) / this._clusterResolution
                );
            return (distance <= this._clusterTolerance);
        },


        _clusterAddPoint: function (bean, cbean) {
            var count, lng, lat;
            count = cbean.beans.length;
            lng = (bean.lng + (cbean.lng * count)) / (count + 1);
            lat = (bean.lat + (cbean.lat * count)) / (count + 1);
            cbean.lat = lat;
            cbean.lng = lng;
            cbean.beans.push(bean);

        },

        // point passed to clusterCreate isn't within the
        // clustering distance specified for the layer so
        // create a new cluster for it
        _clusterCreate: function (bean) {

            var cbean = new this._CbeanType({
                key:bean.key,
                lat:bean.lat,
                lng:bean.lng
            });
            cbean.beans.push(bean);
            this._CbeanData.push(cbean);

        },

        _showAllClusters: function () {
            for (var i = 0, il = this._CbeanData.length; i < il; i++) {
                var cbean = this._CbeanData[i];
                this._showCluster(cbean);
            }
        },

        _showCluster: function (cbean) {

            //聚合
            if(cbean.beans.length >= this._clusterNumberCondition)
            {
                //console.log(cbean);
                cbean.isClustered = true;
            }
            //非聚合
            else if(cbean.beans.length < this._clusterNumberCondition && cbean.beans.length > 0 )
            {
                cbean.isClustered = false;
                //console.log(cbean);
            }
            var graphics = cbean.makeGraphics();
            for(var i= 0;i<graphics.length;i++)
            {
                this.add(graphics[i]);
            }
        },

        _addSingles: function (singles) {
            // add single graphics to the map
            arrayUtils.forEach(singles, function (p) {
                var g = new Graphic(
                    new Point(p.x, p.y, this._sr),
                    this._singleSym,
                    p.attributes,
                    this._singleTemplate
                );
                this._singles.push(g);
                if (this._showSingles) {
                    this.add(g);
                }
            }, this);
            this._map.infoWindow.setFeatures(this._singles);
        },

        _updateClusterGeometry: function (c) {
            // find the cluster graphic
            var cg = arrayUtils.filter(this.graphics, function (g) {
                return !g.symbol &&
                    g.attributes.clusterId == c.attributes.clusterId;
            });
            if (cg.length == 1) {
                cg[0].geometry.update(c.x, c.y);
            } else {
                console.log("didn't find exactly one cluster geometry to update: ", cg);
            }
        },

        _updateLabel: function (c) {
            // find the existing label
            var label = arrayUtils.filter(this.graphics, function (g) {
                return g.symbol &&
                    g.symbol.declaredClass == "esri.symbol.TextSymbol" &&
                    g.attributes.clusterId == c.attributes.clusterId;
            });
            if (label.length == 1) {
                // console.log("update label...found: ", label);
                this.remove(label[0]);
                var newLabel = new TextSymbol(c.attributes.clusterCount)
                    .setColor(new Color(this._clusterLabelColor))
                    .setOffset(0, this._clusterLabelOffset);
                this.add(
                    new Graphic(
                        new Point(c.x, c.y, this._sr),
                        newLabel,
                        c.attributes
                    )
                );
                // console.log("updated the label");
            } else {
                console.log("didn't find exactly one label: ", label);
            }
        },

        // debug only...never called by the layer
        _clusterMeta: function () {
            // print total number of features
            console.log("Total:  ", this._beanData.length);

            // add up counts and print it
            var count = 0;
            arrayUtils.forEach(this._CbeanData, function (c) {
                count += c.attributes.clusterCount;
            });
            console.log("In clusters:  ", count);
        }

    });
});

