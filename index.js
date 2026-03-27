const bedrock = require("bedrock-protocol");
const express = require("express");

const app = express();

// Web server (for UptimeRobot)
app.get("/", (req, res) => res.send("Bot is alive"));
app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log("Web server running");
});

function startBot() {
  const bot = bedrock.createClient({
    host: "Asnhuaswal.aternos.me",
    port: 56898,
    username: "AFK_mullaji",
    offline: true
  });

  bot.on("join", () => {
    console.log("✅ Bot joined server!");

    // Anti-AFK (safe version)
    setInterval(() => {
      try {
        // Small rotation instead of teleport
        bot.queue("move_player", {
          runtime_id: bot.runtime_entity_id,
          position: bot.entity.position, // KEEP CURRENT POSITION ✅
          pitch: 0,
          yaw: Math.random() * 360,
          head_yaw: Math.random() * 360,
          mode: 0,
          on_ground: true,
          tick: 0
        });

        console.log("👀 Anti-AFK movement");
      } catch (e) {
        console.log("AFK error:", e.message);
      }
    }, 8000);
  });

  bot.on("disconnect", (packet) => {
    console.log("❌ Disconnected! Reconnecting in 5 sec...");
    setTimeout(startBot, 5000);
  });

  bot.on("error", (err) => {
    console.log("⚠️ Error:", err.message);
  });
}

startBot();
