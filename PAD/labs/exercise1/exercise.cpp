#include <iostream>

int main() {
    int x;
    std::cout << x << std::endl;
    x = 10;
    std::cout << x << std::endl;

    int* adres = &x;
    std::cout << adres << std::endl;

    int* y;
    std::cout << y << std::endl;

    y = new int;
    std::cout << y << std::endl;

    *y = 20;
    std::cout << *y << std::endl;

    delete y;
    std::cout << y << ", " << *y << std::endl;
}
