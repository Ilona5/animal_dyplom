export type AnimalInfo = {
  label: string;
  overview: string;
  care: string[];
  feeding: string[];
  behavior: string[];
  mistakes: string[];
  gallery?: string[];
  housing: string[];
};

export const animals: Record<string, AnimalInfo> = {
  cat: {
    label:"Kot",
    overview:
      "Kot to jedno z najczęściej wybieranych zwierząt domowych. Jest niezależny, ale silnie przywiązuje się do opiekuna.",
    care: [
      "Codzienne czyszczenie kuwety",
      "Regularne szczotkowanie futra",
      "Kontrola pazurów",
    ],
    feeding: [
      "Karma sucha lub mokra dobrej jakości",
      "Stały dostęp do świeżej wody",
      "Unikać mleka i jedzenia dla ludzi",
    ],
    housing: [
      "Mieszkanie lub dom z wydzieloną spokojną przestrzenią",
      "Kuweta ustawiona w cichym i łatwo dostępnym miejscu",
      "Drapak do ścierania pazurów i rozciągania mięśni",
      "Legowisko lub miękkie miejsce do odpoczynku",
      "Bezpieczne środowisko bez toksycznych roślin i otwartych okien",
    ],

    behavior: [
      "Niezależny, ale towarzyski",
      "Lubi rutynę i własną przestrzeń",
      "Aktywny głównie wieczorem",
    ],
    mistakes: ["Przekarmianie", "Brak zabawy", "Ignorowanie sygnałów stresu"],
    gallery: [
      "https://images.pexels.com/photos/19047434/pexels-photo-19047434.jpeg",
      "https://images.pexels.com/photos/16114915/pexels-photo-16114915.jpeg",
      "https://images.pexels.com/photos/24525068/pexels-photo-24525068.jpeg",
    ],
  },

  rabbit: {
    label:"Królik",
    overview:
      "Królik to spokojne zwierzę domowe, które wymaga odpowiednich warunków i regularnej opieki.",
    care: [
      "Regularne czyszczenie klatki",
      "Kontrola zębów",
      "Czesanie sierści",
    ],
    feeding: [
      "Siano jako podstawa diety",
      "Świeże warzywa",
      "Stały dostęp do wody",
    ],
    housing: [
      "Przestronna klatka lub kojec umożliwiający swobodny ruch",
      "Codzienny dostęp do przestrzeni poza klatką",
      "Miękkie i bezpieczne podłoże (np. mata lub siano)",
      "Ciche miejsce z dala od hałasu i przeciągów",
      "Stała temperatura bez nagłych zmian",
    ],

    behavior: ["Płochliwy", "Aktywny rano i wieczorem", "Źle znosi hałas"],
    mistakes: ["Brak siana", "Za mała przestrzeń", "Podawanie słodyczy"],
    gallery: [
      "https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg",
      "https://images.pexels.com/photos/4001296/pexels-photo-4001296.jpeg",
      "https://images.pexels.com/photos/3820509/pexels-photo-3820509.jpeg",
    ],
  },

  parrot: {
    label:"Papuga",
    overview:
      "Papuga to inteligentne i towarzyskie zwierzę, które potrzebuje kontaktu i stymulacji.",
    care: ["Czyszczenie klatki", "Zapewnienie zabawek", "Codzienny kontakt"],
    feeding: ["Ziarna i mieszanki", "Owoce i warzywa", "Świeża woda"],
    behavior: ["Głośna", "Bardzo towarzyska", "Może naśladować dźwięki"],
    housing: [
      "Klatka dostosowana do rozmiaru ptaka, umożliwiająca rozprostowanie skrzydeł",
      "Miejsce z naturalnym światłem, ale bez bezpośredniego słońca",
      "Stały dostęp do świeżego powietrza bez przeciągów",
      "Żerdki o różnej grubości oraz zabawki stymulujące",
      "Umiejscowienie klatki w miejscu, gdzie ptak ma kontakt z domownikami",
    ],

    mistakes: ["Samotność", "Brak zabawek", "Zbyt mała klatka"],
    gallery: [
      "https://images.pexels.com/photos/2317904/pexels-photo-2317904.jpeg",
      "https://images.pexels.com/photos/1599452/pexels-photo-1599452.jpeg",
      "https://images.pexels.com/photos/1453550/pexels-photo-1453550.jpeg",
    ],
  },
};
