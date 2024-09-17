#include<iostream>
#include<cstdlib>
#include<ctime>
#include<cmath>

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

inline float calculate_field_from_edges(float* a, float* b, float* c) { // heron
    float edge_ab = sqrt(pow2(a[0]-b[0]) + pow2(a[1]-b[1]));
    float edge_ac = sqrt(pow2(a[0]-c[0]) + pow2(a[1]-c[1]));
    float edge_bc = sqrt(pow2(b[0]-c[0]) + pow2(b[1]-c[1]));
    float p = (edge_ab + edge_ac + edge_bc) / 2;

    return sqrt(p*(p-edge_ab)*(p-edge_ac)*(p-edge_bc));
}

float** generate_heights(float** array, short height, short width) {
    for (short y = 0; y < height; y++) {
        for (short x = 0; x < width; x++) {
            array[y][x] = (array[y][x] / 10) * 2300 + 1200;
        }
    }
    return array;
}

long double calculate_terrain_field(float** terrain, short height, short width) {
    long double field = 0;
    for (short y = 1; y < height; y++) {  
        for (short x = 1; x < width; x++) {
            float* square[4] = { &terrain[y - 1][x - 1], &terrain[y][x - 1], &terrain[y - 1][x], &terrain[y][x] };

            float a1 = sqrt(pow2(abs((int) (*square[0] - *square[2]))) + 1.0);
            float b1 = sqrt(pow2(abs((int) (*square[2] - *square[3]))) + 1.0);
            float c = sqrt(pow2(abs((int) (*square[0] - *square[3]))) + 1.414);
            float a2 = sqrt(pow2(abs((int) (*square[1] - *square[0]))) + 1.0);
            float b2 = sqrt(pow2(abs((int) (*square[3] - *square[1]))) + 1.0);
            float triangle1_field = calculate_field_from_edges(&a1, &b1, &c);
            float triangle2_field = calculate_field_from_edges(&a2, &b2, &c);
            field += (triangle1_field + triangle2_field);
            //std::cout << "Trójkąt 1: " << a1 << ", " << b1 << ", " << c << " Pole wynosi: " << triangle1_field << std::endl;
            //std::cout << "Trójkąt 2: " << a2 << ", " << b2 << ", " << c << " Pole wynosi: " << triangle2_field << std::endl;
        }
    }
    return field;
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

int main(void) {
    std::srand(std::time(0));

    int width;
    std::cout << "Podaj szerokość tablicy: ", std::cin >> width;

    int height;
    std::cout << "Podaj wysokość tablicy: ", std::cin >> height;

    float** array = new float*[height];
    for (int i = 0; i < height; i++) array[i] = new float[width];
    
    std::cout << "Wygenerowana tablica to:" << std::endl;
    for (int y = 0; y < height; y++)
        for (int x = 0; x < width; x++) array[y][x] = rand() % 11;

    print_2d_table(array, height, width);
    
    short interp;
    std::cout << "Podaj poziom interpolacji tablicy: ", std::cin >> interp;
    float** interpolated_array = interpolate_2d_array(array, height, width, interp);

    int i_width = (width - 1) * interp + 1;
    int i_height = (height - 1) * interp + 1;
    
    //print_2d_table(interpolated_array, i_height, i_width);
 
    float** terrain = generate_heights(interpolated_array, i_height, i_width);    
    //print_2d_table(terrain, i_height, i_width);

    long double field = calculate_terrain_field(terrain, (height - 1) * interp, (width - 1) * interp);
    
    std::cout << std::endl << std::endl << "Pole powierzchni terenu wynosi: " << field;

    for (short y = 0; y < height; y++) delete[] array[y];
    delete[] array;

    for (short y = 0; y < i_height; y++) delete[] terrain[y];
    delete[] terrain;
    
    return 0;
}
