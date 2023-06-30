import java.util.Scanner;

public class Mars {

    public static void main(String[] args) throws InterruptedException, Exception {
        String colonyName = "Zotan";
        int shipPopulation = 300;
        double meals = 4000.00;
        boolean landing = true;

        double foodConsumptionRate = 0.75;
        int days = 2;
        double foodEaten = shipPopulation * foodConsumptionRate * days;

        System.out.println(meals - foodEaten);

        meals = meals + (meals * 0.5);
        shipPopulation += 5;

        String landingLocation = "The Hill";

        if (landingLocation.equalsIgnoreCase("The Plain")) {
            System.out.println("Bbzzz Landing on the Plain");
        } else {
            System.out.println("ERROR!!! Flight plan already set. Landing on the Plain");
        }

        landing = landingCheck(2);

        System.out.println(landing);

        Scanner myScanner = new Scanner(System.in);

        // Guessing Game

        GuessingGame gameObject = new GuessingGame(myScanner);
        gameObject.startGame();

        // Mars Expedition

        MarsExpedition marsExpedition = new MarsExpedition(myScanner);

        // Findings List

        FindingsList findingsList = new FindingsList(myScanner);

        myScanner.close();

    }

    public static boolean landingCheck(int minutesLeft) throws InterruptedException {

        for (int minute = 0; minute < minutesLeft; minute++) {
            if (minute % 2 == 0 && minute % 3 == 3) {
                System.out.println("Keep Center");
            } else if (minute % 2 == 0) {
                System.out.println("Right");
            } else if (minute % 3 == 0) {
                System.out.println("Left");
            } else {
                System.out.println("Calculating");
            }

            Thread.sleep(250);
        }

        System.out.println("Landed");

        return false;

    }
}
