# Luis Pizza Shop

Sample code to show how to integrate with Microsoft LUIS programmatically in Node JS.

I published an article detailing the process of setting up LUIS. You can refer to that [LUIS tutorial here](https://www.linkedin.com/pulse/integrating-microsoft-language-understanding-luis-your-sy-le/)

## Env Vars

These env variables are needed to run the script

```bash
export luisAppId='YOUR_LUIS_APP_ID'
export luisBaseUrl='YOUR_URL'
export luisKey='YOUR_LUIS_API_KEY'
export authorBaseUrl='YOUR_URL'
export authorKey='YOUR_AUTHOR_API_KEY'
```

## Train

Run this script to generate meta data for your LUIS app

```bash
npm run train
```

## Start

To test the bots, run this command

```
npm run start
```

Sample command you can test: `please get me a large pepperoni pizza with mushrooms, olives and extra cheese`

## Demo

![image](https://user-images.githubusercontent.com/3792401/164913370-7fcdb6d4-87ad-43ab-b3bd-fb2d34b19590.png)
