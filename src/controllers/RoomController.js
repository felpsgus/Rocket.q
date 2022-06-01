const dataBase = require('../db/config')

module.exports = {
  async create(req, res) {
    const db = await dataBase()
    const pass = req.body.password

    let roomId
    let isRoom = true
    while (isRoom) {
      // Gerar o numero da sala
      for (var i = 0; i < 6; i++) {
        i == 0
          ? (roomId = Math.floor(Math.random() * 10).toString())
          : (roomId += Math.floor(Math.random() * 10).toString())
      }

      // verificar se esse numero ja existe
      const roomsExistIds = await db.all(`SELECT id FROM rooms`)

      isRoom = roomsExistIds.some(roomsExistId => roomsExistId == roomId)

      if (!isRoom) {
        // insere a sala no banco
        await db.run(`INSERT INTO rooms (
          id,
          pass
        ) VALUES (
          ${parseInt(roomId)},
          ${pass}
        )`)
      }
    }

    // verificar se a sala ja existe

    await db.close()

    res.redirect(`/room/${roomId}`)
  },

  async open(req, res) {
    const db = await dataBase()
    const roomId = req.params.room

    const questions = await db.all(
      `SELECT * FROM questions WHERE room = ${roomId} AND read = 0`
    )
    const questionsRead = await db.all(
      `SELECT * FROM questions WHERE room = ${roomId} AND read = 1`
    )

    let isNoQuestion
    if (questions.length == 0) {
      if (questionsRead.length == 0) {
        isNoQuestion = true
      }
    }

    res.render('room', {
      roomId: roomId,
      questions: questions,
      questionsRead: questionsRead,
      isNoQuestion: isNoQuestion
    })
  },

  enter(req, res) {
    const roomId = req.body.roomId

    res.redirect(`/room/${roomId}`)
  }
}
