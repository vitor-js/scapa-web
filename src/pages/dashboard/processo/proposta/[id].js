import React, { useEffect, useState } from 'react';
import { LayoutDashboardProccess } from '../../../../layouts'
import { HeaderPages, WrapperBody, Input, } from '../../../../components'
import { useRouter } from 'next/router'
import { useProposal } from '../../../../hooks'
import { MdEditDocument } from 'react-icons/md'
import Result from '../../../../components/scapaComponents/requests/components/requestResult'

function Index() {
    const { query } = useRouter()
    const { id } = query


    const { query: request } = useProposal(id)
    const { data: requestData, isLoading, isFetching, isError, refetch } = request;
    const [result, setResult] = useState()

    useEffect(() => {
        if (!requestData) return
        const { Requests, Process, postulated_total_value, total_value, total_value_with_riks, type } = requestData.data
        console.log(Requests, '-Requests--')
        const formatRequest = Requests.map(v => ({
            requestValue: v.type,
            valuePostulate: v.postulated_individual,
            risk: v.risk,
            risk_success: v.risk_success,
            valueIndividual: v.postulated_individual_value,
            ...v

        }))

        setResult({
            type: type,
            valotTotalPostulado: postulated_total_value,
            valueTotalPostulateIndividual: total_value_with_riks,
            valueProposal: total_value,
            requests: formatRequest,
            reu: Process.reu,
            proccess_time: Process.proccess_time,
            title: Process.title,
            description: Process.description,
            autor: Process.autor,
            number_process: Process.number_process,
            custo_reu: Process.reu_cost
        })
    }, [requestData])

    return (
        <LayoutDashboardProccess>

            <HeaderPages title={`Proposta  ${requestData ? requestData.data.type : ""}`} icon={MdEditDocument} />
            <>
                <WrapperBody>
                    <Result result={result} />
                </WrapperBody>
            </>

        </LayoutDashboardProccess>
    )
}


export default Index;