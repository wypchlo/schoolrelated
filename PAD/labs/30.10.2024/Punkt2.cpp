#include "Punkt2.h"
#include<iostream>

Punkt2::Punkt2()
{
    std::cout<<"Uruchomil sie konstruktor domyslny"<<std::endl;
}

Punkt2::Punkt2(float _x, float _y)
{
    x = _x;
    y = _y;

    std::cout<<"Uruchomil sie konstruktor glowny"<<std::endl;
}

Punkt2::Punkt2(const Punkt2 &p)
{
    x = p.x;
    y = p.y;

    std::cout<<"Uruchomil sie konstruktor kopiujacy"<<std::endl;
}


void Punkt2::SetX(float _x) { x = _x; }

void Punkt2::SetY(float _y) { y = _y; }

void Punkt2::SetPoint(float _x, float _y)
{
    x = _x;
    y = _y;
}


float Punkt2::GetX() { return x; }

float Punkt2::GetY() { return y; }

float* Punkt2::GetPoint() { return new float[2]{x, y}; }
