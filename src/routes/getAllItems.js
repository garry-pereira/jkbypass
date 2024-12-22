import { items } from "../db/connectdb.js";
import { saveJsonAsCsv } from "../utils/data.js";

// the route handler for reading items
const getAllItems = async (req, res) => {
  try {
    console.log("trying extractor route handler");
    const query = "select * from dbo.rItem";
    // const query = `select Name, UPC, Price from dbo.rItem`;
    const dbres = await items(query);
    // now dbres is an array of objects
    if (dbres === undefined) {
      return res.json({ err: "item does not exist" }).status(404);
    }
    // at this point we have dbres, we can pass it to a function and have the function
    // save the data to a file, let's just try that first.
    // await saveJsonAsCsv(dbres);
    console.log(dbres);

    // let's iterate over this array and then put each json object into the csv
    await saveJsonAsCsv(dbres);

    // just sends the first item in the array back
    // res.json(dbres[0]).status(200);
    //
    res.json({
      count: `There are ${dbres.length} items in the database`,
    }).status(200);
  } catch (err) {
    throw new Error(err);
  }
};

// export our reader function
export default getAllItems;

// Name, UPC, Price, OnHand, Cost
//  where UPC = '096619885718'
