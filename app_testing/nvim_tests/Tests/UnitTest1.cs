using CalculatorProj;

namespace Tests;

public class UnitTest1
{
    [Theory]
    [InlineData(1, 1)]
    public void Test1(int a, int b)
    {
        Assert.Equal(Calculator.Add(a, b), 3);
    }
}
