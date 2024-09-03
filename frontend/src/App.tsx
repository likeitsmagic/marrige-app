import { NextUIProvider } from '@nextui-org/react'
import { RouterProvider } from 'react-router'
import { router } from './routes'
import { AuthContextProvider } from './core/auth/AuthContext'

const App = () => {

  return (
    <NextUIProvider>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </NextUIProvider>
  )
}

export default App
