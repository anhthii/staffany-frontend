import React from 'react'

export default function HourColumn() {
  return (
    <div className="flex-1 text-center text-gray-500 text-xs">
      {new Array(24).fill(0).map((_, index) => (
        <div key={index} style={{ height: 80 }} className="relative">
          <span style={{ position: 'absolute', top: '-10px' }}>{`${index} ${
            index > 11 ? 'PM' : 'AM'
          }`}</span>
        </div>
      ))}
    </div>
  )
}
