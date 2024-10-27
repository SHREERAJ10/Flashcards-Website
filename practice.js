let fileArray;
let fileUpload = false;
let originalFlashcards;

document.querySelector("#fileUpload").addEventListener("change", function (event) {
    if (!fileUpload) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const fileContent = e.target.result;
            fileArray = JSON.parse(fileContent);
            originalFlashcards = [...fileArray];
            fileUpload = true;
        };
        reader.readAsText(file);
    }
});

//flashcard-section
let cardSection = document.createElement("div");
cardSection.setAttribute("class", "flashcard-section");
cardSection.setAttribute("id","card-section");

//flashcard
let card = document.createElement("div");
card.setAttribute("class", "flashcard");

//buttons-section
btnSection = document.createElement("div");
btnSection.setAttribute("class", "btn-section");
btnSection.style.marginBottom = "20px";

//qsn, answer button
let btn = document.createElement("button");
btn.setAttribute("class", "regular-btn");

//next-btn
let nextBtn = document.createElement("button");
nextBtn.setAttribute("class", "regular-btn");
let start = true;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

document.querySelector(".start-btn").addEventListener("click", () => {

    if (start && fileUpload) {
        let shuffledFlashcards = shuffleArray(originalFlashcards);
        let curIndex = 0;
        console.log(shuffledFlashcards);
        //First Question!
        document.querySelector(".start-btn").innerText = "Practice in Session...";
        document.querySelector(".section").append(cardSection);
        card.innerText = shuffledFlashcards[curIndex].question;
        document.querySelector(".flashcard-section").append(card);
        document.querySelector(".flashcard-section").after(btnSection);
        btn.innerText = "Answer";
        document.querySelector(".btn-section").append(btn);
        document.querySelector(".btn-section").append(nextBtn)
        nextBtn.innerText = "Next";
        start = false;

        //answer/qsn btn
        let curState = "qsnState";
        btn.onclick = () => {
            if (curState === "qsnState") {
                card.innerText = shuffledFlashcards[curIndex].answer;
                btn.innerText = "Question";
                curState = "ansState";

            }
            else {
                card.innerText = shuffledFlashcards[curIndex].question;
                btn.innerText = "Answer";
                curState = "qsnState";
            }      
        };

        //Display After Starting - next-btn
        nextBtn.addEventListener("click", () => {
            curIndex++;
            if (curIndex < shuffledFlashcards.length) {
                card.innerText = shuffledFlashcards[curIndex].question;

            }
            else {
                start = true;
                document.querySelector(".start-btn").innerText = "Start Practice";
                card.innerText = "Practice Completed!!!";
            }
        });
    }
});
