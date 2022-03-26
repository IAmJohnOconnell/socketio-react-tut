import "./App.css"
import io from "socket.io-client"
import { useEffect, useState } from "react"

const socket = io.connect("http://localhost:3001")

function App() {
	const [room, setRoom] = useState("")
	const [message, setMessage] = useState("")
	const [messageRecieved, setMessageRecieved] = useState("")

	const sendMessage = () => {
		socket.emit("send_message", { message, room })
	}

	const joinRoom = () => {
		if (room !== "") {
			socket.emit("join_room", room)
		}
	}

	useEffect(() => {
		socket.on("recieve_message", (data) => {
			setMessageRecieved(data.message)
		})
	}, [socket])

	return (
		<div className='App'>
			<div>
				<input
					type='text'
					placeholder='Room'
					onChange={(e) => {
						setRoom(e.target.value)
					}}
				/>
				<button onClick={joinRoom}>Join Room</button>
			</div>
			<div>
				<input
					type='text'
					placeholder='Message...'
					onChange={(e) => {
						setMessage(e.target.value)
					}}
				/>
				<button onClick={sendMessage}>Send Message</button>
			</div>
			<h1>
				Message:
				{messageRecieved}
			</h1>
		</div>
	)
}

export default App
