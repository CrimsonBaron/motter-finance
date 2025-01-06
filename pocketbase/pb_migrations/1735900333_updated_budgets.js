/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1308224162")

  // update field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "number2587300118",
    "max": null,
    "min": null,
    "name": "budgetAmount",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // update field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "number3377171908",
    "max": null,
    "min": null,
    "name": "currentAmount",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1308224162")

  // update field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "number2587300118",
    "max": null,
    "min": null,
    "name": "budgetAmmount",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // update field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "number3377171908",
    "max": null,
    "min": null,
    "name": "currentAmmount",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
