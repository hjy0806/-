var path = require("path");
var Admin = require("../models/Admin.js");
var formidable = require("formidable");
var gm = require("gm");
// 首先获取前端传过来的文件的时候，需要 通过formidable这个东西获取。
// 获取文件的时候要设置两个属性：一个是文件的路径和文件的拓展名。
exports.up = function(req,res){
    var form = new formidable.IncomingForm();
    //文件上传路径
    form.uploadDir = path.resolve(__dirname,"../www/uploads");
    //设置文件的拓展名
    form.keepExtensions = true;
    //获取文件的信息
    form.parse(req,function(err,fields,files){
        //下面的代码是 path.parse(files.adminavatar.path) 的返回值，
        //也就是说 path.parse 能将url 进行解析
        /*{
            base: {
                root: "C:\",
                dir: "C:\Users\Administrator\Desktop\二手车交易平台\www\uploads",
                base: "upload_c14b33f38e65da40943cf8521c1311db.jpg",
                ext: ".jpg",
                name: "upload_c14b33f38e65da40943cf8521c1311db"
            }
        }*/
        // 上传到服务器的文件名字，上传到服务器的文件会有新的名字。
        var base = path.parse(files.adminavatar.path).base;
        // 上传之后回显图片的信息
        // 显示需要将图片尺寸传回前端使用，此时使用gm工具
        // ftp://ftp.graphicsmagick.org/pub/GraphicsMagick/windows/
        // 首先去官网 下载 软件 安装到计算机中，确认 全局的环境变量中已经有部署了。
        // node 需要 安装依赖 npm install gm --save 来控制 gm 来操作图片。
        gm(path.resolve(__dirname,"../www/uploads/"+base))
        // size用来获取图片的尺寸的。
        .size(function(err,size){
            // console.log(size.height,size.width);
            // 上传之后屏幕上显示内容
            res.send("<script type='text/javascript'>window.parent.onUpDone('"+base+"',"+size.width+","+size.height+")</script>")
        });
    })
};
// 裁切图片
exports.docut = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,{w,h,l,t,picurl},files){
        // 现在命令gm进行裁切， crop【修剪】是表示裁切， write 表示写入
        gm(path.resolve(__dirname,"../www/uploads/"+picurl))
        // 四个参数不能少，顺序是一定的。
        .crop(w,h,l,t)
        .write(path.resolve(__dirname,"../www/avatars/"+picurl),function(){
            // 改变管理员的数据库
            Admin.update({
                "email":"huang@163.com"
            },{
                "$set":{
                    "avatar":picurl
                }
            },function(){
              res.json({
                "result":1
              })
            })
        })
    })
}

// 获取裁切完毕的头像
exports.getAvatar = function(req,res){
    // 读数据库
    Admin.find({"email":"huang@163.com"},function(err,docs){
        // 头像
        if(docs[0].avatar){
            var avatar = path.resolve(__dirname,"../www/avatars/"+ docs[0].avatar)
        }else{
            var avatar = path.resolve(__dirname,"../www/avatars/defaultAvatar.jpg");
        }

        // 直接返回头像的本身
        // sendFile发送的是信息本身
        res.sendFile(avatar)
    })
}