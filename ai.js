module.exports = {
  update(bot, ball) {
    if (!ball) return;

    const player = bot.player;
    if (!player) return;

    const dx = ball.x - player.x;
    const dy = ball.y - player.y;

    const dist = Math.sqrt(dx * dx + dy * dy);

    // IA mais inteligente
    let speed = 0.4;

    if (dist > 200) speed = 0.8;
    if (dist < 50) speed = 0.3;

    bot.moveX = dx * speed;
    bot.moveY = dy * speed;

    // chute automático quando perto
    bot.kick = dist < 15;
  }
};