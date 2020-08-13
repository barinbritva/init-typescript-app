class Greeter {
  private readonly userName: string;
  private readonly projectName: string;

  constructor (userName: string, projectName: string) {
    this.userName = userName
    this.projectName = projectName
  }

  sayHello (): void {
    console.log(`Hi ${this.userName},\nYour project ${this.projectName} is ready to develop.\nHave a nice coding!`)
  }
}

export default Greeter
