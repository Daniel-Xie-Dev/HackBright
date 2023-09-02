import java.util.ArrayList;
import java.util.List;

public class DivideNumberByRandom{


    public static void main(String[] args) {
        List<Integer> results = new ArrayList<>();
        function(6773760, results);
        System.out.println(results);
    }


    public static void function(int number, List<Integer> result){

        int random = (int)(Math.random() * 10 + 1);

        while(number % random == 0){
            result.add(random);
            number /= random;
            random = (int)(Math.random() * 10 + 1);
        }

        result.add(number);

    }
}