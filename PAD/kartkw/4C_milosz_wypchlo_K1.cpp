#include<string>
#include<iostream>
#include<random>

struct drukarka {
    std::string marka_drukarki;
    std::string typ_drukarki;
    short rok_produkcji;
};

struct node {
    drukarka* druk;
    node* nastepny_element;
};

node* stworz_pusta_kolejke() {
    return nullptr;
}

node* stworz_kolejke_z_tablicy(drukarka** tablica, int ilosc_elementow) {
    node* pierwszy_element = new node;
    node* obecny_element = pierwszy_element;
    for(int i = 0; i < ilosc_elementow; i++) {
        obecny_element->druk = tablica[i];
        obecny_element->nastepny_element = new node;
        obecny_element = obecny_element->nastepny_element;
    }
    return pierwszy_element;
}

node* dodaj_drukarke_do_kolejki(node* kolejka, drukarka* druk) {
    node* nowy_element = new node;
    nowy_element->druk = druk;
    nowy_element->nastepny_element = nullptr;

    if(!kolejka) return nowy_element;

    node* pierwszy_element = kolejka;
    
    node*& element = kolejka;

    while(element->nastepny_element) {
        element = element->nastepny_element;
    }
    
    element->nastepny_element = nowy_element;

    return pierwszy_element;
}

node* znajdz_drukarki_po_roku_produkcji(node* kolejka, int rok_produkcji) { //zwraca nową kolejke drukarek z danego roku produkcji (wolałem dopisać bo to troche nie widać po typach)
    node*& obecny_element = kolejka;
    
    node* drukarki_spelniajace_kryterium = stworz_pusta_kolejke();

    while(obecny_element->nastepny_element) {
        drukarka* druk = obecny_element->druk;
        if(druk->rok_produkcji == rok_produkcji) {
            drukarki_spelniajace_kryterium = dodaj_drukarke_do_kolejki(drukarki_spelniajace_kryterium, druk); // znajduje te dwa ale cos mam nie tak w czyms nie wiem w czym
        }
        obecny_element = obecny_element->nastepny_element;
    }

    return drukarki_spelniajace_kryterium;
}

void wypisz_kolejke(node* kolejka) {
    node*& obecny_element = kolejka;

    while(obecny_element->nastepny_element) {
        drukarka druk = *obecny_element->druk;
        std::cout<<druk.marka_drukarki<<" "<<druk.typ_drukarki<<" "<<druk.rok_produkcji<<std::endl;
        obecny_element = obecny_element->nastepny_element;
    }
}

int main(void) {
    srand(time(NULL));

    drukarka* druk1 = new drukarka;
    druk1->marka_drukarki = "Canon";
    druk1->typ_drukarki = "laserowa";
    druk1->rok_produkcji = 2019;

    drukarka* druk2 = new drukarka;
    druk2->marka_drukarki = "HP";
    druk2->typ_drukarki = "laserowa";
    druk2->rok_produkcji = 2017;

    drukarka* druk3 = new drukarka;
    druk3->marka_drukarki = "HP";
    druk3->typ_drukarki = "termiczna";
    druk3->rok_produkcji = 2022;

    drukarka* druk4 = new drukarka;
    druk4->marka_drukarki = "Canon";
    druk4->typ_drukarki = "termiczna";
    druk4->rok_produkcji = 2022;

    drukarka* druk5 = new drukarka;
    druk5->marka_drukarki = "HP";
    druk5->typ_drukarki = "termiczna";
    druk5->rok_produkcji = 2019;
    
    drukarka* drukarki[5] = {druk1, druk2, druk3, druk4, druk5};
    node* kolejka_drukarek = stworz_kolejke_z_tablicy(drukarki, 5);
    /*
        ALTERNATYWNIE 
            
        kolejka_drukarek = dodaj_drukarke_do_kolejki(kolejka_drukarek, druk1);
        kolejka_drukarek = dodaj_drukarke_do_kolejki(kolejka_drukarek, druk2);
        kolejka_drukarek = dodaj_drukarke_do_kolejki(kolejka_drukarek, druk3);
        kolejka_drukarek = dodaj_drukarke_do_kolejki(kolejka_drukarek, druk4);
        kolejka_drukarek = dodaj_drukarke_do_kolejki(kolejka_drukarek, druk5);
    */
    wypisz_kolejke(kolejka_drukarek);
    
    std::cout<<"Drukarki z 2019: ";
    
    node* drukarki_z_2019 = znajdz_drukarki_po_roku_produkcji(kolejka_drukarek, 2019);
    wypisz_kolejke(drukarki_z_2019);

    // TABLICA 3D
    
    for(int z = 100; z < 100; z++);

    std::cout << rand() % 10;
}
