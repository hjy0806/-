import React from 'react';
import { Button } from "antd";
export default class CutBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isUpdone : false
        }
        this.cutFangHeight = 100;
        this.cutFangWidth = 100;
    }
    componentDidMount() {
        var i = 0; self = this;
        this.timer = setInterval(function(){
            i++;
            if(i > 3) i = 0;
            $(self.refs.diandiandian).html(".".repeat(i))
        },300)
    };
    // 组件将要收到信的属性
    componentWillReceiveProps(nextProps) {
        // 发出图片的URL请求
        var img = new Image();
        img.src = "/uploads/" + nextProps.picurl;

        // 备份self
        img.onload = function(){
            clearTimeout(self.timer);
            // 改变state
            self.setState({
                isUpdone:true
            });

            // 拖拽
            $(self.refs.cut_fang).draggable({
                containment:"parent",
                drag:function(event,ui){
                    self.cutFangLeft = ui.position.left;
                    self.cutFangTop = ui.position.top;

                    $(self.refs.maoning).css({
                        "left":-self.cutFangLeft,
                        "top":-self.cutFangTop
                    })
                    self.setPreviews();

                }
            });
            // 缩放
            $(self.refs.cut_fang).resizable({
                containment:"parent",
                // 限制比例
                aspectRatio:1,
                resize:function(event,ui){
                    self.cutFangHeight = ui.size.height,
                    self.cutFangWidth = ui.size.width

                    self.setPreviews();
                }
            })
        };
    }
    // 设置预览图
    setPreviews(){
        var self = this;
        $(this.refs.prewviewZone).find(".pic").each(function(){
            var w = $(this).data("w");
            $(this).find("img").css({
                left:-self.cutFangLeft / self.cutFangWidth * w,
                top:-self.cutFangTop / self.cutFangHeight * w,
                width:self.props.imgW /self.cutFangWidth * w
            });
        })
    }
    // 裁切
    cutPic(){
        // 准备数据
        var rate = this.props.realW / this.props.imgW;
        var w = this.cutFangWidth * rate;
        var h = this.cutFangHeight * rate;
        var l = this.cutFangLeft * rate;
        var t = this.cutFangTop * rate;

        // 发送ajax ，请求裁切
        $.post("/api/docut",{
            w,
            h,
            l,
            t,
            picurl:this.props.picurl
        },function(data){
            if(data.result == 1){
                window.closeXuanfu();
            }
        })
    }
    render() {
        return (
            <div className="cutBox">
                {

                    !this.state.isUpdone
                    ?
                    <span>图片正在上传 <em ref="diandiandian">...</em></span>
                    :
                    <div className="cutBox" style = {{
                        "width":this.props.boxW + "px",
                        "height":this.props.boxH + "px",
                        "padding": this.props.padding + "px"
                    }}>
                        <div className="imgboxWarp" style = {{
                            "width":this.props.imgW + "px",
                            "height":this.props.imgH + "px"
                        }}>
                            <img src={`/uploads/${this.props.picurl}`} style = {{
                                "width":this.props.imgW - 2 + "px",
                                "height":this.props.imgH - 2 + "px"
                            }}  />
                            <div className="cut_fang" ref="cut_fang">
                                <img src={`/uploads/${this.props.picurl}`} style = {{
                                    "width":this.props.imgW - 2 + "px",
                                    "height":this.props.imgH - 2 + "px"
                                }} ref="maoning" />
                            </div>
                            <div className="mask"></div>
                        </div>
                        <div className="prewviewZone" ref="prewviewZone">
                            <div className="big_pic pic" data-w="120">
                                <img src={`/uploads/${this.props.picurl}`} />
                            </div>
                            <div className="mid_pic pic" data-w="80">
                                <img src={`/uploads/${this.props.picurl}`} />
                            </div>
                            <div className="small_pic pic" data-w="45">
                                <img src={`/uploads/${this.props.picurl}`} />
                            </div>

                            <Button type="primary" onClick ={this.cutPic.bind(this)}>确定</Button>
                            <Button type="danger" onClick = { ()=>{
                                window.closeXuanfu()
                            }}>取消</Button>
                        </div>
                    </div>
                }

            </div>
        );
    }
}
