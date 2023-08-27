import ProductsTable from './table'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'

function ProductsPage() {
  const navigate = useNavigate()

  return (
    <>
      <ProductsTable />

      <div className="absolute bottom-8 right-8">
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => navigate('/products/create')}
        >
          <AddIcon />
        </Fab>
      </div>
    </>
  )
}

export default ProductsPage
