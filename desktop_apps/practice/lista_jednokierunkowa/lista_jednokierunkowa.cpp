#include<iostream>
#include "lista_jednokierunkowa.h"

node* stworz_pusta_liste() {
    return nullptr;
}

node* ostatni_element_listy(node* lista) {
    if(lista == nullptr) return nullptr;

    node*& wskaznik_na_nastepny_element = lista->nastepny_element;

    while(wskaznik_na_nastepny_element != nullptr) {
         
        wskaznik_na_nastepny_element = 
    }
}

node* dodaj_element_na_poczatku_listy(node* lista, data wartosc) {
    node* nowy_pierwszy_element = new node;

    nowy_pierwszy_element->wartosc = wartosc;
    nowy_pierwszy_element->nastepny_element = lista;

    return nowy_pierwszy_element;
}

void wypisz_liste(node* lista)
{
    node*& wskaznik_na_element = lista;

    std::cout<<"Lista to: ";
    while(wskaznik_na_element != nullptr) { 
        node& element = *wskaznik_na_element;

        std::cout<<element.wartosc<<' ';
        wskaznik_na_element = element.nastepny_element;
    }
    std::cout<<std::endl;
};
