#include<iostream>
#include<locale>

int main(void) {
    char16_t test[] {u""};
    for(short i = 0; i < sizeof(test); i++) {
        std::cout << test;
    }
}
