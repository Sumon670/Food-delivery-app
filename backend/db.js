const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://chatterjee03sumon:Sumon123@cluster0.4oinm.mongodb.net/foodvillamern?retryWrites=true&w=majority&appName=Cluster0';

async function mongoDB() {
    
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected...');
        const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray(); 
        const fetched_category = await mongoose.connection.db.collection("food_category").find({}).toArray(); 
        //console.log(fetched_data);
        global.food_items = fetched_data;
        global.food_category = fetched_category;
        //console.log(global.food_category);
        //console.log(global.food_items);
    } catch (error) {
        console.error('Error connecting to MongoDB or fetching data:', error.message);
        // Handle error appropriately
    }
}
// const mongoDB = async() =>{
//     await mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true}, async(err,result)=>{
//         if(err) console.log("---",err);
//         else{
//             console.log("MongoDB connected");
//             const fetched_data = await mongoose.connection.db.collection("food_items");
//             fetched_data.find({}).toArray(async function(err,data){
//                 if(err) console.log("---",err);
//                 else{
//                     global.food_items = data;
//                 }
//             });
//         }
//     })
// }
module.exports = mongoDB;
