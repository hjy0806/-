import React from 'react';
import {Button} from "antd";
export default class Biaogelieshezhi extends React.Component {


    constructor(props) {
        super(props);
    }
    // 上树后做动画
    componentDidMount() {
        var self = this;
        // 参考文档：http://www.runoob.com/jqueryui/api-sortable.html#option-connectWith
        //列表中的项目需被连接的其他 sortable 元素的选择器
        $(this.refs.ul1).sortable({
            "connectWith":".ul2",
            // 当用户排序完的时候需要做的事情
            start:function(event,ui){
                console.log();
                ui.item.addClass("cur").siblings().removeClass('cur');
            },
            stop:function(){
                var arr = [];
                $("ul li").removeClass("cur");
                $(self.refs.ul1).find("li").each(function(){

                    arr.push($(this).data("key"))
                })
                self.props.setCols(arr);
            }
        })
        $(this.refs.ul2).sortable({
            "connectWith":".ul1",
            start:function(event,ui){
                console.log();
                ui.item.addClass("cur").siblings().removeClass('cur');
            },
            // 当用户排序完的时候需要做的事情
            stop:function(){
                $("ul li").removeClass("cur");
                var arr = [];
                $(self.refs.ul1).find("li").each(function(){
                    arr.push($(this).data("key"))
                })
                self.props.setCols(arr);
            }
        })
    }
    render() {
        // kv的中英文对照
        const kvrelationship = {
            "id":"编号",
            "avatar":"缩略图",
            "type":"车型",
            "seat":"座位数",
            "brand":"品牌",
            "series":"车系",
            "color":"颜色",
            "price":"价格",
            "km":"公里",
            "engine":"发动机",
            "buydate":"购买日期",
            "license":"是否上牌",
            "exhaust":"排放标准",
            "gearbox":"变速箱",
            "fuel":"燃料"
        }
        // 找到 没有上DOM的列
        const nohas = Object.keys(kvrelationship).filter(item => !this.props.arr.includes(item));

        return (
            <div className="Biaogelieshezhi">
                <h3>当前显示的列</h3>
                <ul ref="ul1" className="ul1" style={{"minHeight":"50px"}}>
                    {
                        this.props.arr.map((item,index)=>{
                            return <li
                                key={index}
                                data-key={item}
                            >
                            {kvrelationship[item]}
                            </li>
                        })
                    }
                </ul>
                <h3>可以选择：</h3>
                <ul ref="ul2" className="ul2"  style={{"minHeight":"50px"}}>
                    {
                        nohas.map((item,index)=>{
                            return <li
                                key={index}
                                data-key={item}
                            >
                            {kvrelationship[item]}
                            </li>
                        })
                    }
                </ul>
            </div>
        );
    }
}
