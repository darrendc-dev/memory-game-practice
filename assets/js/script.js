    
    var flippedCard = false;
    var pauseGame = false;
    var firstFlip, secondFlip;
    var shuffleArray = document.querySelectorAll('.playingCard');

    window.onload = function() {
        $('.playingCard').addClass('flipCard');
        shuffleCards();
        startTimer();
        moveDisplay();
    };

    // Card Event Listener

    $('.playingCard').click(function(){
        if (pauseGame) return;
        $(this).removeClass('flipCard').addClass('clicked');
        if(!flippedCard){
            console.log("First card");
            flippedCard = true;
            firstFlip = this;
            moveAdd();
        } else {
            console.log("Second card")
            flippedCard = false;
            secondFlip = this;
            moveAdd();
            cardCheck();
        };
    });


    // Restart Game

    $('#reset').click(function (){
        $('.playingCard').addClass('flipCard').addClass('unmatched');
        shuffleCards();
        resetMove();
        resetScore();
        resetTimer();
    });

    //Check Are 2 cards matching
    function cardCheck() {
        console.log(firstFlip)
        console.log(secondFlip)
        if( firstFlip.dataset.type === secondFlip.dataset.type){
            console.log("Match");
            $(firstFlip, secondFlip).addClass('matched');
            // addPair();
            addScore();
            finishGame();
        }else{
            console.log("Not matching");
            pauseGame = true;
            setTimeout ( function () {
                $(firstFlip).addClass('flipCard').removeClass('clicked');
                $(secondFlip).addClass('flipCard').removeClass('clicked');
                pauseGame = false;
            }, 1500);    
            subScore();
        };
    }; 

    // Not allowing select same match's again or same card

    // funtion selectCheck(){
    //     if ($('.playingCard').filter('matched') === true) {removeClass('clicked')};
    // }

    // function unbind(){
    //     $(firstFlip).unbind();
    //     $(secondFlip).unbind();
    // };

    


    // Randomise Cards


    function shuffleCards() {
        shuffleArray.forEach ( playingCard => {
            var ranNum = Math.floor(Math.random() * (shuffleArray.length-1));
            playingCard.style.order = ranNum;
            console.log("Randomised")
        });
    };

    // All Cards Matched????


    var matchedPair = 0;

    function finishGame(){
        if(matchedPair === 8){
            stopTimer();
            resetMove();
        }
    }

    // function addPair(){
    //     matchedPair++;
    // }

    // Counting Moves


    var moveUsed = document.getElementById("moveUsed");
    var move = 0;

    function moveDisplay(){
        document.getElementById("moveUsed").innerHTML =  move ;
    }

    function resetMove() {
        if (move > 0) { move = 0 }
    }

    function moveAdd() {
        moveUsed.innerHTML = move + " Cards Flipped";
        move++;
    }




    // timer
     var timeCounter = document.getElementById("timeCounter");
     var timer = 0;


     function startTimer() {
        timePassed = setInterval(function(){
            document.getElementById("timeCounter").innerHTML = "Time Passed " + timer;
            timer++;
        }, 1000);
     }


     function resetTimer() {
        timer = 0;
     };

     function stopTimer(){
        clearInterval(startTimer)
     };


    // Score ------


     var scoredisplay = document.getElementById("scoredisplay");
     var totalScore = 0;

     function addScore(){
        scoredisplay.innerHTML = totalScore;
        console.log("add 20 points")
        totalScore += 20;
     }

     function subScore(){
        scoredisplay.innerHTML = totalScore;
        console.log("take 4 points")
        totalScore -= 4;
     }

     function resetScore() {
        if (totalScore > 0) { totalScore = 0 };
        scoredisplay.innerHTML = totalScore;
     };


    // star rating

    // Scoreboard