import React from 'react';
import cn from "classnames";
import carBrandAndSeries from "../api/carBrandAndSeries.js";
export default (props)=>{
    if(carBrandAndSeries[props.char]){
        // 进到这里的时候，说明char有值了
        // 下面这句话，也得写，是因为我们在Tag标签中也可以单独删除brand，会进到这里
        if(!carBrandAndSeries[props.char].filter(item=>item.name == props.brand)[0]) return null;
        // 运行下面的语句，必须满足 char和brand同时存在。
        return <div>
            {
                carBrandAndSeries[props.char].filter(item=>item.name == props.brand)[0].series.map(item=>{
                    return  <a
                                href="javascript:void(0);"
                                key={item}
                                className={cn({
                                    "line":true,
                                    "cur":props.series == item
                                })}
                                onClick={()=>{props.onChoose(item)}}
                            >
                            {item}
                            </a>
                })
            }
        </div>
    }else{
        return null;
    }
}