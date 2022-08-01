import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {collection, addDoc} from 'firebase/firestore'
import {db} from '../firebaseConfig/firebase'
import {hamburguesas, tamanos} from '../helpers/data'
import {ReactSearchAutocomplete} from 'react-search-autocomplete'

const Create = () => {
  const [fecha, setFecha] = useState('')
  const [producto, setProducto] = useState('')
  const [tamano, setTamano] = useState('')
  const [combo, setCombo] = useState('')
  const [cortesia, setCortesia] = useState('')
  const [empleado, setEmpleado] = useState(false)
  const [promo, setPromo] = useState(false)
  const [holdDate, setHoldDate] = useState(false)
  const navigate = useNavigate()

  const productsCollection = collection(db, 'products')

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
  }

  const formatResult = (item) => {
    return (
      <p dangerouslySetInnerHTML={{__html: '<strong>' + item.name + '</strong>'}}></p>
    ) //To format result as html
  }

  const store = async (e) => {
    e.preventDefault()
    await addDoc(productsCollection, {
      combo,
      cortesia,
      empleado: false,
      fecha,
      producto: producto.name,
      promo: false,
      tamano: tamano.name,
    })

    // clean fields
    //clean()
    //navigate('/create')
  }

  const clean = () => {
    setCombo(false)
    setCortesia(false)
    setEmpleado(false)
    setPromo(false)
    setProducto('')
    setTamano('')
    document.getElementById('fecha').focus()
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1>Ingresar data</h1>
          <div className='container px-5 my-5'>
            <form id='contactForm' data-sb-form-api-token='API_TOKEN'>
              <div className='form-floating mb-3'>
                <input
                  className='form-control'
                  id='fecha'
                  type='text'
                  placeholder='Fecha'
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
                <label htmlFor='fecha'>Fecha</label>
              </div>
              <div className='form-floating mb-3'>
                <select
                  className='form-select'
                  id='combo'
                  aria-label='Combo'
                  onChange={(e) => {
                    setCombo(e.target.value)
                    if (combo == '10x15' || combo == 'trio4' || combo == 'trio')
                      setTamano('Mini')

                    if (combo == '4x20' || combo == '5x25' || combo == '6x30')
                      setTamano('Junior')
                  }}
                >
                  <option value={'ninguno'} defaultValue>
                    Ninguno
                  </option>
                  <option value={'10x15'}>10x15</option>
                  <option value={'4x20'}>4x20</option>
                  <option value={'5x25'}>5x25</option>
                  <option value={'6x30'}>6x30</option>
                  <option value={'trio4'}>Trio de 4</option>
                  <option value={'trio'}>Delta</option>
                </select>
                <label htmlFor='combo'>Combo</label>
              </div>
              <div className='form-floating mb-3'>
                <ReactSearchAutocomplete
                  items={hamburguesas}
                  onSelect={(item) => {
                    setProducto(item)
                    if (item.name == 'Hamburguesa de queso') setTamano('Junior')
                  }}
                  formatResult={formatResult}
                  placeholder='Producto'
                  id='producto'
                  value={producto}
                  className='form-control'
                  styling={{borderRadius: '4px'}}
                />
              </div>
              <div className='form-floating mb-3'>
                <ReactSearchAutocomplete
                  items={tamanos}
                  onSelect={(tamano) => setTamano(tamano)}
                  formatResult={formatResult}
                  placeholder='Tamaño'
                  value={() => tamano}
                  id='tamano'
                  className='form-control'
                  styling={{borderRadius: '4px'}}
                />
              </div>
              {/* <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  id='cortesia'
                  type='checkbox'
                  name='opciones'
                  checked={cortesia}
                  onChange={() => setCortesia(!cortesia)}
                />
                <label className='form-check-label' htmlFor='cortesia'>
                  Cortesia
                </label>
              </div> */}
              {/* <div className='mb-3'>
                <label className='form-label d-block'>Opciones</label>
                <div className='form-check form-check-inline'>
                  <input
                    className='form-check-input'
                    id='empleado'
                    type='checkbox'
                    name='opciones'
                    checked={empleado}
                    onChange={() => setEmpleado(!empleado)}
                  />
                  <label className='form-check-label' htmlFor='empleado'>
                    Empleado
                  </label>
                </div>

                <div className='form-check form-check-inline'>
                  <input
                    className='form-check-input'
                    id='promo'
                    type='checkbox'
                    name='opciones'
                    checked={promo}
                    onChange={() => setPromo(!promo)}
                  />
                  <label className='form-check-label' htmlFor='promo'>
                    Promo
                  </label>
                </div>
              </div>
              <div className='mb-3'>
                <div className='form-check form-switch'>
                  <input
                    className='form-check-input'
                    id='mantenerFecha'
                    type='checkbox'
                    name='mantenerFecha'
                    checked={holdDate}
                    onChange={() => setHoldDate(!holdDate)}
                  />
                  <label className='form-check-label' htmlFor='mantenerFecha'>
                    Mantener fecha
                  </label>
                </div>
              </div> */}

              <div className='d-grid'>
                <button
                  className='btn btn-primary btn-lg'
                  id='submitButton'
                  type='button'
                  onClick={store}
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create
