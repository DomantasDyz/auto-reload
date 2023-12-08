let intervalId;
var laikas;
async function pradetiPerkrovimus() {
    chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
        klausimas = await prompt("Kas kiek laiko perkrauti puslapį (sekundėmis)?:");
        parseInt(`${klausimas}`);
        if(klausimas > 90000) {
            alert("Laikas negali būti didesnis už parą!");
            return;
        }
        if(klausimas < 1) {
            alert("Laikas privalo būti nurodytas tarp 1-90000 sek.");
            return;
        }

            laikas = klausimas*1000;
            if(laikas) {
                var statusas = document.getElementById("status");
                statusas.textContent = `Auto Reloaderis šiuo metu veikia. Puslapis perkraunamas kas ${laikas/1000} sekundes.\nBūtina palikti šį langą atidarytą, kitaip procesas bus nutrauktas.`;

                alert("Puslapio auto-perkrovimas pradėtas!");
                intervalId = setInterval(() => {
                    chrome.tabs.reload(tabs[0].id);
                }, laikas);
                document.getElementById("reloadas").disabled = true;
            } else {
                alert("Įvyko klaida.");
            }

    });
}
function nutrauktiPerkrovimus() {
    if(!laikas) {
        alert("Puslapis šiuo metu nėra perkraunamas, dėl to nėra ką stabdyti.");
        return;
    }
    clearInterval(intervalId);
    laikas = 0;
    var statusas = document.getElementById("status");
    statusas.textContent = `Auto Reloaderis šiuo metu neveikia.`;
    alert("Puslapio auto-perkrovimas nutrauktas!");
    document.getElementById("reloadas").disabled = false;
}



document.getElementById("reloadas").addEventListener("click", pradetiPerkrovimus);

document.getElementById("stabdytiReloada").addEventListener("click", nutrauktiPerkrovimus);


