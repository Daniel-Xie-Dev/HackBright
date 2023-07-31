import java.util.Arrays;
import java.util.HashSet;

public class MissingNumber{
    public static void main(String[] args) {

        System.out.println(findMissingNumberOne(new int[]{2, 1, 4, 3, 6, 5, 7, 9, 8}, 10));
        System.out.println(findMissingNumberTwo(new int[]{2, 1, 4, 3, 6, 7, 10, 9, 8}, 10));
        System.out.println(findMissingNumberThree(new int[]{2, 4, 3, 5, 6, 7, 10, 9, 8, 11}, 11));
        
        
    }

    //1. Reduced Runtime
    public static int findMissingNumberOne(int[] array, int maxNum){
        HashSet<Integer> hashSet = new HashSet<>();

        for(int i = 0; i < array.length; i++){
            hashSet.add(array[i]);
        }

        int pointer = 1;
        while(hashSet.contains(pointer)){
            pointer++;
        }

        return pointer == maxNum + 1? 0 : pointer;
    }

    // 2. Reduce Memory
    public static int findMissingNumberTwo(int[] array, int maxNum){
        Arrays.sort(array);

        for(int i = 1; i <= maxNum; i++){
            if(array[i - 1] != i) return i;
        }

        return 0;
    }

    // 3. Going Further
    public static int findMissingNumberThree(int[] array, int maxNum){
        
        int sum = 0;

        for(int i = 1; i <= maxNum; i++){
            sum += i;
        }

        for(Integer i : array){
            sum -= i;
        }

        return sum;
    }



}



