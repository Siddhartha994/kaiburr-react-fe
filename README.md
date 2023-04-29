# Getting Started with Create React App

This project was created with [Create React App](https://github.com/facebook/create-react-app) 
and [Ant Design](https://ant.design/)


# `Available live on a01407588b1cb4d4aa901e0d77a6ac86-494513001.us-east-1.elb.amazonaws.com:5000`

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Project supports CRUD operations for "Servers"

Used AntD Modals, Foms & Layouts for handling data and designs in a smooth manner.
![image](https://user-images.githubusercontent.com/57999861/235324854-7b617a93-8d15-4588-887b-bf00d0faa64e.png)

`Create New Server`
![image](https://user-images.githubusercontent.com/57999861/235324889-e8935b8e-38e5-434b-9669-119c2e5a212d.png)
`Edit Existing Records`
- use cancel or X to cancel editing
- ok to confirm the update

![image](https://user-images.githubusercontent.com/57999861/235324913-995a029e-3dd1-4aa0-b8dd-ac362b2634cc.png)
`Delete Records` 
![image](https://user-images.githubusercontent.com/57999861/235325008-f26085de-e069-440f-b58e-fb7a3a4a28f5.png)


Every API call made via `REACT_APP_BASE_API_ENDPOINT` in .env.

###`Modularised code` 
1. css files in form of `styles.modules.css` make it easier to give ClassNames in files
2. reusable React components help to use fragments of code everywhere
3. folder structure helpful for scaling application using Redux
