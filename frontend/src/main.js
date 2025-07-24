import { startChat } from './assistant.js'
import { loadGame } from './gamePanel.js'

startChat()

document.getElementById('createGameBtn').addEventListener('click', () => {
  const prompt = document.getElementById('userPrompt').value.trim()
  if (!prompt) return alert("Please describe your game!")

  const gameId = `temp_${Date.now()}`
  loadGame(gameId)
})
