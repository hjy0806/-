import React from 'react';
import { connect } from "dva";
class BigImageBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAutoPlay:false
        }
    }
    // 门神函数
    shouldComponentUpdate(nextProps, nextState) {
        // console.log(nextProps.carimages == this.props.carimages,nextProps.nowid);
        if( nextProps.nowid != this.props.nowid){
            // 进到这里，id就是新的。
            return nextProps.carimages != this.props.carimages;
        };
        // 其他不受id影响的都放行。
        return true;
    }
    componentWillUpdate(nextProps, nextState) {
        // 显示loading图片
        $(this.refs.loading).show();
        // 对对大图发出请求
        var image = new Image();
        var src =  `carimages/${nextProps.nowid}/${nextProps.nowalbum}/${nextProps.carimages[nextProps.nowalbum][nextProps.nowidx]}`
        image.src = src;
        var self = this;
        // 监听大图加载完毕
        image.onload = function(){
            // 将小图替换成已加载完毕的大图
            $(self.refs.bigimg).attr("src",src);
            // loading图片隐藏
            $(self.refs.loading).hide();
        }
    }
    render() {
        const {nowid,nowalbum,carimages,nowidx} = this.props;
        if(!carimages[nowalbum]) return null;
        // //计算图片的总数
        const zongshu = carimages.view.length + carimages.inner.length + carimages.engine.length + carimages.more.length;
        // 图集序
        const arr = ["view","inner","engine","more"];
        // 当前所在的相册的序列
        const albumIndex = arr.indexOf(nowalbum);
        // 总序
        var nowgxulie = 0;
        // 加上之前的图集之和，再加上本图集的零头
        for (let i = 0; i < albumIndex; i++) {

                nowgxulie += carimages[arr[i]].length;

        };
        nowgxulie += nowidx + 1;
        var zonhgshu = 0;
        for ( let i in carimages){

            zonhgshu += carimages[i].length;

        }
        return (

            <div className="bigImageBox">
                <div className="inner">
                    <img src={`carimages_small/${nowid}/${nowalbum}/${carimages[nowalbum][nowidx]}`} className="bigimg" ref="bigimg"/>
                    <p className="loading" ref="loading"></p>
                    <div className="leftBtn" onClick={()=>{
                        this.props.dispatch({"type":"picshow/goPrev"})
                    }}></div>
                    <div className="rightBtn" onClick={()=>{
                        this.props.dispatch({"type":"picshow/goNext"})
                    }}></div>
                    <div className="picnumber">{nowgxulie}/{zongshu}</div>
                    <div className="autoplay">
                        {
                            this.state.isAutoPlay
                            ?
                            <img src="/images/zanting.svg" onClick={()=>{
                                this.setState({isAutoPlay:false});
                                clearInterval(this.timer);
                            }} />
                            :
                            <img src="/images/bofang.svg" onClick={()=>{
                                this.timer = setInterval(()=>{
                                    this.props.dispatch({"type":"picshow/goNext"});
                                },1000)
                                this.setState({isAutoPlay:true})
                            }} />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    ({picshow:{nowid,nowalbum,carimages,nowidx}})=>({
        nowid,
        nowalbum,
        carimages,
        nowidx
    })
)(BigImageBox);



