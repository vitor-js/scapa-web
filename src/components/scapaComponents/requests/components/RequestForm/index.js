import React, { useState, useEffect } from 'react';
import { Box, Flex, Button, Text } from "@chakra-ui/react"
import { MdAddCircle } from "react-icons/md";
import { useColors } from '../../../../../hooks'
import Select from '../../../../form/select'
import Input from '../../../../form/input'
import { toCurrencyScreen, currencyToBackend, } from '../../../../../helpers'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import CalculeComponents from './components'
import calc from '../../../../../helpers/calcs'

import { toast } from 'react-hot-toast';

const ACTIONS = [
    {
        label: "Horas Extras",
        value: "Horas Extras"
    }
    ,
    {
        label: "Intervalo Intrajornada",
        value: "Intervalo Intrajornada"
    },
    {
        label: "Verbas Rescisórias",
        value: "Verbas Rescisórias"
    },

    {
        label: "Pausas não realizadas",
        value: "Pausas não realizadas"
    },
    {
        label: "Repouso Semanal Remunerado",
        value: "Repouso Semanal Remunerado"
    },
    {
        label: "Adicional Noturno",
        value: "Adicional Noturno"
    },
    {
        label: "Adicional de Insalubridade",
        value: "Adicional de Insalubridade"
    },
    {
        label: "Adicional de Periculosidade",
        value: "Adicional de Periculosidade"
    },


    {
        label: "Diferenças salariais por equiparação salarial",
        value: "Diferenças salariais por equiparação salarial"
    }, {
        label: "Diferenças salariais por acúmulo de função",
        value: "Diferenças salariais por acúmulo de função"
    },
    {
        label: "Diferenças salariais convencionais",
        value: "Diferenças salariais convencionais"
    },
    {
        label: "Diferenças reflexas de vantagens salariais",
        value: "Diferenças reflexas de vantagens salariais"
    },
    {
        label: "Diferenças salariais (genérico)",
        value: "Diferenças salariais (genérico)"
    },

    {
        label: "Indenização por danos materiais",
        value: "Indenização por danos materiais"
    },
    {
        label: "Indenização por danos morais",
        value: "Indenização por danos morais"
    },
    {
        label: "Indenização estabilitária",
        value: "Indenização estabilitária"
    },
    {
        label: "Décimo terceiro integral",
        value: "Décimo terceiro integral"
    },
    {
        label: "Décimo terceiro proporcional",
        value: "Décimo terceiro proporcional"
    },
    {
        label: "Férias integrais",
        value: "Férias integrais"
    },
    {
        label: "Férias proporcionais",
        value: "Férias proporcionais"
    },
    {
        label: "Depósitos do FGTS",
        value: "Depósitos do FGTS"
    },
    {
        label: "Aviso prévio indenizado",
        value: "Aviso prévio indenizado"
    },
    {
        label: "Multa de 40% dos depósitos do FGTS",
        value: "Multa de 40% dos depósitos do FGTS"
    },
    {
        label: "Multa do art. 477 da CLT",
        value: "Multa do art. 477 da CLT"
    },
    {
        label: "Multa do art. 467 da CLT",
        value: "Multa do art. 467 da CLT"
    },
    {
        label: "Multa convencional",
        value: "Multa convencional"
    },
    {
        label: "Auxílio Alimentação",
        value: "Auxílio Alimentação"
    },
    {
        label: "Vale transporte",
        value: "Vale transporte"
    },
    {
        label: "Valores totais devidos por reconhecimento do vínculo de emprego",
        value: "Valores totais devidos por reconhecimento do vínculo de emprego"
    },
    {
        label: "Valores totais decorrentes de reintegração",
        value: "Valores totais decorrentes de reintegração"
    },
    {
        label: "Outros",
        value: "Outros"
    }
];

const RISK_TABLE = {
    Inexistente: 0.0,
    "Muito Baixo": 0.1,
    Baixo: 0.25,
    Médio: 0.5,
    Alto: 0.75,
    "Muito Alto": 0.9,
    Total: 1.0,
};

const RISK_TABLE_REVERSE = {
    0: "Inexistente",
    10: "Muito Baixo",
    25: "Baixo",
    50: "Médio",
    75: "Alto",
    90: "Muito Alto",
    100: "Total",
};

const OPTIONS_RIK = [

    {
        label: "Inexistente",
        value: 'Inexistente'
    },
    {
        label: "Muito Baixo",
        value: "Muito Baixo"
    },
    {
        label: "Baixo",
        value: 'Baixo'
    },
    {
        label: "Médio",
        value: 'Médio'
    },
    {
        label: "Alto",
        value: 'Alto'
    },
    {
        label: "Muito Alto",
        value: 'Muito Alto'
    },
    {
        label: "Total",
        value: 'Total'
    }
]

const VALUES_WITH_CALCS = ["Diferenças salariais por equiparação salarial",
    "Diferenças salariais por acúmulo de função",
    "Diferenças salariais convencionais",
    "Diferenças reflexas de vantagens salariais",
    "Diferenças salariais (genérico)",
    "Adicional de Insalubridade",
    "Verbas Rescisórias"
]

const VALUES_WITH_CALCS_DIFF_SALARY = ["Diferenças salariais por equiparação salarial",
    "Diferenças salariais por acúmulo de função",
    "Diferenças salariais convencionais",
    "Diferenças reflexas de vantagens salariais",
    "Diferenças salariais (genérico)",

]

const INSALUBRIDADE = ["Adicional de Insalubridade"]
const VERBAS = ["Verbas Rescisórias"]

function Index({ handleAddNewRequest, draftRequest, setOpenSelect, handleUpdateRequest, data }) {
    const colors = useColors()
    const [individualValue, setIndividualValue] = useState()
    const [individualValueWithRisk, setIndividualValueWithRisk] = useState()
    const [insalubridadeSalary, setInsalubridadeSalary] = useState([])
    const [risk, setRisk] = useState()
    const [ratio, setRatio] = useState()
    const [salaryValue, setSalaryValue] = useState()

    const schema = yup.object().shape({
        pedido: yup
            .string()
            .required('Este campo é origatório'),
        valor_individual_postulado: yup.string().required('Este campo é origatório'),
        risco: yup.string().required('Este campo é origatório'),
        // diff_value_salary: yup.string().required('Este campo é origatório'),
        // diff_salary_type: yup.string().required('Este campo é origatório'),
        valor_individual_postulado: yup.lazy((value) => {
            if (value !== undefined && value !== "") {
                return yup.string().required('Este campo é origatório');
            }
            return yup.string().nullable().optional();
        }),
        diff_salary_type: yup.lazy((value) => {
            if (value !== undefined && value !== "") {
                return yup.string().required('Este campo é origatório');
            }
            return yup.string().nullable().optional();
        }),
        diff_value_salary: yup.lazy((value) => {
            if (value !== undefined && value !== "") {
                return yup.string().required('Este campo é origatório');
            }
            return yup.string().nullable().optional();
        }),
        insalubridade_grau: yup.lazy((value) => {
            if (value !== undefined && value !== " ") {
                return yup.string().required('Este campo é origatório');
            }
            return yup.string().nullable().optional();
        }),
    })

    const {
        handleSubmit,
        getValues,
        register,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const submit = async (values) => {

        const pedido = getValues("pedido")
        const newRequest = {
            requestValue: pedido,
            valuePostulate: valor_individual_postulado,
            risk: risk,
            riskSuccess: ratio,
            valueIndividual: individualValueWithRisk,
        };

        try {
            if (VALUES_WITH_CALCS.includes(valueRequest)) {
                if (VALUES_WITH_CALCS_DIFF_SALARY.includes(valueRequest)) {
                    const { valueIndividual, valuePostulate } = calc.diffSalaty(values.diff_salary_type, values.diff_value_salary, data.data, RISK_TABLE[risk])
                    const requestUpdate = {
                        ...newRequest,
                        diference_type: values.diff_salary_type,
                        diference_value: parseFloat(currencyToBackend(values.diff_value_salary))
                    }

                    finishRequest(requestUpdate, valuePostulate, valueIndividual)
                    return
                }

                if (INSALUBRIDADE.includes(valueRequest)) {
                    const sumMonths = insalubridadeSalary.reduce(function (accumulator, value) {
                        return accumulator + value.time
                    }, 0);

                    const sumValues = insalubridadeSalary.reduce(function (accumulator, value) {
                        return accumulator + (value.time * value.value)
                    }, 0);

                    const salaryMedia = sumValues / sumMonths

                    const { valueIndividual, valuePostulate } = calc.insalubridade(data.data, values.insalubridade_grau, RISK_TABLE[risk], salaryMedia)
                    const requestUpdate = {
                        ...newRequest,
                        insalubridade_grau: values.insalubridade_grau,
                        insalubridade_salario: { data: insalubridadeSalary }
                    }
                    finishRequest(requestUpdate, valuePostulate, valueIndividual)
                    return
                }

                if (VERBAS.includes(valueRequest)) {
                    const { valueIndividual, valuePostulate } = calc.calcVerbasRescisorias(data.data, values.termination_type, RISK_TABLE[risk], values.have_vacation)
                    const requestUpdate = {
                        ...newRequest,
                        have_vacation: values.have_vacation === "Sim" ? true : false,
                        termination_type: values.termination_type
                    }
                    finishRequest(requestUpdate, valuePostulate, valueIndividual)
                    return
                }
            }

            const valor_individual_postulado = getValues("valor_individual_postulado")
            // finishRequest(newRequest, valor_individual_postulado, individualValueWithRisk)
        } catch (e) {
            console.log(e)
            toast.error("Algo deu errado, tente novamente!")
        }


    }

    const finishRequest = (value, valuePostulate, valueIndividual) => {

        const newRequest = {
            ...value,
            valuePostulate: valuePostulate,
            valueIndividual: valueIndividual,
        }
        console.log(newRequest)
        if (draftRequest) return handleUpdateRequest(newRequest)
        return handleAddNewRequest(newRequest)
    }

    useEffect(() => {
        if (!individualValue || individualValue === "" || risk === "") {
            return;
        }
        const getRatio = RISK_TABLE[risk];
        setRatio(getRatio * 100)
        const ApplyRatio = currencyToBackend(individualValue) * getRatio;
        setIndividualValueWithRisk(toCurrencyScreen(ApplyRatio));
        setValue("valor_individualizado", toCurrencyScreen(ApplyRatio))
    }, [individualValue, risk]);

    useEffect(() => {

        if (!draftRequest) return
        console.log(draftRequest, '---')

        setValue("pedido", draftRequest.requestValue)
        setValue("valor_individual_postulado", draftRequest.valuePostulate)
        setValue("ratio", `${draftRequest.riskSuccess}`)
        setValue("valor_individualizado", draftRequest.valueIndividual)
        setValue("risco", RISK_TABLE_REVERSE[draftRequest.riskSuccess])


        setRisk(RISK_TABLE_REVERSE[draftRequest.riskSuccess])
        setIndividualValue(toCurrencyScreen(draftRequest.valuePostulate))
        update()
    }, [draftRequest])

    const update = () => {
        if (!individualValue || individualValue === "" || risk === "") {
            return;
        }
        const getRatio = RISK_TABLE[risk];
        setRatio(getRatio * 100)
        const ApplyRatio = currencyToBackend(individualValue) * getRatio;
        setIndividualValueWithRisk(toCurrencyScreen(ApplyRatio));
        setValue("valor_individualizado", toCurrencyScreen(ApplyRatio))
    }


    const valueRequest = watch('pedido')

    useEffect(() => {
        if (!data) return
        const { salary } = data.data
        console.log(data.data)
        setSalaryValue(salary ? salary : undefined)
    }, [data])


    useEffect(() => {
        console.log(data)
        if (!data) return
        const { salary } = data.data
        console.log(data.data)
        setSalaryValue(salary ? salary : undefined)
    }, [])





    return (
        <Flex
            cursor={'pointer'}
            as='form'
            onSubmit={handleSubmit(submit)}
            w={'100%'} flexDirection={'column'}>

            <Text fontSize={20} mt={5} fontWeight={400}  >
                Crie seu pedido
            </Text>

            <Box w={'100%'} mt={5}>
                <Select label='Tipo de pedido' options={ACTIONS}
                    {...register('pedido')}
                    error={errors?.pedido?.message}
                    name='pedido'
                />
            </Box>


            <Box w={'100%'} mt={5}>
                <Input label='Valor individual postulado'
                    {...register('valor_individual_postulado')}
                    error={errors?.valor_individual_postulado?.message}
                    name='valor_individual_postulado'
                    value={individualValue}
                    onChange={(e) => {
                        setIndividualValue(e.target.value)
                    }}
                    mask='currency' />
            </Box>

            <Box w={'100%'} mt={5}>
                <Select
                    {...register('risco')}
                    value={risk}
                    onChange={(e) => {
                        setRisk(e.target.value)
                    }}

                    name='risco'
                    error={errors?.risco?.message}
                    label='Risco' options={OPTIONS_RIK} />
            </Box>



            {!VALUES_WITH_CALCS.includes(valueRequest) || salaryValue === undefined ? <>

                <Box w={'100%'} mt={5}>
                    <Input mask='currency'
                        {...register('ratio')}

                        name='ratio'
                        label='Risco de exito' value={ratio} disabled={true} />
                </Box>


            </> : null}


            {!VALUES_WITH_CALCS.includes(valueRequest) || salaryValue === undefined ? <>

                <Box w={'100%'} mt={5}>

                    <Input mask='currency'
                        {...register('valor_individualizado')}
                        name='valor_individualizado'
                        label='Valor individualizado' disabled={true} />
                </Box>


            </> : null}


            {VALUES_WITH_CALCS_DIFF_SALARY.includes(valueRequest) && salaryValue !== undefined ?
                <>
                    <CalculeComponents.DiffSalary
                        register={register} errors={errors} data={data} draftRequest={draftRequest} setValue={setValue}
                    />
                </> : null
            }

            {INSALUBRIDADE.includes(valueRequest) && salaryValue !== undefined ?
                <>
                    <CalculeComponents.Insalubridade
                        insalubridadeSalary={insalubridadeSalary} setInsalubridadeSalary={setInsalubridadeSalary} register={register} errors={errors} data={data} draftRequest={draftRequest} setValue={setValue}
                    />
                </> : null
            }

            {VERBAS.includes(valueRequest) && salaryValue !== undefined ?
                <>
                    <CalculeComponents.Verbas
                        register={register} errors={errors} data={data} draftRequest={draftRequest} setValue={setValue}
                    />
                </> : null
            }

            <Flex mt={5} alignItems={'center'} justifyContent={'end'}>
                <Text cursor={'pointer'} onClick={() => { setOpenSelect(false) }} mr={5}>
                    Voltar
                </Text>
                <Button type='submit'>
                    Salvar
                </Button>
            </Flex>






        </Flex>
    );
}

export default Index;