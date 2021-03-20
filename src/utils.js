// given an array of numbers, returns an array of the running total with each element in array.
export function runningSum(array) {
    let newArray = array.reduce(function(r, a) {
        if (r.length > 0)
            a += r[r.length - 1];
        r.push(a);
        return r;
    }, []);
    newArray.unshift(0);
    return newArray;
}