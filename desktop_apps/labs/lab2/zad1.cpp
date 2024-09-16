#include<iostream>
#include<cstdlib>
#include<cstdint>
#include<ctime>

void print_room(int8_t room[27][40][50]) {
    for (int8_t z = 0; z < 27; z++) {
        std::cout << std::endl << '[' << std::endl;
        for (int8_t y = 0; y < 40; y++) {
            std::cout << "  ";
            for (int8_t x = 0; x < 50; x++) std::cout << (short) room[z][y][x] << '|';
            std::cout << std::endl;
        }
        std::cout << "],";
    }
    std::cout << "\b " << std::endl;
}

int main(void) {
    std::srand(std::time(0));

    int8_t room[27][40][50];
    float average_temp_of_xz_split[40];
    float average_temp_of_yz_split[50];

    for (int8_t z = 0; z < 27; z++) {
        for (int8_t y = 0; y < 40; y++) {
            for (int8_t x = 0; x < 50; x++) {
                int8_t temperature = (rand() % 8) + 18;
                room[z][y][x] = temperature;
                
                average_temp_of_xz_split[y] += temperature / (50 * 27.0F);
                average_temp_of_yz_split[x] += temperature / (40 * 27.0F);
            }
        }
    }

    //print_room(room);
    
    int8_t highest_yz_temp_index;
    int8_t highest_xz_temp_index;

    for (int8_t i = 0; i < 40; i++) if (average_temp_of_xz_split[i] > average_temp_of_xz_split[highest_xz_temp_index]) highest_xz_temp_index = i;
    for (int8_t i = 0; i < 50; i++) if (average_temp_of_yz_split[i] > average_temp_of_yz_split[highest_yz_temp_index]) highest_yz_temp_index = i;
    
    if (average_temp_of_xz_split[highest_xz_temp_index] > average_temp_of_yz_split[highest_yz_temp_index])
        std::cout << "Przekrój pionowy z najwyższą średnią temperaturą (" << average_temp_of_xz_split[highest_xz_temp_index] << "'C) to przekrój x" << (int) highest_xz_temp_index << '.';
    else 
        std::cout << "Przekrój pionowy z najwyższą średnią temperaturą (" << average_temp_of_yz_split[highest_yz_temp_index] << "'C) to przekrój y" << (int) highest_yz_temp_index << '.';

    std::cout << std::endl;
}
