game.checkCollisions = function () {
    var watchTheseGuys = [];
    var bounds = 6;
    for (var i = 0; i < game.map.structures.length; i++) {
        if (
            game.map.structures[i].x > (game.player.x / game.options.tileWidth) - bounds
            && game.map.structures[i].x < (game.player.x / game.options.tileWidth) + bounds
            && game.map.structures[i].y > (game.player.y / game.options.tileHeight) - bounds
            && game.map.structures[i].y < (game.player.y / game.options.tileHeight) + bounds
        ) {
            watchTheseGuys.push(game.map.structures[i]);
        }
    }

    for (var i = 0; i < watchTheseGuys.length; i++) {
        for (var j = 0; j < game.structures[watchTheseGuys[i].name].length; j++) {
            if (
                game.player.x / game.options.tileWidth - 0.5 >= watchTheseGuys[i].x + game.structures[watchTheseGuys[i].name][j].x
                && game.player.x / game.options.tileWidth - 0.5 <= watchTheseGuys[i].x + game.structures[watchTheseGuys[i].name][j].x + 1
                && game.player.y / game.options.tileHeight < watchTheseGuys[i].y + game.structures[watchTheseGuys[i].name][j].y + 0.2
                && game.player.y / game.options.tileHeight > watchTheseGuys[i].y + game.structures[watchTheseGuys[i].name][j].y - 0.2
                && (game.structures[watchTheseGuys[i].name][j].collidable == undefined || game.structures[watchTheseGuys[i].name][j].collidable == true)
                && !game.player.startedJump // Kiểm tra khi nhảy đã kết thúc
            ) {
                clearInterval(game.player.fallInterval);
                game.player.isInAir = false;
                game.player.y = Math.round(game.player.y / game.options.tileHeight) * game.options.tileHeight; // Căn chỉnh vị trí y về mặt đất
                game.player.jumpCount = 0; // Reset số lần nhảy khi chạm đất
                //game.player.shouldStop = 1;
                return true; // Va chạm thành công
            }
        }
    }

    return false; // Không có va chạm
}
