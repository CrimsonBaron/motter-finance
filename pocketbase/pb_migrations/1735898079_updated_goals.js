/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_207790276")

  // remove field
  collection.fields.removeById("number1950196377")

  // add field
  collection.fields.addAt(6, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2324088501",
    "hidden": false,
    "id": "relation750658832",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "linkedAccounts",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "number570552902",
    "max": null,
    "min": null,
    "name": "progress",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number1409622766",
    "max": null,
    "min": null,
    "name": "targetAmount",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  // update field
  collection.fields.addAt(5, new Field({
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

  // update field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "date1594386169",
    "max": "",
    "min": "",
    "name": "targetDate",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
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

  // remove field
  collection.fields.removeById("relation750658832")

  // remove field
  collection.fields.removeById("number570552902")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number1409622766",
    "max": null,
    "min": null,
    "name": "goalAmmount",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  // update field
  collection.fields.addAt(4, new Field({
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

  // update field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "date1594386169",
    "max": "",
    "min": "",
    "name": "completionDate",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
})
