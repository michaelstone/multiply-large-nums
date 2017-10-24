
function multiplyStr(multiplier, multiplicand) {

    var lines = multiplicand.split('')
        .reverse()
        .map(x => parseInt(x))
        .map((multiplicandDigit, index) => {
            let nextLine = Array(index).fill(0);
            let carry = 0;
    
            multiplier.split('')
                .reverse()
                .map(x => parseInt(x))
                .map((multiplierDigit) => {
                    let productWithCarry = (multiplicandDigit * multiplierDigit) + carry;
                    let splitNum = splitNumAtLeastSignificantDigit(productWithCarry);
        
                    // TODO: create data structure here for current calculation + carry to remove usage of carry side effect
                    carry = splitNum[0];
                    nextLine.unshift(splitNum[1]);
                });
    
            if (carry !== 0) {
                nextLine.unshift(carry);
            }

            return nextLine;
        })    

    let carry = 0;
    let result = [];

    lines = fillWithZeros(lines);
    // TODO: invert matrix here to make sum easier and get rid of for loop

    for (let col = lines[0].length - 1; col >= 0; col--) {
        let sumOfCol = lines
            .map((line) => {
                return line[col];
            })
            .reduce((acc, x) => acc + x, carry);
        
        let splitCarry = splitNumAtLeastSignificantDigit(sumOfCol);
        carry = splitCarry[0];
        result[col] = splitCarry[1];
    }

    if (carry != 0) {
        result.unshift(carry);
    }

    return result.join('');
}

function splitNumAtLeastSignificantDigit(num) {
    let rounded = Math.floor(num / 10) * 10;
    let leastSigDigit = num - rounded;
    let carry = rounded / 10;
    return [carry, leastSigDigit];
}

function fillWithZeros(multiDimArray) { 
    let mostCols = getLongestArray(multiDimArray);
    return multiDimArray.map((line) => {
        let numFillSpaces = mostCols - line.length;
        return Array(numFillSpaces).fill(0).concat(line);
    });
}

function getLongestArray(multiDimArray) {
    return multiDimArray.reduce((acc, array) => {
        return acc < array.length ? array.length : acc;
    }, 0);
}

function getLastDigit(str) {
    return getDigitFromStrAt(str, str.length -1);
}

function getDigitFromStrAt(str, index) {
    return str.charCodeAt(str.length - 1) - 48;
}

exports.multiplyStr = multiplyStr;