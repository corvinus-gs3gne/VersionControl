var hotList= [];
var questionsInHotList = 3;
var displayedQuestion;
var numberOfQuestions;
var nextQuestion = 1;
var timerHandler;

document.addEventListener("DOMContentLoaded", () => {
   

        for (let i = 0; i < questionsInHotList; i++) {

            hotList[i] = {

                question: {},
                goodAnswers: 0

            }

            //hotList[i] = {};
            //hotList[i].goodAnswers = 0;

    }

   


        //KérdésekSzáma
        fetch("/questions/count2")
            .then(result => result.text())
        .then(n => { numberOfQuestions = parseInt(n) })

    //Előre-hátra gombok
    document.getElementById("eloregomb").addEventListener("click", elore);
    document.getElementById("visszagomb").addEventListener("click", vissza);


    //Mentett állapot olvasása
    if (localStorage.getItem('hotList')) {
        hotList = JSON.parse(localStorage.getItem("hotList"));
        console.log(hotList,"helo")

    }

    if (localStorage.getItem("displayedQuestion")) {
        displayedQuestion = parseInt(localStorage.getItem("displayedQuestion"));
        console.log(displayedQuestion)
    }

    if (localStorage.getItem("nextQuestion")) {
        nextQuestion = parseInt(localStorage.getItem("nextQuestion"));
        console.log(nextQuestion)
    }

    console.log(hotList.length)

    //Kezdokerdeslistaletoltese
    if (hotList.length === 0) {
        for (let i = 0; i < questionsInHotList; i++) {
            kerdesBetoltes(nextQuestion, i)
            nextQuestion++;
        }
    }
    else {
        console.log("LocalStoragebol olvasott üzenetekkel dolgozunk.")
        console.log(hotList)
        kerdesMegjelenítés();
    }
    
    

    });

function kerdesBetoltes(questionNumber, destination) {
    fetch(`/questionskettopontnulla/${questionNumber}`)
        .then(result => {
            if (!result.ok) {
                console.error(`Hibás letöltés: ${result.status}`);
                return null;
            }
            else {
                return result.json();
            }
        })
        .then(q => {
            hotList[destination].question = q;
            hotList[destination].goodAnswers = 0;
            console.log(`A ${questionNumber} kérdés letölrésre került a hotList ${destination}. helyére. `);
            if (displayedQuestion===undefined && destination===0) {

                displayedQuestion = 0;
                kerdesMegjelenítés();
            }
        })

}


function kerdesMegjelenítés() {


    let kerdes = hotList[displayedQuestion].question;
    document.getElementById("kerdes_szoveg").innerText = kerdes.questionText;
    document.getElementById("valasz1").innerText = kerdes.answer1;
    document.getElementById("valasz2").innerText = kerdes.answer2;
    document.getElementById("valasz3").innerText = kerdes.answer3;

    if (kerdes.image) {
        document.getElementById("kep").src = kerdes.image;
        document.getElementById("kep").style.display = "block";
    }
    else {
        document.getElementById("kep").style.display = "none";
    }

    for (var i = 1; i <= 3; i++) document.getElementById("valasz" + i).classList.remove("jo" , "rossz");
        
    document.getElementById("valaszok").style.pointerEvents = "auto";
    

}


function elore() {
    clearTimeout(timerHandler);
    displayedQuestion++;
    if (displayedQuestion === questionsInHotList) displayedQuestion = 0;
    kerdesMegjelenítés();

    
}

function vissza() {

    displayedQuestion--;
    if (displayedQuestion < 0) displayedQuestion = questionsInHotList - 1;
    kerdesMegjelenítés();

    
}

function coloring(n) {
    let kerdes = hotList[displayedQuestion].question;
    if (n === kerdes.correctAnswer) {

        document.getElementById("valasz" + n).classList.add("jo");
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers === 3) {
            kerdesBetoltes(nextQuestion, displayedQuestion);
            nextQuestion++;
            //toDo: kredelistavege ellenezőrzés
        }
    }
    else {
        document.getElementById("valasz" + n).classList.add("rossz");
        document.getElementById("valasz" + kerdes.correctAnswer).classList.add("jo");
        hotList[displayedQuestion].goodAnswers = 0;
        
    }


    document.getElementById("valaszok").style.pointerEvents = "none";

    timerHandler = setTimeout(elore, 3000);

    console.log(hotlist,"végén")

    localStorage.setItem("hotList", JSON.stringify(hotList));
    localStorage.setItem("displayedQuestion", JSON.stringify(displayedQuestion));
    localStorage.setItem("nextQuestion", JSON.stringify(nextQuestion));
  
}