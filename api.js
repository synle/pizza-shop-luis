const axios = require("axios");

const luisAppId = process.env.luisAppId; // export luisAppId='YOUR_LUIS_APP_ID'
const luisBaseUrl = process.env.luisBaseUrl; //export luisBaseUrl='YOUR_URL'
const luisKey = process.env.luisKey; //export luisKey='YOUR_LUIS_API_KEY'
const authorKey = process.env.authorKey; //export authorKey='YOUR_AUTHOR_API_KEY'
const authorBaseUrl = process.env.authorBaseUrl; //export authorBaseUrl='YOUR_URL'

const axiosDelay = (...rest) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios(...rest)
        .then(resolve)
        .catch(reject);
    }, 250);
  });
};

const BASE_CONFIGS = {
  headers: {
    "Ocp-Apim-Subscription-Key": authorKey,
    "Content-Type": "application/json",
  },
};

function createIntent(intentName) {
  var data = JSON.stringify({
    name: intentName,
  });

  var config = {
    method: "post",
    url: `${authorBaseUrl}/luis/api/v2.0/apps/${luisAppId}/versions/0.1/intents`,
    data: data,
    ...BASE_CONFIGS,
  };

  return axiosDelay(config);
}

function getIntents() {
  var config = {
    method: "get",
    url: `${authorBaseUrl}/luis/webApi/v2.0/apps/${luisAppId}/versions/0.1/detailedModels?modelFilterType=Intent&take=500`,
    ...BASE_CONFIGS,
  };

  return axiosDelay(config);
}

/**
 * @param  entityName
 * @param  sublist    [name, [synonyms]]
 * @return
 */
function createClosedListEntity(entityName, sublist) {
  var data = JSON.stringify({
    name: entityName,
    sublists: sublist.map(([canonicalForm, list]) => ({ canonicalForm, list })),
  });

  var config = {
    method: "post",
    url: `${authorBaseUrl}/luis/api/v2.0/apps/${luisAppId}/versions/0.1/closedLists`,
    data: data,
    ...BASE_CONFIGS,
  };

  return axios(config);
}

function createMLEntity(entityName, children) {
  var data = JSON.stringify({ name: entityName, children });

  var config = {
    method: "post",
    url: `${authorBaseUrl}/luis/authoring/v3.0-preview/apps/${luisAppId}/versions/0.1/entities`,
    data: data,
    ...BASE_CONFIGS,
  };

  return axios(config);
}

function createCustomEntity(modelName, domainName, entityType) {
  var data = JSON.stringify({ domainName, modelName, name: entityType });

  var config = {
    method: "post",
    url: `${authorBaseUrl}/luis/api/v2.0/apps/${luisAppId}/versions/0.1/customPrebuiltEntities`,
    data: data,
    ...BASE_CONFIGS,
  };

  return axios(config);
}

function createNumberEntity(modelName) {
  return createCustomEntity(modelName, "Utilities", "Utilities.number");
}

function createExample(intentName, exampleUtterance) {
  var data = JSON.stringify([
    {
      intentName: intentName,
      text: exampleUtterance,
      entityLabels: [],
    },
  ]);

  var config = {
    method: "post",
    url: `${authorBaseUrl}/luis/api/v2.0/apps/${luisAppId}/versions/0.1/examples?enableNestedChildren=true`,
    data: data,
    ...BASE_CONFIGS,
  };

  return axiosDelay(config);
}

function createExamples(intentExamples) {
  var data = JSON.stringify(intentExamples);

  var config = {
    method: "post",
    url: `${authorBaseUrl}/luis/api/v2.0/apps/${luisAppId}/versions/0.1/examples?enableNestedChildren=true\n`,
    data: data,
    ...BASE_CONFIGS,
  };

  return axiosDelay(config);
}

function query(text) {
  var config = {
    method: "get",
    url: `${luisBaseUrl}/luis/prediction/v3.0/apps/${luisAppId}/slots/production/predict?verbose=true&show-all-intents=true&log=true&subscription-key=${luisKey}&query=${text}`,
  };

  return axios(config);
}

module.exports = {
  query,
  getIntents,
  createIntent,
  createClosedListEntity,
  createMLEntity,
  createCustomEntity,
  createNumberEntity,
  createExample,
  createExamples,
};
