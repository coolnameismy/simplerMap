/**
 * Created by liuyanwei on 2014/12/4.
 */


define(["dojo/._base/declare"],function(declare){
    return declare("",null,{
        constructor:function(){
            Object.prototype.SMObjectIsNil = function(value){
                var type;
                if(value == null) { // 等同于 value === undefined || value === null
                    return true;
                }
                type = Object.prototype.toString.call(value).slice(8, -1);
                switch(type) {
                    case 'String':
                        return !!$.trim(value);
                    case 'Array':
                        return !value.length;
                    case 'Object':
                        return $.isEmptyObject(value); // 普通对象使用 for...in 判断，有 key 即为 false
                    default:
                        return false; // 其他对象均视作非空
                }
            }
        }

    })
})