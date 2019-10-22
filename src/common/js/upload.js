// var formidable = require('formidable');
// var fs = require('fs');
// var path = require('path');
// let paths = require('../../paths');
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import paths from '../../paths';

// uploadfile 负责文件上传 不负责新增数据
var uploadFile = function (req, callback) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

        if (err) {
            callback(fields);
            return;
        }

        var file = files.file;
        var name = file.name;
        var size = file.size;
        // 判断是否有文件上传
        if (name == '' && size == 0) {
            callback(fields);
            return;
        }

        var ext = path.extname(name);
        var UPLOAD = paths.UPLOAD;
        // 判断目录是否需要创建
        if (!fs.existsSync(UPLOAD)) {
            fs.mkdirSync(UPLOAD);
        }
        //生成唯一串
        let time = new Date().getTime().toString();
        let rand = Math.round(Math.random() * 10);
        // console.log(rand);

        let newName = time + rand + ext;
        // console.log(file);

        var readStream = fs.createReadStream(file.path);
        var writeStream = fs.createWriteStream(path.join(UPLOAD, newName));
        readStream.on('end', () => {

            let { _img } = fields;

            if (_img && _img.includes('\\upload')) {
                _img = path.join(paths.PUBLIC, _img);
                // 删除更新后的原文件
                fs.unlinkSync(_img);
            }

            fs.unlinkSync(file.path);
            fields['img'] = path.join('/upload', newName);
            callback(fields);
        });
        readStream.pipe(writeStream);

    })
}







export default {
    uploadFile
}