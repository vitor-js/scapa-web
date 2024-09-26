import React from "react"
import Components from '../../../../../../components/scapaComponents/requests/components/index'


const Index = ({ requests = [], createRequest, setOpenSelect, setDraftRequest, removeRequest, calcAndSave, custonEditFunction }) => {
    return <>
        <Components.requestList createRequest={createRequest} custonEditFunction={custonEditFunction} requests={requests} setOpenSelect={setOpenSelect} setDraftRequest={setDraftRequest} custonEdit={true} removeRequest={removeRequest} calcAndSave={calcAndSave} />
    </>
}

export default Index