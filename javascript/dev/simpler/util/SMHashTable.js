/**
 * Created by liuyanwei on 2014/12/4.
 */

define(["dojo/_base/declare"], function (declare) {
    return declare("simpler.util.SMHashTable", null, {
        constructor: function () {
            // this._map = new ActiveXObject("Scripting.Dictionary");//创建对象
            this._hash = {};
            this._count = 0;
            this.set = function (key, value) {
               // if (this._hash.hasOwnProperty(key)){
                this._hash[key] = value;
                this._count++;
                return true;
            }
            this.get = function (key) {
                if (this.contains(key)){
                    return this._hash[key];
                }
                else{
                    return "";
                }
            }
            this.remove = function (key) {
                delete this._hash[key];
                this._count--;
            }
            this.count = function () {
                return this._count;
            }

            this.contains = function (key) {
                return this._hash.hasOwnProperty(key);
            }
            this.clear = function () {
                this._hash = {};
                this._count = 0;
            }
        }

    })
})