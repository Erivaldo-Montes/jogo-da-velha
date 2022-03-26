// variables
const winnerSelect = document.getElementById('winner');
let player; let winnerGame = null;
const sections = document.getElementsByClassName('section');
const player_choices = document.getElementById('player');
const default_content = '-';
const scoreX = document.getElementById('playerX');
const scoreO = document.getElementById('playerO');
const games_scores = { playerX: [], playerO: [] };
const restart = document.getElementById('restart');
const winner_card = document.getElementsByClassName('winner_card');

for(var i of sections){
  i.classList.add("initial_section")
}

alter_player('X');
// add an event scout that fires when clicked and prints the section id on the console
for (let i = 0; i < sections.length; i++) {
  sections[i].addEventListener('click', (event) => {
    choose_player(event);
  })
}

restart.addEventListener('click', () => {
  restart_game();
});

// changes the player alternately.
function choose_player(event) {
  if (event.target.innerHTML !== default_content) {
    return;
  }

  if (winnerGame !== null) {
    return;
  }

  setTimeout(()=>{
    event.target.classList.remove("initial_section");
    event.target.classList.add(`section_played_${player}`, 'played_section')
  }, 200);
  event.target.innerHTML = player;
  set_class_button(event.target);

  if (player == 'X') {
    player = 'O';
  } else {
    player = 'X';
  }
  check_winner();
  alter_player(player);
}

function alter_player(valor) {
  player = valor;
  player_choices.innerHTML = player;
}
// checks whether the winning sequence was performed.
function check_winner() {
  let winner = null;
  const lines = [
    [sections[0], sections[1], sections[2]],
    [sections[3], sections[4], sections[5]],
    [sections[6], sections[7], sections[8]],
    [sections[0], sections[3], sections[6]],
    [sections[1], sections[4], sections[7]],
    [sections[2], sections[5], sections[8]],
    [sections[0], sections[4], sections[8]],
    [sections[2], sections[4], sections[6]],
  ];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line[0].innerHTML == line[1].innerHTML && line[1].innerHTML == line[2].innerHTML && line[0].innerHTML != default_content) {
      winner = line[0].innerHTML;
      alter_class(line);
    }
  }

  if (winner != null) {
    winnerSelect.innerHTML = winner;
    winnerGame = winner;
    set_score(winner);
    console.log(winner);
  }
}

// changes the colors of the square that formed the winning sequence.
function alter_class(line) {
  winner_card[0].classList.toggle('show')
  for (let i = 0; i < line.length; i++) {
    line[i].classList.add("winner_sequence")
   
  }
}

function set_score(winner) {
  if (winner === 'X') {
    games_scores.playerX.push(winner);
  }
  if (winner === 'O') {
    games_scores.playerO.push(winner);
  }

  scoreX.innerHTML = games_scores.playerX.length;
  scoreO.innerHTML = games_scores.playerO.length;
}

function restart_game() {
  for (let i = 0; i < sections.length; i++) {
    sections[i].innerHTML = default_content;
    sections[i].classList.remove(
    'flip-horizontal-bottom',
    'section_played_X', 
    'section_played_O',
     'played_section',
     'winner_sequence' );
    sections[i].classList.add('initial_section');
    winnerSelect.innerHTML = '';
    winner_card[0].classList.remove('show');
  }

  winnerGame = null;
  alter_player('X');
}

function set_class_button(event) {
  event.classList.add('flip-horizontal-bottom');
}
