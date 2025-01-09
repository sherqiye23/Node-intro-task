import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import { useGetCarsQuery, usePostCarMutation } from '../../rtk query/slices/carSlices';
import { useNavigate } from 'react-router';


export default function AddPage() {
    let { isLoading, refetch } = useGetCarsQuery()

    let [model, setModel] = useState("")
    let [brand, setBrand] = useState("")
    let [color, setColor] = useState("")
    let [year, setYear] = useState()
    let [isNew, setIsNew] = useState(false)

    let [postCar] = usePostCarMutation()

    let navigate = useNavigate()

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
        navigate("/")
    }

    return (
        <>
            {
                isLoading ? (
                    <h1 className="font-semibold text-5xl">...Loading</h1>
                ) : (
                    <>
                        <div className='select-none'>
                            <h1 className='font-semibold text-5xl'>ADD FORM</h1>
                            <form
                                onSubmit={(e) => handleSubmit(e)}
                                className='my-2 flex flex-col p-2 text-2xl w-[500px]'>
                                <input
                                    onChange={(e) => setModel(e.target.value)}
                                    type="text"
                                    value={model}
                                    required
                                    className='bg-white border-2 border-gray my-2 px-2 w-full'
                                    placeholder='...enter model name' />
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
                                    placeholder='...enter color name' />
                                <input
                                    onChange={(e) => setYear(e.target.value)}
                                    type="number"
                                    value={year}
                                    required
                                    className='bg-white border-2 border-gray my-2 px-2'
                                    placeholder='...enter year (example: 2022)' />
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
                    </>
                )
            }

        </>
    )
}