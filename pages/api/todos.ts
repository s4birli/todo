import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/data/db";
import { Task } from "../../lib/types/Task";
import { ObjectId } from "mongodb";

export default async function todosHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = await connectToDatabase();
    const todosCollection = db.collection("AppCollection");

    if (req.method === "GET") {
      const taskList = await todosCollection.find({}).toArray();
      res.status(200).json(taskList);
    } else if (req.method === "POST") {
      const { task } = req.body;
      const newTask = {
        description: task,
        completed: false,
        createdDate: new Date(),
        updatedDate: new Date(),
      };
      const result = await todosCollection.insertOne(newTask);
      const resultTask = { ...newTask, _id: result.insertedId.toString() };
      res.status(200).json(resultTask);
    } else if (req.method === "PUT") {
      const task: Task = req.body;
      const { _id, completed } = task;
      await todosCollection.updateOne(
        { _id: new ObjectId(_id) },
        { $set: { completed, updatedDate: new Date() } }
      );
      res.status(200).json({
        ...task,
        completed,
        updatedDate: new Date(),
      });
    } else if (req.method === "DELETE") {
      const { id } = req.query as { id: string };
      const objectId = new ObjectId(id);
      const deleteResult = await todosCollection.deleteOne({ _id: objectId });
      if (deleteResult.deletedCount === 1) {
        res.status(200).json({ message: "Todo deleted successfully" });
      } else {
        res.status(404).json({ message: "Todo not found" });
      }
    } else {
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
