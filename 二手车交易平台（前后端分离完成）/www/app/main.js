import React from "react";
import dva from "dva";
import router from "./router.js";
import picshowModel from "./model/picshowModel.js";
import carlistModel from "./model/carlistModel.js";
import logger from "redux-logger";
// 创建app
const app = dva({
    // onAction:logger
});
// 创建路由
app.router(router);
// 注册模块
app.model(picshowModel);
app.model(carlistModel);
// 上树运行
app.start("#app");