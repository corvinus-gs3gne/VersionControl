window.onload = () => {

   let hova = document.getElementById("ide");
    for (var s = 0; s < 10; s++) {
        let sor = document.createElement("div");
        sor.classList.add("sor");
        hova.appendChild(sor);

        for (var o = 0; o < 10; o++) {
            let szam = document.createElement("div");
            szam.innerText = (s + 1) * (o + 1);
            szam.classList.add("elem");
            sor.appendChild(szam);
            szam.style.background = `rgb(${255 - (255 / 10 * s)},255,${255 - (255 / 10 * o)})`
        }
    }


    let haromszog = document.getElementById("pascal");


    for (var s = 0; s < 10; s++) {
        let psor = document.createElement("div");
        psor.classList.add("sor");
        haromszog.appendChild(psor);
        for (var o = 0; o <= s; o++) {
            let passzam = document.createElement("div");
            var faktorialis = (n) => {
                if (n === 0 || n === 1) {
                    return 1;

                } else {
                    return n * faktorialis(n - 1);
                }
            }
            passzam.innerText = faktorialis(s) / (faktorialis(o) * (faktorialis(s - o)));
            passzam.classList.add("elem")
            psor.appendChild(passzam);

        }
    }
}