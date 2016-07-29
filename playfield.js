function Position(id, name, color, step) {
	this.id = id;
	this.step = step;
	this.top = 0;
	this.left = 0;
	this.name = name;
	this.varCircle;
	this.varName;
	this.color = color;
	this.fieldHeight = $('.field').height() - 100; 
	this.fieldWidth = $('.field').width() - 100;
	this.keyCode = {
		37: 'ArrowLeft',
		38: 'ArrowUp',
		39: 'ArrowRight',
		40: 'ArrowDown'
	}
}

Position.prototype.init = function() {
	this.varCircle = $('<div class="test-circle"></div>');
	this.varName = $('<p class="name"></p>');
	$('.field').append(this.varCircle)
		.append(this.varName);		
	$('.field').css('height', this.fieldHeight);
	$('.name').text(this.name);
	$('.test-circle').css('top',this.top)
		.css('left', this.left)
		.css('background-color',this.color);
	$('.name').css('top', this.top)
		.css('left', 45 + this.left);
}

Position.prototype.ArrowUp = function() {
	if (this.top > 0) {
		this.top = this.top - this.step;
		if (this.top < 0) this.top = 0;
	}
}

Position.prototype.ArrowDown = function() {
	if (this.top < this.fieldHeight - 40 - this.step - 1) {
		this.top = this.top + this.step;
		if (this.top > this.fieldHeight) this.top = this.fieldHeight - 40 - this.step - 1;
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
	$('.test-circle').css('top', this.top)
		.css('left', this.left)
		.css('background-color', this.color);
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

		$('body').keydown(textCircle.Move.bind(textCircle))
			.keydown(function(event) {
			if (event.which in textCircle.keyCode) {
				// debugger;
				socket.emit('init', textCircle);
			}
		});

		// setTimeout(function() {textCircle.Remove()}, 5000);

	} else {
		// console.log(data);
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
