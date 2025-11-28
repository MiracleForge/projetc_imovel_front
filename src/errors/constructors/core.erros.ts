import { CredentialsSignin } from "next-auth";

export class DomainError {
  error: string;
  message: string;

  constructor(error: string, message: string) {
    this.error = error;
    this.message = message;
  }
}

export class NextAuthCustomError extends CredentialsSignin {
  code = "custom_error";
  message: string;

  constructor(message: string) {
    super();
    this.message = message;
  }
}
