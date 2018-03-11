$(document).ready(function (event) {
    'use strict';

    function Players(playerOne, playerTwo, tie) {
        this.playerOneArray = playerOne;
        this.playerTwoArray = playerTwo;
        this.tiePossibility = tie;
    }

    function boardScreen() {
        const playerOne = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        const playerTwo = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        let tie = 0;
        setBoard();
        const players = new Players(playerOne, playerTwo, tie);
        fillBox(players);
    }

    function checkBox(selected) {
        return ($(selected).hasClass('box-filled-1') || $(selected).hasClass('box-filled-2')) ? true : false;
    }

    function checkPlayer() {
        return $('#player1').hasClass('active') === true ? $('#player2') : $('#player1');
    }

    function checkScore(array, tie) {
        return array.length === 0 ? winScreen() : tieCheck(tie);
    }

    function gameCondition(players, selected, tie) {
        for (let k = 0; k < players.length; k++) {
            for (let j = 0; j < players[k].length; j++) {
                if (players[k][j] === selected) {
                    players[k].splice(j, 1);
                    checkScore(players[k].slice(), tie);
                }
            }
        }
    }

    function fillBox(players) {
        let playerOne = players.playerOneArray,
            playerTwo = players.playerTwoArray,
            tie = players.tiePossibility;
        togglePlayer();
        $('.box').on('click', function (event) {
            const selected = $('.box').index(event.target);
            if (checkBox(selected) === false && $('#player1').hasClass('active')) {
                $(this).addClass('box-filled-1');
                togglePlayer();
                gameCondition(playerOne, selected, tie);
            } else if (checkBox(selected) === false && $('#player2').hasClass('active')) {
                $(this).addClass('box-filled-2');
                togglePlayer();
                gameCondition(playerTwo, selected, tie);
            }
        });
    }

    function setBoard() {
        $('.screen-start').animate({
            opacity: 0
        }, 600, function () {
            $(this).css('display', 'none');
        });
        $('#board').animate({
            opacity: 1
        }, 600);
        $('.screen-win').animate({
            opacity: 0
        }, 600, function () {
            $(this).css('display', 'none');
            $(this).css('z-index', '-1');
        });
    }

    function setWin() {
        let background = checkPlayer().css('background-color');
        let name = checkPlayer().attr('id');
        $('.screen-win').animate({
            opacity: 1
        }, 600, function () {
            $(this).css('display', 'inline');
            $(this).css('z-index', '1');
            $(this).css('background-color', background);
            $('.message').text(`Winner - ${name}`);
        });
        $('#board').animate({
            opacity: 0
        }, 600, function () {
            $(this).css('z-index', '-1');
        });
    }


    function tieCheck(tie) {
        $('.box').each(function (index, value) {
            if ($(value).hasClass('box-filled-1') || $(value).hasClass('box-filled-2')) {
                tie = tie + 1;
            }
        });
        let check = tie === 9 ? alert('Tie') : false;
        return check;
    }

    function togglePlayer() {
        if ($('#player1').hasClass('active')) {
            $('#player2').toggleClass('active');
            $('#player1').toggleClass('active');
        } else if ($('#player2').hasClass('active')) {
            $('#player2').toggleClass('active');
            $('#player1').toggleClass('active');
        } else {
            $('#player1').addClass('active');
        }
    }

    function winScreen() {
        setWin();
        $('.button').on('click', function () {
            window.location.reload(true);
        });
    }

    $('.screen-start .button').on('click', function () {
        boardScreen();
    });
});