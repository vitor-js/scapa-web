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
        label: "Horas Extras - (com cálculo)",
        value: "Horas Extras"
    }
    ,
    {
        label: "Intervalo Intrajornada - (com cálculo)",
        value: "Intervalo Intrajornada"
    },
    {
        label: "Verbas Rescisórias - (com cálculo)",
        value: "Verbas Rescisórias"
    },

    {
        label: "Pausas não realizadas - (com cálculo)",
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
        label: "Adicional de Insalubridade - (com cálculo)",
        value: "Adicional de Insalubridade"
    },
    {
        label: "Adicional de Periculosidade - (com cálculo)",
        value: "Adicional de Periculosidade"
    },


    {
        label: "Diferenças salariais por equiparação salarial - (com cálculo)",
        value: "Diferenças salariais por equiparação salarial"
    }, {
        label: "Diferenças salariais por acúmulo de função - (com cálculo)",
        value: "Diferenças salariais por acúmulo de função"
    },
    {
        label: "Diferenças salariais convencionais - (com cálculo)",
        value: "Diferenças salariais convencionais"
    },
    {
        label: "Diferenças reflexas de vantagens salariais - (com cálculo)",
        value: "Diferenças reflexas de vantagens salariais"
    },
    {
        label: "Diferenças salariais (genérico) - (com cálculo)",
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
        label: "Décimo terceiro integral - (com cálculo)",
        value: "Décimo terceiro integral"
    },
    {
        label: "Décimo terceiro proporcional - (com cálculo)",
        value: "Décimo terceiro proporcional"
    },
    {
        label: "Férias integrais - (com cálculo)",
        value: "Férias integrais"
    },
    {
        label: "Férias proporcionais - (com cálculo)",
        value: "Férias proporcionais"
    },
    {
        label: "Depósitos do FGTS - (com cálculo)",
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
    "Verbas Rescisórias",
    "Horas Extras",
    "Intervalo Intrajornada",
    "Férias integrais",
    "Férias proporcionais",
    "Depósitos do FGTS",
    "Décimo terceiro integral",
    "Décimo terceiro proporcional",
    "Adicional de Periculosidade"


]

const VALUES_WITH_CALCS_DIFF_SALARY = ["Diferenças salariais por equiparação salarial",
    "Diferenças salariais por acúmulo de função",
    "Diferenças salariais convencionais",
    "Diferenças reflexas de vantagens salariais",
    "Diferenças salariais (genérico)",

]

const INSALUBRIDADE = ["Adicional de Insalubridade"]
const VERBAS = ["Verbas Rescisórias"]
const HORA_EXTRA = ["Horas Extras"]
const INTERVALO = ["Intervalo Intrajornada"]

const FERIAS = ["Férias proporcionais"]
const FERIAS_INTEGRAIS = ["Férias integrais"]
const FGTS = ["Depósitos do FGTS"]

const DECIMO_TERCEIRO = ["Décimo terceiro integral"]
const DECIMO_TERCEIRO_PROPORCIONAL = ["Décimo terceiro proporcional"]

const ADIOCIONAL_PERICULOSIDADE = ["Adicional de Periculosidade"]


function Index({ handleAddNewRequest, draftRequest, setOpenSelect, handleUpdateRequest, data }) {
    const colors = useColors()
    const [individualValue, setIndividualValue] = useState()
    const [individualValueWithRisk, setIndividualValueWithRisk] = useState()
    const [insalubridadeSalary, setInsalubridadeSalary] = useState([])
    const [extraHour, setExtraHour] = useState([])
    const [risk, setRisk] = useState()
    const [ratio, setRatio] = useState()
    const [salaryValue, setSalaryValue] = useState()
    const [interval, setInterval] = useState([])
    const [haveCalc, setHaveCalc] = useState()
    const schema = yup.object().shape({
        pedido: yup
            .string()
            .required('Este campo é origatório'),
        valor_individual_postulado: yup.lazy((value) => {
            if (value !== undefined && value !== "") {
                return yup.string().required('Este campo é origatório');
            }
            return yup.string().nullable().optional();
        }),
        risco: yup.lazy((value) => {
            if (value !== undefined && value !== "") {
                return yup.string().required('Este campo é origatório');
            }
            return yup.string().nullable().optional();
        }),


        // diff_value_salary: yup.string().required('Este campo é origatório'),
        // diff_salary_type: yup.string().required('Este campo é origatório'),
        custon_request: yup.lazy((value) => {
            if (value !== undefined && value !== "") {
                return yup.string().required('Este campo é origatório');
            }
            return yup.string().nullable().optional();
        }),
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
        console.log(values)
        const pedido = getValues("pedido")
        const custonPeido = getValues("custon_request")
        const newRequest = {
            requestValue: pedido === "Outros" ? custonPeido : pedido,
            // valuePostulate: valor_individual_postulado,
            risk: risk,
            riskSuccess: RISK_TABLE[risk] * 100,
            risk_success: RISK_TABLE[risk] * 100,
            // valueIndividual: individualValueWithRisk,
        };

        console.log(newRequest, 'newRequestnewRequest')

        try {

            if (!salaryValue) {
                const valor_individual_postulado = getValues("valor_individual_postulado")
                finishRequest(newRequest, valor_individual_postulado, individualValueWithRisk)
                return
            }


            if (VALUES_WITH_CALCS.includes(valueRequest)) {
                if (VALUES_WITH_CALCS_DIFF_SALARY.includes(valueRequest)) {
                    const { valueIndividual, valuePostulate, reflex, principal } = calc.diffSalaty(values.diff_salary_type, values.diff_value_salary, data.data, RISK_TABLE[risk])



                    const requestUpdate = {
                        ...newRequest,
                        diference_type: values.diff_salary_type,
                        diference_value: parseFloat(currencyToBackend(values.diff_value_salary)),
                        reflex,
                        principal
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


                    const { valueIndividual, valuePostulate, reflex, principal } = calc.insalubridade(data.data, values.insalubridade_grau, RISK_TABLE[risk], salaryMedia)
                    const requestUpdate = {
                        ...newRequest,
                        insalubridade_grau: values.insalubridade_grau,
                        insalubridade_salario: { data: insalubridadeSalary },
                        reflex,
                        principal
                    }
                    finishRequest(requestUpdate, valuePostulate, valueIndividual)
                    return
                }

                if (VERBAS.includes(valueRequest)) {
                    const { valueIndividual, valuePostulate, reflex } = calc.calcVerbasRescisorias(data.data, values.termination_type, RISK_TABLE[risk], values.have_vacation)
                    const requestUpdate = {
                        ...newRequest,
                        have_vacation: values.have_vacation === "Sim" ? true : false,
                        termination_type: values.termination_type,
                        reflex
                    }

                    finishRequest(requestUpdate, valuePostulate, valueIndividual)
                    return
                }
                if (HORA_EXTRA.includes(valueRequest)) {
                    const objectHoraExtra = values.extra_hour_variation !== "Sim" ? {
                        data: [{
                            hora_inicio_jornada: values.hora_inicio_jornada,
                            hora_fim_jornada: values.hora_fim_jornada,
                            hora_inicio_intervalo: values.hora_inicio_intervalo,
                            hora_fim_intervalo: values.hora_fim_intervalo,
                            days_working_week: values.days_working_week

                        }]
                    } : { data: extraHour }
                    const { valueIndividual, valuePostulate, reflex, principal } = calc.calcHoraExtra(data.data, values.extra_hour_variation, RISK_TABLE[risk], extraHour, values.week_limit, values)
                    const requestUpdate = {
                        ...newRequest,
                        extra_hour_variation: values.extra_hour_variation === "Sim" ? true : false,
                        extra_hour_object: objectHoraExtra,
                        week_limit: values.week_limit,
                        reflex,
                        principal,
                        days_working_week: parseInt(values.days_working_week)

                    }
                    console.log(requestUpdate, 'requestUpdate', values)
                    finishRequest(requestUpdate, valuePostulate, valueIndividual)
                    return
                }

                if (INTERVALO.includes(valueRequest)) {
                    const interval_object = values.extra_hour_variation !== "Sim" ? {
                        data: [{
                            days_whiout_interval: values.days_whiout_interval,
                            hora_inicio_intervalo: values.hora_inicio_intervalo,
                            hora_fim_intervalo: values.hora_fim_intervalo,
                            week_limit: values.week_limit,
                            days_whiout_interval: values.days_whiout_interval

                        }]
                    } : { data: interval }

                    const { valueIndividual, valuePostulate } = calc.calcIntervalo(data.data, values.interval_variation, RISK_TABLE[risk], interval, values)
                    const requestUpdate = {
                        ...newRequest,
                        interval_variation: values.interval_variation === "Sim" ? true : false,
                        interval_object: interval_object,
                        week_limit: values.week_limit,
                        days_whiout_interval: values.days_whiout_interval


                    }
                    finishRequest(requestUpdate, valuePostulate, valueIndividual)
                    return
                }

                if (FERIAS.includes(valueRequest)) {
                    const { valueIndividual, valuePostulate } = calc.feriasProporcionais(data.data, RISK_TABLE[risk])
                    const requestUpdate = {
                        ...newRequest,

                    }
                    finishRequest(requestUpdate, valuePostulate, valueIndividual)
                    return
                }


                if (FERIAS_INTEGRAIS.includes(valueRequest)) {
                    console.log(values)
                    const { valueIndividual, valuePostulate } = calc.feriasIntegrais(data.data, RISK_TABLE[risk])
                    const requestUpdate = {
                        ...newRequest,

                    }
                    finishRequest(requestUpdate, valuePostulate, valueIndividual)
                    return
                }

                if (FGTS.includes(valueRequest)) {
                    const { valueIndividual, valuePostulate } = calc.fgts_calc_pure(data.data, RISK_TABLE[risk])
                    const requestUpdate = {
                        ...newRequest,

                    }
                    finishRequest(requestUpdate, valuePostulate, valueIndividual)
                    return
                }

                if (DECIMO_TERCEIRO.includes(valueRequest)) {
                    const { valueIndividual, valuePostulate } = calc.decimoTerceiroIntegral(data.data, RISK_TABLE[risk])
                    const requestUpdate = {
                        ...newRequest,

                    }
                    finishRequest(requestUpdate, valuePostulate, valueIndividual)
                    return
                }

                if (DECIMO_TERCEIRO_PROPORCIONAL.includes(valueRequest)) {
                    const { valueIndividual, valuePostulate } = calc.decimoTerceiroProporcional(data.data, RISK_TABLE[risk])
                    const requestUpdate = {
                        ...newRequest,

                    }
                    finishRequest(requestUpdate, valuePostulate, valueIndividual)
                    return
                }

                if (ADIOCIONAL_PERICULOSIDADE.includes(valueRequest)) {
                    const { valueIndividual, valuePostulate, reflex, principal } = calc.adicionalPericulosidade(data.data, RISK_TABLE[risk])
                    const requestUpdate = {
                        ...newRequest,
                        reflex, principal

                    }
                    finishRequest(requestUpdate, valuePostulate, valueIndividual)
                    return
                }
            }

            const valor_individual_postulado = getValues("valor_individual_postulado")
            finishRequest(newRequest, valor_individual_postulado, individualValueWithRisk)
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
        console.log(newRequest, '--------')
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
        const { salary, have_calc } = data.data

        setHaveCalc(have_calc)
        setSalaryValue(salary ? salary : undefined)
    }, [data])







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

            {valueRequest === "Outros" &&
                <Box w={'100%'} mt={5}>
                    <Input label='Escreva o nome do pedido'
                        {...register('custon_request')}
                        error={errors?.custon_request?.message}
                        name='custon_request'

                    />
                </Box>
            }


            {!VALUES_WITH_CALCS.includes(valueRequest) || salaryValue === undefined ? <>
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
            </> : null
            }


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



            {
                !VALUES_WITH_CALCS.includes(valueRequest) || salaryValue === undefined ? <>

                    <Box w={'100%'} mt={5}>
                        <Input mask='currency'
                            {...register('ratio')}

                            name='ratio'
                            label='Risco de exito' value={ratio} disabled={true} />
                    </Box>


                </> : null
            }


            {
                !VALUES_WITH_CALCS.includes(valueRequest) || salaryValue === undefined ? <>

                    <Box w={'100%'} mt={5}>

                        <Input mask='currency'
                            {...register('valor_individualizado')}
                            name='valor_individualizado'
                            label='Valor individualizado' disabled={true} />
                    </Box>


                </> : null
            }


            {
                VALUES_WITH_CALCS_DIFF_SALARY.includes(valueRequest) && salaryValue !== undefined ?
                    <>
                        <CalculeComponents.DiffSalary
                            register={register} errors={errors} data={data} draftRequest={draftRequest} setValue={setValue}
                        />
                    </> : null
            }

            {
                INSALUBRIDADE.includes(valueRequest) && salaryValue !== undefined ?
                    <>
                        <CalculeComponents.Insalubridade
                            insalubridadeSalary={insalubridadeSalary} setInsalubridadeSalary={setInsalubridadeSalary} register={register} errors={errors} data={data} draftRequest={draftRequest} setValue={setValue}
                        />
                    </> : null
            }

            {
                VERBAS.includes(valueRequest) && salaryValue !== undefined ?
                    <>
                        <CalculeComponents.Verbas
                            register={register} errors={errors} data={data} draftRequest={draftRequest} setValue={setValue}
                        />
                    </> : null
            }


            {
                HORA_EXTRA.includes(valueRequest) && salaryValue !== undefined ?
                    <>
                        <CalculeComponents.HoraExtra
                            watch={watch} extraHour={extraHour} setExtraHour={setExtraHour} register={register} errors={errors} data={data} draftRequest={draftRequest} setValue={setValue}
                        />
                    </> : null
            }
            {
                INTERVALO.includes(valueRequest) && salaryValue !== undefined ?
                    <>
                        <CalculeComponents.Intervalo
                            watch={watch} interval={interval} setInterval={setInterval} register={register} errors={errors} data={data} draftRequest={draftRequest} setValue={setValue}
                        />
                    </> : null
            }




            <Flex mt={5} alignItems={'center'} justifyContent={'end'}>
                <Text cursor={'pointer'} onClick={() => { setOpenSelect(false) }} mr={5}>
                    Voltar
                </Text>
                <Button type='submit'>
                    <Text color={"#fff"}>
                        Salvar
                    </Text>
                </Button>
            </Flex>






        </Flex >
    );
}

export default Index;