class UserDTO {
  private name: string;
  private email: string;
  private password: string;

  public get Name(): string {
    return this.name;
  }

  public get Email(): string {
    return this.email;
  }

  public get Password(): string {
    return this.password;
  }
}

export default UserDTO;