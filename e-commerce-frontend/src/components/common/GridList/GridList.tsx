import React from 'react'
import { Col, Row } from 'react-bootstrap';


type GridListProps<T> = {
    records: T[];
    renderItem: (record: T) => React.ReactNode
}

type HasId = {id?:number}
const GridList = <T extends HasId>({ records, renderItem }: GridListProps<T>) => {

    const allItems = records.length > 0 ? records.map((record => {
        return (
            <Col md="3" sm="6" key={record.id} className="d-flex justify-content-center mb-5 mt-2">
                {renderItem(record)}
            </Col>
        )
    })) : "No Items Are Available Yet"

    return (
        <Row>
            {allItems}
        </Row>
    )
}

export default GridList
