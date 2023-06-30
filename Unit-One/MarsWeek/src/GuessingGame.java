import java.util.Random;
import java.util.Scanner;

public class GuessingGame {

    String name;
    Scanner myObj;

    public GuessingGame(Scanner myScanner) {

        System.out.println("Hello! Welcome to the guessing game");
        System.out.println("Before we start, what is your name?");
        System.out.print("(type in your name)");
        this.myObj = myScanner;
        this.name = myObj.nextLine();

        System.out.println("Hi " + this.name + "! Let's start the game!");
    }

    public void startGame() {
        Random randomObject = new Random();

        int number = randomObject.nextInt(100) + 1;
        int numberGuesses = 0;

        System.out.println(this.name + ", I'm thinking of a number between 1 and 100.");
        System.out.println("What is this number?");

        while (true) {
            try {
                System.out.print("Your guess? ");
                String userInput = this.myObj.nextLine();
                int userGuess = Integer.parseInt(userInput);
                numberGuesses++;
                if (userGuess == number) {
                    System.out.println(
                            "Well done, " + this.name + "! You found my number in " + numberGuesses + " tries.");
                    break;
                } else if (userGuess < number) {
                    System.out.println("Your guess is too low, try again.");
                } else {
                    System.out.println("Your guess is too high, try again.");
                }

            } catch (Exception e) {
                System.out.println("That's not an integer, try again");
            }

        }
    }
}