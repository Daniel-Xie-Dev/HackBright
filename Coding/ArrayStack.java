import java.util.Arrays;

public class ArrayStack {
    
    public static void main(String[] args) {
        MyStack myStack = new MyStack();
        myStack.push(1);
        myStack.push(2);
        myStack.push("myStack");
        myStack.push(3);
        myStack.push(4);
        myStack.push(10);
        myStack.push(121);

        System.out.println(myStack.pop());
        System.out.println(myStack.pop());
        System.out.println(myStack.pop());
        System.out.println(myStack.pop());
        System.out.println(myStack.peek());
        System.out.println(myStack.pop());
        System.out.println(myStack.pop());
        System.out.println(myStack.pop());
        // System.out.println(myStack.pop());

    }


}

class MyStack{
    public Object[] arrayStack;
    public int size = 0;

    public MyStack(){
        arrayStack = new Object[1];
    }

    public MyStack(int stackSize){
        arrayStack = new Object[stackSize];
    }

    public void push(Object item){
        if(arrayStack.length == size){
            arrayStack = Arrays.copyOf(arrayStack, arrayStack.length * 2);    
        }
        arrayStack[size] = item;
        size++;
    }

    public Object pop(){
        if(size == 0) throw new IllegalStateException("No item in stack!");
        size--;
        return arrayStack[size];
    }

    public Object peek(){
        if(size == 0) throw new IllegalStateException("No item in stack!");
        return arrayStack[size - 1];
    }

    
}