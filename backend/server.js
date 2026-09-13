const express = require("express");
const mqtt = require("mqtt");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

// PostgreSQL connection
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "smarthelmet",
    password: "2903@cherry",
    port: 5432
});

// MQTT connection
const MQTT_SERVER = "mqtt://broker.hivemq.com";
const MQTT_TOPIC = "smarthelmet/storage/slot1/status";

const mqttClient = mqtt.connect(MQTT_SERVER);

let helmetStatus = "UNKNOWN";

// MQTT connected
mqttClient.on("connect", () => {
    console.log("Connected to MQTT broker");

    mqttClient.subscribe(MQTT_TOPIC, (error) => {
        if (error) {
            console.log("MQTT subscription failed");
        } else {
            console.log("Subscribed to helmet status");
        }
    });
});

// Receive MQTT messages
mqttClient.on("message", async (topic, message) => {
    helmetStatus = message.toString();

    console.log("Helmet Status:", helmetStatus);

    try {
        await pool.query(
            "INSERT INTO helmet_status (slot, status) VALUES ($1, $2)",
            ["Slot 1", helmetStatus]
        );

        console.log("Status saved to PostgreSQL");
    } catch (error) {
        console.log("Database error:", error.message);
    }
});

// API to get current status
app.get("/api/status", (req, res) => {
    res.json({
        slot: "Slot 1",
        helmet: helmetStatus
    });
});

// API to get status history
app.get("/api/history", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM helmet_status ORDER BY recorded_at DESC"
        );

        res.json(result.rows);
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch history"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});