// if (!Array.prototype.isArray) {
//     Array.prototype.isArray = function(value) {
//         return Object.prototype.toString.apply(value) === '[Object Array]';
//     };
// }

if (!Array.prototype.each) {
    Array.prototype.each = function(callBack) {
        var i,
            arrayLength = this.length;

        for (i = 0; i < arrayLength; i += 1) {
            callBack.call(this, this[i], i);
        }
    };
}

if (!Array.prototype.where) {
    Array.prototype.where = function(callBack) {
        var i,
            arrayLength = this.length,
            result = [],
            currentValue;

        for (i = 0; i < arrayLength; i += 1) {
            currentValue = this[i];
            if (callBack.call(this, currentValue)) {
                result.push(currentValue);
            }
        }

        return result;
    };
}

if (!Array.prototype.any) {
    Array.prototype.any = function(spec) {
        var i,
            arrayLength = this.length;

        spec = spec || function(val) { return val; };

        for (i = 0; i < arrayLength; i += 1) {
            if (spec.call(this, this[i])) {
                return true;
            }
        }

        return false;
    };
}

if (!Array.prototype.select) {
    Array.prototype.select = function(spec) {
        var i,
            arrayLength = this.length,
            result = [];

        for (i = 0; i < arrayLength; i += 1) {
            result.push(spec.call(this, this[i]));
        }

        return result;
    };
}

if (!Array.prototype.take) {
    Array.prototype.take = function(howMany, spec) {
        var i = 0,
            quantity = 0,
            result = [],
            arrayLength = this.length,
            currentValue;

        spec = spec || function(val) { return val; };
        quantity = Math.max(howMany, this.length);

        while (result.length < quantity && i < arrayLength) {
            currentValue = this[i];

            if (spec.call(this, currentValue)) {
                result.push(currentValue);
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
            arrayLength = this.length;

        for (i = howMany; i < arrayLength; i += 1) {
            result.push(this[i]);
        }

        return result;
    };
}

if (!Array.prototype.first) {
    Array.prototype.first = function(spec) {
        var i,
            arrayLength = this.length,
            result = null,
            currentValue;

        spec = spec || function() { return true; };

        if (arrayLength > 0) {
            for (i = 0; i < arrayLength; i += 1) {
                currentValue = this[i];
                if (spec.call(this, currentValue)) {
                    result = currentValue;
                    break;
                }
            }
        }

        return result;
    };
}

if (!Array.prototype.last) {
    Array.prototype.last = function(spec) {
        var i,
            arrayLength = this.length,
            result = null,
            currentValue;

        spec = spec || function() { return true; };

        if (arrayLength > 0) {

            for (i = arrayLength - 1; i >= 0; i -= 1) {
                currentValue = this[i];
                if (spec.call(this, currentValue)) {
                    result = currentValue;
                    break;
                }
            }
        }

        return result;
    };
}

if (!Array.prototype.count) {
    Array.prototype.count = function(spec) {
        var i,
            arrayLength = this.length,
            count = 0;

        if (typeof spec === 'function') {
            for (i = 0; i < arrayLength; i += 1) {
                if (spec.call(this, this[i])) {
                    count += 1;
                }
            }
        } else {
            count = arrayLength;
        }

        return count;
    };
}

if (!Array.prototype.index) {
    Array.prototype.index = function(spec) {
        var i,
            arrayLength = this.length,
            currentValue;

        for (i = 0; i < arrayLength; i += 1) {
            if (typeof spec === 'function') {
                currentValue = this[i];
                if (spec.call(this, currentValue)) {
                    return i;
                }
            } else {
                if (spec === currentValue) {
                    return i;
                }
            }
        }
        return -1;
    };
}

if (!Array.prototype.pluck) {
    Array.prototype.pluck = function(property) {
        var i,
            arrayLength = this.length,
            result = [],
            currentValue;

        for (i = 0; i < arrayLength; i += 1) {
            currentValue = this[i][property];
            if (currentValue) {
                result.push(currentValue);
            }
        }

        return result;
    };
}

if (!Array.prototype.sum) {
    Array.prototype.sum = function(spec) {
        var i,
            arrayLength = this.length,
            num = null,
            str = '',
            haveStrings = false,
            result;

        spec = spec || function(val) { return val; };

        for (i = 0; i < arrayLength; i += 1) {
            result = spec.call(this, this[i]);
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
            arrayLength = this.length,
            max,
            currentValue;

        comparer = comparer || function(a, b) { return a - b; };

        if (arrayLength > 0) {
            max = this[0];
            for (i = 0; i < arrayLength; i += 1) {
                currentValue = this[i];
                if (comparer.call(this, max, currentValue) < 0) {
                    max = currentValue;
                }
            }
        }
        return max;
    };
}

if (!Array.prototype.min) {
    Array.prototype.min = function(comparer) {
        var i,
            arrayLength = this.length,
            min,
            currentValue;

        comparer = comparer || function(a, b) { return a - b; };

        if (arrayLength > 0) {
            min = this[0];
            for (i = 0; i < arrayLength; i += 1) {
                currentValue = this[i];
                if (comparer.call(this, min, currentValue) > 0) {
                    min = currentValue;
                }
            }
        }
        return min;
    };
}

if (!Array.prototype.flatten) {
    Array.prototype.flatten = function() {
        var i,
            e,
            tempArray = [],
            result = [],
            arrayLength = this.length,
            currentValue,
            isArray = Array.isArray || function(value) { return Object.prototype.toString.apply(value) === '[Object Array]'; };
            
            for (i = 0; i < arrayLength; i += 1){
                currentValue = this[i];
                if (isArray(currentValue)) {
                    tempArray = currentValue.flatten();
                    for (e = 0; e < tempArray.length; e += 1) {
                        result.push(tempArray[e]);
                    }
                } else {
                    result.push(currentValue);
                }
            }

        return result;
    };
}