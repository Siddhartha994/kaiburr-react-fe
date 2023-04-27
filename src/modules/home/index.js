import React from "react";
// import style from "./style.module.css";
import { Table } from "antd";
const Home = (props) => {
    
    let {data, columns} = props;

    return (
        <Table columns={columns} dataSource={data} rowKey={(data)=>data.id} />
    );
};

export default Home;