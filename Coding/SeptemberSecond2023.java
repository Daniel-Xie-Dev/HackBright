public class SeptemberSecond2023{
    public static void main(String[] args) {
        
    }

    public static void switchFunction(int input){

        switch (input) {
            case 1:
                System.out.println("Hello");
                break;
            case 2:
            case 3:
                System.out.println("Goodbye");
                break;

            case 4:
            case 5:
                System.out.println("Goodbye, my friend");
                break;
            default:
                break;
        }
    }

    public static void printHundred(){
        int x = 1;
        while(x <= 100){
          System.out.println(x);
          x++;
        }

        x = 1;

        do {
            System.out.println(x);
            x++;
        } while (x <= 100);

        for(x = 1;  x<= 100; x++){
            System.out.println(x);
        }


    }

    
}