#include<iostream>
#include<cstdlib>
#include<ctime>
#include<cmath>
#include<iomanip>

void print_2d_table(float** arr, int size_x, int size_y) {
    std::cout << std::endl << '[' << std::endl;
    for (int y = 0; y < size_y; y++) {
        std::cout << " |";
        for (int x = 0; x < size_x; x++) std::cout << std::setfill(' ') << std::setw(4) << std::setprecision(3) << arr[y][x] << '|';
        std::cout << std::endl << std::endl;
    }
    std::cout << ']' << std::endl;
}

int main(void) {
    std::srand(std::time(0));
    
    int size_x;
    std::cout << "Podaj szerokość tablicy: ";
    std::cin >> size_x;

    int size_y;
    std::cout << "Podaj wysokość tablicy: ";
    std::cin >> size_y;

    float** array = new float*[size_y];
    for (int i = 0; i < size_y; i++) array[i] = new float[size_x];

    std::cout << "Wygenerowana tablica to:" << std::endl;
    for (int y = 0; y < size_y; y++)
        for (int x = 0; x < size_x; x++) array[y][x] = rand() % 10;

    print_2d_table(array, size_x, size_y);
    
    short interp;
    std::cout << "Podaj poziom interpolacji tablicy: ";
    std::cin >> interp;

    float** interp_array = new float*[size_y * interp];
    for (int y = 0; y <= (size_y - 1) * interp; y++) interp_array[y] = new float[size_x * interp];


    std::cout << "Zinterpolowana tablica to: " << std::endl << "[ ";
    
    // filling even horizontal lines
    for (int y = 0; y <= (size_y - 1) * interp; y+=interp) {
        for (int x = 0; x <= (size_x - 1) * interp; x++) {
            float step = x / (float) interp;
            short floor = std::floor(step);
            short ceil = std::ceil(step);
            short array_y = y / interp;
            interp_array[y][x] = array[array_y][floor] - (array[array_y][floor] - array[array_y][ceil]) * (x % interp / (float) interp);
        }   
    }
    // filling even vertical lines
    for (int x = 0; x <= (size_x - 1) * interp; x+=interp) {
        for (int y = 1; y <= interp * (size_y - 1); y++) {
            float step = y / (float) interp;
            short floor = std::floor(step);
            short ceil = std::ceil(step);
            short array_x = x / interp;
            interp_array[y][x] = array[floor][array_x] - (array[floor][array_x] - array[ceil][array_x]) * (y % interp / (float) interp);
        }
    }
    // filling even diagonal lines
    for (int y = 1; y <= (size_y - 1) * interp; y++) {
        short val = y % interp;
        for (int x = val; x <= (size_x - 1) * interp; x+=interp) {
            float step = y / (float) interp;
            short floor = std::floor(step);
            short ceil = std::ceil(step);
            short array_x = x / interp;
            interp_array[y][x] = array[floor][array_x] - (array[floor][array_x] - array[ceil][array_x + 1]) * (y % interp / (float) interp);
        }
    }

    for (int y = 1; y < interp; y++) {
        for (int x = 1; x < y; x++) {
            float step = x / (float) y;
            short floor = std::floor(step);
            short ceil = std::ceil(step);
            std::cout << "Floor: " << floor * interp << " Ceil: " << ceil * interp;
            interp_array[y][x] = interp_array[y][floor * interp] - (interp_array[y][floor * interp] - interp_array[y][y]) * (x % interp / (float) y);
        }
        for (int x = y; x < interp; x++) {
            float step = x / (float) y;
            short floor = std::floor(step);
            short ceil = std::ceil(step);
            std::cout << "Floor: " << floor * interp << " Ceil: " << ceil * interp;
            interp_array[y][x] = interp_array[y][floor * interp] - (interp_array[y][floor * interp] - interp_array[y][y]) * (x % interp / (float) y);
        }
    }

    print_2d_table(interp_array, interp * (size_x - 1) + 1, interp * (size_y - 1) + 1);

    for (int i = 0; i < size_y; i++) delete [] array[i];
    delete [] array;

    for (int i = 0; i < size_y * interp; i++) delete [] interp_array[i];
    delete [] interp_array;

    return 0;
}
