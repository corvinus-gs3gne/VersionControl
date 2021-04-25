var kérdések ;
var n = 1;


window.onload = (event) => {
    download(n);
   // osszeskerdes();
}

function download(id) {

    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
              return response.json()
            }
                
            })
        .then(data => ShowQuestions(data));


}

/*function osszeskerdes(){
    fetch('/questions/all')
        .then(response =>{
        if (!response.ok) {
            console.error(`Hibás válasz: ${response.status}`)
        }
        else {
            return response.json()
        }
    })

        .then(data => {
            return ( var allKerdes= data );
        })

    console.log(allKerdes.length)
    
}*/


/*function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    kérdések = d;
    ShowQuestions(0);
}*/

function ShowQuestions(n) {

    let qtext = document.getElementById("kerdes_szoveg");
    let pic = document.getElementById("kep");
    let v1 = document.getElementById("valasz1");
    let v2 = document.getElementById("valasz2");
    let v3 = document.getElementById("valasz3");

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
    let correct = n.correctAnswer;
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

    n = (n + 1) 
    if (n >= 1) {

        download(n)
        
    }
    else {

        n = 1
        download(n)

    }
     

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






