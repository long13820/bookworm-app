import React, { Fragment, useState } from 'react'
import { Card, CardBody, CardHeader, Collapse } from 'reactstrap';

function MyAccordion() {

    const [isOpen,setIsOpen] = useState("");
    const [lists, setLists] = useState([
        {
            _id: "id_category",
            item_names:["Category #1","Category #2","Category #3"],
            list_name:"Category",
            isOpen:false
        },
        {
            _id: "id_author",
            item_names: ["Author #1", "Author #2", "Author #3", "Author #4"],
            list_name: "Author",

        },
        {
            _id: "id_rating_star",
            item_names: ["1 star", "2 stars", "3 stars", "4 stars", "5 stars"],
            list_name: "Rating star",

        }
    ])

    const handleToggle = (index) => {
        let listsClone = [...lists];
        listsClone[index] = {
            ...listsClone[index],
            isOpen: !listsClone[index].isOpen,

            setLists()
        }
    }
  return (
    <Fragment>
        {lists.map((list) => (
            <Card id='accordion' className='mb-1' key={list._id}>
                <CardHeader onClick={() => handleToggle(list._id)}>
                    <strong></strong>
                </CardHeader>
                <Collapse isOpen={isOpen === list._id}>
                    <CardBody>
                        <ul>
                            {list.item_names.map((item) =>
                            {
                                return <li>{item}</li>
                            })}
                        </ul>
                    </CardBody>
                </Collapse>
            </Card>
        ))}
    </Fragment>
  )
}

export default MyAccordion;
