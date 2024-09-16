#include<iostream>
#include<cmath>

float* quadratic_formula(float* a, float* b, float* c, short* root_count) {
    float delta = *b * *b - 4 * *a * *c;
    
    if(delta > 0) {
        *root_count = 2;
        float sqrt_delta = std::sqrt(delta);
        return new float[2] {(-*b - sqrt_delta) / (2 * *a), (-*b + sqrt_delta) / (2 * *a)};
    }
    if(delta < 0) { 
        *root_count = 0;
        return new float[0];
    }
    *root_count = 1;
    return new float[1] {-*b / (2 * *a)};
}

int main(void) {
    float a, b, c;
    std::cout << "Podaj a: ";
    std::cin >> a;
    std::cout << "Podaj b: ";
    std::cin >> b;
    std::cout << "Podaj c: ";
    std::cin >> c;

    short root_count;
    float* roots = quadratic_formula(&a, &b, &c, &root_count);
    
    switch (root_count) {
        case 0:
            std::cout << "Równanie nie ma rozwiązań" << std::endl;
            break;
        case 1:
            std::cout << "Rozwiązaniem równania jest x0: " << roots[0] << std::endl;
            break;
        case 2:
            std::cout << "Rownanie ma dwa rozwiązania. x1: " << roots[0] << ", x2: " << roots[1] << std::endl;
    }

    return 0;
}
