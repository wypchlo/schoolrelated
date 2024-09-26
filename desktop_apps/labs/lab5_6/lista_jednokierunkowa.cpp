#include<iostream>
#include"lista_jednokierunkowa.h"

node list_create_empty() {
    return {0, nullptr};
}

node list_create_from_array(data* array, int width) {
    node* first = new node{array[0], nullptr};
    node* previous = first;
    for(int i = 1; i < width; i++) {
        node* current = new node{array[i], nullptr};
        (*previous).next = current;
        previous = current;
    }
    return *first;
}

void list_print(node* first_element) {
    std::cout<<std::endl;
    node current = *(first_element);
    while(true) {
        std::cout<<current.value<<' ';
        if(current.next == nullptr) break;
        current = *(current.next);
    }
    std::cout<<std::endl;
}

void list_remove_last(node* first_element) {
    node* current = first_element;
    node* previous;
    while(true) {
        node* next = (*current).next;
        if(next == nullptr) {
            delete current;
            (*previous).next = nullptr;
            break;
        }
        previous = current;
        current = next;
    }
}
