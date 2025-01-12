#include"lista_jednokierunkowa.h"
#include<iostream>
#include<cstdlib>
#include<string>

using std::string;

int main(void) {
    node* lista = list_create_empty();

    while(true) {
        std::cout

        <<std::endl
        <<"1. Utwórz listę z tablicy elementów"<<std::endl
        <<"2. Dodaj element na początku listy"<<std::endl
        <<"3. Dodaj element na końcu listy"<<std::endl
        <<"4. Dodaj element po dowolnym istniejącym elemencie listy"<<std::endl
        <<"5. Usuń element z początku listy"<<std::endl
        <<"6. Usuń element z końca listy"<<std::endl
        <<"7. Usuń element w dowolnym punkcie listy"<<std::endl
        <<"8. Wyczyść listę"<<std::endl
        <<std::endl;
    
        char key;
        std::cin>>key;
        
        system("clear");

        switch (key) {
            case '1':
                {
                    int size;
                    std::cout<<"Podaj wielkość tablicy: ";
                    std::cin>>size;

                    int array[size];

                    string value;
                    for(int i = 0; i < size; i++){
                        std::cout<<"Podaj "<<i<<" element: ";
                        std::cin>>value;
                        array[i] = std::stoi(value);
                    }
                    lista = list_create_from_array(array, size);
                }
                break;
            case '2':
                {
                    string value;
                    std::cout<<"Podaj element do dodania: ";
                    std::cin>>value;

                    lista = list_add_first(lista, std::stoi(value));
                }
                break;
            case '3':
                {
                    string value;
                    std::cout<<"Podaj element do dodania: ";
                    std::cin>>value;

                    lista = list_add_last(lista, std::stoi(value));
                }
                break;
            case '4': // dodawanie w dowolnym miejscu
                {
                    string value;
                    std::cout<<"Podaj element do dodania: ";
                    std::cin>>value;

                    string position;
                    std::cout<<std::endl<<"Podaj pozycje elementu po którym dane zostaną dodane: ";
                    std::cin>>position;

                    lista = list_insert_after(lista, std::stoi(value), std::stoi(position));
                }
                break;
            case '5':
                lista = list_remove_first(lista);
                break;
            case '6':
                lista = list_remove_last(lista);
                break;
            case '7': // usuwanie w dowolnym miejscu
                {
                    string position;
                    std::cout<<"Podaj pozycje elementu do usunięcia: ";
                    std::cin>>position;

                    lista = list_remove(lista, std::stoi(position));
                }
                break;
            case '8':
                lista = list_clear(lista);
                break;
        }
       
        system("clear");

        std::cout<<"Obecny wygląd tablicy: ";
        list_print(lista);
    }
}
