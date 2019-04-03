var express = require("express");
var mongoose = require("mongoose");
// 链接数据库
mongoose.connect("localhost/ershouche");
// 控制器
var carCtrl = require("./controllers/carCtrl.js");
var userCtrl = require("./controllers/userCtrl.js");
var app = express();
app.use(express.static("www"));
// 中间件 【三个接口】
// 查汽车的信息
app.get("/carinfo/:orderId",carCtrl.showCarInfo);
// 查id对应的所有图片
app.get("/carimage/:orderId",carCtrl.showCarImage);
// 查相似的车【根据车的品牌和类型】
app.get("/carlike/:orderId",carCtrl.showCarLike);
// 汽车的筛选条件查询 post请求 ，因为查询的条件是比较复杂。
app.post("/carsearch",carCtrl.carsearch);



// 用户的头像上传
app.post("/uploadAvatar",userCtrl.up);
app.post("/docut",userCtrl.docut);
// get方式请求的接口可以通过src 请求获取到。
app.get("/getAvatar",userCtrl.getAvatar);
app.listen(3000,function(){
    console.log("服务已开启3000……");
})