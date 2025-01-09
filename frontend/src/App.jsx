import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Table from 'react-bootstrap/Table';
import { useDeleteCarMutation, useGetCarsQuery, usePostCarMutation } from './rtk query/slices/carSlices';
import { useState } from 'react';

function App() {

  let { data, isLoading, refetch } = useGetCarsQuery()
  let [model, setModel] = useState("")
  let [brand, setBrand] = useState("")
  let [color, setColor] = useState("")
  let [year, setYear] = useState()
  let [isNew, setIsNew] = useState(false)

  let [postCar] = usePostCarMutation()
  let [deleteCar] = useDeleteCarMutation()

  // add 
  const handleSubmit = async (e) => {
    e.preventDefault()
    let newCar = {
      modelName: model,
      brandName: brand,
      color: color,
      year: year,
      isNew: isNew
    }
    await postCar(newCar)
    refetch()
  }
  // delete
  const handleDelete = async (id) => {
    await deleteCar(id)
    refetch()
  }


  return (
    <>
      {
        isLoading ? (
          <h1>...Loading</h1>
        ) : (
          <>
            <div className='select-none'>
              <h1>ADD FORM</h1>
              <form 
              onSubmit={(e) => handleSubmit(e)}
              className='my-5 flex flex-col p-2 text-2xl'>
                <input 
                onChange={(e) => setModel(e.target.value)}
                type="text" 
                value={model} 
                required 
                className='bg-white border-2 border-gray my-2 px-2' 
                placeholder='...enter model name'/>
                <input 
                onChange={(e) => setBrand(e.target.value)}
                type="text" 
                value={brand} 
                required 
                className='bg-white border-2 border-gray my-2 px-2' 
                placeholder='...enter brand name' />
                <input 
                onChange={(e) => setColor(e.target.value)}
                type="text" 
                value={color}
                required 
                className='bg-white border-2 border-gray my-2 px-2' 
                placeholder='...enter color name'/>
                <input 
                onChange={(e) => setYear(e.target.value)}
                type="number" 
                value={year} 
                required 
                className='bg-white border-2 border-gray my-2 px-2' 
                placeholder='...enter year (example: 2022)'/>
                <div className='self-start'>
                  <input
                  onChange={(e) => setIsNew(e.target.checked)}
                  type="checkbox" 
                  id='isNew' name='isNew' 
                  className='bg-white border-2 border-gray my-2 px-2 mr-2' />
                  <label htmlFor="isNew" >Is new?</label>
                </div>
                <button type="submit" className='my-2 border'>Add Car</button>
              </form>
            </div>
            <Table striped bordered hover className='text-xl'>
              <thead>
                <tr className='font-bold'>
                  <td>Model Name</td>
                  <td>Brand Name</td>
                  <td>Color</td>
                  <td>Year</td>
                  <td>Delete</td>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((item) => (
                    <tr key={item._id}  >
                      <td>{item.modelName}</td>
                      <td>{item.brandName}</td>
                      <td>{item.color}</td>
                      <td style={{ color: item.isNew ? "green" : "red" }}>{item.year}</td>
                      <td><button className='bg-gray-500 rounded-2 px-2 text-white py-1' onClick={()=>handleDelete(item._id)}>Delete</button></td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </>
        )
      }

    </>
  )
}

export default App
