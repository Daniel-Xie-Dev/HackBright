import java.util.Arrays;

public class ArrayQueue {
    
    public static void main(String[] args) {
        MyQueue myQueue = new MyQueue();
        myQueue.enqueue(1);
        myQueue.enqueue(2);
        myQueue.enqueue("myQueue");
        myQueue.enqueue(3);
        myQueue.enqueue(4);
        myQueue.enqueue(10);
        myQueue.enqueue(121);

        System.out.println(myQueue.deque());
        System.out.println(myQueue.deque());
        System.out.println(myQueue.deque());
        System.out.println(myQueue.deque());
        System.out.println(myQueue.peek());
        System.out.println(myQueue.deque());
        System.out.println(myQueue.deque());
        System.out.println(myQueue.deque());
        // System.out.println(myQueue.pop());

    }


}

class MyQueue{
    public Object[] arrayQueue;
    public int back = 0;
    public int front = 0;
    public int size = 0;

    public MyQueue(){
        arrayQueue = new Object[1];
    }

    public MyQueue(int QueueSize){
        arrayQueue = new Object[QueueSize];
    }

    public void enqueue(Object item){
        if(arrayQueue.length == back || size == arrayQueue.length){
            arrayQueue = Arrays.copyOf(arrayQueue, arrayQueue.length * 2);
            for(int i = 0; i < back - front; i++){
                arrayQueue[i] = arrayQueue[front + i];
            }
            int newBack = back - front;
            back = newBack;
            front = 0;
        }


        arrayQueue[back % arrayQueue.length] = item;
        size++;
        back++;
    }

    public Object deque(){
        if(size == 0) throw new IllegalStateException("No element in queue");
        size--;
        Object value = arrayQueue[front];
        front++;
        front %= arrayQueue.length;

        return value;
        

    }

    public Object peek(){
        if(size == 0) throw new IllegalStateException("No element in queue");
        return arrayQueue[front];
    }

    
}