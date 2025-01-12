#include<iostream>
#include"lista_jednokierunkowa.h"

node* list_create_empty() {
    return nullptr;
}


node* list_create_from_array(data* array, int size) {
    node* first = new node{array[0], nullptr};
    node* previous = first;
    for(int i = 1; i < size; i++) {
        node* current = new node{array[i], nullptr};
        (*previous).next = current;
        previous = current;
    }
    return first;
}


void list_print(node* first_element) {
    node* current = first_element;
    while(current != nullptr) {
        //node current_value = *current;      ZAPYTAĆ O TO!!! (tzn czy oplaca sie to przypisac do zmiennej)
        std::cout<<(*current).value<<' ';
        if((*current).next == nullptr) break;
        current = (*current).next;
    }
    std::cout<<std::endl;
}


node* list_remove(node* first_element, int index) {
     if(!first_element) return nullptr;

    node* current = first_element;
    node* previous = nullptr; 
    int current_index = 0;

    do {
        if(current_index == index) {
            node* next = (*current).next;
            delete current;
            if(previous) (*previous).next = next;
            else return next;
            break;
        }

        current_index++;
        previous = current;
        current = (*current).next;
    } while(current);

    return first_element;   
}


node* list_remove_last(node* first_element) {
    if(!first_element) return nullptr;
    else if((*first_element).next == nullptr) {
        delete first_element;
        return nullptr;
    }

    node* current = first_element;
    node* previous;
    while(node* next = (*current).next) {
        previous = current;
        current = next;
    }
    delete current;
    (*previous).next = nullptr;
    return first_element;
}


node* list_remove_first(node* first_element) {
    if(!first_element) return nullptr;
    else if((*first_element).next == nullptr) {
        delete first_element;
        return nullptr;
    }

    node* next = (*first_element).next;
    delete first_element;
    return next;
}


node* list_insert_after(node* first_element, data value, int index) {
    if(!first_element) return nullptr;

    node* current = first_element;
    int current_index = 0;
    
    node* next;
    while(current) {
        next = (*current).next;
        if(current_index == index) (*current).next = new node{value, next};

        current = next;
        current_index++;
    }

    return first_element;
}


node* list_add_last(node* first_element, data value) {
    if(!first_element) return new node{value, nullptr};

    node* current = first_element;
    while(node* next = (*current).next) { // wykonuje sie tak dlugo jak dlugo (*current).next nie jest nullptr'em
        current = next;
    }
    (*current).next = new node{value, nullptr};
    return first_element;
}


node* list_add_first(node* first_element, data value) {
    if(first_element == nullptr) return new node{value, nullptr};
    return new node{value, first_element};
}


node* list_clear(node* first_element) {
    if(!first_element) return nullptr;

    node* current = first_element;
    while(node* next = (*current).next) {
        delete current;
        current = next;
    }
    delete current;
    return nullptr;
}
