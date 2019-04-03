import React from 'react';
import cn from "classnames";
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;
export default (props)=>{
    return <div>
        <CheckboxGroup
            options={props.options}
            onChange={(value)=>{
                props.onChoose(value)
            }}
            value={props.value}
        />
    </div>
}