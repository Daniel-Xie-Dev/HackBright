import java.util.Arrays;
import java.util.EmptyStackException;
import java.util.LinkedList;
import java.util.Stack;


/* Reflections

A. The runtime complexity for my solutions in step 1 and step 2 is O(n).
B. The run time for each solution is O(n).
C. I believe my solutions for step 2 could've utilized a Hashmap for a more readable code.
D. I believe I would use a self-built linked list to implement a queue because it will have pointers to the front and the back.
  
 */

public class DataStructures {
    public static void main(String[] args) {
        // System.out.println(balancedBrackets("(()(<>))(()[[{<>}]]<<<>>>[])"));



        LinkedList<Integer> one = new LinkedList<>();
        one.addAll(Arrays.asList(4, 2, 1));

        LinkedList<Integer> two = new LinkedList<>();
        two.addAll(Arrays.asList(6, 5, 4));

        System.out.println(addTwoIntegers(one, two));
    }


    public static boolean balancedParenthesis(String input){
        int leftParenCounter = 0;

        for(int i = 0 ; i < input.length(); i++){
            if(input.charAt(i) == ')'){
                if(leftParenCounter <= 0) return false;
                else leftParenCounter--;
            }else{
                leftParenCounter++;
            }
        }

        return leftParenCounter == 0;
    }

    public static boolean balancedBrackets(String input){
        Stack<Character> stack = new Stack<>();

        for(int i = 0; i < input.length(); i++){
            char currentChar = input.charAt(i);
            if(currentChar == '{' || currentChar == '[' || currentChar == '(' || currentChar == '<'){
                stack.add(currentChar);
            }else{
                if(!(Math.abs(currentChar - stack.pop()) <= 2)) return false;
            }
        }

        return stack.size() == 0;
    }

    public static LinkedList<Integer> addTwoIntegers(LinkedList<Integer> one, LinkedList<Integer> two){
        LinkedList<Integer> result = new LinkedList<>();
        boolean carryOver = false;

        while(one.size() != 0 || two.size() != 0){
            int addedValue = (one.peekFirst() == null ? 0 : one.pollFirst()) + (two.peekFirst() == null ? 0 : two.pollFirst()) + (carryOver ? 1 : 0);
            carryOver = false;

            if(addedValue > 9){
                addedValue -= 10;
                carryOver = true;
            }
            result.add(addedValue);
        }

        return result;
    }

    /*
     * N = Length of @String[] list
     * M = Length of longest string in @String list
     * Runtime = O(N x M)
     */
    public static int recursive_search(String item, String[] list){
        return recursive_search_helper(item, list, 0);
    }

    public static int recursive_search_helper(String item, String[] list, int index){
        if(index >= list.length) return -1;

        if(list[index].equals(item)) return index;

        return recursive_search_helper(item, list, index + 1);
    }
}

class MyStack{
    private String[] array;
    private int size = 0;

    public MyStack(int initalCapacity) {
        array = new String[initalCapacity];
    }

    public void add(String s){
        if(size == array.length){
            String[] temp = new String[2 * array.length];
            for(int i = 0; i < array.length; i++){
                temp[i] = array[i];
            }
            array = temp;
        }
        array[size] = s;
        size++;
    }

    public String pop(){
        if(size == 0){
            throw new EmptyStackException();
        }

        String result = this.array[--size];
        this.array[size] = null;
        return result;
    }

    public String peek(){
        if(size == 0){
            throw new EmptyStackException();
        }

        return this.array[size - 1];
    }

    public int size(){
        return size;
    }

    public boolean isEmpty(){
        return size == 0;
    }

}