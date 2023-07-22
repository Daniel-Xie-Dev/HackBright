import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Scanner;

public class Order {

    public Order(ArrayList<Cupcake> cupcakeMenu, ArrayList<Drink> drinkMenu) {
        System.out.print("Hello customer. Would you like to place an order? (Y or N) ");

        Scanner input = new Scanner(System.in);

        String placeOrder = input.nextLine();

        ArrayList<Object> order = new ArrayList<>();

        if (placeOrder.equalsIgnoreCase("y")) {

            order.add(LocalDate.now());
            order.add(LocalTime.now());

            System.out.println("Here is the menu.");
            System.out.println("CUPCAKES:");
            int itemNumber = 0;
            for (int i = 0; i < cupcakeMenu.size(); i++) {
                itemNumber++;
                System.out.println(itemNumber);
                cupcakeMenu.get(i).type();
                System.out.println(String.format("Price : %.2f", cupcakeMenu.get(i).getPrice()));
            }

            System.out.print("\n");
            System.out.println("DRINKS:");
            for (int i = 0; i < drinkMenu.size(); i++) {
                itemNumber++;
                System.out.println(itemNumber);
                drinkMenu.get(i).type();
                System.out.println(String.format("Price : %.2f", drinkMenu.get(i).getPrice()));
            }
            System.out.print("\n");

            boolean ordering = true;
            while (ordering) {
                System.out.print(
                        "What would you like to order? Please use the number associated with each item to order.");
                int orderChoice = input.nextInt();
                input.nextLine();

                if (orderChoice >= 1 && orderChoice <= 3) {
                    order.add(cupcakeMenu.get(orderChoice - 1));
                    System.out.println("Item added to order.");
                } else if (orderChoice >= 4 && orderChoice <= 6) {
                    order.add(drinkMenu.get(orderChoice - 4));
                    System.out.println("Item added to order.");
                } else
                    System.out.println("Sorry, we don't seem to have that on the menu.");

                System.out.print("Would you like to continue ordering? (Y/N) ");
                placeOrder = input.nextLine();

                if (!placeOrder.equalsIgnoreCase("y"))
                    ordering = false;
            }

            System.out.println(order.get(0));
            System.out.println(order.get(1));
            double subtotal = 0.0d;

            for (int i = 2; i < order.size(); i++) {
                if (order.get(i).equals(cupcakeMenu.get(0))) {
                    cupcakeMenu.get(0).type();
                    System.out.println(String.format("Price : %.2f", cupcakeMenu.get(0).getPrice()));
                    subtotal += cupcakeMenu.get(0).getPrice();
                } else if (order.get(i).equals(cupcakeMenu.get(1))) {
                    cupcakeMenu.get(1).type();
                    System.out.println(String.format("Price : %.2f", cupcakeMenu.get(1).getPrice()));
                    subtotal += cupcakeMenu.get(1).getPrice();
                } else if (order.get(i).equals(cupcakeMenu.get(2))) {
                    cupcakeMenu.get(2).type();
                    System.out.println(String.format("Price : %.2f", cupcakeMenu.get(2).getPrice()));
                    subtotal += cupcakeMenu.get(2).getPrice();
                } else if (order.get(i).equals(drinkMenu.get(0))) {
                    drinkMenu.get(0).type();
                    System.out.println(String.format("Price : %.2f", drinkMenu.get(0).getPrice()));
                    subtotal += drinkMenu.get(0).getPrice();
                } else if (order.get(i).equals(drinkMenu.get(1))) {
                    drinkMenu.get(1).type();
                    System.out.println(String.format("Price : %.2f", drinkMenu.get(1).getPrice()));
                    subtotal += drinkMenu.get(1).getPrice();
                } else {
                    drinkMenu.get(2).type();
                    System.out.println(String.format("Price : %.2f", drinkMenu.get(2).getPrice()));
                    subtotal += drinkMenu.get(2).getPrice();
                }
            }

            System.out.println(String.format("Your subtotal : %.2f", subtotal));

            new CreateFile();
            new WriteToFile(order);

        } else {
            System.out.println("Have a nice day then.");
        }
    }
}

class CreateFile {

    public CreateFile() {

        try {
            File salesData = new File("salesData.txt");
            if (salesData.createNewFile()) {
                System.out.println("File created : salesData.txt");
            } else {
                System.out.println("File already exists.");
            }

        } catch (IOException ioException) {
            System.out.println("An error occurred.");
        } catch (Exception e) {
            System.out.println("All exceptions are caught here.");
        }

    }
}

class WriteToFile {

    public WriteToFile(ArrayList<Object> order) {
        try {
            FileWriter fw = new FileWriter("salesData.txt", true);
            PrintWriter salesWriter = new PrintWriter(fw);

            for (Object object : order) {
                salesWriter.println(object);
            }

            salesWriter.close();
            System.out.println("Successfully wrote to the file");

        } catch (IOException e) {
            System.out.println("An error occurred.");
        }
    }
}
