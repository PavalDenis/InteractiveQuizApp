// pages/api/questions.js
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  // Construiește calea absolută către fișierul JSON
  const jsonDirectory = path.join(process.cwd(), 'data');
  const fileContents = await fs.readFile(jsonDirectory + '/question.json', 'utf8');

  // Trimite conținutul fișierului JSON ca răspuns
  res.status(200).json(JSON.parse(fileContents));
}
