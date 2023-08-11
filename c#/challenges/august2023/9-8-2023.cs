using System;

class Program
{
    static void Main()
    {
        int[] numbers = new int[5];
        numbers[0] = 10;
        numbers[1] = 20;
        numbers[2] = 30;
        numbers[3] = 40;
        numbers[4] = 50;

        Console.WriteLine(numbers[2]);

        int[] primes = { 2, 3, 5, 7, 11 };
        int length = primes.Length;

        for (int i = 0; i < primes.Length; i++)
        {
            Console.WriteLine(primes[i]);
        }

        int[,] matrix = new int[3, 3] { { 1, 2, 3 }, { 4, 5, 6 }, { 7, 8, 9 } };
        Console.WriteLine(matrix);
        int[][] jaggedArray = new int[3][];
        jaggedArray[0] = new int[] { 1, 2, 3 };
        jaggedArray[1] = new int[] { 4, 5 };
        jaggedArray[2] = new int[] { 6, 7, 8, 9 };

// Loop through rows
        for (int i = 0; i < matrix.GetLength(0); i++)
        {
            // Loop through columns
            for (int j = 0; j < matrix.GetLength(1); j++)
            {
                Console.Write(matrix[i, j] + " ");
            }
            Console.WriteLine(); // Move to the next line after printing a row
        }

    }
}
