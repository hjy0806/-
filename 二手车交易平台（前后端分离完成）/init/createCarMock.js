var fs = require("fs");
var path = require("path");
var Mock = require("mockjs");
var Random = Mock.Random;

// 得到汽车的基数据文件地址

var jishujuURL = path.resolve(__dirname,"./汽车基数据.json");
// 导出（写入）的文件地址
var xieruwenjianURL = path.resolve(__dirname,"./生成的汽车模拟数据.txt");
// 形象图的公共路径
var avatarUrl = path.resolve(__dirname,"../www/carimages_small");
// 判断一个文件是否存在
// fs.existsSync()
// 将一个文件删除
// fs.unlinkSync()

if(fs.existsSync(xieruwenjianURL)){
    fs.unlinkSync(xieruwenjianURL)
};
// 读文件

fs.readFile(jishujuURL,(err,docs)=>{

    var arr = JSON.parse(docs.toString());
    // 遍历每一条基数据
    arr.forEach((item)=>{
        // 售价 price 【0.2到100】万元
        // 随机一个0.2万元到100万元，精度是小数点后至少2位至多2位。
        item.price = Random.float(0.2,100,2,2);
        // 公里数 km 【0,2000000】公里
        item.km = Random.integer(0,2000000);
        // ownerID 车主ID,
        item.ownerID = Random.integer(10000,14999);
        // engine  引擎
        item.engine = Random.pick(["1.0","1.2","1.2T","1.4","1.4T","1.6","1.6T","2.0","2.0T","3.0","4.0","5.0"]);
        // buydate 购买时间 随机 近20年的数据
        item.buydate = Date.parse(new Date()) -  Random.integer(0,365 * 24 * 60 *60 *1000 * 20);
        // license  是否带牌买
        item.license = Random.boolean();
        // exhaust  排放标准
        item.exhaust = Random.pick(["国一","国二","国三","国四","国五"]);
        //gearbox 变速箱
        item.gearbox = Random.pick(["手动","自动","手自一体"]);
        //fuel
        item.fuel = Random.pick(["汽油","柴油","油电混合","天然气","纯电动"]);
        // 缩略图
        item.avatar = fs.readdirSync(`${avatarUrl}/${item.id}/view/`)[0];

        // 写入最终生成的文件
        fs.appendFileSync(xieruwenjianURL, JSON.stringify(item) + "\r\n");
    });

    console.log("已经写入"+arr.length+"条数据，可以使用了");
})
