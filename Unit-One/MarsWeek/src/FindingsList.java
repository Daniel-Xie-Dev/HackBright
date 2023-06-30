import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Scanner;

public class FindingsList {

    public FindingsList(Scanner myScanner) throws InterruptedException {

        Thread.sleep(500);
        System.out.println("Welcome back from expedition.");

        List<String> rockList = new ArrayList<>();
        rockList.add("rock");
        rockList.add("weird rock");
        rockList.add("smooth rock");
        rockList.add("not rock");

        System.out.println("Downloading rock information.");
        System.out.println("Finished downloading rock information. Rock information: ");

        for (String string : rockList) {
            System.out.println(string);
        }

        System.out.println("Detected item that is not a rock, deleting item...");
        rockList.remove("not rock");
        for (String string : rockList) {
            System.out.println(string);
        }

        System.out.println("Perfect");

        System.out.println("Loading fossil data...");
        Thread.sleep(1000);

        String[] fossilStrings = new String[] { "Bird Fossil", "Fish Fossil", "Tooth Fossil" };

        HashMap<String, String> hashMap = new HashMap<>();
        hashMap.put("Bird Fossil", "The fossil has wings implying it was capable of flight.");
        hashMap.put("Fish Fossil", "The fossil is vaguely fish shaped implies there was once water.");
        hashMap.put("Tooth Fossil", "The tooth from an unknown fossil.");

        System.out.println("Fossil data downloaded.");

        System.out.println("Which of the fossils would you like to learn more about (number input)?");

        for (int i = 0; i < fossilStrings.length; i++) {
            System.out.println(String.format("%d - %s", i + 1, fossilStrings[i]));
        }

        System.out.print("Your selection: ");

        int userFossilChoice = myScanner.nextInt();
        myScanner.nextLine();

        System.out.println(
                fossilStrings[userFossilChoice - 1] + " : " + hashMap.get(fossilStrings[userFossilChoice - 1]));

        Thread.sleep(700);

        HashSet<String> hashSet = new HashSet<>();
        hashSet.add("Oxygen Tank");
        hashSet.add("Water");
        hashSet.add("Radiation Shielding");

        System.out.println("Supplies Before Expedition: ");
        for (String string : hashSet) {
            System.out.println(string);
        }

        hashSet.remove("Water");

        System.out.println("Supplies After Expedition: ");
        for (String string : hashSet) {
            System.out.println(string);
        }
    }
}
