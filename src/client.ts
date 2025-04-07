const ws = new WebSocket('ws://localhost:5178')

ws.addEventListener('open', () => {
  console.log('opened')
})
