#include"lista_jednokierunkowa.h"

int main(void) {
    int array[4] = {1, 2, 3, 4};
    node lista1 = list_create_from_array(array, 4);
    list_print(&lista1);
    list_remove_last(&lista1);
    list_print(&lista1);
}
