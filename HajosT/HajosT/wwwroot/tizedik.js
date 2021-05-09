var kérdések;

var ca;
var hotList = [];
var questionsInHotList = 3;
var displayedQuestion;
var numberOfQuestions;
var nextQuestion = 1;



window.onload = (event) => {
    init();

}

function download(questionNumber, destination) {

    fetch(`/questions/${questionNumber}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {

                return response.json()

            }

        })
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(` A ${questionNumber} lett kijelölve a hotList ${destination}. helyére.`)
                if (displayedQuestion == undefined && destination == 0) {
                    displayedQuestion = 0;
                    ShowQuestions();

                }
            }

        );




}

function init() {

    for (var i = 0; i < questionsInHotList; i++) {


        let q = {

            questions: {},
            answers: 0

        }

        hotList[i] = q;


        //elso kerdesek letoltese

        for (var i = 0; i < questionsInHotList; i++) {

            download(nextQuestion, i);
            nextQuestion++;
        }
    }
}


function ShowQuestions() {

    let n = hotList[displayedQuestion].question;
    console.log(n);
    let qtext = document.getElementById("kerdes_szoveg");
    let pic = document.getElementById("kep");
    let v1 = document.getElementById("valasz1");
    let v2 = document.getElementById("valasz2");
    let v3 = document.getElementById("valasz3");

    ca = n.correctAnswer;

    qtext.innerHTML = n.questionText;
    v1.innerText = n.answer1;
    v2.innerText = n.answer2;
    v3.innerText = n.answer3;

    if (n.image == "") {
        pic.src = "";
    }
    else {

        pic.src = "https://szoft1.comeback.hu/hajo/" + n.image;
    }

    v1.classList.remove("jo", "rossz");
    v2.classList.remove("jo", "rossz");
    v3.classList.remove("jo", "rossz");

}



function coloring(answer) {
    let correct = ca;
    console.log(correct)
    document.getElementById("valasz1").classList.add("rossz");
    document.getElementById("valasz2").classList.add("rossz");
    document.getElementById("valasz3").classList.add("rossz");

    if (answer === correct) {
        document.getElementById("valasz" + answer).classList.remove("rossz");
        document.getElementById("valasz" + answer).classList.add("jo");
    }
    else {
        document.getElementById("valasz" + correct).classList.remove("rossz");
        document.getElementById("valasz" + correct).classList.add("jo");
    }

}



function elore() {

    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0; 
    ShowQuestions();

    


}

function vissza() {
    if (n === 0) {

        n = kérdések.length - 1;
        download(n)


    }
    else {
        n = n - 1
        download(n)



    }

}







