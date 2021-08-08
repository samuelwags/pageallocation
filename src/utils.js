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

export function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};