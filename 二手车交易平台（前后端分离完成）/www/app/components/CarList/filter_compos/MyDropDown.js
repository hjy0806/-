import React from "react";
import cn from "classnames";
import { Menu, Dropdown, Button} from 'antd';
export default (props)=>{
    const menu = (
      <Menu onClick={(value)=>{
        props.onChoose(value.key)
      }}>
        {
            props.options.map(item=>{
                return  <Menu.Item key={item}>{item}</Menu.Item>
            })
        }
      </Menu>
    );
    return <div className="dropdown">
            {props.title}
            {" "}
            <Dropdown.Button overlay={menu} trigger={["click"]}  >
                {props.value || "不限"}
            </Dropdown.Button>
    </div>
}