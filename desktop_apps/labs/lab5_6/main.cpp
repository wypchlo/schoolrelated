#include"lista_jednokierunkowa.h"

int main(void) {
    //test usuwanie koniec

    int array[4] = {1, 2, 3, 4};
    node* lista1 = list_create_from_array(array, 4);
    list_print(lista1);
    while(lista1) {
        lista1 = list_remove_last(lista1);
        list_print(lista1);
    }

    //test usuwanie start

    node* lista2 = list_create_from_array(array, 4);
    list_print(lista2);

    lista2 = list_add_last(lista2, 5);
    list_print(lista2);

    while(lista2) {
        lista2 = list_remove_first(lista2);
        list_print(lista2);
    }
    
    //testy

    lista2 = list_add_last(lista2, 10);
    lista2 = list_add_last(lista2, 10);
    list_print(lista2);
    lista2 = list_clear(lista2);
    list_print(lista2);
}
