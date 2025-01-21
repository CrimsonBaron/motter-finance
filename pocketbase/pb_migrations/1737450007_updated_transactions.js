/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3174063690")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "bool2528159161",
    "name": "IsIncoming",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3174063690")

  // remove field
  collection.fields.removeById("bool2528159161")

  return app.save(collection)
})
