#include<iostream>
#include<cmath>

inline float pow2(float value) {
    return value * value;
}

float calculate_field_from_edges(float* a, float* b, float* c) {
    float edge_ab = sqrt(pow2(a[0]-b[0]) + pow2(a[1]-b[1]));
    float edge_ac = sqrt(pow2(a[0]-c[0]) + pow2(a[1]-c[1]));
    float edge_bc = sqrt(pow2(b[0]-c[0]) + pow2(b[1]-c[1]));
    float p = (edge_ab + edge_ac + edge_bc) / 2;

    return sqrt(p*(p-edge_ab)*(p-edge_ac)*(p-edge_bc));
}

int main() {
    float a[2], b[2], c[2];
    float* vertices[3] = {a, b, c};
    
    for(short i = 0; i < 3; i++) {
        std::cout << "Podaj współrzędne wierzchołka " << i + 1 << ": " << std::endl << "x: ";
        std::cin >> vertices[i][0];
        std::cout << "y: ";
        std::cin >> vertices[i][1];
        std::cout << std::endl;
    }

    std::cout << "Pole trójkąta wynosi: " << calculate_field_from_edges(a, b, c) << std::endl;
}
