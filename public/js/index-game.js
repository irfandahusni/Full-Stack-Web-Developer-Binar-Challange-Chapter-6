class Competitor {
    constructor(sign, selection){
    this.sign = sign;
    this.signSelection = selection;
    }
}

class Player extends Competitor {
    constructor(sign) {
        super(sign);
    }
}

class Com extends Competitor {
    constructor(sign) {
        super(sign);
    }
}

class Game {
    constructor(player, com, resultDisplayElement) {
        this.player = player;
        this.com = com;
        this.resultDisplayElement = resultDisplayElement;
    }

    generate_selection(){
        let index = Math.floor(Math.random() * 3);

        if (index == 0) {
            this.com.sign[0].style.backgroundColor = "#c4c4c4";
            this.com.sign[1].style.backgroundColor = "#9b835f";
            this.com.sign[2].style.backgroundColor = "#9b835f";
            this.com.signSelection = 'rock';
        }

        else if (index == 1) {
            this.com.sign[0].style.backgroundColor = "#9b835f";
            this.com.sign[1].style.backgroundColor = "#c4c4c4";
            this.com.sign[2].style.backgroundColor = "#9b835f";
            this.com.signSelection = 'paper';
        }

        else if (index == 2) {
            this.com.sign[0].style.backgroundColor = "#9b835f";
            this.com.sign[1].style.backgroundColor = "#9b835f";
            this.com.sign[2].style.backgroundColor = "#c4c4c4";
            this.com.signSelection = 'scissor';
        }
    }

    determineWinner() {
        
        if ( this.player.signSelection == this.com.signSelection)
            {
                this.resultDisplayElement.innerHTML = `<h2 class="draw">DRAW</h2>`;
            }
        
        if ( 
                (this.player.signSelection == 'rock' && this.com.signSelection == 'scissor')
                || (this.player.signSelection == 'paper' && this.com.signSelection == 'rock')
                || (this.player.signSelection == 'scissor' && this.com.signSelection == 'paper')
            )
            {
                this.resultDisplayElement.innerHTML = `<h2 class="playerWin">PLAYER 1<br>WIN</h2>`;
             }
        
        if (
                (this.player.signSelection == 'rock' && this.com.signSelection == 'paper')
                || (this.player.signSelection == 'paper' && this.com.signSelection == 'scissor')
                || (this.player.signSelection == 'scissor' && this.com.signSelection == 'rock')
            )
            {
                this.resultDisplayElement.innerHTML = `<h2 class="comWin">COM<br>WIN</h2>`;
            }
        
    }

    shuffleIterator(runtimes, shuffle) {
        
        
    }

    begin() {
        this.generate_selection();
        setTimeout(() => {
            this.determineWinner(this.player.signSelection, this.com.signSelection);
          }, 200)
    }
}

// Define Game and Player
let player = new Player(document.getElementsByClassName("player-selection"));
let com = new Com(document.getElementsByClassName("com-selection"));
let game = new Game(player, com, document.getElementById("versus") );


const startGame = (selection) => {

    player.signSelection = selection;
    if (selection == "rock"){
        player.sign[0].style.backgroundColor = "#c4c4c4";
        player.sign[1].style.backgroundColor = "#9b835f";
        player.sign[2].style.backgroundColor = "#9b835f";
    }

    if (selection == "paper"){
        player.sign[0].style.backgroundColor = "#9b835f";
        player.sign[1].style.backgroundColor = "#c4c4c4";
        player.sign[2].style.backgroundColor = "#9b835f";
    }

    if (selection == "scissor"){
        player.sign[0].style.backgroundColor = "#9b835f";
        player.sign[1].style.backgroundColor = "#9b835f";
        player.sign[2].style.backgroundColor = "#c4c4c4";
    }

    for (let i=0; i<3; i++){ //DOM ITERATION, RESET BG
        com.sign[i].style.backgroundColor = "#9b835f";
    }
    game.resultDisplayElement.innerHTML = `<h2 class="versus">V S</h2>`;
    game.begin();
}

const resetGame = () => {
    player.sign[0].style.backgroundColor = "#9b835f";
    player.sign[1].style.backgroundColor = "#9b835f";
    player.sign[2].style.backgroundColor = "#9b835f";
    com.sign[0].style.backgroundColor = "#9b835f";
    com.sign[1].style.backgroundColor = "#9b835f";
    com.sign[2].style.backgroundColor = "#9b835f";
    game.resultDisplayElement.innerHTML = `<h2 class="versus">V S</h2>`;
}