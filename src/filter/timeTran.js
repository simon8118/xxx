var timeFilter = function (dt) {

    var date = new Date(Number(dt));
    var year = date.getFullYear();
    var month = (date.getMonth() + 1 + '').padStart(2, '0');
    var day = (date.getDate() + '').padStart(2, '0');
    return `${year}-${month}-${day}`;
    // return new Date(Number(dt)).toLocaleString().substr(0, 10);
}

export default timeFilter