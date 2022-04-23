const {
  getIntents,
  createIntent,
  createClosedListEntity,
  createNumberEntity,
  createMLEntity,
  createExample,
  createExamples,
} = require("./api");

async function _doWork() {
  const intentName = "OrderPizza";
  // create intent order pizza
  try {
    await createIntent(intentName);
    console.log("Created Intent");
  } catch (err) {
    console.log(
      "Failed to Create Intent",
      err.response ? err.response.status : err
    );
  }

  // create all the entities
  let entityToCreate;

  const entityPizzaType = "Pizza Type";
  const entityPizzaSize = "Pizza Size";
  const entityToppings = "Toppings";
  const entityQuantity = "number";

  entityToCreate = entityPizzaSize;
  try {
    await createClosedListEntity(entityToCreate, [
      ["small", ["small", "sm"]],
      ["medium", ["medium", "md"]],
      ["large", ["large", "lg"]],
      ["extra-large", ["extra-large", "xl"]],
    ]);
    console.log("Created Entity", entityToCreate);
  } catch (err) {
    console.log(
      "Failed to Create Entity",
      entityToCreate,
      err.response ? err.response.status : err,
      err.response.data
    );
  }

  entityToCreate = entityToppings;
  try {
    await createClosedListEntity(entityToCreate, [
      ["Pepperoni", ["Pepperoni", "pepperonis"]],
      ["Mushroom", ["Mushroom", "Mushroom"]],
      ["Cheese", ["Cheese"]],
      ["Sausage", ["Sausage", "Sausages"]],
      ["Onion", ["Onion", "Onions"]],
      ["Black olives", ["Black olive", "Black olives", "Olive", "Olives"]],
      ["Green pepper", ["Green pepper", "Green peppers", "peppers", "pepper"]],
      ["Chicken", ["Chicken"]],
      ["Garlic", ["Fresh garlic", "Garlic"]],
      ["Salt", ["Salt"]],
      ["pineapple", ["pineapple", "pineapples"]],
      ["broccoli", ["broccoli", "broccolis"]],
      ["asparagus", ["asparagus"]],
    ]);
    console.log("Created Entity", entityToCreate);
  } catch (err) {
    console.log(
      "Failed to Create Entity",
      entityToCreate,
      err.response ? err.response.status : err,
      err.response.data
    );
  }

  entityToCreate = entityQuantity;
  try {
    await createNumberEntity(entityToCreate);
    console.log("Created Entity", entityToCreate);
  } catch (err) {
    console.log(
      "Failed to Create Entity",
      entityToCreate,
      err.response ? err.response.status : err,
      err.response.data
    );
  }

  entityToCreate = entityPizzaType;
  try {
    await createMLEntity(entityToCreate, [{ name: "Toppings" }]);
    console.log("Created Entity", entityToCreate);
  } catch (err) {
    console.log(
      "Failed to Create Entity",
      entityToCreate,
      err.response ? err.response.status : err,
      err.response.data
    );
  }

  // create intent examples
  const intentExample1 = `For adult, we want an extra large special combination and for the kid, we want a small veggie pizza`;
  const intentExample2 = `We want to have 2 combo a and one of the meat lover pizza. we want extra chicken on both.`;
  const intentExample3 = `I would like to buy 3 Hawaiian pizzas with extra garlic and onion`;
  const intentExample4 = `I want two cheese pizza with extra cheese and green pepper`;
  const intentExample5 = `I'd like a large pepperoni pizza with mushrooms, olives and extra cheese`;
  const intentExample6 = `Two house special pizzas`;

  const intentExamples = [
    {
      text: intentExample1,
      intentName,
      entityLabels: [
        mapEntity(entityPizzaType, intentExample1, "special combination"),
        mapEntity(entityPizzaType, intentExample1, "veggie pizza"),
      ],
    },
    {
      text: intentExample2,
      intentName,
      entityLabels: [
        mapEntity(entityPizzaType, intentExample2, "meat lover pizza"),
      ],
    },
    {
      text: intentExample3,
      intentName,
      entityLabels: [
        mapEntity(entityPizzaType, intentExample3, "Hawaiian pizzas"),
      ],
    },
    {
      text: intentExample4,
      intentName,
      entityLabels: [
        mapEntity(entityPizzaType, intentExample4, "cheese pizza"),
      ],
    },
    {
      text: intentExample5,
      intentName,
      entityLabels: [
        mapEntity(entityPizzaType, intentExample5, "pepperoni pizza"),
      ],
    },
    {
      text: intentExample6,
      intentName,
      entityLabels: [
        mapEntity(entityPizzaType, intentExample6, "house special pizzas"),
      ],
    },
  ];

  try {
    await createExamples(intentExamples);
    console.log("Created Example for Intent");
  } catch (err) {
    console.log(
      "Failed to Create Example for Intent",
      err.response ? err.response.status : err
    );
  }
}

function mapEntity(entityName, sentence, word) {
  const startCharIndex = sentence.indexOf(word);
  const endCharIndex = startCharIndex + word.length;

  return {
    startCharIndex,
    endCharIndex,
    entityName,
  };
}

_doWork();
