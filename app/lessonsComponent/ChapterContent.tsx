// Updated ChapterContentScreen with cleaned section titles
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  useWindowDimensions,
  TouchableOpacity
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/chapterContentStyles';
import Quiz from '../components/Quiz';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

interface Section {
  title: string;
  content: string[];
  image?: any;
  quiz?: QuizQuestion[];
}

interface ChapterContent {
  sections: Section[];
}

const chapterContents: Record<string, ChapterContent> = {
  //Lectia 1
  '1-1': {
    sections: [
      {
        title: 'Introducere',
        content: [
          'Internetul este un loc unde putem face multe lucruri frumoase: să învățăm, să ne jucăm, să vorbim cu prietenii sau să căutăm informații interesante. Însă, la fel ca atunci când ieșim afară și trebuie să fim atenți cum traversăm strada sau cu cine vorbim, și pe internet trebuie să fim prudenți. Securitatea cibernetică este ca o centură de siguranță sau ca un scut care ne apără în lumea digitală.'
        ]
      },
      {
        title: 'Explicație',
        content: [
          'Securitatea cibernetică înseamnă să ne protejăm când folosim internetul, ca să nu ni se fure informațiile, să nu ni se strice calculatorul și să nu fim păcăliți. Pe internet există oameni buni, dar și persoane care vor să facă rău. Ei pot trimite viruși, pot încerca să îți fure parola sau pot crea site-uri false care arată ca cele adevărate.',
          'Gândește-te că datele tale de pe internet — cum ar fi pozele, parolele, conturile de jocuri sau temele — sunt ca niște comori. Dacă le pierzi sau cineva le fură, poate fi foarte neplăcut. De aceea, trebuie să știm cum să ne protejăm:',
          '• Nu spunem parolele nimănui, în afară de părinți.',
          '• Nu deschidem linkuri de la persoane necunoscute.',
          '• Nu acceptăm prietenii online de la străini.',
          '• Verificăm întotdeauna cu un adult dacă un site pare ciudat.'
        ]
      },
      {
        title: 'Comportament responsabil online',
        content: [
          'Este important să avem grijă și cum ne comportăm online. Nu trebuie să răspundem la mesaje urâte sau să postăm lucruri despre alți colegi care i-ar putea supăra. Securitatea cibernetică înseamnă și respect și grijă față de ceilalți.',
          'Totodată, trebuie să cerem ajutorul unui adult dacă vedem ceva ce nu înțelegem sau care ne sperie pe internet. Nu suntem singuri în această lume digitală — părinții și profesorii ne pot ajuta oricând.'
        ]
      },
      {
        title: 'Exemple concrete',
        content: [
          '• Radu a vrut să descarce un joc gratuit de pe un site necunoscut, dar a observat că adresa era ciudată. A întrebat părinții înainte să continue și aceștia i-au spus că a făcut foarte bine.',
          '• Larisa a primit un mesaj de la o persoană necunoscută care o invita într-un grup online. Ea a cerut ajutorul unui adult înainte să răspundă.',
          '• Andrei a instalat un antivirus pe calculator cu ajutorul tatălui său, iar când un fișier periculos a apărut, antivirusul l-a blocat imediat.'
        ]
      },
      {
        title: 'Recapitulare',
        content: [
          '• Securitatea cibernetică ne protejează atunci când folosim internetul.',
          '• Trebuie să fim atenți la linkuri, parole, prieteni online și fișiere necunoscute.',
          '• Cerem mereu ajutorul unui adult dacă ceva nu ni se pare în regulă.'
        ]
      },
      {
        title: 'Testează-te!',
        content: [],
        quiz: [
          {
            question: 'Ce este securitatea cibernetică?',
            options: ['O aplicație de gătit', 'Un joc online', 'O metodă de a fi în siguranță pe internet', 'O cameră video'],
            correctAnswerIndex: 2,
            explanation: 'Securitatea cibernetică ne ajută să fim protejați când folosim internetul.'
          },
          {
            question: 'Cine trebuie să știe despre securitatea cibernetică?',
            options: ['Doar părinții', 'Doar profesorii', 'Doar copiii mari', 'Toată lumea'],
            correctAnswerIndex: 3,
            explanation: 'Toți trebuie să înțeleagă cum să se protejeze online.'
          },
          {
            question: 'Ce ar trebui să facem când primim un mesaj ciudat?',
            options: ['Îl deschidem repede', 'Îl trimitem și altora', 'Îl arătăm unui adult', 'Îl salvăm în calculator'],
            correctAnswerIndex: 2,
            explanation: 'Cel mai bine este să cerem ajutorul unui adult de încredere.'
          },
          {
            question: 'Ce este un site periculos?',
            options: ['Un site cu nume ciudat și promisiuni false', 'Un site educativ', 'Un site cu desene animate', 'Site-ul școlii'],
            correctAnswerIndex: 0,
            explanation: 'Site-urile cu promisiuni false pot ascunde pericole.'
          },
          {
            question: 'Ce ne poate proteja calculatorul?',
            options: ['Jocurile', 'Antivirusul', 'Pozele drăguțe', 'Ecranul mare'],
            correctAnswerIndex: 1,
            explanation: 'Un antivirus instalat corect protejează calculatorul.'
          }
        ]
      }
    ]
  },

  //Lectia 2
  '1-2': {
    sections: [
      {
        title: 'Introducere',
        content: [
          'Calculatorul este ca o cutie plină cu lucruri valoroase: jocuri, teme, poze și alte fișiere importante. Așa cum îți încuie părinții ușa de la casă pentru a vă proteja de hoți, la fel și calculatorul trebuie protejat.',
          'Dacă nu avem grijă, pot apărea probleme: calculatorul se strică, fișierele dispar sau informațiile tale pot fi furate.',
          'Să vedem cum ne putem proteja calculatorul!'
        ]
      },
      {
        title: 'Explicație',
        content: [
          'Protejarea calculatorului înseamnă să avem grijă ce instalăm, ce site-uri vizităm, ce fișiere deschidem și cum îl folosim. Iată câteva reguli simple:',
          '1. Instalează un antivirus: Este un program care găsește și blochează fișierele periculoase. El funcționează ca un gardian care spune „STOP!” atunci când ceva rău încearcă să intre în calculator.',
          '2. Nu descărca jocuri sau programe de pe site-uri necunoscute: De exemplu, dacă vezi un site cu numele www.jocurigratismagic.xyz, care îți promite cele mai tari jocuri, cel mai bine este să întrebi un adult. Aceste site-uri pot conține viruși.',
          '3. Fă actualizările calculatorului: Uneori, calculatorul îți cere să instalezi actualizări. Acestea îl fac mai sigur și mai rapid. Dacă amâni aceste actualizări, calculatorul tău poate rămâne vulnerabil.',
          '4. Nu folosi stick-uri USB primite de la persoane necunoscute: Un stick poate părea inofensiv, dar poate conține viruși. Dacă cineva îți oferă un stick cu un joc, cel mai bine este să nu-l folosești fără să întrebi părinții.',
          '5. Folosește o parolă la pornirea calculatorului: Parola este ca o cheie secretă. Dacă cineva încearcă să folosească calculatorul tău fără permisiune, nu va putea dacă există o parolă.'
        ]
      },
      {
        title: 'Exemple concrete',
        content: [
          '• Vlad a văzut o reclamă cu „Jocuri gratuite pentru copii isteți!”. A întrebat-o pe mama lui și ea i-a explicat că acel site era periculos. A învățat să nu acceseze pagini necunoscute.',
          '• Ioana a uitat să facă actualizările cerute de calculator și într-o zi jocul ei preferat nu a mai funcționat. A învățat că e important să lase actualizările să se facă.',
          '• Mihai a băgat un stick de la un coleg în calculator și acesta a început să funcționeze greu. Părinții au dus calculatorul la reparat și au instalat un antivirus mai bun.'
        ]
      },
      {
        title: 'Recapitulare',
        content: [
          '• Folosește un antivirus și lasă-l să scaneze calculatorul regulat.',
          '• Nu descărca nimic de pe site-uri ciudate.',
          '• Fă actualizările sistemului atunci când îți sunt cerute.',
          '• Nu folosi stick-uri USB de la necunoscuți.',
          '• Pune o parolă la calculator pentru protecție.'
        ]
      },
      {
        title: 'Testează-te!',
        content: [],
        quiz: [
          {
            question: 'Ce este un antivirus?',
            options: ['O aplicație de desenat', 'Un joc video', 'Un program care blochează viruși', 'O melodie'],
            correctAnswerIndex: 2,
            explanation: 'Un antivirus este un program care blochează fișierele periculoase și te protejează de viruși.'
          },
          {
            question: 'Ce site poate fi periculos?',
            options: ['www.scoalaonline.ro', 'www.educatiecopii.ro', 'www.jocurigratismagic.xyz', 'www.bibliotecadigitala.ro'],
            correctAnswerIndex: 2,
            explanation: 'Site-urile cu nume ciudate și promisiuni exagerate pot ascunde viruși.'
          },
          {
            question: 'Ce trebuie să faci dacă primești un stick USB de la cineva necunoscut?',
            options: ['Îl folosești imediat', 'Îl dai altcuiva', 'Întrebi un adult dacă îl poți folosi', 'Îl arunci'],
            correctAnswerIndex: 2,
            explanation: 'Nu folosi stick-uri de la necunoscuți fără să întrebi un adult, pot conține viruși.'
          },
          {
            question: 'Ce se întâmplă dacă nu faci actualizările calculatorului?',
            options: ['Calculatorul devine mai colorat', 'Calculatorul poate fi nesigur', 'Jocurile merg mai bine', 'Bateria ține mai mult'],
            correctAnswerIndex: 1,
            explanation: 'Actualizările mențin calculatorul sigur și protejat împotriva atacurilor.'
          },
          {
            question: 'De ce e bine să ai o parolă la calculator?',
            options: ['Să nu se închidă singur', 'Să nu se descarce', 'Să nu poată fi folosit de alții fără voie', 'Să pornească mai repede'],
            correctAnswerIndex: 2,
            explanation: 'Parola împiedică accesul neautorizat la calculatorul tău.'
          }
        ]
      }
    ]
  },

//Lectia 3
'1-3': {
  sections: [
    {
      title: 'Introducere',
      content: [
        'Parola este ca o cheie secretă care îți păzește conturile de jocuri, temele, pozele și conversațiile. Așa cum nu dai cheia casei tale oricui, nici parola nu trebuie spusă altora.',
        'E important să știm de ce păstrarea parolei doar pentru noi este o regulă de aur pe internet.'
      ]
    },
    {
      title: 'Explicație',
      content: [
        'Parola ta este specială — este cheia care deschide „ușa” către lucrurile tale digitale. Dacă altcineva o află, poate intra în contul tău, poate schimba lucruri, șterge jocuri, posta mesaje sau chiar fura date.',
        'Unii copii spun parola „doar unui prieten”, dar acel prieten o poate spune altcuiva, sau se pot certa, iar parola ajunge pe mâini greșite.',
        'De aceea, trebuie să:',
        '• Ținem parola doar pentru noi și părinții noștri.',
        '• Nu o spunem colegilor sau altor prieteni, chiar dacă par de încredere.',
        '• Nu o scriem pe bilețele lăsate pe birou.',
        'Uneori, cineva se preface că e un administrator al unui joc sau al unei platforme și îți cere parola. Niciodată o persoană serioasă de pe internet nu îți va cere parola. Dacă se întâmplă asta, trebuie să anunți imediat un adult.'
      ]
    },
    {
      title: 'Exemple concrete',
      content: [
        '• Bianca i-a spus parolele prietenei ei cele mai bune. După o ceartă, prietena i-a intrat în cont și i-a șters avatarul dintr-un joc.',
        '• Rareș a primit un mesaj care spunea „Spune-mi parola ca să primești 1000 de monede gratis”. A arătat mesajul mamei și aceasta l-a felicitat că nu a răspuns.',
        '• David și-a uitat parola, dar o avea scrisă într-un caiet ascuns pe care doar el și părinții îl cunosc.'
      ]
    },
    {
      title: 'Recapitulare',
      content: [
        '• Parola este ca o cheie secretă.',
        '• Nu trebuie să o spunem nimănui în afară de părinți.',
        '• Niciun site serios nu îți va cere parola.'
      ]
    },
    {
      title: 'Testează-te!',
      content: [],
      quiz: [
        {
          question: 'Parola este:',
          options: ['Un desen', 'O cheie secretă pentru conturi', 'Un prieten de pe net', 'Un virus'],
          correctAnswerIndex: 1,
          explanation: 'Parola protejează accesul la conturile tale.'
        },
        {
          question: 'Cui putem spune parola?',
          options: ['Oricărui coleg', 'Unui străin', 'Doar părinților', 'Tuturor'],
          correctAnswerIndex: 2,
          explanation: 'Doar părinții tăi trebuie să știe parola ta.'
        },
        {
          question: 'Ce se poate întâmpla dacă altcineva îți știe parola?',
          options: ['Primești dulciuri', 'Poate intra în contul tău', 'Devii mai rapid în joc', 'Calculatorul se închide'],
          correctAnswerIndex: 1,
          explanation: 'Poate face modificări nedorite în contul tău.'
        },
        {
          question: 'Ce faci dacă cineva cere parola?',
          options: ['I-o spui repede', 'O trimiți pe email', 'O arăți unui adult și NU o spui', 'O schimbi în alta mai scurtă'],
          correctAnswerIndex: 2,
          explanation: 'Un adult te poate ajuta să gestionezi situația.'
        },
        {
          question: 'Unde NU ar trebui să îți scrii parola?',
          options: ['Într-un caiet ascuns acasă', 'Pe biroul de la școală', 'Într-un fișier pe desktop', 'Pe o etichetă lipită de laptop'],
          correctAnswerIndex: 3,
          explanation: 'Etichetele vizibile sunt ușor de găsit de către alții.'
        }
      ]
    }
  ]
},

//Lectia 4
'1-4': {
  sections: [
    {
      title: 'Introducere',
      content: [
        'Nu toate parolele sunt la fel de sigure. Dacă parola este „1234” sau „pisica”, poate fi ghicită ușor.',
        'Hai să vedem cum construim o parolă greu de spart, dar ușor de ținut minte!'
      ]
    },
    {
      title: 'Explicație',
      content: [
        'O parolă bună trebuie să fie:',
        '• Lungă (cel puțin 8 caractere).',
        '• Să conțină litere mari și mici, cifre și simboluri (!, ?, @).',
        '• Să nu fie ușor de ghicit (nume, data de naștere, animale preferate).',
        'Exemplu de parolă proastă: ana123',
        'Exemplu de parolă bună: Ana!2024Joc',
        'O parolă bună se poate face cu ajutorul unei fraze pe care o ții minte. De exemplu, „Ana joacă Roblox din 2024!” → AjR@2024!'
      ]
    },
    {
      title: 'Exemple concrete',
      content: [
        '• Cătălin avea parola „123456” și cineva i-a spart contul de joc.',
        '• Daria a creat o parolă cu ajutorul tatălui ei, combinând litere și cifre, iar contul ei este în siguranță.',
        '• Luca și-a schimbat parola o dată la 2 luni ca să fie sigur că nu o știe nimeni.'
      ]
    },
    {
      title: 'Recapitulare',
      content: [
        '• Parola bună e lungă, complicată și greu de ghicit.',
        '• Folosește combinații de litere, cifre și simboluri.',
        '• Nu folosi numele tău sau date ușor de ghicit.'
      ]
    },
    {
      title: 'Testează-te!',
      content: [],
      quiz: [
        {
          question: 'Ce înseamnă o parolă sigură?',
          options: ['Are doar litere mici', 'Are numele tău', 'Are litere mari, mici, cifre și simboluri', 'Este „123456”'],
          correctAnswerIndex: 2,
          explanation: 'O parolă sigură trebuie să aibă litere mari, mici, cifre și simboluri.'
        },
        {
          question: 'Care este o parolă slabă?',
          options: ['Ana1234!', 'Pisica12', '123456', 'AmP@rola2025'],
          correctAnswerIndex: 2,
          explanation: '123456 este o parolă comună și ușor de ghicit.'
        },
        {
          question: 'Cât de des e bine să schimbi parola?',
          options: ['Niciodată', 'La fiecare 2-3 luni', 'Doar de Crăciun', 'Când o pierzi'],
          correctAnswerIndex: 1,
          explanation: 'Este bine să schimbi parola periodic pentru siguranță.'
        },
        {
          question: 'Este bine să folosești data nașterii în parolă?',
          options: ['Da', 'Nu', 'Doar dacă e anul corect', 'Doar la jocuri'],
          correctAnswerIndex: 1,
          explanation: 'Data nașterii este ușor de aflat și nu este sigură.'
        },
        {
          question: 'Unde putem crea o parolă sigură?',
          options: ['Cu ajutorul unui adult', 'Cu un generator de parole', 'Cu o frază ușor de ținut minte', 'Toate variantele'],
          correctAnswerIndex: 3,
          explanation: 'Toate metodele sunt utile pentru a crea parole sigure.'
        }
      ]
    }
  ]
},

//Lectia 5
'1-5': {
  sections: [
    {
      title: 'Introducere',
      content: [
        'Pe internet primim uneori mesaje de la prieteni, profesori sau de la site-uri pe care le folosim.',
        'Dar se poate întâmpla să primim și mesaje de la persoane necunoscute sau cu lucruri care sună „prea frumos ca să fie adevărat”.',
        'E important să învățăm cum să recunoaștem un mesaj ciudat și ce să facem când îl primim.'
      ]
    },
    {
      title: 'Explicație',
      content: [
        'Un mesaj ciudat poate să arate ca unul normal, dar are semne care ne pot avertiza că ceva nu e în regulă:',
        '• Vine de la o persoană pe care nu o cunoști.',
        '• Spune că ai câștigat un premiu, deși nu ai participat la niciun concurs.',
        '• Are greșeli de scriere sau exprimări ciudate.',
        '• Îți cere să dai parola, date personale sau să dai click pe un link dubios.',
        '• Îți promite lucruri gratis dacă faci ceva imediat.',
        'Ce trebuie să faci:',
        '• Nu răspunde la astfel de mesaje.',
        '• Nu da click pe linkuri din mesaje necunoscute.',
        '• Arată mesajul unui adult — părinți sau profesori — ca să te ajute.'
      ]
    },
    {
      title: 'Exemple concrete',
      content: [
        '• Daria a primit un email care spunea că a câștigat un telefon. I-a arătat mamei și au șters mesajul împreună.',
        '• Alex a primit un mesaj pe o platformă de jocuri în care cineva necunoscut îl întreba ce parolă are. El nu a răspuns și a raportat mesajul.',
        '• Maria a primit un link dubios într-un mesaj pe rețea și nu a dat click. A verificat cu tatăl ei și au văzut că era un virus.'
      ]
    },
    {
      title: 'Recapitulare',
      content: [
        '• Un mesaj ciudat vine de la necunoscuți, are promisiuni false sau cere informații personale.',
        '• Nu deschide linkurile și nu răspunde.',
        '• Cere ajutorul unui adult!'
      ]
    },
    {
      title: 'Testează-te!',
      content: [],
      quiz: [
        {
          question: 'Ce este un mesaj ciudat?',
          options: ['Un mesaj de la profesor', 'Un mesaj care cere parola sau promite cadouri false', 'O felicitare de ziua ta', 'Un mesaj de la un prieten'],
          correctAnswerIndex: 1,
          explanation: 'Mesajele ciudate cer informații personale sau par prea bune ca să fie adevărate.'
        },
        {
          question: 'Ce trebuie să faci dacă primești un mesaj suspect?',
          options: ['Răspunzi imediat', 'Dai click pe link', 'Îl arăți unui adult', 'Îl trimiți tuturor prietenilor'],
          correctAnswerIndex: 2,
          explanation: 'Un adult poate verifica dacă mesajul este periculos.'
        },
        {
          question: 'Un semn că un mesaj e periculos este:',
          options: ['Are emoji', 'Cere date personale sau are greșeli ciudate', 'Este trimis de un prieten', 'Are imagini colorate'],
          correctAnswerIndex: 1,
          explanation: 'Greșelile de scriere sau cererile de date personale sunt semnale de alarmă.'
        },
        {
          question: 'Dacă cineva îți spune că ai câștigat ceva, dar tu nu ai participat la concurs, ce faci?',
          options: ['Trimiți datele', 'Verifici cu un adult', 'Te bucuri și răspunzi', 'Postezi pe rețea'],
          correctAnswerIndex: 1,
          explanation: 'Verificarea cu un adult te ajută să te ferești de înșelătorii.'
        },
        {
          question: 'Ce NU trebuie să faci cu un mesaj ciudat?',
          options: ['Îl ștergi', 'Îl arăți unui adult', 'Îl ignori', 'Dai parola cerută'],
          correctAnswerIndex: 3,
          explanation: 'Parola nu trebuie dată niciodată, mai ales dacă e cerută prin mesaj.'
        }
      ]
    }
  ]
},

'1-6': {
  sections: [
    {
      title: 'Introducere',
      content: [
        'Uneori primim fișiere — imagini, jocuri, documente — de la prieteni, colegi sau chiar de pe internet.',
        'Dar dacă nu știm exact ce sunt și de unde vin, ele pot fi periculoase.',
        'Hai să învățăm împreună de ce nu trebuie să deschidem fișiere necunoscute.'
      ]
    },
    {
      title: 'Explicație',
      content: [
        'Un fișier necunoscut poate ascunde un virus. Chiar dacă pare un joc, o poză sau un document amuzant, în spatele lui se poate ascunde ceva care:',
        '• Strică calculatorul sau telefonul.',
        '• Fură datele tale (parole, poze, teme).',
        '• Îți încetinește sau blochează complet aparatul.',
        'Fișierele pot veni:',
        '• În emailuri ciudate.',
        '• Pe site-uri necunoscute.',
        '• De la persoane pe care nu le cunoști sau nu ai vorbit cu ele înainte.',
        'Ce trebuie să faci:',
        '• Nu deschide fișiere primite de la necunoscuți.',
        '• Verifică cu un adult dacă nu ești sigur de un fișier.',
        '• Folosește un antivirus care poate bloca fișierele periculoase.'
      ]
    },
    {
      title: 'Exemple concrete',
      content: [
        '• Ștefan a primit un fișier numit „jocsuper.exe” de la cineva necunoscut. Nu l-a deschis și a întrebat-o pe mama. Ea i-a spus că era un virus.',
        '• Ilinca a primit un document ciudat pe email. A verificat cu profesorul și s-a dovedit că era un virus care fura parole.',
        '• Luca a descărcat o melodie de pe un site necunoscut, iar calculatorul a început să meargă greu. A învățat să fie mai atent pe viitor.'
      ]
    },
    {
      title: 'Recapitulare',
      content: [
        '• Fișierele necunoscute pot fi periculoase.',
        '• Nu le deschidem dacă nu știm de unde vin.',
        '• Întrebăm mereu un adult și folosim un antivirus bun.'
      ]
    },
    {
      title: 'Testează-te!',
      content: [],
      quiz: [
        {
          question: 'Ce este un fișier necunoscut?',
          options: ['Un fișier de la părinți', 'Un fișier despre care nu știi nimic sau de la o sursă necunoscută', 'Tema de la școală', 'O poză cu prietenii'],
          correctAnswerIndex: 1,
          explanation: 'Fișierele necunoscute pot conține pericole ascunse.'
        },
        {
          question: 'Ce poate face un fișier periculos?',
          options: ['Să coloreze ecranul', 'Să joace cu tine', 'Să strice calculatorul sau să fure date', 'Să curețe tastatura'],
          correctAnswerIndex: 2,
          explanation: 'Un fișier periculos poate afecta grav dispozitivul tău.'
        },
        {
          question: 'Ce faci dacă primești un fișier de la un necunoscut?',
          options: ['Îl deschizi imediat', 'Îl trimiți mai departe', 'Întrebi un adult înainte', 'Îl salvezi în telefon'],
          correctAnswerIndex: 2,
          explanation: 'Întotdeauna cere părerea unui adult în astfel de situații.'
        },
        {
          question: 'De ce e bine să ai antivirus?',
          options: ['Pentru muzică', 'Pentru că face calculatorul mai frumos', 'Pentru a bloca fișiere periculoase', 'Pentru că are multe culori'],
          correctAnswerIndex: 2,
          explanation: 'Antivirusul detectează și oprește fișierele periculoase.'
        },
        {
          question: 'Unde NU e bine să descarci fișiere?',
          options: ['De pe site-uri verificate', 'De pe site-uri ciudate cu multe reclame', 'De la părinți', 'De pe site-ul școlii'],
          correctAnswerIndex: 1,
          explanation: 'Site-urile ciudate pot conține programe periculoase ascunse.'
        }
      ]
    }
  ]
},

'1-7': {
  sections: [
    {
      title: 'Introducere',
      content: [
        'Așa cum ne îmbolnăvim uneori și avem nevoie de doctor, și calculatorul poate fi „atacat” de viruși digitali.',
        'Acești viruși nu tușesc, dar pot strica fișiere, fura informații sau încetini tot sistemul.',
        'Pentru a ne proteja, avem nevoie de un „doctor digital” – antivirusul!'
      ]
    },
    {
      title: 'Explicație',
      content: [
        'Un antivirus este un program special care păzește calculatorul, tableta sau telefonul de fișiere periculoase.',
        'El caută viruși, troieni și alte programe care încearcă să fure date sau să strice tot ce ai salvat.',
        'Antivirusul:',
        '• Verifică toate fișierele care intră în calculator;',
        '• Blochează programele suspecte înainte să facă rău;',
        '• Îți spune când găsește un pericol și te ajută să-l ștergi;',
        '• Trebuie actualizat des ca să recunoască și virușii noi.',
        'Este important să nu oprești antivirusul și să îl lași să facă scanări regulate. Așa cum nu neglijăm igiena personală, nu trebuie să uităm nici de curățenia digitală!'
      ]
    },
    {
      title: 'Exemple concrete',
      content: [
        '• Tudor a descărcat un fișier periculos, dar antivirusul l-a blocat imediat și l-a șters.',
        '• Mara nu avea antivirus instalat, iar calculatorul a început să meargă greu după ce a instalat un joc.',
        '• Andreea și-a actualizat antivirusul lunar și nu a avut nicio problemă cu calculatorul de când îl folosește.'
      ]
    },
    {
      title: 'Recapitulare',
      content: [
        '• Antivirusul este un program care ne protejează de viruși digitali.',
        '• El blochează fișiere periculoase și curăță calculatorul.',
        '• Trebuie să fie actualizat des și să ruleze în fundal.'
      ]
    },
    {
      title: 'Testează-te!',
      content: [],
      quiz: [
        {
          question: 'Ce este un antivirus?',
          options: ['Un joc video', 'Un program care protejează calculatorul', 'Un virus puternic', 'O poză amuzantă'],
          correctAnswerIndex: 1,
          explanation: 'Antivirusul este un program care detectează și blochează amenințările digitale.'
        },
        {
          question: 'Ce face antivirusul?',
          options: ['Joacă jocuri', 'Caută și blochează viruși', 'Trimite mesaje prietenilor', 'Schimbă fundalul desktopului'],
          correctAnswerIndex: 1,
          explanation: 'Scanează fișierele și blochează potențialele pericole.'
        },
        {
          question: 'De ce trebuie actualizat antivirusul?',
          options: ['Să fie mereu în pas cu noile pericole', 'Să consume bateria', 'Să stea degeaba', 'Să ocupe spațiu'],
          correctAnswerIndex: 0,
          explanation: 'Actualizările îl ajută să recunoască virușii noi.'
        },
        {
          question: 'Când ar trebui să oprești antivirusul?',
          options: ['Niciodată', 'Când vrei să te joci', 'Când descarci ceva', 'Când dormi'],
          correctAnswerIndex: 0,
          explanation: 'Antivirusul trebuie să ruleze permanent pentru protecție continuă.'
        },
        {
          question: 'Cine instalează antivirusul?',
          options: ['Doar profesorii', 'Oricine, cu ajutorul unui adult', 'Calculatorul singur', 'Doar un doctor'],
          correctAnswerIndex: 1,
          explanation: 'Oricine poate instala antivirus, dar este bine să ceri ajutorul unui adult.'
        }
      ]
    }
  ]
},

'1-8': {
  sections: [
    {
      title: 'Introducere',
      content: [
        'Acum că ai învățat cum să te protejezi pe internet, e timpul să pui în practică tot ce știi printr-un joc amuzant!',
        'Vei deveni un detectiv digital și vei recunoaște pericolele din lumea online.',
        'Să vedem cât de pregătit ești!'
      ]
    },
    {
      title: 'Explicație',
      content: [
        'Gândește-te la ce ai învățat până acum:',
        '• Ce este o parolă bună?',
        '• Ce este un mesaj suspect?',
        '• Cum arată un fișier periculos?',
        '• Ce face un antivirus?',
        '• Ce reguli trebuie să urmezi când primești ceva necunoscut?',
        'Acest joc este o combinație de întrebări și scenarii în care trebuie să alegi răspunsul corect pentru a „salva” calculatorul tău de pericole.'
      ]
    },
    {
      title: 'Scenarii de joc',
      content: [
        '1. Primești un email de la „ConcursGrozav@fakedomeniu.ru” care spune că ai câștigat un telefon. Ce faci?',
        '   a) Deschid linkul repede! b) Îi spun mamei și nu deschid nimic. c) Trimit mesajul prietenilor.',
        '2. Cineva îți cere parola de la jocul preferat. Ce răspunzi?',
        '   a) I-o dau, că e prietenul meu. b) Îi spun că parola este secretă. c) O schimb imediat.',
        '3. Vezi un fișier numit „jocgratis.exe” pe un site ciudat. Ce faci?',
        '   a) Îl descarc și mă joc! b) Întreb un adult dacă e sigur. c) Îl închid fără să-l descarc.'
      ]
    },
    {
      title: 'Recapitulare',
      content: [
        '• Folosește tot ce ai învățat pentru a recunoaște pericolele.',
        '• Fii atent la mesaje, fișiere și parole.',
        '• Întotdeauna cere ajutor dacă nu ești sigur.'
      ]
    },
    {
      title: 'Quiz final rapid',
      content: [],
      quiz: [
        {
          question: 'Ce faci cu o parolă?',
          options: ['O scrii pe perete', 'O spui tuturor', 'O păstrezi secretă', 'O folosești doar o dată'],
          correctAnswerIndex: 2,
          explanation: 'Parola trebuie să fie cunoscută doar de tine și de părinți.'
        },
        {
          question: 'Cum îți protejezi calculatorul?',
          options: ['Instalezi jocuri nonstop', 'Lași orice fișier să intre', 'Instalezi un antivirus', 'Ștergi toate pozele'],
          correctAnswerIndex: 2,
          explanation: 'Un antivirus ajută la protecția calculatorului tău.'
        },
        {
          question: 'Ce faci dacă ceva pare ciudat online?',
          options: ['Ignori', 'Spui unui adult', 'Dai click repede', 'Postezi pe rețea'],
          correctAnswerIndex: 1,
          explanation: 'Întotdeauna este bine să discuți cu un adult în care ai încredere.'
        },
        {
          question: 'Ce înseamnă un mesaj suspect?',
          options: ['O glumă', 'Ceva cu link și premii false', 'Un mesaj de la bunica', 'O întrebare de matematică'],
          correctAnswerIndex: 1,
          explanation: 'Mesajele suspecte conțin adesea linkuri periculoase sau promisiuni false.'
        },
        {
          question: 'Cum arată o parolă bună?',
          options: ['123456', 'Numele tău', 'Pisica9!Verde', 'Ana'],
          correctAnswerIndex: 2,
          explanation: 'O parolă bună conține litere, cifre și simboluri.'
        }
      ]
    }
  ]
}

}

export default function ChapterContentScreen() {
  const params = useLocalSearchParams();
  const { id, title, description } = params;
  const chapterId = id as string;
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    let isMounted = true;

    async function setOrientation(orientation: ScreenOrientation.OrientationLock) {
      if (!isMounted) return;
      try {
        await ScreenOrientation.lockAsync(orientation);
      } catch (e) {
        console.warn('Could not change orientation:', e);
      }
    }

    setOrientation(ScreenOrientation.OrientationLock.PORTRAIT);

    const unsubscribeFocus = navigation.addListener('focus', () => {
      setOrientation(ScreenOrientation.OrientationLock.PORTRAIT);
    });

    const unsubscribeBlur = navigation.addListener('blur', () => {
      setOrientation(ScreenOrientation.OrientationLock.PORTRAIT);
    });

    const dimensionChangeListener = Dimensions.addEventListener('change', ({ window }) => {
      if (isMounted) setDimensions(window);
    });

    return () => {
      isMounted = false;
      unsubscribeFocus();
      unsubscribeBlur();
      dimensionChangeListener.remove();
    };
  }, [navigation]);

  const chapterContent = chapterContents[chapterId as keyof typeof chapterContents];

  const renderContent = (content: string[]) => {
    return content.map((paragraph, pIndex) => (
      <View key={pIndex} style={styles.sectionTextWrapper}>
        <Text style={styles.sectionText}>{paragraph}</Text>
      </View>
    ));
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description as string}</Text>

        {chapterContent?.sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {renderContent(section.content)}
            {section.image && (
              <View style={styles.imageContainer}>
                <Image source={section.image} style={styles.sectionImage} resizeMode="contain" />
              </View>
            )}
            {section.quiz && <Quiz questions={section.quiz} />}
          </View>
        ))}
      </ScrollView>
    </>
  );
}