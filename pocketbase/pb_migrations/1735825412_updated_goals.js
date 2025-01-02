/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_207790276")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number1950196377",
    "max": null,
    "min": null,
    "name": "investmentAmmount",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_207790276")

  // remove field
  collection.fields.removeById("number1950196377")

  return app.save(collection)
})
