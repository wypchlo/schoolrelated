import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Main {
    public static boolean isPower(int value) {
        while (value != 3) {
            if (value % 3 != 0) { return false; }
            value /= 3;
        };
        return true;
    }

    public static int silnia(int value) {
        int silnia = 1;        
        for(int i = 1; i <= value; i++) silnia *= i;

        return silnia;
    }

    public static int NWD(int a, int b) {
        if (a < b) {
            int aCopy = a;
            a = b;
            b = aCopy;
        }

        System.out.println(a + " " + b);
        int reszta = b; 
        while(a % b != 0) {
            reszta = a % b;
            a = b;
            b = reszta; 
        }

        System.out.println(reszta);
        return 0;
    }

    public static void main(String[] args) {
        try {
            File liczby = new File("src/liczby.txt");
            
            System.out.println("Zad 4.1");
            
            Scanner reader = new Scanner(liczby);
            int count = 0;
            while (reader.hasNextInt()) {
                int number = reader.nextInt();
                if (isPower(number)) { count++; }
            }
            System.out.println("Ilość liczb będących potęgami trójki: " + count);
            reader.close();
            
            System.out.println("Zad 4.2");

            Scanner reader2 = new Scanner(liczby);
            while (reader2.hasNextLine()) {
                String numString = reader2.nextLine();
                int suma = 0;
                for(int i = 0; i < numString.length(); i++) {
                    char numChar = numString.charAt(i);
                    int num = numChar - '0';
                    suma += silnia(num);
                }
                if(suma == Integer.parseInt(numString)) System.out.println(numString + " " + suma);
            }
            reader2.close();

            System.out.println("Zad 4.3");
            
            Scanner reader3 = new Scanner(liczby);

            reader3.close();

            NWD(3, 10);
        }
        catch (FileNotFoundException e) {
            System.out.println("File not found");
            e.printStackTrace();
        }

    }
}
