typedef int data;

struct node {
    data wartosc;
    node* nastepny_element;
};

node* stworz_pusta_liste();

node* stworz_liste_z_tablicy(node* lista, data* tablica, int dlugosc_tablicy);

void wypisz_liste(node* lista);

node* dodaj_element_na_poczatku_listy(node* lista, data wartosc);
