import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {collection, getDocs, deleteDoc, doc} from 'firebase/firestore'
import {db} from '../firebaseConfig/firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {CSVLink, CSVDownload} from 'react-csv'

const MySwal = withReactContent(Swal)

const Show = () => {
  //1 - configuramos los hooks
  const [products, setProducts] = useState([])
  //2 - referenciamos a la DB firestore
  const productsCollection = collection(db, 'products')
  //3 - funcion para mostrar todos los docs
  const getProducts = async () => {
    const data = await getDocs(productsCollection)
    setProducts(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
  }
  //4 - funcion para eliminar un doc
  const deleteProduct = async (id) => {
    const productDoc = doc(db, 'products', id)
    await deleteDoc(productDoc)
    getProducts()
  }
  //5 - funcion de confirmacion para Sweet Alert 2
  const confirmDelete = (id) => {
    MySwal.fire({
      title: 'Remove the product?',
      text: "You won't be able to revert this action",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // llamamos a la funcion para eliminar
        deleteProduct(id)
        Swal.fire('Deleted', 'Your file has been deleted', 'success')
      }
    })
  }
  //6 - usamos useEffect
  useEffect(() => {
    getProducts()
    // eslint-disable-next-line
  }, [])

  //7 - devolvemos vista del componente
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div className='d-grid gap-2'>
              <Link to='/create' className='btn btn-secondary mt-2 mb-2'>
                Create
              </Link>
            </div>
            <CSVLink data={products}>Download me</CSVLink>;
            <table className='table table-dark table-hover'>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Producto</th>
                  <th>Tamaño</th>
                  <th>Combo</th>
                  <th>Cortesía</th>
                  <th>Gasto Empleado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.fecha}</td>
                    <td>{product.producto}</td>
                    <td>{product.tamano}</td>
                    <td>{product.combo}</td>
                    <td>{product.cortesia}</td>
                    <td>{product.empleado}</td>
                    <td>
                      <Link to={`/edit/${product.id}`} className='btn btn-light'>
                        <i className='fa-solid fa-pencil'></i>
                      </Link>
                      <button
                        className='btn btn-danger'
                        onClick={() => {
                          confirmDelete(product.id)
                        }}
                      >
                        <i className='fa-solid fa-trash'></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Show
