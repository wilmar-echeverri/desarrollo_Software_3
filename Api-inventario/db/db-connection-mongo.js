const mongoose = require('mongoose');
const getConnection=async () =>{
    try{
        const url ='mongodb://DBUser:DBPassword@ac-98lh5pv-shard-00-00.pbxw7uo.mongodb.net:27017,ac-98lh5pv-shard-00-01.pbxw7uo.mongodb.net:27017,ac-98lh5pv-shard-00-02.pbxw7uo.mongodb.net:27017/Inventarios?ssl=true&replicaSet=atlas-x1hett-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';
        await mongoose.connect(url);
    console.log('conexión exitosa');
    }catch(error){
        console.log(error);
    }
    
} 
module.exports={
    getConnection
}