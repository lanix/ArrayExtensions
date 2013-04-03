(function(){

    var isArray = function(value) {
        return Object.prototype.toString.apply(value) === '[object Array]';
    },
    k = function(value) {
        return value;
    },
    comp = function(a, b) {
        return a - b; 
    };

    if (!Array.prototype.each) {
        Array.prototype.each = function(callBack) {
            var i,
                len = this.length;

            for (i = 0; i < len; i += 1) {
                callBack.call(this, this[i], i);
            }
        };
    }

    if (!Array.prototype.where) {
        Array.prototype.where = function(callBack) {
            var i,
                len = this.length,
                result = [],
                value;

            for (i = 0; i < len; i += 1) {
                value = this[i];
                if (callBack.call(this, value, i)) {
                    result.push(value);
                }
            }

            return result;
        };
    }

    if (!Array.prototype.any) {
        Array.prototype.any = function(spec) {
            var i,
                len = this.length,
                hold = spec;

            spec = typeof spec === 'function' ? spec : function(val) { return hold === val; };

            for (i = 0; i < len; i += 1) {
                if (spec.call(this, this[i], i)) {
                    return true;
                }
            }

            return false;
        };
    }

    if (!Array.prototype.select) {
        Array.prototype.select = function(spec) {
            var i,
                len = this.length,
                result = [];

            for (i = 0; i < len; i += 1) {
                result.push(spec.call(this, this[i], i));
            }

            return result;
        };
    }

    if (!Array.prototype.take) {
        Array.prototype.take = function(howMany, spec) {
            var i = 0,
                quantity = 0,
                result = [],
                len = this.length,
                value;

            if (len === 0){
                return result;
            }

            spec = typeof spec === 'function' ? spec : k;

            quantity = Math.min(howMany, len);

            while (result.length < quantity && i < len) {
                value = this[i];

                if (spec.call(this, value, i)) {
                    result.push(value);
                }

                i += 1;

            }

            return result;
        };
    }

    if (!Array.prototype.skip) {
        Array.prototype.skip = function(howMany) {
            var i,
                result = [],
                len = this.length;

            for (i = howMany; i < len; i += 1) {
                result.push(this[i]);
            }

            return result;
        };
    }

    if (!Array.prototype.first) {
        Array.prototype.first = function(spec) {
            var i,
                len = this.length,
                result = null,
                value;

            if(len === 0){
                return null;
            }

            spec = typeof spec === 'function' ? spec : k;

            for (i = 0; i < len; i += 1) {
                value = this[i];
                if (spec.call(this, value, i)) {
                    result = value;
                    return result;
                }
            }
            
            return null;
        };
    }

    if (!Array.prototype.last) {
        Array.prototype.last = function(spec) {
            var i,
                len = this.length,
                result = null,
                value;

            if(len === 0){
                return null;
            }

            spec = typeof spec === 'function' ? spec : k;

            for (i = len - 1; i >= 0; i -= 1) {
                value = this[i];
                if (spec.call(this, value, i)) {
                    result = value;
                    break;
                }
            }

            return result;
        };
    }

    if (!Array.prototype.count) {
        Array.prototype.count = function(spec) {
            var i,
                len = this.length,
                count = 0;

           if(len === 0){
                return 0;
            }
            
            if (typeof spec === 'function'){
                for (i = 0; i < len; i += 1) {
                    if (spec.call(this, this[i], i)) {
                        count += 1;
                    }
                }
            } else {
                return len;
            }

            return count;
        };
    }

    if (!Array.prototype.index) {
        Array.prototype.index = function(spec) {
            var i,
                len = this.length,
                hold = spec;

            if(len === 0){
                return -1;
            }

            spec = typeof spec === 'function' ? spec : function(val) { return hold === val; };

            for (i = 0; i < len; i += 1) {
                if (spec.call(this, this[i], i)) {
                    return i;
                }
            }
            return -1;
        };
    }

    if (!Array.prototype.pluck) {
        Array.prototype.pluck = function(property) {
            var i,
                len = this.length,
                result = [],
                value;

            if(len === 0){
                return null;
            }

            for (i = 0; i < len; i += 1) {
                value = this[i][property];
                if (value) {
                    result.push(value);
                }
            }

            return result;
        };
    }

    if (!Array.prototype.sum) {
        Array.prototype.sum = function(spec) {
            var i,
                len = this.length,
                num = null,
                str = '',
                haveStrings = false,
                result;

            if(len === 0){
                return null;
            }

            spec = typeof spec === 'function' ? spec : k;

            for (i = 0; i < len; i += 1) {
                result = spec.call(this, this[i], i);
                num += result;
                str += result;
                if (typeof result === 'string') {
                    haveStrings = true;
                }
            }

            return haveStrings ? str : num;
        };
    }

    if (!Array.prototype.max) {
        Array.prototype.max = function(comparer) {
            var i,
                len = this.length,
                max,
                value;

            if (len === 0){
                return null;
            }
           
            comparer = typeof comparer === 'function' ? comparer : comp;

    
            max = this[0];
            for (i = 1; i < len; i += 1) {
                value = this[i];
                if (comparer.call(this, max, value, i) < 0) {
                    max = value;
                }
            }
 
            return max;
        };
    }

    if (!Array.prototype.min) {
        Array.prototype.min = function(comparer) {
            var i,
                len = this.length,
                min,
                value;
           
           if (len === 0){
                return null;
            }

            comparer = typeof comparer === 'function' ? comparer : comp;

            min = this[0];
            for (i = 0; i < len; i += 1) {
                value = this[i];
                if (comparer.call(this, min, value, i) > 0) {
                    min = value;
                }
            }
            
            return min;
        };
    }

    if (!Array.prototype.flatten) {
        Array.prototype.flatten = function() {
            var i,
                result = [],
                len = this.length,
                value;

           if (len === 0){
                return result;
            }

            for (i = 0; i < len; i += 1){
                value = this[i];
                if (isArray(value)) {
                    result.push.apply(result, value.flatten());
                } else {
                    result.push(value);
                }
            }

            return result;
        };
    }

}());