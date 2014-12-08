/**
 * Created by liuyanwei on 2014/12/8.
 */


describe("simplerMaps", function() {
//    var suiteWideFoo;
//    beforeEach(function () {
//        suiteWideFoo = 0;
//    });
    //初始化地图代码
    var map;
    dojo.ready(mapInit);
    function mapInit() {
        require([
                "simpler/map/SimplerMap"
            ],
            function (SimplerMap)
            {
                //初始化地图
                map = new SimplerMap("map", {
                    center: [118, 30.5],
                    zoom: 4,
                    logo: false,
                    //设置地图级别
                    minZoom: 4,
                    maxZoom: 18
                });
            }
        );
    }
    it("SimplerInit", function() {
        //是否已声明
        expect(map).toBeDefined();

    });
    it("Other", function() {

        //是否已声明
        //expect(map).toBeDefined();
        return false;
    });

});
//expect(x).toEqual(y); 当x和y相等时候通过
//expect(x).toBe(y); 当x和y是同一个对象时候通过
//expect(x).toMatch(pattern); x匹配pattern（字符串或正则表达式）时通过
//expect(x).toBeDefined(); x不是undefined时通过
//expect(x).toBeUndefined(); x 是 undefined时通过
//expect(x).toBeNull(); x是null时通过
//expect(x).toBeTruthy(); x和true等价时候通过
//expect(x).toBeFalsy(); x和false等价时候通过
//expect(x).toContain(y);x（数组或字符串）包含y时通过
//expect(x).toBeLessThan(y); x小于y时通过
//expect(x).toBeGreaterThan(y); x大于y时通过
//expect(function(){fn();}).toThrow(e); 函数fn抛出异常时候通过
