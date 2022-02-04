import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

const hash = "698dc19d489c4e4db73e30a713eab07b";

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: { username },
    });

    if (!deliveryman) {
      throw new Error("Invalid username or password.");
    }

    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new Error("Invalid username or password.");
    }

    const token = sign({ username }, hash, {
      subject: deliveryman.id,
      expiresIn: "1d",
    });

    return token;
  }
}
