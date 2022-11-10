function objectEquals(initValues, currentValues) {
    for (let key in initValues) {
        if (initValues[key] !== currentValues[key]) return false;
    }
    return true;
}
export default objectEquals;
