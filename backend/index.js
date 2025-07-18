const express = require('express');
const cors = require('cors');
const connectdb = require('./utilities/connectdb');
const user_route = require('./routes/user_route');
const Foodrouter = require('./routes/foodrouter');
const cartrouter = require('./routes/cartroute');

const app = express();

// ✅ Correct usage of middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to DB
connectdb();

// ✅ Routes
app.use('/api/user', user_route); 
app.use('/api/food', Foodrouter);
app.use('/images',express.static('uploads'))
app.use('/api/cart',cartrouter)


app.get('/', (req, res) => {
    res.send("Success to you");
});

app.listen(5000, () => {
    console.log("✅ Server is running on http://localhost:5000");
});




//mongodb+srv://GreatStack:123123456@cluster0.1phqkli.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0