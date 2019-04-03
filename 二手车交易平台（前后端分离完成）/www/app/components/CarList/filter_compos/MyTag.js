import React from "react";
import cn from "classnames";
import { Tag } from 'antd';
import moment from 'moment';
export default (props)=>{
    return <div>
        {

            props.nowfilters.map(item=>{
                if( item.key == "brand"){
                    return <Tag
                                closable
                                key={item.key}
                                onClose={()=>{ props.onChoose(item.key)}}
                            >
                                品牌：{item.value}
                            </Tag>
                }else if(item.key == "series"){
                    return <Tag
                                closable
                                key={item.key}
                                onClose={()=>{ props.onChoose(item.key)}}
                            >
                                车系：{item.value}
                            </Tag>
                }else if(item.key == "color"){
                    return <Tag
                                closable
                                key={item.key}
                                onClose={()=>{ props.onChoose(item.key)}}
                            >
                                颜色：{item.value.join(" 或 ")}
                            </Tag>
                }else if(item.key == "seat"){
                    return <Tag
                                closable
                                key={item.key}
                                onClose={()=>{ props.onChoose(item.key)}}
                            >
                                座位数：{item.value.join(" 或 ")}
                            </Tag>
                }else if(item.key == "engine"){
                    return <Tag
                                closable
                                key={item.key}
                                onClose={()=>{ props.onChoose(item.key)}}
                            >
                                发动机：{item.value.join(" 或 ")}
                            </Tag>
                }else if(item.key == "exhaust"){
                    return <Tag
                                closable
                                key={item.key}
                                onClose={()=>{ props.onChoose(item.key)}}
                            >
                                排量：{item.value.join(" 或 ")}
                            </Tag>
                }else if(item.key == "type"){
                    return <Tag
                                closable
                                key={item.key}
                                onClose={()=>{ props.onChoose(item.key)}}
                            >
                                车型：{item.value.join(" 或 ")}
                            </Tag>
                }else if(item.key == "price" ){
                    return <Tag
                                closable
                                key={item.key}
                                onClose={()=>{ props.onChoose(item.key)}}
                            >
                                售价：{item.value[0]}万元 至 {item.value[1]}万元
                            </Tag>
                }else if(item.key == "km" ){
                    return <Tag
                                closable
                                key={item.key}
                                onClose={()=>{ props.onChoose(item.key)}}
                            >
                                公里数：{item.value[0]}万公里 至 {item.value[1]}万公里
                            </Tag>
                }else if(item.key == "buydate" ){
                    return <Tag
                                closable
                                key={item.key}
                                onClose={()=>{ props.onChoose(item.key)}}
                            >
                                购买日期：{moment(item.value[0]).format("YYYY 年 MM 月 DD 日")}
                                            到
                                          {moment(item.value[1]).format("YYYY 年 MM 月 DD 日")}
                            </Tag>
                }else if(item.key == "fuel" ){
                    return <Tag
                                closable
                                key={item.key}
                                onClose={()=>{ props.onChoose(item.key)}}
                            >
                                燃油：{item.value}
                            </Tag>
                }else if(item.key == "gearbox" ){
                    return <Tag
                                closable
                                key={item.key}
                                onClose={()=>{ props.onChoose(item.key)}}
                            >
                                变速箱：{item.value}
                            </Tag>
                }else if(item.key == "license" ){
                    return <Tag
                                closable
                                key={item.key}
                                onClose={()=>{ props.onChoose(item.key)}}
                            >
                                牌照：{item.value}
                            </Tag>
                }
            })
        }
    </div>
}