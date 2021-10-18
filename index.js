import express from 'express';
import utility from "./config/index.js";

// Build a basic express app
const app = express();

// Add middleware to parse default urlencoded form
app.use(express.urlencoded({
    extended: false
}));

// Enable CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Application folders
app.use(express.static("public"));

app.get("/getRates", async (req, resp) => {
    let resBTCData1 = await utility.getCoinApiData("BTC");
    let resETHData1 = await utility.getCoinApiData("ETH");
    let resNomicData = await utility.getNomicApiData("BTC,ETH");

    let respData = utility.getFinalResult(resBTCData1,resETHData1,resNomicData);
    resp.send(respData);
});

// Start it listening.  This is the top level so we can't use await.
app.listen(8080, () => console.log(`CryptoCurrency exchange data app listening!`));