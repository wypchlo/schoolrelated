#include<iostream>
#include "Punkt2.h"

int main(void) {
    Punkt2 punkt1 = Punkt2(1, 2);    
    Punkt2 punkt2 = Punkt2();
    Punkt2 punkt3 = Punkt2(punkt1);

    punkt2.SetX(5);
    punkt2.SetY(10);

    std::cout<<"Punkt1 x: "<<punkt1.GetX()<<std::endl<<"y: "<<punkt1.GetY()<<std::endl;
    std::cout<<"Punkt2 x: "<<punkt2.GetX()<<std::endl<<"y: "<<punkt2.GetY()<<std::endl;
    std::cout<<"Punkt3 x: "<<punkt3.GetX()<<std::endl<<"y: "<<punkt3.GetY()<<std::endl;
}

redefinicja operatora przypisania 
redefinicja operatora strumieniowania
długość vecotra policzyć w klasie punkt
to też w klasie punkt wszystko pod tym
dodać dodawanie vektorów i odejmowanie vektorów
i razy (*) czyli iloczyn skalarny


zrobic klase polygon
funkcja na pole wielokątka w przypadkach
trójkąta bez boków, pola tylko na punkty
redefinicja w polygonie []
iloczyn skalarny 
