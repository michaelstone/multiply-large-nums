
function multiplyStr(multiplierStr, multiplicandStr) {
    const multiplier = stringToNumArray(multiplierStr);

    return stringToNumArray(multiplicandStr)
        .reduce((acc, multiplicandDigit, multiplicandIndex) => {
            multiplier.forEach((multiplierDigit, multiplierIndex) => {
                let product = (multiplicandDigit * multiplierDigit) + ifExists(acc[multiplierIndex + multiplicandIndex], 0);
                let leastSigDigit = product % 10;
                acc[multiplierIndex + multiplicandIndex] = leastSigDigit;
                let carry =  Math.floor(product / 10);
                if (carry !== 0) {
                    acc[multiplierIndex + multiplicandIndex + 1] = ifExists(acc[multiplierIndex + multiplicandIndex + 1], 0) + Math.floor(product / 10);
                }
            });
            return acc;
        }, [])
        .reverse()
        .join('');
}

function stringToNumArray(string) {
    return string
        .split('')
        .reverse()
        .map(x => parseInt(x));
}

function ifExists(value, defaultVal) {
    return value ? value : defaultVal;
}   

exports.multiplyStr = multiplyStr;
