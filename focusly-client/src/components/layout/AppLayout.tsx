import React from 'react'

const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="app-layout">{children}</div>
}

export default AppLayout
