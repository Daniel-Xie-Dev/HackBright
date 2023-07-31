import java.util.ArrayList;
import java.util.LinkedList;

public class Sorting {


    public static ArrayList<Integer> insertionSort(int[] array){
        if(array.length == 0){
            return new ArrayList<>();
        }
        LinkedList<Integer> linkedList = new LinkedList<>();
        linkedList.add(array[0]);
        



        for(int i = 1; i < array.length; i++){
            for(int j = 0; j < linkedList.size(); j++){
                if(linkedList.get(j) > array[i]){
                    linkedList.add(j, array[i]);
                    break;
                }
            }
        }

        return new ArrayList<>(linkedList);

    }
    
}
