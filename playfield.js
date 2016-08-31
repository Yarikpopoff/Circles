function Position(id, name, color, step) {
	this.id = id;
	this.step = step;
	this.top = 0;
	this.left = 0;
	this.name = name;
	this.varCircle = $('<div class="user-circle"></div>');
	this.varName = $('<p class="name"></p>');
	this.color = color;
	this.fieldHeight = $('.field').height(); 
	this.fieldWidth = $('.field').width() - 44;
	this.mouseMode = 'Stop';
	this.keyCode = {
		37: 'ArrowLeft',
		38: 'ArrowUp',
		39: 'ArrowRight',
		40: 'ArrowDown'
	}
}

Position.prototype.init = function() {
	$('.field').append(this.varCircle)
		.append(this.varName);		
	$('.name').text(this.name);
	$('.user-circle').css('top',this.top)
		.css('left', this.left)
		.css('background-color',this.color);
	$('.name').css('top', this.top)
		.css('left', 45 + this.left);

}

Position.prototype.mouseInit = function() {
	var _this = this;
	$('.user-circle')
		.mousedown(function() {
			_this.mouseMode = 'Move';
		});
	$('body').mousemove(function(event) {
		event.preventDefault();
		if (_this.mouseMode == 'Move') {
			_this.top = event.pageY - 30;
			if (_this.top < 0) _this.top = 0;
			if (_this.top > _this.fieldHeight - 44) _this.top = _this.fieldHeight - 44; 
			_this.left = event.pageX - 30;
			if (_this.left < 0) _this.left = 0;
			if (_this.left > _this.fieldWidth) _this.left = _this.fieldWidth;
			$('.user-circle').css('top', _this.top)
				.css('left', _this.left);
			$('.name').css('top', _this.top)
				.css('left', 45 + _this.left);
			socket.emit('init', _this);
		};
	}).mouseup(function() {
		_this.mouseMode = 'Stop';
	});
}

Position.prototype.ArrowUp = function() {
	if (this.top > 0) {
		this.top = this.top - this.step;
		if (this.top < 0) this.top = 0;
	}
}

Position.prototype.ArrowDown = function() {
	if (this.top < this.fieldHeight) { 
		this.top = this.top + this.step;
		if (this.top > this.fieldHeight - 44) this.top = this.fieldHeight - 44; 
	}
}

Position.prototype.ArrowLeft = function() {
	if (this.left > 0) {
		this.left = this.left - this.step;
		if (this.left < 0) this.left = 0;
	}
}

Position.prototype.ArrowRight = function() {
	if (this.left < this.fieldWidth) {
		this.left = this.left + this.step;
		if (this.left > this.fieldWidth) this.left = this.fieldWidth;
	}
}

Position.prototype.Move = function(event) {
	if (event.which in this.keyCode) {
		this[this.keyCode[event.which]]();
	}
	$('.user-circle').css('top', this.top)
		.css('left', this.left);
	$('.name').css('top', this.top)
		.css('left', 45 + this.left);
}

Position.prototype.Remove = function() {
	this.varCircle.remove();
	this.varName.remove();
}

var id;
var socket = io.connect();

socket.on('init', function(data) {
	if (Object.keys(data) == 'id') {
		
		id = data.id;
		var textCircle = new Position(id, localStorage.userName, localStorage.userBackgroundColor, 5);
		textCircle.init();
		socket.emit('init', textCircle);
		textCircle.mouseInit();

		$('body').keydown(function (event) {
			if (event.which in textCircle.keyCode) {
				textCircle.Move(event);
				socket.emit('init', textCircle);
			}
		});

		// setTimeout(function() {textCircle.Remove()}, 5000);

	} else {
		$('.other-circle').remove();
		$('.other-name').remove();
		data.forEach(function(el) {
			if (id !== el.id) {
				el.varCircle = $('<div class="other-circle"></div>');
				el.varName = $('<p class="other-name"></p>');
				$('.field').append(el.varCircle)
					.append(el.varName);		
				$(el.varName).text(el.name);
				$(el.varCircle).css('top',el.top)
				.css('left', el.left)
				.css('background-color',el.color);
				$(el.varName).css('top', el.top)
				.css('left', 45 + el.left);
			}
		});
	}
});
