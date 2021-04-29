   let canvas = document.getElementById("snake");
   let context = canvas.getContext("2d");  /* Renderiza o desenho dentro do nosso canvas em 2d no HTML */
   let box = 32;
   let score = 0;
   let snake = [];
   snake[0] = {
	   x: 8 * box,
	   y: 8 * box
   }
   let direction = "right";
   let food = {
	   x: Math.floor(Math.random() * 15 + 1) * box,
	   y: Math.floor(Math.random() * 15 + 1) * box   /* Números aleatórios distribuidos dentro do canvas*/
   }
   
   function criarBG() {
        context.fillStyle = "Lightblue";   /* Define a cor do canvas*/
		context.fillRect(0, 0, 16 * box, 16 * box); /* Desenha o retangulo onde o jogo vai ser aberto*/
   }
   
   function criarCobrinha() {
	   for( i = 0; i < snake.length; i++) {
		   context.fillStyle = "green";
		   context.fillRect(snake[i].x, snake[i].y, box, box);
	   }
   }
   
   function drawFood() {
	   context.fillStyle = "orange";
	   context.fillRect(food.x, food.y, box, box);
	   
   }
   
   document.addEventListener("keydown", update);
   
   function update (event) {
	   if(event.keyCode == 37 && direction !="right") direction = "left"; /* Evita que a cobrinha mude para a direção oposta diretamente*/ 
	   if(event.keyCode == 38 && direction !="down") direction = "up";
	   if(event.keyCode == 39 && direction !="left") direction = "right";
	   if(event.keyCode == 40 && direction !="up") direction = "down";
   }
   
   function iniciarJogo() {
	   
	   for ( i = 1; i < snake.length; i++){
		   if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
			   clearInterval(jogo);
			   alert("If it was a snake, it would have bit you. Game over :( ")
		   }
	   }
	   
	   if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0 * box; /* Faz a cobrinha aparecer do outro lado quando cruza a borda do canvas*/
	   if(snake[0].x < 0 * box && direction == "left") snake[0].x = 16 * box;
	   if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0 * box;
	   if(snake[0].y < 0 * box && direction == "up") snake[0].y = 16 * box;
	   
	    criarBG();
        criarCobrinha();
		drawFood();
		
		let snakeX = snake[0].x;
		let snakeY = snake[0].y;
		
		if(direction == "right") snakeX += box;
		if(direction == "left") snakeX -= box;
		if(direction == "down") snakeY += box;
		if(direction == "up") snakeY -= box;
		
		if(snakeX != food.x || snakeY != food.y) {
			snake.pop();
		}else {food.x = Math.floor(Math.random() * 15 + 1) * box;
	        food.y = Math.floor(Math.random() * 15 + 1) * box;	
			score++;
		}
		
		let newHead = {
			x: snakeX,
			y: snakeY
		}

		snake.unshift(newHead); 
		
		 context.fillStyle = "white";
         context.font = "50px Changa one";
         context.fillText(score,2*box, 1.5*box);
   }
   
let jogo = setInterval(iniciarJogo, 100);