import { useNavigate, useParams } from "react-router"
import { useGetCarByIdQuery } from "../../rtk query/slices/carSlices";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function DetailPage() {
    let navigate = useNavigate()
    let { id } = useParams()
    let { data, isLoading } = useGetCarByIdQuery(id)

    return (
        <>
            {
                isLoading ? (
                    <h1 className="font-semibold text-5xl">...Loading</h1>
                ) : (
                    <div>
                        <Card>
                            <Card.Body>
                                <Card.Title>Model name: {data.modelName}</Card.Title>
                                <Card.Title>Brand name: {data.brandName}</Card.Title>
                                <Card.Title style={{color: data.color}}>Color: {data.color}</Card.Title>
                                <Card.Title style={{ color: data.isNew ? "green" : "red" }}>{data.isNew ? "Is New" : "Not New"}</Card.Title>
                                <Card.Title>Year: {data.year}</Card.Title>
                                <Button variant="secondary" onClick={() => navigate("/")}>Go back</Button>
                            </Card.Body>
                        </Card>
                    </div>
                )
            }
        </>
    )
}