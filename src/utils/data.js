import { createWriteStream } from "fs";
import { readFile } from "fs/promises";
import { json2csv, csv2json } from "json-2-csv";

export async function saveJsonAsCsv(jsonData, fileName = "data.csv") {
  try {
    // Convert JSON to CSV
    const csv = json2csv(jsonData);

    // Create a writable stream
    const stream = createWriteStream(fileName, { encoding: "utf8" });

    // Write CSV to the file
    stream.write(csv);
    stream.end();

    // Handle stream events
    stream.on("finish", () =>
      console.log(`Data successfully saved to ${fileName}`),
    );
    stream.on("error", (error) =>
      console.error(`Error writing to file: ${error.message}`),
    );
  } catch (error) {
    console.error(`Error converting JSON to CSV: ${error.message}`);
  }
}

export async function importCsvAsJson(fileName = "inject.csv") {
  try {
    const csvData = await readFile(fileName, 'utf8');
    const jsonArray = await csv2json(csvData);
    return jsonArray;
  } catch (error) {
    console.error('Error converting CSV to JSON or reading file', error.message);
    throw error;
  }
}
