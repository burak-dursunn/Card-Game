const cardContainer = document.createElement('div');
cardContainer.className = 'card-container';
for(let i=1; i<=12; i++) {
    const kart = document.createElement('div');
    kart.className = 'card';
    kart.textContent = i;
    cardContainer.appendChild(kart);
}
document.body.appendChild(cardContainer);

// const kartlar = document.querySelectorAll('.card'); 
const kartlar = Array.from(cardContainer.children); // ! Kartları bir diziye çeviriyoruz.
const kartDegerleri = [];
kartlar.forEach((kart) => {
    kartDegerleri.push(kart.textContent); 
})

let tiklama = 0;
let cevrilmisKart = [];
let tiklamaEngeli = false;
// todo sayfadaki kurallar göre skor tablosu oluştur.
shuffledValues =  shuffle(kartDegerleri);
kartlar.forEach((kart,index) => {
    // ? kart.dateset.value = shuffledValues[index]; // Daha basit bir tanımlama
    kart.setAttribute('data-value', shuffledValues[index]); 
    kart.textContent = ''; // ! Kartların içeriğini gizledik.

    kart.addEventListener('click', () => { 
        if(tiklamaEngeli || kart.classList.contains('flipped') || cevrilmisKart.includes(kart)) return;

        kart.classList.add('flipped');
        cevrilmisKart.push(kart);    
        kart.textContent = kart.getAttribute('data-value');
        
        if (cevrilmisKart.length === 2) {
            console.log(cevrilmisKart);
            updateScore();
            tiklamaEngeli = true;
            setTimeout(() => {
                EslesmeKontrolu();
                cevrilmisKart = [];
                tiklamaEngeli = false;
            }, 1500);
        }
    })
})

function shuffle(array) {
    // ! Fisher-Yates Shuffle algoritması ile diziyi karıştırıyoruz.
    for(i=array.length-1; i> 0; i--) {
        const j = Math.floor(Math.random() * (i+1)); // ? 0-1 arasında rastgele ürettiğimiz sayıyı dizi boyutu ile çarparak 0 ve dizinin boyutu arasında rastgele bir sayı üretiyoruz.
        [array[i], array[j]] = [array[j], array[i]]; // ! Destructuring kullanarak iki elemanın yerini değiştiriyoruz.
    }
    return array;
}

function EslesmeKontrolu() {
    const [kart1, kart2] = cevrilmisKart;
    //? const val1 = kart1.dataset.value; // dataset ile data-value değerini alıyoruz.
    const val1 = kart1.getAttribute('data-value');
    const val2 = kart2.getAttribute('data-value');

    if(val1 === val2) {
        kart1.classList.add('matched');
        kart2.classList.add('matched');     
        oyunKontrolü();
    }
    else {
        cevrilmisKart.forEach(kart => {
            kart.classList.remove('flipped');
            kart.classList.add('notMatched');
        });
        setTimeout(() => { // ?todo forEach kullanılınca çalışmıyor tekrar bak  
            kart1.classList.remove('notMatched');
            kart2.classList.remove('notMatched');
            kart1.textContent = '';
            kart2.textContent = '';
        },500);
    }
}

function oyunKontrolü() {
    const eslesenKartlar = document.querySelectorAll('.matched');

    if(kartlar.length === eslesenKartlar.length) {
        alert('tebrikler, oyunu kazandınız!');
    }
}

function updateScore() {
    tiklama++;
    const score = document.querySelector('.score');
    score.textContent = `Deneme: ${tiklama}`;
}