class Punkt2
{
    float x;
    float y;

    public:
        Punkt2();
        Punkt2(float _x, float _y);
        Punkt2(const Punkt2 &p);

        void SetX(float _x);
        void SetY(float _y);
        void SetPoint(float _x, float _y);

        float GetX();
        float GetY();
        float* GetPoint();
};
