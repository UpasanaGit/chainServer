import fetch from 'node-fetch';

let config = {};
config.coinKey = "D2014C36-DDB7-42D3-9C0F-D46C66267EEC";
config.nomicKey = "4a63aa1e44b47ce71120e5b6bf75f4651a9e5fbd";
config.coinURL = "https://rest.coinapi.io/v1/exchangerate/";
config.nomicURL = "https://api.nomics.com/v1/currencies/ticker?key=";

const getCoinApiData = async (inCurr) => {
    const res = await fetch(config.coinURL + inCurr + "/USD", { headers: { 'X-CoinAPI-Key': config.coinKey } });
    return await res.json();
};

const getNomicApiData = async (inCurr) => {
    const res = await fetch(config.nomicURL + config.nomicKey + "&ids=" + inCurr);
    return await res.json();
};

const getFinalResult = (resBTCData1, resETHData1, resNomicData) => {
    let respData = {};

    // prepare BTC data
    let BTCData = [];
    let resBTCData2 = resNomicData[0];
    let recommendBuy1 = false;
    if (parseFloat(resBTCData1.rate) < parseFloat(resBTCData2.price)) {
        recommendBuy1 = true;
    }
    console.log(resBTCData1);
    let obj1 = {
        "provider": "CoinApi",
        "name": "Bitcoin",
        "symbol": "BTC",
        "currency": "USD",
        "price": parseFloat(resBTCData1.rate).toFixed(2),
        "recommend": (recommendBuy1 === true) ? "Buy" : "Sell"
    }
    BTCData.push(obj1);
    let obj2 = {
        "provider": "Nomics",
        "name": "Bitcoin",
        "symbol": "BTC",
        "currency": "USD",
        "price": parseFloat(resBTCData2.price).toFixed(2),
        "recommend": (recommendBuy1 === true) ? "Sell" : "Buy"
    }
    BTCData.push(obj2);

    // prepare ETH data
    let ETHData = [];
    let resETHData2 = resNomicData[1];
    recommendBuy1 = false;
    if (parseFloat(resETHData1.rate) < parseFloat(resETHData2.price)) {
        recommendBuy1 = true;
    }
    obj1 = {
        "provider": "CoinApi",
        "name": "Ethereum",
        "symbol": "ETH",
        "currency": "USD",
        "price": parseFloat(resETHData1.rate).toFixed(2),
        "recommend": (recommendBuy1 === true) ? "Buy" : "Sell"
    }
    ETHData.push(obj1);
    obj2 = {
        "provider": "Nomics",
        "name": "Ethereum",
        "symbol": "ETH",
        "currency": "USD",
        "price": parseFloat(resETHData2.price).toFixed(2),
        "recommend": (recommendBuy1 === true) ? "Sell" : "Buy"
    }
    ETHData.push(obj2);

    respData["BTC"] = BTCData;
    respData["ETH"] = ETHData;
    return respData;
}

export default {
    getCoinApiData,
    getNomicApiData,
    getFinalResult
};
