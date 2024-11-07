using Dowolny;
using NSubstitute;

namespace Tests;

public class Testy : ITesty
{
    [Theory]
    [InlineData(3)]
    public int TestDowolnegoTekstu(int i)
    {
        var ob = new Dowolna();
        Assert.Equal(ob.DowolnyTekst(), "DowolnyTekst");
        return 1;
    }

    [Fact]
    public void testDowolnegoTekstu2()
    {
        var ob = Substitute.For<ITesty>();

        ob.TestDowolnegoTekstu(Arg.Any<int>()).Returns(1);

        Assert.Equal(1, ob.TestDowolnegoTekstu(1));
    }
}

public interface ITesty
{
    public int TestDowolnegoTekstu(int i);
}
