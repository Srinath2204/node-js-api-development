const express = require("express");

const app = express();

app.use(express.json());

app.use(express.urlencoded( {extended: true}));

const db = require("./app/models");
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> {
    console.log("Connected to the Database");
})
.catch(err => {
    console.log("Cannot connect to Database", err);
    process.exit();
});

require("./app/routes/tutorial.routes")(app);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is running from http://localhost:${PORT}`)
})

// app.get('/', (req, res) => {
//     res.send("Hello from nodejs api")
// });

// app.post('/api', (req, res) => {
//     res.send("Hello from nodejs api")
// });

