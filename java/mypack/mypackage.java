package mypack;

import java.util.*;

public class mypackage {
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);

        System.out.println("Enter a number of elements: ");
        int num = sc.nextInt();

        int[] arr = new int[num];
        System.out.println("Enter an element: ");

        for (int i = 0; i < num; i++) {
            arr[i] = sc.nextInt();
        }

        for (int i = 0; i < arr.length - 1; i++) {
            for (int j = 1; j < arr.length - i; j++) {

                if (arr[j - 1] > arr[j]) {
                    int temp;
                    temp = arr[j - 1];
                    arr[j - 1] = arr[j];
                    arr[j] = temp;
                }
            }
        }

        System.out.println("Sorted Array");
        for (int i = 0; i < arr.length - 1; i++) {
            System.out.println(arr[i] + ' ');
        }
    }
}