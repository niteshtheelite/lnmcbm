// 1. Parent Class (Superclass) - Vehicle
class Vehicle {
    String make;
    String model;
    int year;

    // Constructor for Vehicle
    public Vehicle(String make, String model, int year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    // Method common to all vehicles
    public void displayInfo() {
        System.out.println("Make: " + make);
        System.out.println("Model: " + model);
        System.out.println("Year: " + year);
    }

    public void start() {
        System.out.println("The " + make + " " + model + " is starting...");
    }
}

// 2. Child Class (Subclass) - Car
// 'extends' keyword is used to inherit from Vehicle
class Car extends Vehicle {
    int numberOfDoors;
    String fuelType;

    // Constructor for Car
    public Car(String make, String model, int year, int numberOfDoors, String fuelType) {
        // 'super' keyword calls the constructor of the parent class (Vehicle)
        super(make, model, year);
        this.numberOfDoors = numberOfDoors;
        this.fuelType = fuelType;
    }

    // Car's own unique method
    public void honk() {
        System.out.println("The car honks: Beep beep!");
    }

    // You can also 'override' a parent method to change its behavior
    // For now, let's just add to displayInfo.
    @Override // Good practice to use @Override annotation
    public void displayInfo() {
        // Call the parent's displayInfo first to reuse its logic
        super.displayInfo();
        System.out.println("Number of Doors: " + numberOfDoors);
        System.out.println("Fuel Type: " + fuelType);
    }
}

// 3. Child Class (Subclass) - Motorcycle
// 'extends' keyword is used to inherit from Vehicle
class Motorcycle extends Vehicle {
    boolean hasSidecar;
    String type; // e.g., Cruiser, Sport, Dirt Bike

    // Constructor for Motorcycle
    public Motorcycle(String make, String model, int year, boolean hasSidecar, String type) {
        super(make, model, year);
        this.hasSidecar = hasSidecar;
        this.type = type;
    }

    // Motorcycle's own unique method
    public void wheelie() {
        System.out.println("The motorcycle pops a wheelie!");
    }

    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Has Sidecar: " + (hasSidecar ? "Yes" : "No"));
        System.out.println("Type: " + type);
    }
}

// Main class to test the inheritance
public class inherit {
    public static void main(String[] args) {
        System.out.println("--- Car Details ---");
        // Create a Car object
        Car myCar = new Car("Toyota", "Camry", 2022, 4, "Petrol");
        myCar.displayInfo(); // This calls the overridden displayInfo in Car
        myCar.start(); // This calls the inherited start method from Vehicle
        myCar.honk(); // This calls Car's unique method
        System.out.println("-------------------\n");

        System.out.println("--- Motorcycle Details ---");
        // Create a Motorcycle object
        Motorcycle myMotorcycle = new Motorcycle("Harley-Davidson", "Iron 883", 2023, false, "Cruiser");
        myMotorcycle.displayInfo(); // This calls the overridden displayInfo in Motorcycle
        myMotorcycle.start(); // This calls the inherited start method from Vehicle
        myMotorcycle.wheelie(); // This calls Motorcycle's unique method
        System.out.println("--------------------------\n");

        System.out.println("--- Generic Vehicle Details (for comparison) ---");
        // Create a generic Vehicle object
        Vehicle generalVehicle = new Vehicle("Boeing", "747", 2005);
        generalVehicle.displayInfo(); // This calls Vehicle's displayInfo
        generalVehicle.start();
        // generalVehicle.honk(); // This would cause a compile-time error
        // because a generic Vehicle doesn't have a honk() method
        System.out.println("--------------------------------------------");
    }
}