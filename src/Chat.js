import React, { useState } from 'react'
import axios from 'axios'
import Messages from './Messages'

const Chat = () => {
  const [responses, setResponses] = useState([])
  const [currentMessage, setCurrentMessage] = useState('')

  const handleMessageSubmit = (message) => {
    const data = {
      message,
    }

    axios
      .post('https://backend-manuhbot.herokuapp.com/chatbot', data)
      .then((response) => {
        const responseData = {
          text:
            response.data['message']['fulfillmentText'] !== ''
              ? response.data['message']['fulfillmentText']
              : "Desculpe, não entendi, pode repetir?",
          isBot: true,
        }
        setResponses((responses) => [...responses, responseData])
      })
      .catch((error) => {
        console.log('Error: ', error)
      })
  }

  const handleMessageChange = (event) => {
    setCurrentMessage(event.target.value)
  }

  const handleSubmit = (event) => {
    const message = {
      text: currentMessage,
      isBot: false,
    }
    if (event.key === 'Enter' && event.target.value !== '') {
      setResponses((responses) => [...responses, message])
      handleMessageSubmit(message.text)
      setCurrentMessage('')
    }
  }

  const handleSend = (event) => {
    const message = {
      text: currentMessage,
      isBot: false,
    }
    if(event.target.value!=''){
      setResponses((responses) => [...responses, message])
      handleMessageSubmit(message.text)
      setCurrentMessage('')
    }

  }

  return (
    <>
      <div className="flex justify-end  px-3  mx-auto">
        <div className="max-w-sm lg:max-w-md  bg-gray-100  dark:bg-gray-900  flex justify-between flex-col  w-full h-auto py-4  shadow-sm rounded-xl my-2">
          <div
            className="messagesSection flex flex-col
          space-y-4
          p-3
          overflow-y-auto
          scrollbar-thumb-blue
          scrollbar-thumb-rounded
          scrollbar-track-blue-lighter
          scrollbar-w-2
          scrolling-touch"
          >
            <Messages messages={responses} />
          </div>

          <div className="flex justify-center  px-3 py-2   border-t-2 border-gray-200 dark:border-gray-600  ">
            <div className="py-2 px-2  bg-white dark:bg-gray-800 lg:max-w-lg  w-full   shadow-sm rounded-lg ">
              <input
                type="text"
                value={currentMessage}
                onChange={handleMessageChange}
                onKeyDown={handleSubmit}
                placeholder="Digite sua mensagem aqui..."
                className="block w-full  bg-white  dark:bg-gray-700 border border-gray-300 dark:border-gray-900  rounded-md py-2 pl-3 pr-3 text-sm placeholder-gray-500 dark:text-white dark:placeholder-gray-100 focus:outline-none focus:text-gray-900 dark:focus:text-white focus:placeholder-gray-400 dark:focus:placeholder-white focus:ring-1 focus:ring-indigo-300  sm:text-sm"
              />
            </div>
            <div>
              <button onClick={handleSend}>
                <svg
                  class="svg-inline--fa text-black-400 fa-paper-plane fa-w-16 w-12 h-12 py-2 mr-2"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="paper-plane"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <path fill="currentColor" d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat
