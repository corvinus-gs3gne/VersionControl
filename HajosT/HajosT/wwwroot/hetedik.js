var kérdések ;
var n = 0;


window.onload = (event) => {
    download();
}

function download() {

    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data));

}


function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    kérdések = d;
    ShowQuestions(0);
}

function ShowQuestions(n) {

    let qtext = document.getElementById("kerdes_szoveg");
    let pic = document.getElementById("kep");
    let v1 = document.getElementById("valasz1");
    let v2 = document.getElementById("valasz2");
    let v3 = document.getElementById("valasz3");

    qtext.innerHTML = kérdések[n].questionText;
    v1.innerText = kérdések[n].answer1;
    v2.innerText = kérdések[n].answer2;
    v3.innerText = kérdések[n].answer3;

    pic.src = "https://szoft1.comeback.hu/hajo/" + kérdések[n].image 
    v1.classList.remove("jo", "rossz");
    v2.classList.remove("jo", "rossz");
    v3.classList.remove("jo", "rossz");

}



function coloring(answer) {
    let correct = kérdések[n].correctAnswer;
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

    n = (n + 1) % kérdések.length

    ShowQuestions(n)   

}

function vissza() {
    if (n === 0) {

        n = kérdések.length - 1;
        ShowQuestions(n);
        console.log("jelenlegi oldal: ", n)
        
    }
    else {
        n=n-1
        ShowQuestions(n)
        
        console.log("jelenlegi oldal else: ", n)
    }
    
}






