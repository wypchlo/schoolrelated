import java.util.Scanner;
import java.io.File;
import java.util.List;
import java.util.ArrayList;
import java.io.FileWriter;

public class Main {
    public static short ilosc_czynnikow_pierwszych(int value){
        short count = 0;
        
        int dzielnik = 2;
        while(value > 1) {
            if(value % dzielnik != 0) { 
                dzielnik += 1;
                continue;
            }
            count++;
            //System.out.print(value + " " + dzielnik + ", ");
            value /= dzielnik;
        }
        //System.out.println();
        return count;
    }

    public static void main(String[] args) {
        try {
            File liczby = new File("src/liczby.txt");

            //zad 1

            Scanner scanner1 = new Scanner(liczby);  
            String first = "";
            int count = 0;
            while(scanner1.hasNextLine()) {
                String line = scanner1.nextLine();
                if(line.charAt(0) == line.charAt(line.length() - 1)) { 
                    if(count == 0) first = line;
                    count++; 
                }
            }
            
            System.out.println("Zad 4.1");
            System.out.println(count + " " + first);
            scanner1.close();
            
            //zad 2
            
            System.out.println("Zad 4.2");
            Scanner scanner2 = new Scanner(liczby);
            int largest_count = 0;
            int l_number = 0;
            while(scanner2.hasNextInt()) {
                int number = scanner2.nextInt();
                int czynniki_count = ilosc_czynnikow_pierwszych(number); 
                if (czynniki_count > largest_count) { 
                    largest_count = czynniki_count;
                    l_number =  number;
                }
            }

            System.out.println("Liczba " + l_number + " ma najwięcej czynników (" + largest_count + ")");

            scanner2.close();

            //Zad 3
            
            Scanner scanner3 = new Scanner(liczby);
            List<Integer> numbersArr = new ArrayList<>();
            while(scanner3.hasNextInt()) numbersArr.add(scanner3.nextInt());
            scanner3.close();
            
            List<Integer[]> trojki = new ArrayList<>();
            int piatkiCount = 0;
            int numbersCount = numbersArr.size();

            for(int i = 0; i < numbersCount; i++) {
                int num1 = numbersArr.get(i);

                for(int j = 0; j < numbersCount; j++) {
                    if(j == i) continue;
                    int num2 = numbersArr.get(j);
                    if(num2 % num1 != 0) continue;

                    for(int k = 0; k < numbersCount; k++) {
                        if(k == i || k == j) continue;
                        int num3 = numbersArr.get(k);
                        if(num3 % num2 != 0) continue;
                        trojki.add(new Integer[] {num1, num2, num3});

                        for(int l = 0; l < numbersCount; l++) {
                            if(l == i || l == j || l == k) continue;
                            int num4 = numbersArr.get(l);
                            if(num4 % num3 != 0) continue;

                            for(int m = 0; m < numbersCount; m++) {
                                if(m == i || m == j || m == k || m == l) continue;
                                
                                int num5 = numbersArr.get(m);
                                if(num5 % num4 != 0) continue;
                                
                                piatkiCount++;
                            }
                        }
                    }
                }
            }

            System.out.println("Ilość dobrych trójek wynosi: " + trojki.size());
            System.out.println("Ilość dobrych piątek wynosi: " + piatkiCount);

            //Zapisywanie do pliku 

            FileWriter writer = new FileWriter("src/trojki.txt");
            for(int i = 0; i < trojki.size(); i++) {
                Integer[] trojka = trojki.get(i);
                writer.write(trojka[0] + " " + trojka[1] + " " + trojka[2] + '\n');
            }
            writer.close();
        } 
        catch (Exception e) {
            System.out.println(e);
        }
    }
}
