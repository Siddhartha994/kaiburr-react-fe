import React from "react";
// import style from "./style.module.css";
import { Table } from "antd";
const Home = (props) => {
    return (
        <Table columns={props.columns} dataSource={props.data}/>
    );
};

export default Home;