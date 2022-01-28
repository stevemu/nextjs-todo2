import { ObjectId } from 'mongodb';
import { getDb } from '../../../mongodb';
import { baseHandler, appendFallbackHandler } from '../../../utils/base';

const handler = baseHandler();

handler.post(async (req, res) => {
  const { todoId } = req.query as { todoId: string };
  const db = await getDb();
  await db
    .collection('todo')
    .updateOne({ _id: new ObjectId(todoId) }, { $set: { completed: true } });
  return res.status(200).json({});
});

handler.delete(async (req, res) => {
  const { todoId } = req.query as { todoId: string };
  const db = await getDb();
  await db
    .collection('todo')
    .updateOne({ _id: new ObjectId(todoId) }, { $set: { completed: false } });
  return res.status(200).json({});
});

appendFallbackHandler(handler);

export default handler;
