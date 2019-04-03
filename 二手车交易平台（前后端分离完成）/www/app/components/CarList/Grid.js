import React from 'react';
import {Row,Col,Radio,Button,Pagination} from "antd";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import { connect } from "dva";
class Grid extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            // 网格的属性 决定网格的展示形式
            col:4,
            row:5,
            value:"A"
        }
    }

    render() {
        // 每一个格格中显示的内容
        const showGridContent = (n)=>{
            const thecar = this.props.cars[n];
            if(!thecar) return null;
            return <div>
                <Row>
                    <Col span={18} offset={3}>
                        <img src={`carimages_small/${thecar.id}/view/${thecar.avatar}`} className="zhanshitu" />
                    </Col>
                </Row>
                <Row>
                    <Col span={18} offset={3}>
                       {showCarInfo(thecar)}
                    </Col>
                </Row>
            </div>

        };

        // 显示汽车的信息
        const showCarInfo = (thecar)=>{
            var arr = [];
            this.props.arr.forEach((item,index)=>{
               if(item != "avatar"){
                    arr.push(<h4 key={index}>{thecar[item]}</h4>);
               }
            })

            return arr;
        }
        var  ARR  = [];
        for (var i = 0; i < this.state.row; i++) {
           var temp = [];
           for (var j = 0; j < this.state.col; j++) {
                temp.push(
                        <Col key={j} className="grid" span={24/this.state.col}>
                            {showGridContent(i*this.state.col + j)}
                        </Col>
                    )
           };
           ARR.push(<Row key={i}>{temp}</Row>)
        };

        return (
            <div className="grid">
                <RadioGroup
                    onChange={(e)=>{
                        this.setState({
                            col:e.target.col,
                            row:e.target.row,
                            value:e.target.value,
                        });

                        this.props.dispatch({
                            "type":"carlist/changePage",
                            page:1,
                            pagesize:this.state.row * this.state.col
                           })
                    }}
                    value={this.state.value}
                    style={{"marginBottom":"20px"}}
                >
                    <RadioButton value="A" col="4" row="5">4*5</RadioButton>
                    <RadioButton value="B" col="3" row="5">3*5</RadioButton>
                    <RadioButton value="C" col="2" row="5">2*5</RadioButton>
                </RadioGroup>
                <div className="showGird">
                    {ARR}
                </div>
                <Pagination
                    style={{"float":"right"}}
                    current = { this.props.pagination.page}
                    total = {this.props.pagination.total}
                    pageSize = { this.props.pagination.pagesize}
                    onChange = {(page)=>{
                       this.props.dispatch({
                        "type":"carlist/changePage",
                        page,
                        pagesize:this.state.row * this.state.col
                       })
                    }}
                />
            </div>

        );
    }
}
export default connect(
    ({carlist})=>({
        cars : carlist.cars,
        pagination:carlist.pagination
    })
)(Grid)