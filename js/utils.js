var utils = (function IIFE() {

    var publicAPI = {
        
        'keyPress' : function (e) {
            switch (e.keyCode) {
                case 37: {
                    return 'left';
                    break;
                }
                case 38: {
                    return 'up';
                    break;
                } 
                case 39: { 
                    return 'right';
                    break;
                }
                case 40: {
                    return 'down';
                    break;
                }
            }

            return (String.fromCharCode(e.keyCode)).toLowerCase();
        },

        'randPos' : function (min, max) {
            if (typeof min === 'number' && typeof max === 'number') {
                return Math.floor(Math.random() * (max - min + 1)) + min;    
            }
        },

        'deepCopy' : function (arr) {
            var out = [];
            for (var i = 0, len = arr.length; i < len; i++) {
                var item = arr[i];
                var obj = {};
                for (var k in item) {
                    obj[k] = item[k];
                }
                out.push(obj);
            }
            return out;
        }

        // initiate : function (objects) {
        //     if (objects && typeof objects === 'object') {
        //         for (key in objects) {
        //           var keys = objects[key];
        //           if (Array.isArray(keys)) {
        //             keys.forEach(function(arr){
        //                 arr.init(that, that.objects['players'])
        //                     if (key.hasOwnProperty('bindEventListeners')){
        //                         arr.bindEventListeners();
        //                     }
        //                 });
        //             }
        //         }
        //     }
        // };

    };

    return publicAPI;
})();
