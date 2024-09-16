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

float** interpolate_2d_array(float** arr, short width, short height, short interp) {
    float** interp_array = new float*[height * interp];
    for (int y = 0; y <= (height - 1) * interp; y++) interp_array[y] = new float[width * interp];

    // interpolates even horizontal lines
     for (int y = 0; y <= (height - 1) * interp; y+=interp) {
        for (int x = 0; x <= (width - 1) * interp; x++) {
            float step = x / (float) interp;
            short floor = std::floor(step);
            short ceil = std::ceil(step);
            short array_y = y / interp;
            interp_array[y][x] = arr[array_y][floor] - (arr[array_y][floor] - arr[array_y][ceil]) * (x % interp / (float) interp);
        }   
    }

    // interpolates even vertical lines
    for (int x = 0; x <= (width - 1) * interp; x+=interp) {
        for (int y = 1; y <= interp * (height - 1); y++) {
            float step = y / (float) interp;
            short floor = std::floor(step);
            short ceil = std::ceil(step);
            short array_x = x / interp;
            interp_array[y][x] = arr[floor][array_x] - (arr[floor][array_x] - arr[ceil][array_x]) * (y % interp / (float) interp);
        }
    }

    // interpolates even diagonal lines
    for (int y = 1; y <= (height - 1) * interp; y++) {
        short val = y % interp;
        for (int x = val; x <= (width - 1) * interp; x+=interp) {
            float step = y / (float) interp;
            short floor = std::floor(step);
            short ceil = std::ceil(step);
            short array_x = x / interp;
            interp_array[y][x] = arr[floor][array_x] - (arr[floor][array_x] - arr[ceil][array_x + 1]) * (y % interp / (float) interp);
        }
    }
    
    // interpolates inbetweens horizontally
    for (int i = 0; i < (height - 1); i++) {
        for (int j = 0; j < (width - 1); j++) {
            for (int box_y = 1; box_y < interp; box_y++) {
                int y = i * interp + box_y;

                for (int box_x = 1; box_x < box_y; box_x++) {
                    interp_array[y][j * interp + box_x] = 
                        interp_array[y][j * interp] - (interp_array[y][j * interp] - interp_array[y][j * interp + box_y]) * (box_x / (float) box_y);
                }

                for (int box_x = box_y + 1; box_x < interp; box_x++) {
                    interp_array[y][j * interp + box_x] = 
                        interp_array[y][j * interp + box_y] - (interp_array[y][j * interp + box_y] - interp_array[y][j * interp + interp]) * 
                        ((box_x - box_y) / (float) (interp - box_y));
                }
            }
        }
    }

    return interp_array;
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

    float** interp_array = interpolate_2d_array(array, size_x, size_y, interp);

    print_2d_table(interp_array, interp * (size_x - 1) + 1, interp * (size_y - 1) + 1);

    for (int i = 0; i < size_y; i++) delete [] array[i];
    delete [] array;

    for (int i = 0; i < size_y * interp; i++) delete [] interp_array[i];
    delete [] interp_array;

    return 0;
}
