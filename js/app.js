$(document).ready(function (event) {
    'use strict';

    function Players() {
        this.playerOneNeededScore = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        this.playerTwoNeededScore = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
    }

    let players;

    function startScreen() {
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
            $(this).css('z-index', '-1');
        });
        togglePlayer();
        players = new Players();
        return players;
    }

    function winScreen(player) {
        let background = checkPlayer().css('background-color');
        let name = checkPlayer().attr('id');
        $('.screen-win').animate({
            opacity: 1
        }, 600, function () {
            $(this).css('z-index', '1');
            $(this).css('background-color', background);
            $('.message').text(`Winner - ${name}`);
        });
        $('#board').animate({
            opacity: 0
        }, 600, function () {
            $(this).css('z-index', '-1');
        });
        $('.button').on('click', function () {
            $('.box').each(function (index, value) {
                $(value).removeClass('box-filled-1');
                $(value).removeClass('box-filled-2');
            });
            startScreen();
        });
    }

    function togglePlayer() {
        if ($('#player1').hasClass('active')) {
            $('#player1').toggleClass('active');
            $('#player2').toggleClass('active');
        } else if ($('#player2').hasClass('active')) {
            $('#player2').toggleClass('active');
            $('#player1').toggleClass('active');
        } else {
            $('#player1').addClass('active');
        }
    }

    function checkPlayer() {
        return $('#player1').hasClass('active') === true ? $('#player2') : $('#player1');
    }

    function checkBox(selected) {
        if ($(selected).hasClass('box-filled-1') || $(selected).hasClass('box-filled-2')) {
            return true;
        } else {
            return false;
        }
    }

    function checkScore(array) {
        return array.length === 0 ? winScreen() : false;
    }

    function gameCondition(players, selected) {
        let boxIndex = $('.box').index(selected);
        const boxes = players;
        for (let k = 0; k < boxes.length; k++) {
            console.log(boxes[k]);
            for (let j = 0; j < boxes[k].length; j++) {
                if (boxes[k][j] === boxIndex) {
                    boxes[k].splice(j, 1);
                    checkScore(boxes[k].slice());
                }
            }
        }
    }

    $('.screen .button').on('click', function () {
        startScreen();
    });

    fillBox(players);

    function fillBox(players) {
        const player1 = players.playerOneNeededScore;
        const player2 = players.playerTwoNeededScore;
        $('.box').on('click', function (event) {
            const selected = event.target;
            if (checkBox(selected) === false && $('#player1').hasClass('active')) {
                $(this).addClass('box-filled-1');
                togglePlayer();
                gameCondition(player1, selected);
            } else if (checkBox(selected) === false && $('#player2').hasClass('active')) {
                $(this).addClass('box-filled-2');
                togglePlayer();
                gameCondition(player2, selected);
            }
        });
    }

});