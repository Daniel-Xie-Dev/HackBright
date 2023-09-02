import java.util.Arrays;

public class FlipMatrix {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3, 4, 5},
            {6, 7, 8, 9, 10},
            {11, 12, 13, 14, 15},
            {16, 17, 18, 19, 20},
            {21, 22, 23, 24, 25}
        };
        InvertMatrix(matrix);
        
    }


    public static void InvertMatrix(int[][] input){

        System.out.println(Arrays.deepToString(input));
        // Flip horizontally
        System.out.println("-------------------------");
        for(int i = 0; i < input.length / 2; i++){
            for(int j = 0; j < input[i].length; j++){
                int temp = input[i][j];
                input[i][j] = input[input.length - 1 - i][j];
                input[input.length - 1 - i][j] = temp;
            }
        }

        System.out.println(Arrays.deepToString(input));
        System.out.println("-------------------------");

        // Flip vertically
        for(int i = 0; i < input.length; i++){
            for(int j = 0; j < input[i].length / 2; j++){
                int temp = input[i][j];
                input[i][j] = input[i][input[0].length - 1 - j];
                input[i][input[0].length - 1 - j] = temp;
            }
        }

        System.out.println(Arrays.deepToString(input));
        System.out.println("-------------------------");

        // Flip diagonally

        for(int i = 0; i < input.length; i++){
            for(int j = i; j < input[i].length; j++){
                int temp = input[i][j];
                input[i][j] = input[j][i];
                input[j][i] = temp;
            }
        }

        System.out.println(Arrays.deepToString(input));
        System.out.println("-------------------------");


    
    }
}
