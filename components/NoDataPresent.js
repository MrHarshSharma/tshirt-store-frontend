import React from 'react'

const NoDataPresent = ({message}) => {
  return (
    <div className="flex z-[-1] items-center relative justify-around text-red-400 border-red-400 border-[0.8px] rounded-md p-5 m-3 gap-2">
            {message}
        </div>
  )
}

export default NoDataPresent