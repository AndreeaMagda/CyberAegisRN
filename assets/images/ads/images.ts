interface AdInfo {
  id: number;
  image: any;
  isFake: boolean;
  title: string;
  explanation: string;
}

const adImages = {
  fake1: require('./Fake1.png'),
  fake2: require('./Fake2.png'),
  fake3: require('./Fake3.png'),
  fake4: require('./Fake4.png'),
  fake5: require('./Fake5.png'),
  fake6: require('./Fake6.png'),
  real1: require('./Real1.png'),
  real2: require('./Real2.png'),
  real3: require('./Real3.png'),
  real4: require('./Real4.png'),
  real5: require('./Real5.png'),
  real6: require('./Real6.png'),
};

export const allAds: { fake: AdInfo[], legit: AdInfo[] } = {
  fake: [
    {
      id: 1,
      image: adImages.fake1,
      isFake: true,
      title: "Câștigă un iPhone 10!",
      explanation: "Această reclamă este falsă deoarece folosește o roată a norocului și promite un iPhone 10 cu un singur click. Textul 'Foarte căcare' și designul strident sunt indicii clare că este o înșelătorie.",
    },
    {
      id: 2,
      image: adImages.fake2,
      isFake: true,
      title: "Câștigă 500 RON Instant!",
      explanation: "Reclamă falsă care promite câștiguri instant nerealiste de 500 de lei. Folosirea banilor și a termenului 'instant' sunt indicii clare ale unei înșelătorii.",
    },
    {
      id: 3,
      image: adImages.fake3,
      isFake: true,
      title: "Bonus 500% la cumpărături!",
      explanation: "Reclamă falsă de cumpărături care promite gratuititate. Reclamele online neautorizate folosesc adesea astfel de tactici pentru a atrage utilizatori.",
    },
    {
      id: 4,
      image: adImages.fake4,
      isFake: true,
      title: "Vacanță la Marea Adriatică",
      explanation: "Reclamă falsă care promite o vacanță la Marea Adriatică. Reclamele online neautorizate folosesc adesea astfel de tactici pentru a atrage utilizatori.",
    },
    {
      id: 5,
      image: adImages.fake5,
      isFake: true,
      title: "1 Bitcoin Garantat",
      explanation: "Reclamă falsă care promite un Bitcoin. Nicio investiție legitimă nu poate garanta profituri și monede gratis, mai ales fără o sumă investită.",
    },
    {
      id: 6,
      image: adImages.fake6,
      isFake: true,
      title: "Laptop de ultima generație",
      explanation: "Reclamă falsă care promite un laptop de ultima generație. Nicio reclamă de acest gen nu este legitimă și nu oferă beneficii reale.",
    }
  ],
  legit: [
    {
      id: 7,
      image: adImages.real1,
      isFake: false,
      title: "Mega Image - Oferte de Vară",
      explanation: "Reclamă legitimă de la Mega Image cu reduceri de vară verificabile. Prețurile sunt realiste și promoțiile pot fi verificate în magazine.",
    },
    {
      id: 8,
      image: adImages.real2,
      isFake: false,
      title: "Fără dobândă la mașina nouă",
      explanation: "Reclamă legitimă unde dobânda este zero la achiziționarea unei mașini noi. Reducerile sunt realiste și verificabile în magazine.",
    },
    {
      id: 9,
      image: adImages.real3,
      isFake: false,
      title: "Abonament sală - Săptămâna Aceasta",
      explanation: "Reclamă legitimă pentru promoțiile săptămânale la MoveFit. Ofertele sunt clare și pot fi verificate online și în sala de fitness.",
    },
    {
      id: 10,
      image: adImages.real5,
      isFake: false,
      title: "Carrefour - Oferte de Joi",
      explanation: "Reclamă legitimă pentru ofertele de joi de la Carrefour. Produsele și prețurile sunt transparente și verificabile.",
    },
    {
      id: 11,
      image: adImages.real4,
      isFake: false,
      title: "Lidl - Fresh",
      explanation: "Reclamă legitimă cu reduceri la produse proaspete de la Lidl. Prețurile și produsele sunt clar specificate.",
    },
    {
      id: 12,
      image: adImages.real6,
      isFake: false,
      title: "Auchan - Reduceri",
      explanation: "Reclamă legitimă cu promoții Auchan la cărți. Ofertele sunt prezentate transparent și au prețuri verificabile în magazine.",
    }
  ]
};

export type { AdInfo }; 