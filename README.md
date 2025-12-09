# 🧮 Decision Matrix Generator

A simple web-based tool that helps you compare multiple options against weighted criteria and automatically identifies the best option.  
Built with **HTML**, **CSS (Bootstrap)** and **JavaScript** ⚡

---

## ✨ Features

- Choose number of options and criteria (1–6 each)
- Dynamically generates a decision matrix table
- Enter custom names for options and criteria 📝
- Set numeric weights for each criterion 🎯
- Input scores for each option × criterion
- Calculates weighted totals and highlights the best option ⭐
- Simple reload button to start over 🔄

---

## 🚀 Quick Start

1. Clone or download this repository
2. Open `index.html` in your browser 🌐

---

## ⚙️ How It Works

1. Select number of options & criteria → **Make Table**
2. Add criteria names + weights 🎚️
3. Add option names + scores
4. Click **Calc**
5. The highest score = Best option 🏆

---

## 🧠 Important Functions (in `main.js`)

| Function | Description |
|---------|-------------|
| `generateTable()` | Builds the matrix UI |
| `calc()` | Calculates totals and prints results |
| `createArraysForOpthions(num)` | Creates option arrays |
| `CheckBestOptino(arr)` | Finds best score index(es) |
| `afterCalc()` | Shows reload button |

---

## 🧪 Example Usage

- Weights → any positive numbers (Example: 1–5)
- Scores → numeric values (Example: 1–10)
- If highest total is shared → both options are shown 🎉

---

## 📌 Notes

This tool is fully client-side — no backend needed.  
Just open and start using it instantly! ⚡
