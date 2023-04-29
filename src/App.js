import React,{ useState,useEffect } from 'react';
import Home from './modules/home/index'
import axios from 'axios';


// let data = [
// 	{
// 		"_id": "644a342411830ee1e1da0ac5",
// 		"name": "Kali",
// 		"language": "JS",
// 		"framework": "react",
// 		"id": 2733,
// 		"createdAt": "2023-04-27T08:36:52.742Z",
// 		"updatedAt": "2023-04-27T08:36:52.742Z",
// 		"__v": 0
// 	},
// 	{
// 		"_id": "644a33ff11830ee1e1da0ac3",
// 		"name": "Linux",
// 		"language": "Java",
// 		"framework": "Kotlin",
// 		"id": 5626,
// 		"createdAt": "2023-04-27T08:36:15.667Z",
// 		"updatedAt": "2023-04-27T08:36:15.667Z",
// 		"__v": 0
// 	}
// ]
const data = [];

function App() {
	const [servers, setServers] = useState(data);

	// append latest created server
	const setServerHandler = (server) => {
		setServers([server.data.data, ...servers]);
	}
	// call data from server upon reload
	useEffect ( ()=>{
		axios
		.get(`${process.env.REACT_APP_BASE_API_ENDPOINT}/servers`)
		.then((res)=>{
			console.log('idshar', res);
			setServers(res.data);
		})
		.catch((err)=>{
			console.log(err)
		})
		// setServers(data); // for static

		// })
	}, []);

	return (
		<>
		<div className="App">
			<Home
				data={servers} 
				handler={setServerHandler} />
		</div>
		</>
	);
}

export default App;
