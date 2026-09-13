# Smart Helmet Storage Monitor

## 📌 Project Overview

The Smart Helmet Storage Monitor is an IoT-based system designed to monitor the availability of helmets in designated storage slots.

The system uses a sensor connected to an ESP32 to detect whether a helmet is present or missing. The detected status is sent through MQTT to a Node.js backend. The backend stores the status in a PostgreSQL database and provides the information to a web dashboard.

> Note: The current Wokwi simulation uses an HC-SR04 ultrasonic sensor as a temporary simulation substitute for the planned IR obstacle sensor.

---

## 🎯 Problem Statement

In shared helmet storage areas, manually checking multiple storage slots to determine helmet availability is time-consuming and inconvenient.

The proposed Smart Helmet Storage Monitor automatically detects the presence or absence of a helmet in a designated storage slot and displays the real-time status through a web dashboard.

---

## 🎯 Objectives

- Detect whether a helmet is present or missing.
- Use ESP32 to collect sensor readings.
- Send sensor status using MQTT.
- Receive and process the data using a Node.js backend.
- Store helmet status history in PostgreSQL.
- Display real-time helmet availability on a web dashboard.
- Reduce the need for manual checking of storage slots.

---

## 🏗️ System Architecture

```text
             Helmet
                ↓
             Sensor
                ↓
              ESP32
                ↓
             Wi-Fi
                ↓
              MQTT
                ↓
        Node.js / Express
                ↓
           PostgreSQL
                ↓
          Web Dashboard
