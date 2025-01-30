import Table from 'react-bootstrap/Table';
import { useDeleteCarMutation, useGetCarsQuery, usePostCarMutation } from '../../rtk query/slices/carSlices';
import { NavLink } from 'react-router';


export default function HomePage() {
    let { data, isLoading, refetch } = useGetCarsQuery()
    let [deleteCar] = useDeleteCarMutation(id)

    // delete
    const handleDelete = async (id) => {
        await deleteCar(id)
        refetch()
    }

    return (
        <>
            {
                isLoading ? (
                    <h1 className="font-semibold text-5xl">...Loading</h1>
                ) : (
                    <>
                        <NavLink to={"/add"}>
                            <button className='border-2 border-blue-300 rounded-4 py-1 px-3 my-2 self-start text-2xl select-none'>Add Page</button>
                        </NavLink>
                        <Table striped bordered hover className='text-xl select-none'>
                            <thead>
                                <tr className='font-bold'>
                                    <td>Model Name</td>
                                    <td>Brand Name</td>
                                    <td>Color</td>
                                    <td>Year</td>
                                    <td>Delete</td>
                                    <td>Info</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.length !=0 ? (
                                        data.map((item) => (
                                            <tr key={item._id}  >
                                                <td>{item.modelName}</td>
                                                <td>{item.brandName}</td>
                                                <td>{item.color}</td>
                                                <td style={{ color: item.isNew ? "green" : "red" }}>{item.year}</td>
                                                <td><button className='bg-gray-500 rounded-2 px-2 text-white py-1' onClick={() => handleDelete(item._id)}>Delete</button></td>
                                                <td>
                                                    <NavLink to={`/detail/${item._id}`}>
                                                        <button className='bg-gray-500 rounded-2 px-2 text-white py-1'>Info</button>
                                                    </NavLink>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <h1>There is no information in your database</h1>
                                    )
                                }
                            </tbody>
                        </Table>
                    </>
                )
            }

        </>
    )
}