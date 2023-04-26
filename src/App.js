import React,{ useState } from 'react';
// import { Button } from 'antd';
import Home from './modules/home'
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
const data = [
	{
		name: 'my centos',
		id: '123',
		language: 'java',
		framework: 'django',
		key: '1'
	},
];
function App() {
	const [servers, setServers] = useState(data);
	
	const setServerHandler = (server) => {
		setServers([...servers, server]);
	}

	return (
		<>
		<div className="App">
			{/* <Create handler={setServerHandler}/> */}
			<Home data={servers} columns={columns}/>
		</div>
		</>
	);
}

export default App;
