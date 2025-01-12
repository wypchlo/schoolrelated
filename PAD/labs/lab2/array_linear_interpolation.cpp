#include<iostream>
#include<cstdlib>
#include<ctime>
#include<cmath>

int main(void) {
    std::srand(std::time(0));
    
    int array_size;
    std::cout << "Podaj wielkość tablicy: ";
    std::cin >> array_size;

    short array[array_size];

    std::cout << "Wygenerowana tablica to:" << std::endl << "[ ";
    for (int i = 0; i < array_size; i++) { 
        array[i] = rand() % 10;
        std::cout << array[i] << ' ';
    }
    std::cout << ']' << std::endl << std::endl;
    
    short interpolation_level;
    std::cout << "Podaj poziom interpolacji tablicy: ";
    std::cin >> interpolation_level;

    float interpolated_array[array_size * interpolation_level];

    std::cout << "Zinterpolowana tablica to: " << std::endl << "[ ";
    for (int i = 0; i <= interpolation_level * (array_size - 1); i++) {
        float step = i / (float) interpolation_level;
        short floor = std::floor(step);
        short ceil = std::ceil(step);
        interpolated_array[i] = array[floor] - (array[floor] - array[ceil]) * (i % interpolation_level / (float) interpolation_level);
        std::cout << interpolated_array[i] << ' ';
    }
    std::cout << ']' << std::endl;
}
