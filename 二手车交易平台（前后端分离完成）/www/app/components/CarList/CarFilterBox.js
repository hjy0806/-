import React from 'react';
import { Row , Col} from "antd";
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import MyTab from "./filter_compos/MyTab.js";
import Series from "./filter_compos/Series.js";
import MyCheckBox from "./filter_compos/MyCheckBox.js";
import MyRange from "./filter_compos/MyRange.js";
import MyCalendar from "./filter_compos/MyCalendar.js";
import MyDropDown from "./filter_compos/MyDropDown.js";
import MyTag from "./filter_compos/MyTag.js";
import { connect } from "dva";
import moment from 'moment';
class CarFilterBox extends React.Component {

    constructor(props) {
        super(props);
        // 受控组件的初始值
        this.state = {
            "price":[0,100],
            "km":[0,100],
            "char":""
        }
    }

    render() {
        // 将nowfilters 中的所有key对应的值拿到，
        // 拿到这些值可以决定当前的过滤状态
        // 过滤状态就是之前已经被筛选过的条件哦！
        var data = {
            "brand":"",
            "series":"",
            "type":[],
            "seat":[],
            "color":[],
            "engine":[],
            "buydate":[],
            "exhaust":[],
            "license":"",
            "gearbox":"",
            "fuel":""
        };
        // 此方法是将nowfilters的有key的值赋值给data对应的key。
        this.props.nowfilters.forEach(item=>{
            data[item.key] = item.value;
        });
        return (
            <div className="carFilterBox">
                <Row>
                    <Col span={2}>品牌</Col>
                    <Col span={22}>
                        <MyTab
                            brand={data.brand}
                            onChoose = {(value,char)=>{
                                this.props.dispatch({"type":"carlist/addOrchangeFilter","key":"brand",value})
                                this.setState({char});
                            }}
                        >
                        </MyTab>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>系列</Col>
                    <Col span={22}>
                        <Series
                            brand={data.brand}
                            char={this.state.char}
                            series = {data.series}
                            onChoose = {(value)=>{
                                this.props.dispatch({"type":"carlist/addOrchangeFilter","key":"series",value});
                            }}
                        >
                        </Series>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>颜色</Col>
                    <Col span={22}>
                       <MyCheckBox
                           value = {data.color}
                           options = {["黑","白","蓝","灰","红","橙","咖啡","银灰","香槟","绿","紫","黄","其他"]}
                           onChoose = {(value)=>{
                                this.props.dispatch({"type":"carlist/addOrchangeFilter","key":"color",value});
                                if( value.length == 0 ){
                                    this.props.dispatch({"type":"carlist/removeFilter","key":"color"});
                                }
                           }}
                       ></MyCheckBox>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>车型</Col>
                    <Col span={22}>
                       <MyCheckBox
                            value ={data.type}
                            options = {["A级轿车","B级轿车","C级轿车","中型SUV","大型SUV","跑车","小型SUV","面包车"]}
                            onChoose = {(value)=>{
                                 this.props.dispatch({"type":"carlist/addOrchangeFilter","key":"type",value});
                                 if( value.length == 0 ){
                                     this.props.dispatch({"type":"carlist/removeFilter","key":"type"});
                                 }
                            }}
                       ></MyCheckBox>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>座位数</Col>
                    <Col span={22}>
                       <MyCheckBox
                            value ={data.seat}
                            options = {["2","4","5","20"]}
                            onChoose = {(value)=>{
                                 this.props.dispatch({"type":"carlist/addOrchangeFilter","key":"seat",value});
                                 if( value.length == 0 ){
                                     this.props.dispatch({"type":"carlist/removeFilter","key":"seat"});
                                 }
                            }}
                       ></MyCheckBox>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>发动机</Col>
                    <Col span={22}>
                       <MyCheckBox
                            value ={data.engine}
                            options = {["1.0","1.2","1.2T","1.4","1.4T","1.6","1.6T","2.0","2.0T","3.0","4.0","5.0"]}
                            onChoose = {(value)=>{
                                 this.props.dispatch({"type":"carlist/addOrchangeFilter","key":"engine",value});
                                 if( value.length == 0 ){
                                     this.props.dispatch({"type":"carlist/removeFilter","key":"engine"});
                                 }
                            }}
                       ></MyCheckBox>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>排量</Col>
                    <Col span={22}>
                       <MyCheckBox
                            value ={data.exhaust}
                            options = {["国一","国二","国三","国四","国五"]}
                            onChoose = {(value)=>{
                                 this.props.dispatch({"type":"carlist/addOrchangeFilter","key":"exhaust",value});
                                 if( value.length == 0 ){
                                     this.props.dispatch({"type":"carlist/removeFilter","key":"exhaust"});
                                 }
                            }}
                       ></MyCheckBox>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>价格(万元)</Col>
                    <Col span={12}>
                       <MyRange
                            value ={this.state.price}
                            defaultV = {[0,100]}
                            onChoose = {(value)=>{
                                 this.props.dispatch({"type":"carlist/addOrchangeFilter","key":"price",value});
                            }}
                            onChange = {(value)=>{
                                this.setState({
                                    price:value
                                })
                            }}
                       ></MyRange>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>km(万公里)</Col>
                    <Col span={12}>
                       <MyRange
                            value ={this.state.km}
                            defaultV = {[0,100]}
                            onChoose = {(value)=>{
                                 this.props.dispatch({"type":"carlist/addOrchangeFilter","key":"km",value});
                            }}
                            onChange = {(value)=>{
                                this.setState({
                                    km:value
                                })
                            }}
                       ></MyRange>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>购买日期</Col>
                    <Col span={22}>
                       <MyCalendar
                            onChoose = {(value)=>{
                                 this.props.dispatch({"type":"carlist/addOrchangeFilter","key":"buydate","value":[
                                        Number(value[0].format("x")),Number(value[1].format("x"))
                                    ]});
                            }}
                            buydate = {
                                 data.buydate[0]
                                 ?
                                 [ moment(Number(data.buydate[0])), moment(Number(data.buydate[1])) ]
                                 :
                                 []
                            }
                       ></MyCalendar>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>其它</Col>
                    <Col span={22}>
                        <MyDropDown
                            title="燃料"
                            options={["汽油","柴油","油电混合","天然气","纯电动"]}
                            value = {data.fuel}
                            onChoose = {(value)=>{
                                 this.props.dispatch({"type":"carlist/addOrchangeFilter","key":"fuel",value});
                            }}
                        >
                        </MyDropDown>
                        <MyDropDown
                            title="变速箱"
                            options={["手动","自动","手自一体"]}
                            value = {data.gearbox}
                            onChoose = {(value)=>{
                                 this.props.dispatch({"type":"carlist/addOrchangeFilter","key":"gearbox",value});
                            }}
                        >
                        </MyDropDown>
                        <MyDropDown
                            title="是否含牌照"
                            options={["是","否"]}
                            value = {data.license}
                            onChoose = {(value)=>{
                                 this.props.dispatch({"type":"carlist/addOrchangeFilter","key":"license",value});
                            }}
                        >
                        </MyDropDown>
                    </Col>
                </Row>
                {
                    this.props.nowfilters.length != 0
                    ?
                    <Row>
                        <Col span={2}>当前：</Col>
                        <Col span={22}>
                           <MyTag
                            nowfilters = {this.props.nowfilters}
                            onChoose = {(key)=>{
                                this.props.dispatch({"type":"carlist/removeFilter",key});

                                if( key == "price"){
                                    this.setState({
                                        "price":[0,100]
                                    })
                                }else if( key == "km"){
                                    this.setState({
                                        "km":[0,100]
                                    })
                                }
                            }}
                           >
                           </MyTag>
                        </Col>
                    </Row>
                    :
                    null
                }
            </div>
        );
    }
}
export default connect(
    ({carlist})=>({
        "nowfilters":carlist.nowfilters
    })
)(CarFilterBox);