import React from 'react';
import {connect} from "dva";
import CarList from "../components/CarList/CarList.js";
import AdminProFile from "../components/AdminProFile/AdminProFile.js";
import "./App.less";
class App extends React.Component {

    constructor(props) {
        super(props);
        // App组件负责发出一个init，让图集有一个初始化的id，开始一系类的反应
        // props.dispatch({"type":"picshow/init","nowid":1000001})
    }

    render() {
        return (
            <div>
                <CarList></CarList>
            </div>
        );
    }
}
export default connect()(App);