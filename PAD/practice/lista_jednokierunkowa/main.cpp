#include<iostream>
#include "lista_jednokierunkowa.h"

int main(void) {
    node* lista = stworz_pusta_liste();

    lista = dodaj_element_na_poczatku_listy(lista, 1);
    lista = dodaj_element_na_poczatku_listy(lista, 2);
    lista = dodaj_element_na_poczatku_listy(lista, 3);

    wypisz_liste(lista);
}
