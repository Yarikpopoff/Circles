var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('port', process.env.PORT || 3000);

server.listen(app.get('port'), function() {
	console.log("Listening on " + app.get('port'));
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/firstpage.html');
});

app.get('/circles.css', function (req, res) {
  res.sendfile(__dirname + '/circles.css');
});

app.get('/circles.js', function (req, res) {
  res.sendfile(__dirname + '/circles.js');
});

app.get('/secondpage.html', function (req, res) {
  res.sendfile(__dirname + '/secondpage.html');
});

app.get('/playfield.css', function (req, res) {
  res.sendfile(__dirname + '/playfield.css');
});

app.get('/playfield.js', function (req, res) {
  res.sendfile(__dirname + '/playfield.js');
});

var circles = [];

io.on('connection', function (socket) {
  
  console.log('A user "' + socket.id + '"" connected');
  
  socket.emit('init', {id: socket.id});
  
  socket.on('init', function(data) {
    if (circles.length == 0) {
      circles.push(data);
    } else {
      circles.some(function(el) {
        return el.id === data.id 
      }) ? null : circles.push(data);
    }
    circles.forEach(function(el) {
      if (el.id == data.id) {
        el.top = data.top;
        el.left = data.left;
      }
    });
    // socket.broadcast.emit('init', data);
    io.emit('init', circles);
  });

  socket.on('disconnect', function () {
    console.log('A user "' + socket.id + '" disconnected');
    var del;
    circles.forEach(function(el, i) {
      if (el.id == socket.id) {
        del = i;
      };
    });
    if (del !== -1) {
      circles.splice(del, 1)
    };
    io.emit('init', circles);
  });

});