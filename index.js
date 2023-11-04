import App from './api/server.js';


const port = process.env.PORT || 4000;


App.listen(port,() => {
    console.log(`sever listening ${port} `);
})

