var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';


document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {
        //1.Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2.Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        //3.Update the round score IF the rolled number was NOT a 1!
        if (dice1 !== 1 && dice2 !== 1) {
            //Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }

        /*
                if (dice === 6 && lastDice === 6) {

                    //Player looses score
                    scores[activePlayer] = 0;
                    document.querySelector('#score-' + activePlayer).textContent = '0';
                    nextPlayer();
                } else if (dice !== 1) {
                    //Add score
                    roundScore += dice;
                    document.querySelector('#current-' + activePlayer).textContent = roundScore;
                } else {
                    //Next player
                    nextPlayer();
                }
                lastDice = dice;
                */
    }
});


// Button HOLD

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying) {
        //Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;

        //Undefined, 0 null or "" COERCED to false
        //Anything else id COERCED to true
        if (input) {
            winningScore = input;
        } else {
            winningScore = 50;
        }

        //Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //Deleted class "active" player-0 from CSS
    document.querySelector('.player-0-panel').classList.toggle('active');
    //Add class "active" to player-1 from CSS
    document.querySelector('.player-1-panel').classList.toggle('active');

    //Deleted class "active" player-0 from CSS
    //document.querySelector('.player-0-panel').classList.remove('active');
    //Add class "active" to player-1 from CSS
    //document.querySelector('.player-1-panel').classList.add('active');

    //Deleted dice when changing player
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}



// button NEW GAME

document.querySelector('.btn-new').addEventListener('click', init);


function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}




/**************************/