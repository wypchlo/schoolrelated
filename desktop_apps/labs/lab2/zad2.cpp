#include<iostream>
#include<cstdlib>
#include<ctime>
#include<cmath>

inline float pow2(float value) {
    return value * value;
}

inline float calculate_field_from_edges(float* a, float* b, float* c) {
    float edge_ab = sqrt(pow2(a[0]-b[0]) + pow2(a[1]-b[1]));
    float edge_ac = sqrt(pow2(a[0]-c[0]) + pow2(a[1]-c[1]));
    float edge_bc = sqrt(pow2(b[0]-c[0]) + pow2(b[1]-c[1]));
    float p = (edge_ab + edge_ac + edge_bc) / 2;

    return sqrt(p*(p-edge_ab)*(p-edge_ac)*(p-edge_bc));
}

int main(void) {
    std::srand(std::time(0));

    short** terrain = new short*[4000]; //terrain[4000][5000]
    
    terrain[0] = new short[5000];
    for (short i = 0; i < 5000; i++) terrain[0][i] = rand() % 2301 + 1200;

    for (short y = 1; y < 4000; y++) { 
        terrain[y] = new short[5000];
        
        terrain[y][0] = rand() % 2301 + 1200;
        for (short x = 1; x < 5000; x++) {
            //  0 1
            //  2 3
            terrain[y][x] = rand() % 2301 + 1200; // uzupełnia wierzchołek 3

            short* square[4] = { &terrain[y - 1][x - 1], &terrain[y][x - 1], &terrain[y - 1][x], &terrain[y][x] };
            //std::cout << std::endl << std::endl << *square[0] << ' ' << *square[1] << std::endl << *square[2] << ' ' << *square[3] << std::endl;

            float a1 = sqrt(pow2(abs((int) (*square[0] - *square[2]))) + 1.0);
            float b1 = sqrt(pow2(abs((int) (*square[2] - *square[3]))) + 1.0);
            float c = sqrt(pow2(abs((int) (*square[0] - *square[3]))) + 1.414);
            float a2 = sqrt(pow2(abs((int) (*square[1] - *square[0]))) + 1.0);
            float b2 = sqrt(pow2(abs((int) (*square[3] - *square[1]))) + 1.0);
            float triangle1_field = calculate_field_from_edges(&a1, &b1, &c);
            float triangle2_field = calculate_field_from_edges(&a2, &b2, &c);

            std::cout << "Trójkąt 1: " << a1 << ", " << b1 << ", " << c << " Pole wynosi: " << triangle1_field << std::endl;
            std::cout << "Trójkąt 2: " << a2 << ", " << b2 << ", " << c << " Pole wynosi: " << triangle2_field << std::endl;
        }
    }
    
    for (short x = 0; x < 4000; x++) delete[] terrain[x];
    delete[] terrain;
    
    return 0;
}
