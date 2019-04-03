import React from 'react';
import { connect } from "dva";
import cn from "classnames";
class CarLikeBox extends React.Component {

    constructor(props) {
        super(props);
        // 我们在构造函数中定义属性是方便在各个函数中来回使用的。
        // 相当于组件内部的全局变量。
        // b距离顶部的位置
        this.top = 0;
        // 比例 【瑞士欧】
        this.ratio = 0;
        // ul的高度
        this.ulH = 0;
        // ul外层的盒子
        this.boxH = 0;
        // b的高度
        this.bH = 0;
    }
    //组件上树后，给DOM元素绑事件
    componentDidMount() {
        var self = this;

        // 先让b标签拖拽
        $(this.refs.b).draggable({
            "containment":"parent",
            "drag":function(event,ui){
                self.top = ui.position.top;
                $(self.refs.ul).css("top",-self.top * self.ratio)
            }
        });
        // 当鼠标滚轮滚动的时候给carLikeBox监听
        $(this.refs.carLikeBox).mousewheel(function(event,delta){
            // 乘以10是加快滚动对top影响的速度
            self.top -= delta*10;
            if(self.top < 0) self.top = 0;
            if(self.top > self.boxH - self.bH )  self.top = self.boxH - self.bH;
            // b的top改变
            $(self.refs.b).css("top",self.top);
            // ul的高度
            $(self.refs.ul).css("top",-self.top * self.ratio)
        })
    };
    // 数据渲染完后
    componentDidUpdate(prevProps, prevState) {
        // ul的高度，是数据渲染完后 撑开的
        this.ulH = $(this.refs.ul).height();
        // 得到盒子的高度
        this.boxH = $(this.refs.carLikeBox).height();
        // 比例
        this.ratio = this.ulH /this.boxH ;
        // 如果比例小于1，说明不需要侧边滑道等元素
        if(this.ratio <= 1){
            $(this.refs.bar).hide();
        }else{
            $(this.refs.bar).show();
        };
        // 根据内容的多少动态的设置b的高度
        this.bH = this.boxH / this.ratio ;
        $(this.refs.b).height(this.bH);
    }
    render() {
        const {nowid , carlikes ,dispatch} = this.props;
        return (
            <div className="carLikeBox" ref = "carLikeBox">
                <ul ref="ul">
                    {
                        carlikes.map(item=>{
                            return <li
                                key={item.id}
                                className={cn({"cur":item.id == nowid})}
                                onClick={()=>{
                                    // 当id改变的时候，是整个图集变化的时候，也是重新拉取三个异步时候。
                                    dispatch({"type":"picshow/init","nowid":item.id})
                                }}
                            >
                            {item.color}色
                            { new Date(item.buydate).getFullYear()}年
                            {Math.round(item.km/10000)}万公里
                            {item.price}万元
                            {item.engine}排量
                            </li>
                        })
                    }
                </ul>
                <div className="bar" ref="bar">
                    <b ref="b"></b>
                </div>
            </div>
        );
    }
}
export default connect(
    ({picshow})=>({
        "carlikes":picshow.carlikes,
        "nowid":picshow.nowid
    })
)(CarLikeBox);

