
var io = require('socket.io').listen(8080);
var redis = require('redis');
var redisClient = redis.createClient({host : '127.0.0.1', port : 6379});

io.sockets.on('connection', function (socket) 
{

console.log("Se conecto un usuario!");

function tiemporeal()
{
	redisClient.lrange('1003', 0, -1, function(err, reply) {
	     // ['angularjs', 'backbone']
	    cadena = "";
	    for (var i = 0; i < reply.length; i++) 
	    {
	    	cadena = cadena + reply[i]+"=";
	    }
	    console.log("[");
	    console.log(cadena);
	    console.log("]");
		io.emit('this', cadena);
		setTimeout(tiemporeal, 5000);
	});
}
tiemporeal();


  socket.on('clientMSG', function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
  });

  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });


});

redisClient.on('ready',function() {
 console.log("Redis is ready");
});

redisClient.on('error',function() {
 console.log("Error in Redis");
});


console.log("Corriendo y escuchando al 8080 por socket io");
