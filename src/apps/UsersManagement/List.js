import React from "react";
import Header from "../../layouts/Header";
import { useBrainStack } from "../../App";

export default function UsersList() {
    const bstack = useBrainStack();
    const { list } = bstack.store.createCRUDObject('users')

    return (
        <React.Fragment>
            <Header />
            <div className='main p-3 p-lg-4'>
                {JSON.stringify(list())}
            </div>
        </React.Fragment>
    )
}