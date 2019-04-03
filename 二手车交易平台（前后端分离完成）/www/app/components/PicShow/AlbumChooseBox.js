import React from 'react';
import {connect} from "dva";
import cn from "classnames";
class AlbumChooseBox extends React.Component {

    constructor(props) {
        super(props);
        // 未来上DOM的四个小标签
        this.ablumLis = [
            {"chinese":"外观","english":"view"},
            {"chinese":"内饰","english":"inner"},
            {"chinese":"结构及发动机","english":"engine"},
            {"chinese":"更多细节","english":"more"}
        ]
    }

    render() {
        const {carimages,nowalbum} = this.props;
        // 验证数据的有效性。如果carimages["view"] 是 undefined 或null （mounting）阶段 此时不渲染DOM ，直接return一个 null；
        if(!carimages["view"]) return null;
        return (
            <div className="albumChooseBox">
                <ul>
                    {
                        this.ablumLis.map(item=>{
                            return <li
                                key={item.english}
                                onClick={()=>{
                                    this.props.dispatch({"type":"picshow/changeNowAlbum","nowalbum":item.english})
                                }}
                                className={cn({"cur":item.english == nowalbum})}
                            >
                            {item.chinese}{carimages[item.english].length}
                            </li>
                        })
                    }
                </ul>
            </div>
        );
    }
}
export default connect(
    ({picshow})=>({
        "carimages":picshow.carimages,
        "nowalbum":picshow.nowalbum
    })
)(AlbumChooseBox)