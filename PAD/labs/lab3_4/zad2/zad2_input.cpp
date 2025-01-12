#include<iostream>
#include<cstdlib>
#include<ctime>
#include<cmath>
#include<cstdlib>
#include<vector>

void print_2d_table(float** arr, short height, short width) {
    std::cout << std::endl << '[' << std::endl;
    for (int y = 0; y < height; y++) {
        std::cout << " |";
        for (int x = 0; x < width; x++) std::cout << arr[y][x] << '|';
        std::cout << std::endl << std::endl;
    }
    std::cout << ']' << std::endl;
}

inline float pow2(float value) { return value * value; }

float** generate_heights(float** array, short height, short width) {
    for (short y = 0; y < height; y++) {
        for (short x = 0; x < width; x++) {
            array[y][x] = (array[y][x] / 10) * 2300 + 1200;
        }
    }
    return array;
}

float** interpolate_2d_array(float** arr, short height, short width, short interp) {
    float** interp_array = new float*[height * interp];
    for (int y = 0; y <= (height - 1) * interp; y++) interp_array[y] = new float[width * interp];

    // interpolates even horizontal lines
     for (int y = 0; y <= (height - 1) * interp; y += interp) {
        for (int x = 0; x <= (width - 1) * interp; x++) {
            short floor = x / interp;
            short ceil = (x % interp == 0) ? floor : floor + 1;
            short array_y = y / interp;
            interp_array[y][x] = arr[array_y][floor] - (arr[array_y][floor] - arr[array_y][ceil]) * (x % interp / (float) interp);
        }   
    }

    // interpolates even vertical lines
    for (int x = 0; x <= (width - 1) * interp; x += interp) {
        for (int y = 1; y <= interp * (height - 1); y++) {
            short floor = y / interp;
            short ceil = (y % interp == 0) ? floor : floor + 1;
            short array_x = x / interp;
            interp_array[y][x] = arr[floor][array_x] - (arr[floor][array_x] - arr[ceil][array_x]) * (y % interp / (float) interp);
        }
    }

    // interpolates even diagonal lines
    for (int y = 1; y <= (height - 1) * interp; y++) {
        short val = y % interp;
        for (int x = val; x <= (width - 1) * interp; x += interp) {
            short floor = y / interp;
            short ceil = (y % interp == 0) ? floor : floor + 1;
            short array_x = x / interp;
            interp_array[y][x] = arr[floor][array_x] - (arr[floor][array_x] - arr[ceil][array_x + 1]) * (y % interp / (float) interp);
        }
    }
    
    // interpolates inbetweens horizontally
    for (int i = 0; i < (height - 1) * interp; i += interp) {
        for (int j = 0; j < (width - 1) * interp; j += interp) {
            for (int box_y = 1; box_y < interp; box_y++) {
                int y = i + box_y;

                for (int box_x = 1; box_x < box_y; box_x++) {
                    interp_array[y][j + box_x] = 
                        interp_array[y][j] - (interp_array[y][j] - interp_array[y][j + box_y]) * (box_x / (float) box_y);
                }

                for (int box_x = box_y + 1; box_x < interp; box_x++) {
                    interp_array[y][j + box_x] = 
                        interp_array[y][j + box_y] - (interp_array[y][j + box_y] - interp_array[y][j + interp]) * ((box_x - box_y) / (float) (interp - box_y));
                }
            }
        }
    }

    return interp_array;
}

float** generate_terrain(){
    int width = 40;
    int height = 50;

    float** array = new float*[height];
    for (int i = 0; i < height; i++) array[i] = new float[width];
    
    std::cout << "Wygenerowana tablica to:" << std::endl;
    for (int y = 0; y < height; y++) for (int x = 0; x < width; x++) array[y][x] = rand() % 11;
    print_2d_table(array, height, width);
    
    short interp = 100;
    float** interpolated_array = interpolate_2d_array(array, height, width, interp);

    int i_width = (width - 1) * interp + 1;
    int i_height = (height - 1) * interp + 1;
 
    float** terrain = generate_heights(interpolated_array, i_height, i_width);

    for (short y = 0; y < height; y++) delete[] array[y];
    delete[] array;

    return terrain;
}

struct vector2d {
    short x;
    short y;

    vector2d(short x, short y) : x(y), y(y) {}
};

int main(void) {
    std::srand(std::time(0));
    float** terrain = generate_terrain();

    float** array = new float*[50];
    for (int i = 0; i < 50; i++) array[i] = new float[40];
    
    for (int y = 0; y < 50; y++) for (int x = 0; x < 40; x++) array[y][x] = rand() % 11;



    float** unavailable = new float*[50];
    for (int i = 0; i < 50; i++) unavailable[i] = new float[40];

    int originCoord[2] = { rand() % 40, rand() % 50 };
    int destinationCoord[2] = { rand() % 40, rand() % 50 };
    int currentCoord[2] = { originCoord[0], originCoord[1] };

    std::cout << "Punkt A to (" << originCoord[0] << ", " << originCoord[1] << "), Punkt B to (" << destinationCoord[0] << ", " << destinationCoord[1] << ")";
    
    std::vector<vector2d> moves = {
        {-1, 1},  {0, 1},  {1, 1},
        {-1, 0},           {1, 0},
        {-1, -1}, {0, -1}, {1, -1}
    };

    while(!(currentCoord[0] == destinationCoord[0] && currentCoord[1] == destinationCoord[1])) {
        while(true) {
            //Randomowy wygenerowany ruch
            vector2d move = moves[rand() % 8];
            //Założenie jest takie że cofa się w momencie gdy jego odległość od punktu startowego maleje
            short proposed_x = currentCoord[0] + move.x;
            short proposed_y = currentCoord[1] + move.y;
            int initial_distance_to_end = abs(destinationCoord[0] - currentCoord[0]) + abs(destinationCoord[1] - currentCoord[1]);
            int initial_distance_from_start = abs(originCoord[0] - currentCoord[0]) + abs(originCoord[1] - currentCoord[1]);
            int distance_to_end = abs(destinationCoord[0] - proposed_x) + abs(destinationCoord[1] - proposed_y);
            int distance_from_start = abs(originCoord[0] - proposed_x) + abs(originCoord[1] - proposed_y);

            //Sprawdznie czy sie nie cofa lub nie wychodzi za border 
            if(proposed_x > 40 || proposed_x < 0) move.x *= -1;
            if(proposed_y > 50 || proposed_y < 0) move.y *= -1;
            if(distance_to_end > initial_distance_to_end) if(distance_from_start < initial_distance_from_start) continue;
            
            currentCoord[0] += move.x;
            currentCoord[1] += move.y;
            break;
        }
        for (int y = 0; y < 50; y++) {
            std::cout << " |";
            for (int x = 0; x < 40; x++) { 
                if(x == currentCoord[0] && y == currentCoord[1]) std::cout << "  |";
                if(x == destinationCoord[0] && y == destinationCoord[1]) std::cout << "  |";
                else std::cout << array[y][x] << '|';
            }
            std::cout << std::endl;
        }
        //std::cout<<originCoord[0]<<','<<originCoord[1]<<'|'<<currentCoord[0]<<','<<currentCoord[1]<<'|'<<destinationCoord[0]<<','<<destinationCoord[1]<<'\n';
        std::cin.ignore();
        std::system("clear");
    }

    for (short y = 0; y < 50; y++) delete[] unavailable[y];
    delete[] unavailable;

    for (short y = 0; y < 50; y++) delete[] array[y];
    delete[] array;

    for (short y = 0; y < 5000; y++) delete[] terrain[y];
    delete[] terrain;
    
    return 0;
}
