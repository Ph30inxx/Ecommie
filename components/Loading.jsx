import React from 'react'

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-[70vh] animate-fade-in">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-t-cyan-500 border-r-blue-400 border-b-cyan-500 border-l-transparent shadow-glow-cyan"></div>
        </div>
    )
}

export default Loading