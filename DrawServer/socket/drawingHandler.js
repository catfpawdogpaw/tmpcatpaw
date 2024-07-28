function drawingHandler(io, socket, GameRoomStatus) {
    socket.emit("initDrawing", GameRoomStatus.drawingData);

    socket.on("draw", (data) => {
        // 그림 데이터 저장
        GameRoomStatus.drawingData.push(data);
        // 그림 데이터 방에 전파
        socket.to(GameRoomStatus.gameRoomId).emit("draw", data);
    });

    socket.on("clearCanvas", () => {
        // 그림 데이터 초기화
        GameRoomStatus.drawingData = [];

        io.to(GameRoomStatus.gameRoomId).emit("clearCanvas");
    });

    socket.on("getGameRoomStatus", () => {
        io.to(GameRoomStatus.gameRoomId).emit(
            "getGameRoomStatus",
            GameRoomStatus
        );
    });
}

module.exports = drawingHandler;
