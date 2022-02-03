import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateClient {
  username: string;
  password: string;
}

const hash = "698dc19d489c4e4db73e28a713eab07b";

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    const client = await prisma.clients.findFirst({
      where: {
        username,
      },
    });

    if (!client) {
      throw new Error("Invalid username or password.");
    }

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error("Invalid username or password.");
    }

    const token = sign({ username }, hash, {
      subject: client.id,
      expiresIn: "1d",
    });

    return token;
  }
}
