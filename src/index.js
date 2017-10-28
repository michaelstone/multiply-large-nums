
function multiplyStr(multiplier, multiplicand) {

    var lines = multiplicand
        .split('')
        .reverse()
        .map(x => parseInt(x))
        .map((multiplicandDigit, multiplicandIndex) => {   
            return multiplier.split('')
                .reverse()
                .map(x => parseInt(x))
                .reduce((acc, multiplierDigit, multiplierIndex) => {
                    let product = (multiplicandDigit * multiplierDigit) + (acc[multiplierIndex + multiplicandIndex] ? acc[multiplierIndex + multiplicandIndex] : 0);
                    let leastSigDigit = product % 10;
                    acc[multiplierIndex + multiplicandIndex] = leastSigDigit;
                    let carry =  Math.floor(product / 10);
                    if (carry !== 0) {
                        acc[multiplierIndex + multiplicandIndex + 1] = Math.floor(product / 10);
                    }
                    return acc;
                }, Array(multiplicandIndex).fill(0))
                .reverse();
        });

    let carry = 0;
    let result = [];

    lines = fillWithZeros(lines);
    // TODO: even better, sum as we go to reduce overall memory! (duh)

    for (let col = lines[0].length - 1; col >= 0; col--) {
        let sumOfCol = lines
            .map((line) => {
                return line[col];
            })
            .reduce((acc, x) => acc + x, carry);
            
        carry = Math.floor(sumOfCol / 10);
        result[col] = sumOfCol % 10;
    }

    if (carry != 0) {
        result.unshift(carry);
    }

    return result.join('');
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

exports.multiplyStr = multiplyStr;
