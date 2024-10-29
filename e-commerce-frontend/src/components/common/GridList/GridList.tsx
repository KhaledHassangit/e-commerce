import React from 'react'
import { Col, Row } from 'react-bootstrap';
import LottieHandler from '../Lottie/LottierHandler';


type GridListProps<T> = {
    records: T[];
    renderItem: (record: T) => React.ReactNode
    emptyMessage:string
}

type HasId = {id?:number}
const GridList = <T extends HasId>({ records, renderItem,emptyMessage}: GridListProps<T>) => {

    const allItems = records.length > 0 ? records.map((record => {
        return (
            <Col md="3" sm="6" key={record.id} className="d-flex justify-content-center mb-5 mt-2">
                {renderItem(record)}
            </Col>
        )
    })) : <LottieHandler type="empty" message={emptyMessage}/>

    return (
        <Row>
            {allItems}
        </Row>
    )
}

export default GridList
