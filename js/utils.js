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
    }

    };

    return publicAPI;
})();
