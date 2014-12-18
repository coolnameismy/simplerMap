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
            this.getAll = function () {
                var all = [];
                for (var p in this._hash) {
                    // 方法
                    if (typeof(this._hash[p]) == " function ") {

                    }
                    //属性
                    else {
                        // p 为属性名称，_hash[p]为对应属性的值
                        all.push(this._hash[p]);
                    }
                }
                return all;
            }
        }

    })
})