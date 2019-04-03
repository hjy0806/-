import React from 'react';
import cn from "classnames";
import { DatePicker } from 'antd';
import moment from 'moment';
const { MonthPicker, RangePicker } = DatePicker;

export default class MyCalendar extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {

        return (
            <div>
                <RangePicker
                      value={this.props.buydate}
                      onChange = {(value)=>{
                        this.props.onChoose(value)
                      }}
                      allowClear = {false}
                    />
            </div>
        );
    }
}
