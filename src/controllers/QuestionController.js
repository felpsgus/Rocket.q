const dataBase = require('../db/config')

module.exports = {
  async index(req, res) {
    const db = await dataBase()
    const roomId = req.params.room
    const questionId = req.params.question
    const action = req.params.action
    const password = req.body.password

    const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)
    if (verifyRoom.pass == password) {
      if (action == 'delete') {
        await db.run(`DELETE FROM questions WHERE id = ${questionId}`)
      } else if (action == 'check') {
        await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)
      }
      res.redirect(`/room/${roomId}`)
    } else {
      res.render('passincorrect', { roomId: roomId })
    }
  },

  async create(req, res) {
    const db = await dataBase()
    const question = req.body.textarea
    const roomId = req.params.room

    await db.run(`INSERT INTO questions (
      title,
      room,
      read)
      VALUES(
        "${question}",
        ${roomId},
        0
      )
    `)

    res.redirect(`/room/${roomId}`)
  }
}
