import React from 'react'

const layout = ({children}) => {
  return (
    <div className="pt-4 min-h-screen
        bg-linear-to-br
        from-neutral-100 via-neutral-50 to-neutral-100
        dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900
        text-neutral-800 dark:text-neutral-300
        transition-colors duration-300
      ">
        {children}
    </div>
  )
}

export default layout
