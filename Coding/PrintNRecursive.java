public class PrintNRecursive {
    
    public static void main(String[] args) {
       NRecursiveZero(24);
       ZeroRecursiveN(0, 78);
    }

    public static void NRecursiveZero(int n){
        if(n == -1) return;
        System.out.println(n);
        NRecursiveZero(n - 1);
    }

    public static void ZeroRecursiveN(int index, int n){
        if(index == n + 1) return;
        System.out.println(index);
        ZeroRecursiveN(index + 1, n);
    }
}
