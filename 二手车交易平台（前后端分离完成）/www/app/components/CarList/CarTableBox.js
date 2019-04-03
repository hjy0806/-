import React from 'react';
import { connect } from "dva";
import { Table } from "antd";
import {Row,Col,Radio,Button,Modal} from "antd";
import fp from "lodash/fp";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import columns from "./api/colmuns.js";
import Biaogelieshezhi from "./Biaogelieshezhi.js";
import Grid from "./Grid.js";
class CarTableBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cols:(function(){
                if(localStorage.getItem("ershouchebiaogelieshezhi")){
                    return JSON.parse(localStorage.getItem("ershouchebiaogelieshezhi"))
                }else{
                    return ["id","avatar","brand","price","km","type","engine"];
                }
            })(),
            showtype:"table", // grid \table
            isShowBiaogelieshezhi:false
        }
    }
    // 设置显示的列
    getCols(cols){
        var ARR = [];
        for (var i = 0; i < cols.length; i++) {
           for (var j = 0; j < columns.length;j++) {
                if(cols[i] == columns[j].dataIndex){
                    ARR.push(columns[j])
                }
           };
        };
        return ARR;
    }
    //做事件委托
    componentDidMount() {
        var self = this;
        $(this.refs.carTableBox).on("click",".suoluetu",function(){
            self.props.setXuanfu($(this).data("id"),true)
        })
    }
    render() {
        const {page,pagesize,total} = this.props.pagination
        const {sortby,sortdirection} = this.props.sorter
        // 将cols 备份一份， 保证在 拖拽排序的时候不改变state中的值。
        var arr = fp.clone(this.state.cols);
        // 改变临时数组
        const setCols = (_arr)=>{
            arr = _arr;
        }
        return (

            <div className="carTableBox" ref="carTableBox">
                <Row className="topHeader">
                    <Col span={15} offset={1}>
                        <div className="tip">
                            共 {total}量车符合条件，当前{page}/{Math.ceil(total/pagesize)}页
                        </div>
                    </Col>
                    <Col span={8}>
                        <RadioGroup onChange={(e)=>{
                            this.setState({
                                showtype:e.target.value
                            })

                            if( e.target.value == "grid"){

                                this.props.dispatch({
                                    "type":"carlist/changePage",
                                    page:1,
                                    pagesize:20
                                   })
                            }
                        }} value={this.state.showtype}>
                            <RadioButton value="table">列表视图</RadioButton>
                            <RadioButton value="grid">网格视图</RadioButton>
                        </RadioGroup>
                        <Button
                            type="primary"
                            shape="circle"
                            icon="setting"
                            onClick={()=>{
                                this.setState({"isShowBiaogelieshezhi":true})
                            }}
                        />
                    </Col>
                </Row>
                <Modal
                  title="表格列的设置"
                  visible={this.state.isShowBiaogelieshezhi}
                  destroyOnClose = {true}
                  onOk={()=>{
                    // 设置我们的cols
                    this.setState({
                            cols:arr,
                            "isShowBiaogelieshezhi":false
                        })
                    localStorage.setItem("ershouchebiaogelieshezhi",JSON.stringify(arr));
                  }}
                  onCancel={()=>{
                    this.setState({"isShowBiaogelieshezhi":false})
                  }}
                >
                 <Biaogelieshezhi arr={arr} setCols = {setCols} ></Biaogelieshezhi>
                </Modal>
                {
                    this.state.showtype == "grid"
                    ?
                    <Grid arr={arr}></Grid>
                    :
                    <Table
                        dataSource={this.props.cars}
                        columns={this.getCols(this.state.cols)}
                        rowKey={"id"}
                        pagination={{
                            current:page,
                            total,
                            pageSize:pagesize,
                            pageSizeOptions:["3","10","20","50","100"],
                            showSizeChanger:true
                        }}
                        onChange = {({current, total, pageSize}, filters, {order,field})=>{
                            if( current != page || pageSize != pagesize){

                                this.props.dispatch({"type":"carlist/changePage","page":current,"pagesize":pageSize});

                            }else if( order != sortdirection || field != sortby){

                                this.props.dispatch({"type":"carlist/changeSort","sortby":field || "id","sortdirection":order || "ascend"});
                            }


                        }}
                    />
                }

            </div>
        );
    }
}
export default connect(
    ({carlist:{pagination,cars,sorter}})=>({
        cars,
        pagination,
        sorter
    })
)(CarTableBox);