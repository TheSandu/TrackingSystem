const express = require( "express" );
const bodyParser = require( "body-parser" );
const MongoClient = require( "mongodb" ).MongoClient; 
const DB = require( "./modules/dBase" );

let app = express();
var dBase;


app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );


app.get( "/all/:collection", ( req, res) => {
    dBase.getAllCollection( req.params.collection );
    res.send( req.body );
});

app.get( "/all/where/:collection", ( req, res ) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    dBase.getWhere( req.params.collection , req.query);
    res.send( req.body );
});

app.post( "/insertCar", ( req, res ) => {

    var car = {
        lat: req.body.lat,
        lon: req.body.lon,
        name: req.body.name
    };

    if( car.lat != undefined && car.lon != undefined )
    {
        docs = dBase.insert( collection, objToInsert);
        res.send( docs );
    } else {
        res.send( "Sorry parameters a undefined..." );
    }
        
});

app.post( "/updateMyPosition", ( req, res ) => {
    console.log( JSON.stringify(req.body) );
    var myquery = { name: req.body.name, };
    var newvalues = { $set: {lat: req.body.lat, lon: req.body.lon } };
    var collection = req.body.collection;
    dBase.updateOne( collection, myquery, newvalues);
    res.send( req.body );
});

app.post("/POSTtest", ( req, res ) => {
    res.send( req.body );
});

app.get( "/", ( req, res) => {
    res.send( "SANDU API" );
});

const port = process.env.PORT || 3000;
app.listen( port, () => {
    dBase = new DB( "127.0.0.1", "27017", "trackingSystem" );
    console.log(`> Server start on port ${port}.....`);
});