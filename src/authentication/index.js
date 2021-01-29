import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { Login } from './api'
import Logo from '../logo.png'

export default function LoginPage() {
  let history = useHistory()
  const [username, setUsername] = useState('staffany')
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-4/12 flex content-center">
        <div className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full">
          <center>
            <img src={Logo} width={300} />
          </center>

          <div className="mb-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {/* <div className="mb-6">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
              id="password"
              type="password"
              placeholder="******************"
            />
            <p className="text-red text-xs italic">
              Enter any password to create a user
            </p>
          </div> */}
          <div className="flex items-center justify-between">
            <button
              className="hover:bg-blue-dark bg-blue-500 text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={() => {
                Login(username, '').then(({ data, status }) => {
                  const userID = data.user_id
                  localStorage.setItem('userID', userID)
                  if (status == 200) {
                    history.push('/shift')
                  }
                })
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
