if (window.confirm("Do you want to start the Game !!!")) {
    const cards = document.querySelectorAll(".dream-card");

    let isFlipped = false;
    let firstCard, secondCard;
    let lockboard = false;

    (function shuffle() {
        cards.forEach((card) => {
            let shuffling = Math.floor(Math.random() * 12);
            card.style.order = shuffling;
        });
    })();

    const element = document.getElementById("timer");
    element.addEventListener("click", Timer);

    function flipCard() {
        if (lockboard) return;
        this.classList.add("flip");
        if (this === firstCard) return;
        if (!isFlipped) {
            //first click
            isFlipped = true;
            firstCard = this;
            return;
        }

        //second click
        isFlipped = false;
        secondCard = this;
        matchOrNot();
    }

    function matchOrNot() {
        let matchOrNot =
            firstCard.dataset.technology === secondCard.dataset.technology;
        matchOrNot ? disableCards() : unFlipCards();
    }

    function disableCards() {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
    }

    function unFlipCards() {
        lockboard = true;
        setTimeout(() => {
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");
            reset();
        }, 1300);
    }

    function reset() {
        [isFlipped, lockboard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function Timer() {
        var counter = 25;
        var myTimer = setInterval(function() {
            document.getElementById("testTimer").innerHTML = counter + " seconds";
            counter--;
            if (counter < 0) {
                clearInterval(myTimer);
                setTimeout(function() {
                    alert("Game Khatam Ho gya Hai!!");
                    window.location.reload();
                }, 1000);
            }
        }, 1000);
        cards.forEach((card) => card.addEventListener("click", flipCard));
    }
} else {
    window.location.reload();
}