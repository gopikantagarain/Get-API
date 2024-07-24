import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

const SOLANA_MAINNET_BETA_URL = "https://api.mainnet-beta.solana.com";
const WALLET_ADDRESS = "4UYjrT5hmMTh9pLFg1Mxh49besnAeCc23qFoZc6WnQkK";

app.get("/transactions", async (req, res) => {
  try {
    const response = await fetch(SOLANA_MAINNET_BETA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getConfirmedSignaturesForAddress2",
        params: [WALLET_ADDRESS, { limit: 1000 }],
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    res.json(data.result);
  } catch (error) {
    console.error("Error fetching transaction data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
