import { Outlet } from 'react-router-dom'
import Appbar from './appbar'
import { Toolbar } from '@mui/material'

function AppLayout() {
  return (
    <>
      <Appbar>
        <Toolbar />
        <Outlet />
      </Appbar>
    </>
  )
}

export default AppLayout
