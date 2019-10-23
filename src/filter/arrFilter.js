var arrFilter = function (obj) {
    var re = /[\[\]\"]/g;
    obj = obj.replace(re, '');
    
    return obj;
    // return new Date(Number(dt)).toLocaleString().substr(0, 10);
}

export default arrFilter