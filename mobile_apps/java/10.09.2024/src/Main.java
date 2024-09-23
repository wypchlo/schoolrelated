import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;
import java.util.List;
import java.util.ArrayList;

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
        int reszta = b; 
        while(a % b != 0) {
            reszta = a % b;
            a = b;
            b = reszta; 
        }
        return reszta;
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
            List<Integer> liczbyArr = new ArrayList<>();
            List<Integer> najdluzszyCiag = new ArrayList<>();
            Integer endWspolnyDzielnik = null;
            
            while(reader3.hasNextInt()) liczbyArr.add(reader3.nextInt());
            for(int i = 0; i < liczbyArr.size(); i++) {
                List<Integer> ciag = new ArrayList<>();
                Integer wspolnyDzielnik = null;

                ciag.add(liczbyArr.get(i));
                for(int j = i + 1; j < liczbyArr.size(); j++){
                    int number = liczbyArr.get(j);
                    ciag.add(number);
                    int prevNum = liczbyArr.get(j - 1);
                    if(wspolnyDzielnik == null) {
                        wspolnyDzielnik = NWD(prevNum, number);
                        continue;
                    }
                    if(NWD(wspolnyDzielnik, number) == 1) {
                        ciag.remove(ciag.size() - 1);
                        int ciagSize = ciag.size();
                        if (najdluzszyCiag.size() < ciagSize) { 
                            najdluzszyCiag = ciag;
                            endWspolnyDzielnik = wspolnyDzielnik;
                        }
                        break;
                    }
                    wspolnyDzielnik = NWD(wspolnyDzielnik, number);
                }
            }
            System.out.print("pierwsza liczba ciągu " + najdluzszyCiag.get(0));
            System.out.print(", długość " + najdluzszyCiag.size());
            System.out.println(", największy wspólny dzielnik " + endWspolnyDzielnik);
            reader3.close();
        }
        catch (FileNotFoundException e) {
            System.out.println("File not found");
            e.printStackTrace();
        }

    }
}
