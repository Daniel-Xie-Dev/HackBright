import java.util.ArrayList;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        ArrayList<Cupcake> cupcakeMenu = new ArrayList<Cupcake>();

        Cupcake cupcake = new Cupcake();
        RedVelvet redVelvet = new RedVelvet();
        Chocolate chocolate = new Chocolate();

        ArrayList<Drink> drinkMenu = new ArrayList<>();
        Drink water = new Drink();
        Soda soda = new Soda();
        Milk milk = new Milk();

        System.out.println(
                "We are in the middle of creating the cupcake menu. We currently have three cupcakes on the menu but we need to decide on pricing.");

        Scanner input = new Scanner(System.in);

        // Getting and setting cupcake price
        System.out.println("We are deciding on the price for our standard cupcake. Here is the description:");
        cupcake.type();
        System.out.print(
                "How much would you like to charge for the cupcake?(Input a numerical number taken to 2 decimal places). ");
        String priceText = input.nextLine();
        double price = Double.parseDouble(priceText);
        cupcake.setPrice(price);

        // Getting and setting Red Velvet cupcake price
        System.out.println("We are deciding on the price for our Red Velvet cupcake. Here is the description:");
        redVelvet.type();
        System.out.print(
                "How much would you like to charge for the Red Velvet cupcake?(Input a numerical number taken to 2 decimal places). ");
        priceText = input.nextLine();
        price = Double.parseDouble(priceText);
        redVelvet.setPrice(price);

        // Getting and setting Chocolate cupcake price
        System.out.println("We are deciding on the price for our Chocolate cupcake. Here is the description:");
        chocolate.type();
        System.out.print(
                "How much would you like to charge for the Chocolate cupcake?(Input a numerical number taken to 2 decimal places). ");
        priceText = input.nextLine();
        price = Double.parseDouble(priceText);
        chocolate.setPrice(price);

        System.out.println(
                "\nWe are in the middle of creating the drink menu. We currently have three drinks on the menu but we need to decide on pricing.");

        // Getting and setting water price
        System.out.println("We are deciding on the price for our standard drink. Here is the description:");
        water.type();
        System.out.print(
                "How much would you like to charge for the water?(Input a numerical number taken to 2 decimal places). ");
        priceText = input.nextLine();
        price = Double.parseDouble(priceText);
        water.setPrice(price);

        // Getting and setting soda price
        System.out.println("We are deciding on the price for our soda. Here is the description:");
        soda.type();
        System.out.print(
                "How much would you like to charge for the soda?(Input a numerical number taken to 2 decimal places). ");
        priceText = input.nextLine();
        price = Double.parseDouble(priceText);
        soda.setPrice(price);

        // Getting and setting milk price
        System.out.println("We are deciding on the price for our milk. Here is the description:");
        milk.type();
        System.out.print(
                "How much would you like to charge for the milk?(Input a numerical number taken to 2 decimal places). ");
        priceText = input.nextLine();

        price = Double.parseDouble(priceText);
        milk.setPrice(price);

        cupcakeMenu.add(cupcake);
        cupcakeMenu.add(redVelvet);
        cupcakeMenu.add(chocolate);

        drinkMenu.add(water);
        drinkMenu.add(soda);
        drinkMenu.add(milk);

        new Order(cupcakeMenu, drinkMenu);

    }
}

class Cupcake {
    public double price;

    public double getPrice() {
        return this.price;
    }

    public void setPrice(double newPrice) {
        this.price = newPrice;
    }

    public void type() {
        System.out.println("A basic, generic cupcake, with vanilla frosting.");
    }
}

class RedVelvet extends Cupcake {

    public void type() {
        System.out.println("A red velvet based cupcake, with cream cheese frosting.");
    }
}

class Chocolate extends Cupcake {

    public void type() {
        System.out.println("A chocolate based cupcake, with chocolate frosting.");
    }
}

class Drink {
    public double price;

    public double getPrice() {
        return this.price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void type() {
        System.out.println("A bottle of water");
    }
}

class Soda extends Drink {
    public void type() {
        System.out.println("A bottle of soda.");
    }
}

class Milk extends Drink {
    public void type() {
        System.out.println("A bottle of milk.");
    }
}