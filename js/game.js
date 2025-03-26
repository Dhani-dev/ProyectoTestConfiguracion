//Se realiza un módulo
const game = (function () {

    const maxLife = 20; //Vida máxima

    let name1 = prompt('Ingrese el jugador 1');
    let player1 = {
        name: name1,
        life: maxLife,
        wins: 0
    }

    let name2 = prompt('Ingrese el jugador 2');
    let player2 = {
        name: name2,
        life: maxLife,
        wins: 0
    }

    function updatePlayers() {
        document.getElementById("name1").innerText = player1.name; //Asigna el nombre 
        document.getElementById("name2").innerText = player2.name;
        document.getElementById("wins1").innerText = player1.wins; //Obtiene victorias
        document.getElementById("wins2").innerText = player2.wins;
        document.getElementById("life1").style.width = (player1.life / maxLife * 100) + "%"; //Calcula el ancho de la barra
        document.getElementById("life2").style.width = (player2.life / maxLife * 100) + "%";
        document.getElementById("player1").classList.toggle("active", currentPlayer === player1); //Resalta el jugador
        document.getElementById("player2").classList.toggle("active", currentPlayer === player2);
    }

    let currentPlayer = player1; //Define el jugador inicial

    const randomShoot = function () {
        return Math.floor(Math.random() * 10); //Devuelve un valor entre 0 y 9
    }

    const fightWithDamage = (player, damage, life) => {
        alert(`${player} recibió un ataque de ${damage} puntos. Vida restante: ${life}`);
    }

    //Si recibe solo un parametro se puede omitir el ( ) y si ejecuta solo una línea de código se pueden quitar las { }
    const fatality = player => alert(`Derrotado ${player}`);

    const attack = () => {
        if (currentPlayer === player1) {
            let damage = randomShoot();
            player2.life = Math.max(0, player2.life - damage); //Asegura que la vida no sea menor a 0
            fightWithDamage(player2.name, damage, player2.life);
            endGame(player2);
        } else if (currentPlayer === player2) {
            let damage = randomShoot();
            player1.life = Math.max(0, player1.life - damage);
            fightWithDamage(player1.name, damage, player1.life);
            endGame(player1);
        }
        updatePlayers();
        switchTurn();
    }

    const heal = () => {
        if (!currentPlayer) return;

        if (currentPlayer.life === maxLife) {
            alert(`${currentPlayer.name} tiene la vida completa y no puede curarse`);
            return;
        }

        let healing = Math.floor(Math.random() * 5) + 5; // Cura entre 5 y 15 puntos
        currentPlayer.life = Math.min(maxLife, currentPlayer.life + healing); //Asegura que no pase de maxLife y suma la curación
        updatePlayers();

        alert(`${currentPlayer.name} usó una poción y recuperó ${healing} puntos de vida. Vida total: ${currentPlayer.life}`);

        switchTurn();
    }

    const resetGame = () => {
        player1.life = maxLife;
        player2.life = maxLife;
        updatePlayers();
        alert("¡Nueva partida!");
    }

    const endGame = player => {
        if (player.life <= 0) {
            player.life = 0; //Evita que la vida sea negativa
            let winner;
            if (player === player1) {
                winner = player2;
            } else {
                winner = player1;
            }
            winner.wins++;
            alert(`${winner.name} ha ganado esta partida. Victorias: ${winner.wins}`);
            fatality(player.name);
            resetGame();
        }
    }

    function switchTurn() {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
        updatePlayers();
    }

    document.getElementById("attackBtn").addEventListener("click", attack);
    document.getElementById("healBtn").addEventListener("click", heal);

    updatePlayers();
})()



