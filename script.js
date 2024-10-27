//Taking user input: question and answer and creating flashcard

let qsnElement = document.querySelector("#question-field");
let ansElement = document.querySelector("#answer-field");
let cardSection = document.querySelector(".flashcards-section");
let data = [];
let flashcardCreated = false;

//Create FlashCard Button
document.querySelector("#create-btn").addEventListener("click", () => {

    if(!flashcardCreated){
        let text = qsnElement.value.trim();
        let cardType = "#qsn"
    
        if (qsnElement.value === "" || ansElement.value === "") {
            console.log("d") //Note: Add error message here!
        }
        else {
            for (let i = 0; i < 2; i++) {
                let card = document.querySelector(cardType);
                card.innerHTML = `<h3>${text}</h3>`;
                text = ansElement.value.trim();
                cardType = "#ans";
            }
        }
        flashcardCreated = true;
    }
});

//Next Button
document.querySelector("#next-btn").addEventListener("click",()=>{

    if(flashcardCreated){
        data.push({question:qsnElement.value.trim(),answer:ansElement.value.trim()});
        qsnElement.value = "";  
        ansElement.value = "";
        document.querySelector("#qsn").innerText ="Question...";
        document.querySelector("#ans").innerText = "Answer...";    
        flashcardCreated = false;
    }
    else{
        console.log("error");
    }
});

//Save Button
document.querySelector("#save-btn").addEventListener("click",()=>{

    if(flashcardCreated){
        data.push({question:qsnElement.value.trim(),answer:ansElement.value.trim()});
        qsnElement.value = "";  
        ansElement.value = "";
        document.querySelector("#qsn").innerText ="Question...";
        document.querySelector("#ans").innerText = "Answer...";    
        flashcardCreated = false;
    }

    const stringJson = JSON.stringify(data,null,4);
    const blob = new Blob([stringJson], {type: "application/json"});
    const url = URL.createObjectURL(blob);

    if(confirm("Click Ok to save the flashcards locally!")){
        document.querySelector("#downloadLink").setAttribute("href", url);
        document.querySelector("#downloadLink").setAttribute("download","file.json");
    }
});
