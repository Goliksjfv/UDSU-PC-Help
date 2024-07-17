import express, { Request, Response } from 'express';
import multer from 'multer';
import ExcelJS from 'exceljs';
import path from 'path';
import cors from 'cors';

const app = express();
const upload = multer();
const filePath = path.join(__dirname, '..', 'public', 'Problems.xlsx');

// Middleware для обработки JSON и CORS
app.use(express.json());
app.use(cors());

app.post('/update-excel', upload.none(), async (req: Request, res: Response) => {
  const { fullName, building, room, pcNumber, problemDescription } = req.body;

  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1);

    if (worksheet) {
      worksheet.addRow([fullName, building, room, pcNumber, problemDescription]);

      await workbook.xlsx.writeFile(filePath);
      res.status(200).send('File updated successfully');
    } else {
      res.status(500).send('Worksheet not found');
    }
  } catch (error) {
    console.error('Error updating Excel file:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
