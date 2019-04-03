import React from 'react';
import cn from "classnames";
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import carBrandAndSeries from "../api/carBrandAndSeries.js";
export default (props)=>{
    return <Tabs defaultActiveKey="A" >
                {
                    Object.keys(carBrandAndSeries).map(char=>{
                        return <TabPane tab={char} key={char}>
                            {
                                carBrandAndSeries[char].map(brand=>{
                                    return <a
                                            href="javascript:void(0);"
                                            className={cn({
                                                "line":true,
                                                "cur":props.brand == brand.name
                                            })}
                                            key={brand.name}
                                            onClick={()=>{
                                                props.onChoose(brand.name,char)
                                            }}
                                        >
                                        {brand.name}
                                        </a>
                                })
                            }
                        </TabPane>
                    })
                }
           </Tabs>
}