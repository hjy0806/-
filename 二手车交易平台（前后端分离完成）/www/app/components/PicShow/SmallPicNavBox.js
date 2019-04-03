import React from 'react';
import { connect } from "dva";
import cn from "classnames";
class SmallPicNavBox extends React.Component {

    constructor(props) {
        super(props);
        // 当前的页数是page页
        this.page = 0;
    }
    // 得到新props的数据的时候，会引起一个函数的执行
    componentWillReceiveProps(nextProps) {
        // 计算page
        this.page = Math.floor( nextProps.nowidx / 4 );
        // 更改id的时候 ，让unit 自动动画。
        $(this.refs.unit).stop(true).animate({"left":-310* this.page},300);
        $(this.refs.navbar).find("span").eq(this.page).addClass('cur').siblings().removeClass('cur');
    };
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
    // 组件上树后
    componentDidMount() {
        var self = this;
        // 事件委托
        $(this.refs.navbar).on("click","span",function(){
            var i = $(this).data("i");
            // 拉动 unit 动画
            $(self.refs.unit).stop(true).animate({"left":-310* i},300);
            // 给span加cur
            $(this).addClass('cur').siblings().removeClass('cur');
        });

        //当鼠标离开大盒子的时候，拉回当前的位置 ，cur复位

        $(this.refs.smallPicNavBox).mouseleave(function(){
            $(self.refs.unit).stop(true).animate({"left":-310* self.page},300);
            $(self.refs.navbar).find("span").eq(self.page).addClass('cur').siblings().removeClass('cur');
        });
    }
    render() {
        const { nowid,nowalbum,carimages,nowidx,dispatch } = this.props;
        // carimages第一次render的时候是空的
        if(!carimages[nowalbum]) carimages[nowalbum] = [];
        // arr 是图片的名字
        const arr = carimages[nowalbum];
        // 总页数 等于 ul的个数 等于 分页器的个数
        const pageAmount = Math.ceil(arr.length / 4);
        //我们showUlLis函数，功能将一维的数据变成2维的数据 。
        //返回arr 中 有ul是第一层循环， li是第二层循环。
        const showUlLis = ()=>{
            var arrDOM = [];
            for (let i = 0; i < pageAmount; i++) {
                arrDOM.push(

                        <ul key={i}>
                            {
                                arr.slice(i*4,i*4+4).map((item,index)=>{
                                    return <li
                                        key={index}
                                        className={cn({"cur": nowidx == i*4+index})}
                                        onClick={()=>{

                                            dispatch({"type":"picshow/changeNowidx","nowidx":i*4+index})
                                        }}
                                    >
                                   { /* [i*4+index] 是每一张循环到的序列数。*/}
                                    <img src={`carimages_small/${nowid}/${nowalbum}/${arr[i*4+index]}`} />
                                    </li>
                                })
                            }
                        </ul>
                    )
            };
            return arrDOM;
        }
        const showSpan = ()=>{
            if(pageAmount == 1) return null;
            var arrDOM = [];
            for (let i = 0; i < pageAmount; i++) {

                arrDOM.push(
                        <span
                            key={i}
                            style={{"width": (298 - (pageAmount - 1) * 5) / pageAmount + "px" }}
                            className={cn({"cur": i == this.page})}
                            data-i = {i}
                        ></span>
                    )

            };

            return arrDOM;
        }
        return (
            <div className="smallPicNavBox" ref="smallPicNavBox">
                <div className="unit" ref= "unit">
                    {showUlLis()}
                </div>
                <div className="navbar" ref="navbar">
                    {showSpan()}
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
)(SmallPicNavBox);