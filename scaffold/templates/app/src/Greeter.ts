class Greeter {
  private readonly userName: string;

  constructor(userName: string) {
    this.userName = userName;
  }

  sayHello(): void {
    console.log(`Hello ${this.userName}`);
  }
}

export default Greeter
