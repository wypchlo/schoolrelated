package com.zad4;

import java.util.Scanner;
import java.io.File;

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
            File liczby = new File("src/com/zad4/liczby.txt");
            
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
            while(scanner3.hasNextInt()) {
                 
            }
            
            scanner3.close();

        } 
        catch (Exception e) {
            System.out.println(e);
        }
    }
}
