#include<iostream>
#include<ctime>
#include<vector>
#include<cstdlib>
#include<cmath>

struct vector2d {
    int x;
    int y;
    vector2d() {};
    vector2d(int x, int y) : x(x), y(y) {};

    float distance_from(vector2d destination) {
        int a = x - destination.x;
        int b = y - destination.y;

        return std::sqrt(a*a + b*b);
    }
};

bool** unavailable;
short** terrain;
vector2d destination_vector, origin_vector, current_vector;
short width, height;

void print_array_with_vectors(){
    for(short y = 0; y < height; y++) {
        for(short x = 0; x < width; x++) {
            if(x == current_vector.x && y == current_vector.y){
                std::cout << "|C";
                continue;
            }
            else if(x == destination_vector.x && y == destination_vector.y){
                std::cout << "|O";
                continue;
            }
            if(unavailable[y][x]) std::cout<<'|'<<unavailable[y][x];
            else std::cout<<"| ";
        }
        std::cout<<'\n';
    }
}

int main(void) {  
    std::srand(time(0));

    height = 30;
    width = 30;

    terrain = new short*[height];
    for(short i = 0; i < height; i++) terrain[i] = new short[width];

    unavailable = new bool*[height];
    for(short i = 0; i < height; i++) unavailable[i] = new bool[width];
    
    destination_vector = {rand() % width, rand() % height};
    origin_vector = {rand() % width, rand() % height};
    current_vector = {origin_vector.x, origin_vector.y};
    
    //print_bool_array(unavailable);

    while(!(current_vector.x == destination_vector.x && current_vector.y == destination_vector.y)) {
        std::vector<vector2d> moves = {
            {-1, 1}, {0, 1}, {1, 1},
            {-1, 0},         {1, 0},
            {-1, -1},{0, -1},{1, -1}
        };

        while(true) {
            short move_index = rand() % moves.size();
            vector2d move = moves[move_index];
            //Sprawdza czy nie wychodzi poza border 
            if(current_vector.x + move.x < 0 || current_vector.x + move.x >= width) move.x *= -1;
            if(current_vector.y + move.y < 0 || current_vector.y + move.y >= height) move.y *= -1;
            //Sprawdza czy już wcześniej nie był w tym punkcie
            if(unavailable[current_vector.y + move.y][current_vector.x + move.x]) {
                if(moves.size() > 1){
                    moves.erase(moves.begin() + move_index);
                    continue;
                }
                else {
                    for(short y = 0; y < height; y++) {
                        for(short x = 0; x < width; x++) {
                            unavailable[y][x] = 0;
                        }
                    }
                }
            }
                
            vector2d proposed_vector = {current_vector.x + move.x, current_vector.y + move.y};
            
            if(proposed_vector.distance_from(destination_vector) > current_vector.distance_from(destination_vector)) {
                if(proposed_vector.distance_from(origin_vector) < current_vector.distance_from(origin_vector)) {
                    moves.erase(moves.begin() + move_index);
                    continue;
                }
            }

            current_vector.x += move.x;
            current_vector.y += move.y;

            unavailable[current_vector.y][current_vector.x] = 1;
            break;
        }

        print_array_with_vectors();
        std::cin.ignore();
        system("clear");
    }

    for(short i = 0; i < height; i++) delete[] terrain[i];
    delete[] terrain;

    for(short i = 0; i < height; i++) delete[] unavailable[i];
    delete[] unavailable;
}
