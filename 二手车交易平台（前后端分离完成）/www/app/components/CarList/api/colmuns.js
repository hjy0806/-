import React from 'react';
import moment from "moment";
export default [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      sorter:true
    },{
      title: '缩略图',
      dataIndex: 'avatar',
      key: 'avatar',
      render:function(text, record, index){
        return <img
                    style={{"width":"82px"}}
                    src={`carimages_small/${record.id}/view/${text}`}
                    className="suoluetu"
                    data-id={record.id}
                />
      }
    },{
      title: '车系',
      dataIndex: 'brand',
      key: 'brand',
      render:function(text, record, index){
            return <span>{text + record.series}</span>
      }
    },{
      title: '购买日期',
      dataIndex: 'buydate',
      key: 'buydate',
      sorter:true,
      render:function(text, record, index){
            return moment(text).format("YYYY年MM月")
      }
    },{
      title: '里程（万公里）',
      dataIndex: 'km',
      key: 'km',
      sorter:true,
      render:function(text, record, index){
            return Math.round(text/10000)
      }
    },{
      title: '售价（万元）',
      dataIndex: 'price',
      key: 'price',
      sorter:true
    },{
      title: '颜色',
      dataIndex: 'color',
      key: 'color',
    },{
      title: '发动机',
      dataIndex: 'engine',
      key: 'engine',
    },{
      title: '排放',
      dataIndex: 'exhaust',
      key: 'exhaust',
    },{
      title: '燃料',
      dataIndex: 'fuel',
      key: 'fuel',
    },{
      title: '变速箱',
      dataIndex: 'gearbox',
      key: 'gearbox',
    },{
      title: '车型',
      dataIndex: 'type',
      key: 'type',
    },{
      title: '座位数',
      dataIndex: 'seat',
      key: 'seat',
      sorter:true
    },{
      title: '是否上牌',
      dataIndex: 'license',
      key: 'license',
      render:function(text, record, index){
            return text ? <span>是</span> : <span>否</span>
      }
    }
];
