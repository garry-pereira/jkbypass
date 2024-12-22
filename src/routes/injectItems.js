// make this be able to handle all updates
import { injectAndReturnAll } from '../db/connectdb.js';
import { importCsvAsJson } from '../utils/data.js';

// the route handler for updating items
const injectItems = async (req, res) => {
  try {
    const injectingData = await importCsvAsJson();
    console.log(`inject.csv has ${injectingData.length} items`);
    return res.json({
      content: `inject.csv has ${injectingData.length} items`,
    }).status(200);

    // ends at this point
    const updateQuery = `update dbo.rItem 
    set 
    Name = '${req.body.Name}',
    Price = ${req.body.Price},
    OnHand = ${req.body.OnHand},
    Cost = ${req.body.Cost}
    where upc = '${req.body.UPC}'`;

    const reselectQuery = `select Name, UPC, Price, OnHand, Cost from dbo.rItem where UPC = '${req.body.UPC}'`;
    const dbres = await injectAndReturnAll(updateQuery, reselectQuery);
    res.json(dbres).status(200);
  } catch (err) {
    throw new Error(err);
  }
}

export default injectItems;
