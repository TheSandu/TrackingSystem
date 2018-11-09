/**
 * Usage of modeule
 * 
 * var DB = new DB({
 *          host: "127.0.0.1",
 *          dbName: "test",
 *          port: "27017",
 *          onDBLoad: function(){}
 * });
 */


const MongoClient = require( "mongodb" ).MongoClient; 

class DB
{
    constructor( host, port, dbName )
    {
        if( host == undefined )
        {
            this.host = "127.0.0.1";
            console.log( "> Host address set to 127.0.0.1");
        } else
        this.host = host;

        if( port == undefined )
        {
            this.port = "27017";
            console.log("> Port is set to 27017");
        } else
            this.port = port;

        MongoClient.connect( `mongodb://${this.host}:${this.port}`, ( err, client) =>
        {
            if( err )
            {
                return console.log( "> ", err);
            } else {
                console.log( "DB connected..." );
            }

            this.db = client.db( dbName );
        });
    }

    insert( collection, objToInsert )
    {
        this.db.collection( collection ).insert( objToInsert, ( err, result ) => {
            if(err)
                console.log(err);

            console.log( objToInsert );
        });
    }

    getWhere( collection, whereObj )
    {
        console.log( "/---------Query---------/" );
        console.log( whereObj );
        this.db.collection( collection ).find( whereObj ).toArray( ( err, docs)=>{
            if( err )
                console.log( err );
            else
                console.log( "/--------Results--------/" );
                console.log( docs );
        });
    }

    updateOne( collection, myQuery, newValues )
    {
        this.db.collection( collection ).updateOne(myQuery, newValues, function(err, docs) {
            if (err) throw err;
            console.log("1 document updated...");
        });
    }
    getAllCollection( collection )
    {
        this.db.collection( collection ).find().toArray( ( err, docs)=>{
            if( err )
                console.log( err );
        });
    }
}

module.exports = DB;