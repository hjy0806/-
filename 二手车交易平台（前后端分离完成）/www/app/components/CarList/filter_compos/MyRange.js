import React from "react";
import cn from "classnames";
import { Slider } from 'antd';
export default (props)=>{
    var v = props.value ?  props.value : props.defaultV;
    return <div>
        <Slider
            range
            value={v}
            onChange={(value)=>{ props.onChange(value)}}
            onAfterChange = {(value)=>{ props.onChoose(value)}}
        />
    </div>
}