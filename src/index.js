
function multiplyStr(multiplier, multiplicand) {
    
    var lines = [];
    var multiplicandLen = multiplicand.length;
    for (let i = 0; i < multiplicandLen; i++) {
        let digit2 = getDigitFromStrAt(multiplicand, multiplicand.length - 1);
        console.log('process row ' + i);
        // TODO: need to initialize this with '0's for lines > 1
        lines[i] = Array(i).fill(0);
        let carry = 0;

        let unprocessedMultiplier = multiplier;
        for (let j = multiplier.length; j > 0; j--) {
            // TODO: need to not destroy the multiplier here to save for next iteration
            let digit1 = getLastDigit(unprocessedMultiplier);
            let productWithCarry = (digit1 * digit2) + carry;
            let splitNum = splitNumAtLeastSignificantDigit(productWithCarry);
            console.log(`result ${j}: leastDig: ${splitNum[1]}, carry: ${splitNum[0]}`);

            carry = splitNum[0];
            lines[i].unshift(splitNum[1]);
            unprocessedMultiplier = unprocessedMultiplier.slice(0, unprocessedMultiplier.length - 1);
        }

        if (carry !== 0) {
            lines[i].unshift(carry);
        }

        multiplicand = multiplicand.slice(0, multiplicand.length - 1);
        console.log(lines[i]);
    }

    let carry = 0;
    let result = [];
    let mostCols = lines.reduce((acc, line) => {
        return acc < line.length ? line.length : acc;
    }, 0);
    
    console.log('largest cols: ' + mostCols);

    lines = lines.map((line) => {
        let numFillSpaces = mostCols - line.length;
        return Array(numFillSpaces).fill(0).concat(line);
    });
    console.log(lines);

    for (let col = mostCols - 1; col >= 0; col--) {
        let sumOfCol = carry;
        console.log('num lines: ' + lines.length);
        console.log(`col ${col}`)
        for (let line = 0; line < lines.length; line++) {
            console.log(`line ${line}, value ${lines[line][col]}`);
            let val = lines[line][col];
            if (val !== undefined) {
                sumOfCol = sumOfCol + lines[line][col];
            }
        }
        
        let splitCarry = splitNumAtLeastSignificantDigit(sumOfCol);
        carry = splitCarry[0];
        result[col] = splitCarry[1];
    }

    if (carry != 0) {
        result.unshift(carry);
    }

    console.log(result);
    return result.join('');
}

function splitNumAtLeastSignificantDigit(num) {
    let rounded = Math.floor(num / 10) * 10;
    let leastSigDigit = num - rounded;
    let carry = rounded / 10;
    return [carry, leastSigDigit];
}

function getLastDigit(str) {
    return getDigitFromStrAt(str, str.length -1);
}

function getDigitFromStrAt(str, index) {
    return str.charCodeAt(str.length - 1) - 48;
}

exports.multiplyStr = multiplyStr;