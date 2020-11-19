module.exports =(app) => {
    
    //index route
    app.get('/', (req, res) => {
        res.send("Hello World!!")
    });
};