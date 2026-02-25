const config = require("./config.json");
const AI = require("./ai");

const room = HBInit({
  roomName: config.roomName,
  maxPlayers: config.maxPlayers,
  public: config.public,
  token: config.token
});

room.setDefaultStadium("Big");
room.setScoreLimit(5);
room.setTimeLimit(5);

let bot = {
  id: null,
  player: null,
  moveX: 0,
  moveY: 0,
  kick: false
};

room.onPlayerJoin = (player) => {
  if (!bot.id) {
    bot.id = player.id;
  }
};

room.onGameTick = () => {
  if (!bot.id) return;

  const player = room.getPlayer(bot.id);
  if (!player || !player.position) return;

  bot.player = player.position;

  const ball = room.getBallPosition();
  if (!ball) return;

  AI.update(bot, ball);

  room.setPlayerDiscProperties(bot.id, {
    xspeed: bot.moveX,
    yspeed: bot.moveY
  });

  if (bot.kick) {
    room.kickPlayer(bot.id);
  }
};