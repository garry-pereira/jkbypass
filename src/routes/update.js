// make this be able to handle all updates
import { updateQuery } from '../connectdb.js'

// the route handler for updating items
const updater = async (req, res) => {
  // we receive the query
  // time to do some checks
  if (req.body.Name === '' || req.body.Name.length > 255) {
    return res.json({ err: 'name cannot be blank or too long' }).status(400)
  }

  if (!Number(req.body.Price) || Number(req.body.Price) < 0) {
    return res.json({ err: 'price must be a valid number' }).status(400)
  }

  if (!Number(req.body.OnHand) || Number(req.body.OnHand) % 1 !== 0) {
    return res
      .json({ err: 'onHand must be a valid number and not fraction' })
      .status(400)
  }

  //if (!Number(req.body.Cost) || Number(req.body.cost) < 0) {
  //  console.log(!Number(req.body.Cost))
  //  return res.json({ err: 'cost must be a valid number' }).status(400)
  //}

  const query = `update dbo.rItem 
  set 
  Name = '${req.body.Name}',
  Price = ${req.body.Price},
  OnHand = ${req.body.OnHand},
  Cost = ${req.body.Cost}
  where upc = '${req.body.UPC}'`
  const rquery = `select Name, UPC, Price, OnHand, Cost from dbo.rItem where UPC = '${req.body.UPC}'`
  const dbres = await updateQuery(query, rquery)
  res.json(dbres).status(200)
}

export default updater
