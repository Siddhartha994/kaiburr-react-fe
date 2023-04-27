import React,{ useState,useEffect } from 'react';
import Home from './modules/home'
import ModalForm from './modules/servers/create-servers'
import axios from 'axios';

const columns = [{
    title: "Name",
    dataIndex: "name",
    key: "name"
}, {
    title: "Id",
    dataIndex: "id",
    key: "id"
}, {
    title: "Language",
    dataIndex: "language",
    key: "language"
}, {
    title: "Framework",
    dataIndex: "framework",
    key: "framework"
}]
const data = [];

function App() {
	const [servers, setServers] = useState(data);

	// append latest created server
	const setServerHandler = (server) => {
		setServers([server.data.data, ...servers]);
	}
	// call data from server upon reload
	useEffect ( ()=>{
		let data = axios.get(`${process.env.REACT_APP_BASE_API_ENDPOINT}/servers`)
		data.then((res)=>{
			setServers(res.data);
		})
	}, []);

	return (
		<>
		<div className="App">
			<ModalForm handler={setServerHandler}/>
			<Home data={servers} columns={columns}/>
		</div>
		</>
	);
}

export default App;
