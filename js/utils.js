var utils = {
    
    'keyPress' : function (e) {
        return String.fromCharCode(e.keyCode);
    },

    'randPos' : function (min, max) {
        if (typeof min === 'number' && typeof max === 'number') {
            return Math.floor(Math.random() * (max - min + 1)) + min;    
        }
    }

}