import java.util.Scanner;

public class MarsExpedition {

    Scanner scannerObject;
    String[] bootupMessages = new String[] { "Starting up...", "5%...", "15%...", "Loading core modules...", "30%...",
            "Getting coffee and donut...",
            "50%...", "Planning expedition members' demise... ", "75%... ", "Finally, I can get a break...", "85%... ",
            "100%...",
            "System ready." };
    String[] vehicleList = new String[] { "Project Gemini", "Project Apollo", "Project Mercury", "Skylab",
            "Lunar Gateway" };

    String name;
    String snack;
    int teamMembers;
    int vehicleNumber;

    public MarsExpedition(Scanner myScanner) throws InterruptedException {
        this.scannerObject = myScanner;
        for (String messages : bootupMessages) {
            System.out.println(messages);
            Thread.sleep(300);
        }

        System.out.print("What is your name, user?");
        this.name = scannerObject.nextLine();
        System.out.println(String.format(
                "Hi, %s - Welcome to the Expedition prep program. Are you ready to head out into the new world? Type Y or N",
                this.name));

        String answer = scannerObject.nextLine();
        if (answer.equalsIgnoreCase("Y")) {
            System.out.println("I knew you would say that. You are team leader for a reason.");
        } else {
            System.out.println("Too bad you are team leader. You have to go.");
        }

        System.out.print("How many people do you want on your expedition team? (Input an int number)");
        this.teamMembers = scannerObject.nextInt();
        scannerObject.nextLine();

        if (this.teamMembers > 2) {
            System.out.println("That's way too many people. We can only send 2 more members.");
            this.teamMembers = 2;
        } else if (this.teamMembers < 2) {
            System.out.println("That's way too little. We need you and 2 more members.");
            this.teamMembers = 2;
        } else {
            System.out.println("That's a perfect sized team!");
        }

        System.out.print("You are allowed to bring one snack with you. What do you want to bring?");
        this.snack = scannerObject.nextLine();
        System.out.println("Nice choice, you will be bringing a " + this.snack + " with you.");

        System.out.println("Now, you will choose a vehicle from the following list: ");
        for (int i = 0; i < vehicleList.length; i++) {
            System.out.println(String.format("%d - %s", i + 1, vehicleList[i]));
        }

        this.vehicleNumber = scannerObject.nextInt() - 1;
        scannerObject.nextLine();

        System.out.println(String.format("User: %s\nTeam size: 3\n" +
                "Snack: %s\n" +
                "Vehicle: %s", this.name, this.snack,
                this.vehicleList[this.vehicleNumber]));

        System.out.println("Starting expedition in: ");
        for (int i = 5; i > 0; i--) {
            System.out.println(i);
            Thread.sleep(250);
        }

        System.out.println("Good luck and don't come back...");

    }
}
