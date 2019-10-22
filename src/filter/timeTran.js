var timeFilter = function (dt) {
    return new Date(Number(dt)).toLocaleString().substr(0, 10);
}

export default timeFilter