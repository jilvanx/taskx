import { FastifyInstance } from "fastify";
import { z } from "zod";
import dayjs from "dayjs";

import { prisma } from "./lib/prisma";

export async function appRoutes(app: FastifyInstance) {
  app.post("/tasks", async (req) => {
    const createTask = z.object({
      title: z.string(),
    });

    const { title } = createTask.parse(req.body);

    const today = dayjs().startOf("day").toDate();

    await prisma.task.create({
      data: {
        title,
        completed: false,
        created_at: today,
      },
    });
  });

  app.get("/tasks", async () => {
    return await prisma.task.findMany();
  });

  app.patch("/tasks/:id", async (req) => {
    const updateTask = z.object({
      title: z.string(),
      completed: z.boolean(),
    });

    const idParams = z.object({
      id: z.string().uuid(),
    });

    const { id } = idParams.parse(req.params);
    const { title, completed } = updateTask.parse(req.body);

    await prisma.task.update({
      data: {
        title,
        completed,
      },
      where: {
        id,
      },
    });
  });

  app.delete("/tasks/:id", async (req) => {
    const idParams = z.object({
      id: z.string().uuid(),
    });

    const { id } = idParams.parse(req.params);

    await prisma.task.delete({
      where: {
        id,
      },
    });
  });
}
