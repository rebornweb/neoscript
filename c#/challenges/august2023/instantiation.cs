class Animal
{
    public string Name { get; set; }

    public Animal(string name)
    {
        Name = name;
    }

    public void MakeSound()
    {
        Console.WriteLine("Some generic animal sound");
    }
}

class Dog : Animal
{
    public string Breed { get; set; }

    public Dog(string name, string breed) : base(name)
    {
        Breed = breed;
    }

    public void Bark()
    {
        Console.WriteLine("Woof! Woof!");
    }
}


class Program
{
    static void Main(string[] args)
    {
        Dog myDog = new Dog("Buddy", "Labrador");

        Console.WriteLine($"Name: {myDog.Name}");
        Console.WriteLine($"Breed: {myDog.Breed}");

        myDog.MakeSound(); // Inherited from Animal class
        myDog.Bark();      // Specific to Dog class
    }
}
