import currencyToNumber from './../currencyToNumber'
import converteNaiveDate from './../naiveToBrlDate'

const GRAU_RATIO_INSALUBRIDADE = {
    "Grau mínimo": 0.1,
    "Grau médio": 0.2,
    "Grau máximo": 0.4,
};
function getQuantityDays(numberMonth) {
    return daysQuantity[numberMonth]
}

const ParseLimit = {
    "Limite semanal de 44h": 44,
    "Limite semanal de 40h": 40,
    "Limite semanal de 36h": 36,
};

const ParseDivisor = {
    "Limite semanal de 44h": 220,
    "Limite semanal de 40h": 200,
    "Limite semanal de 36h": 180,
};

const daysQuantity = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
}


const fgts = (monthValue, diffDate) => {
    return Math.round(monthValue * 0.08 * diffDate);
}

const fgts_calc_pure = (data, risk, time_fgts) => {
    const { time_worked_months, salary, end_date } = data
    const result = fgts(salary, parseInt(time_fgts))
    const result_with_risk = Math.round(result * risk);

    return {
        valueIndividual: result_with_risk,
        valuePostulate: result
    }
}

const extraSalary = (monthValue, diffDate) => {
    return Math.round((monthValue / 12) * diffDate);
}


const vocationBase = (monthValue, diffDate) => {
    return (monthValue / 12) * diffDate;
}

const vocation = (vocationBase) => {
    return Math.round(vocationBase + vocationBase / 3);
}

const valuePostulate = (sumMonthValue, vocation, extraSalary, fgts) => {
    return Math.round(
        sumMonthValue + vocation + extraSalary + fgts
    );
}

const valueIndividual = (valuePostulate, risk) => {
    return Math.round(valuePostulate * risk);
}


const diffSalaty = (diferenceType, diff_value_salary, data, risk) => {

    console.log(diferenceType, diff_value_salary, data, risk, "console das diferencas")
    console.log(risk)
    let sumMonthValue = 0;
    let monthValue = 0;

    const { time_worked_months, salary } = data

    const time = parseInt(time_worked_months)

    if (diferenceType === "absoluta") {
        monthValue = parseFloat(currencyToNumber(diff_value_salary));
        sumMonthValue = monthValue * time;

    } else {
        monthValue =
            (salary *
                parseFloat(currencyToNumber(diff_value_salary))) /
            100;
        console.log(diff_value_salary, time)
        sumMonthValue = monthValue * time;
    }


    const fgts = Math.round(monthValue * 0.08 * time);



    const extraSalary = Math.round((monthValue / 12) * time);

    const vocationBase = (monthValue / 12) * time;
    const vocation = Math.round(vocationBase + vocationBase / 3);

    const principal = sumMonthValue
    const valuePostulate_calc = sumMonthValue + vocation + extraSalary + fgts



    const valueIndividual = Math.round(valuePostulate_calc * risk);
    const reflex = [
        {
            label: "Depósitos do FGTS",
            value: fgts,
        },
        {
            label: "Décimo terceiro salário",
            value: extraSalary,
        },
        {
            label: "Férias",
            value: vocation,
        },
    ];
    return {
        valueIndividual: valueIndividual,
        valuePostulate: valuePostulate_calc,
        reflex,
        principal
    }
}

const insalubridade = (data, grau, risk, salary) => {

    const { time_worked_months } = data

    const time = parseInt(time_worked_months)
    const monthValue = salary * GRAU_RATIO_INSALUBRIDADE[grau];

    const fgts = Math.round(monthValue * 0.08 * time);
    console.log(fgts, " fgts")
    const extraSalary = Math.round((monthValue / 12) * time);
    console.log(extraSalary, " extraSalary")

    const vocation = Math.round((monthValue / 12) * time);

    const vocationCalc = vocation + vocation / 3;
    console.log(vocationCalc, " vocationCalc")

    const valuePostulate_calc = monthValue * time + extraSalary + vocationCalc + fgts
    const principal = monthValue * time
    console.log(valuePostulate_calc)
    const valueIndividual = Math.round(valuePostulate_calc * risk);

    const reflex = [
        {
            label: "Depósitos do FGTS",
            value: fgts,
        },
        {
            label: "Décimo terceiro salário",
            value: extraSalary,
        },
        {
            label: "Férias",
            value: vocationCalc,
        },
    ];

    return {
        valueIndividual,
        valuePostulate: valuePostulate_calc,
        reflex,
        principal
    }
}


function addHours(date, hours) {
    const hoursToAdd = hours * 60 * 60 * 1000;
    date.setTime(date.getTime() + hoursToAdd);
    return date;
}

const calcVerbasRescisorias = (data, reason, risk, have_vacation, have_penalt) => {
    const { time_worked_months, salary, end_date } = data
    const time = parseInt(time_worked_months)
    const end_date_convert_without_our = new Date(end_date);
    const end_date_convert = addHours(end_date_convert_without_our, 3)


    const days = end_date_convert.getDate();

    console.log(days, 'days')

    if (reason === "Dispensa imotivada ou rescisão indireta") {
        return calcDispensaImotivadaOuRescisãoIndireta(days, time, salary, risk, have_vacation, end_date_convert, have_penalt);
    }
    if (reason === "Pedido de demissão") { return calcPedidoDeDemissao(days, time, salary, risk, have_vacation, end_date_convert, have_penalt); }
    if (reason === "Comum acordo") { return calcComumAcordo(days, time, salary, risk, have_vacation, end_date_convert, have_penalt); }
    if (reason === "Dispensa motivada (justa causa)")
        return calcDispensaMotivada(days, time, salary, risk, have_vacation, end_date_convert, have_penalt);
}


const calcDispensaImotivadaOuRescisãoIndireta = (days, time, salary, risk, have_vacation, end_date_convert, have_penalt) => {
    try {
        const SalaryForDaysWorkedInTheLastMonth = (salary / 30) * days;
        console.log(days, "days")
        console.log(SalaryForDaysWorkedInTheLastMonth, "SalaryForDaysWorkedInTheLastMonth")
        const years = Math.round(time / 12);
    
        const AvisoPrevioIndenizado = Math.round(
            (salary / 30) * (years * 3) + salary
        );
        console.log(AvisoPrevioIndenizado, "AvisoPrevioIndenizado")
    
        const fgtsBase = Math.round(0.08 * salary * time);
    
        const fgts = fgtsBase * 0.4;
        console.log(fgts, "fgts")
    
        let month = end_date_convert.getMonth() + 1;
    
    
        const extraSalary_calc = Math.round(
            (salary / 12) * month
        );
        const multa =  have_penalt ? salary : 0;
        
        const vocation_calc = vacationCalcVerbas(salary, time, have_vacation)
    
        const valuePostulate_calc = SalaryForDaysWorkedInTheLastMonth + multa + extraSalary_calc + vocation_calc + fgts + AvisoPrevioIndenizado
    
        let reflex_draft = [{
            label: "Salário dos dias trabalhados no último mês",
            value: SalaryForDaysWorkedInTheLastMonth
        },
    
        {
            label: "Aviso prévio indenizado",
            value: AvisoPrevioIndenizado
        },
        {
            label: "40% dos depósitos do FGTS",
            value: fgts
        },
        {
            label: "13º salário proporcional",
            value: extraSalary_calc
        },
        {
            label: "Férias proporcionais",
            value: vocation_calc
        }
        ]
    
        const valueIndividual = Math.round(valuePostulate_calc * risk);
    
       const multa_object =  {
            label: "Multa do art. 477",
            value: multa
        }
        if( have_penalt === true ) {
            reflex_draft.push( multa_object ) 
        }
      
    
 
        return {
            valueIndividual,
            valuePostulate: valuePostulate_calc,
            reflex: reflex_draft
        }
    
    }catch(e){
        console.log(e)
    }
   
}

const calcPedidoDeDemissao = (days, time, salary, risk, have_vacation, end_date_convert, have_penalt) => {

    const SalaryForDaysWorkedInTheLastMonth = (salary / 30) * days;
    const multa =  have_penalt ? salary : 0;
    const last_month = end_date_convert.getMonth() + 1
    console.log(salary, end_date_convert.getMonth() + 1, "--------")
    const extraSalary_calc = Math.round(
        (salary / 12) * last_month
    );
    console.log(extraSalary_calc)
    const vocation_calc = vacationCalcVerbas(salary, time, have_vacation)
    console.log(vocation_calc)

    const valuePostulate_calc = SalaryForDaysWorkedInTheLastMonth + multa + extraSalary_calc + vocation_calc

    const postuateValue = Math.round(
        valuePostulate_calc
    );
    console.log(postuateValue)
    const valueIndividual = postuateValue * risk;

    let  reflex_draft = [{
        label: "Salário dos dias trabalhados no último mês",
        value: SalaryForDaysWorkedInTheLastMonth
    },
    {
        label: "13º salário proporcional",
        value: extraSalary_calc
    },
    {
        label: "Férias proporcionais",
        value: vocation_calc
    }
    ]


    const multa_object =  {
        label: "Multa do art. 477",
        value: multa
    }

    if( have_penalt === true ) {
        reflex_draft.push( multa_object ) 
    }


    return {
        valueIndividual,
        valuePostulate: postuateValue,
        reflex: reflex_draft
    }

}

const calcComumAcordo = (days, time, salary, risk, have_vacation, end_date_convert, have_penalt) => {
    const SalaryForDaysWorkedInTheLastMonth = (salary / 30) * days;
    const years = Math.round(time / 12);
    const AvisoPrevioIndenizadoBase = Math.round(
        (salary / 30) * (years * 3) + salary
    );
    const AvisoPrevioIndenizado = AvisoPrevioIndenizadoBase * 0.5;
    const fgtsBase = Math.round(0.08 * salary * time);
    const fgts = fgtsBase * 0.2;
    const multa =  have_penalt ? salary : 0;
    const extraSalary = Math.round(
        (salary / 12) * end_date_convert.getMonth() + 1
    );

    const vocation_calc = vacationCalcVerbas(salary, time, have_vacation)



    const valuePostulate_calc = SalaryForDaysWorkedInTheLastMonth + multa + extraSalary + fgts + vocation_calc + AvisoPrevioIndenizado

    const postuateValue = Math.round(
        valuePostulate_calc
    );
    const valueIndividual = postuateValue * risk;

    let reflex_draft = [
        {
            label: "Salário dos dias trabalhados no último mês",
            value: SalaryForDaysWorkedInTheLastMonth,
        },
        {
            label: "50% do aviso prévio indenizado",
            value: AvisoPrevioIndenizado,
        },
        {
            label: "20% dos depósitos do FGTS",
            value: fgts,
        },

        {
            label: "13º salário proporcional",
            value: extraSalary,
        },
        {
            label: "Férias proporcionais",
            value: vocation_calc,
        },
    ];

    
    const multa_object =  {
        label: "Multa do art. 477",
        value: multa
    }
    if( have_penalt === true ) {
        reflex_draft.push( multa_object ) 
    }
  


    return {
        valueIndividual,
        valuePostulate: postuateValue,
        reflex: reflex_draft
    }

}

const calcDispensaMotivada = (days, time, salary, risk, have_vacation, have_penalt) => {


    const SalaryForDaysWorkedInTheLastMonth = (salary / 30) * days;

    const multa = have_penalt ? salary : 0;

    const valuePostulate_calc = SalaryForDaysWorkedInTheLastMonth + multa

    const postuateValue = Math.round(
        valuePostulate_calc
    );
    const valueIndividual = postuateValue * risk;

    let reflex_draft = [
        {
            label: "Salário dos dias trabalhados no último mês",
            value: SalaryForDaysWorkedInTheLastMonth,
        }
    ];

    const multa_object =  {
        label: "Multa do art. 477",
        value: multa
    }

 if( have_penalt === true ) {
    reflex_draft.push( multa_object ) 
}

    return {
        valueIndividual,
        valuePostulate: postuateValue,
        reflex: reflex_draft
    }
}

const vacationCalcVerbas = (salary, diffDate, haveVacation) => {

    try {
        if (diffDate <= 12) {
            const baseCalc = Math.round((salary / 12) * diffDate);
            const finalcalc = Math.round(baseCalc + baseCalc / 3);
            return finalcalc;
        }

        if (diffDate > 12) {
            const years = diffDate / 12;

            if (Number.isInteger(years)) {
                const baseCalc = Math.round((salary / 12) * diffDate);
                const finalcalc = Math.round(baseCalc + baseCalc / 3);
                return finalcalc;
            } else {
                const getDecimals = years - Math.floor(years);

                const mounths = 12 * getDecimals;

                const baseCalc = Math.round((salary / 12) * mounths);
                const finalcalc = Math.round(baseCalc + baseCalc / 3);

                return finalcalc;
            }

        }
    } catch (e) {
        console.log(e)
    }

};

const calcHoraExtra = (data, variation, risk, extraHour, limit, valuesForm) => {
    try {
        let hextraHour = 0
        if (variation === "Sim") {
            let totalHours = 0;
            extraHour.map((valueItem) => {

                var fromDateRoutine = parseInt(
                    new Date(`July 20, 69 ${valueItem.hora_inicio_jornada} GMT+00:00`) / 1000
                );
                var toDateRoutine = parseInt(
                    new Date(`July 20, 69 ${valueItem.hora_fim_jornada} GMT+00:00`) / 1000
                );

                var timeDiffRoutine =
                    (Math.abs(fromDateRoutine) - Math.abs(toDateRoutine)) / 3600


                console.log(timeDiffRoutine)

                var fromDateInterval = parseInt(
                    new Date(`July 20, 69 ${valueItem.hora_inicio_intervalo} GMT+00:00`) / 1000
                );
                var toDateInterval = parseInt(
                    new Date(`July 20, 69 ${valueItem.hora_fim_intervalo} GMT+00:00`) / 1000
                );
                var timeDiffInterval =
                    (Math.abs(fromDateInterval) - Math.abs(toDateInterval)) / 3600

                const diff = timeDiffRoutine - timeDiffInterval;
                totalHours = totalHours + diff;
            });

            hextraHour = Math.round(totalHours - ParseLimit[limit]);

        } else {
            var fromDateRoutine = parseInt(
                new Date(`July 20, 69 ${valuesForm.hora_inicio_jornada} GMT+00:00`) / 1000
            );
            var toDateRoutine = parseInt(new Date(`July 20, 69 ${valuesForm.hora_fim_jornada} GMT+00:00`) / 1000);

            var timeDiffRoutine =
                (Math.abs(fromDateRoutine) - Math.abs(toDateRoutine)) / 3600

            console.log(timeDiffRoutine, "timeDiffRoutine")

            var fromDateInterval = parseInt(
                new Date(`July 20, 69 ${valuesForm.hora_inicio_intervalo} GMT+00:00`) / 1000
            );
            var toDateInterval = parseInt(
                new Date(`July 20, 69 ${valuesForm.hora_fim_intervalo} GMT+00:00`) / 1000
            );
            var timeDiffInterval =
                (Math.abs(fromDateInterval) - Math.abs(toDateInterval)) / 3600

            console.log(timeDiffInterval, "timeDiffInterval")
            const haursWorkedPeerDay = timeDiffRoutine - timeDiffInterval;
            console.log(haursWorkedPeerDay, "haursWorkedPeerDay")
            const haursInWeek = haursWorkedPeerDay * valuesForm.days_working_week;
            console.log(valuesForm, 'valuesForm')

            console.log(haursInWeek, "haursInWeek")
            hextraHour = haursInWeek - ParseLimit[limit];

        }

        if (hextraHour <= 0) return {
            valueIndividual: 0,
            valuePostulate: 0
        }




        console.log(hextraHour, "hextraHour")
        const { time_worked_months, salary, end_date } = data

        const salaryHour = Math.round(salary / ParseDivisor[limit]);

        const extraHourValue = Math.round(salaryHour + salaryHour * 0.5);
        console.log(extraHourValue, "extraHourValue")

        const apuracaoDeHorasExtrasMes = Math.round(
            extraHourValue * hextraHour * 4.286
        );

        const apuracaoDeHorasExtrasTotal = Math.round(
            apuracaoDeHorasExtrasMes * time_worked_months
        );

        console.log(apuracaoDeHorasExtrasTotal, "apuracaoDeHorasExtrasTotal")

        const fgts = Math.round(apuracaoDeHorasExtrasTotal * 0.08);
        console.log(fgts, "fgts")
        const extraSalary = Math.round((apuracaoDeHorasExtrasMes / 12) * time_worked_months);

        const vocation = Math.round((apuracaoDeHorasExtrasMes / 12) * time_worked_months);
        const vocationCalc = Math.round(vocation + vocation / 3);
        console.log(vocationCalc, "vocationCalc")
        const RSR = Math.round((apuracaoDeHorasExtrasMes / 6) * time_worked_months);
        console.log(RSR, "RSR")

        const valuePostulate = Math.round(
            apuracaoDeHorasExtrasTotal + extraSalary + vocationCalc + RSR + fgts
        );
        const principal = apuracaoDeHorasExtrasTotal
        console.log(valuePostulate, "valuePostulate")

        const valueIndividual = Math.round(valuePostulate * risk);
        const reflex = [
            {
                label: "Depósitos do FGTS",
                value: fgts,
            },
            {
                label: "Décimo terceiro salário",
                value: extraSalary,
            },
            {
                label: "Férias",
                value: vocationCalc,
            },
            {
                label: "RSR",
                value: RSR,
            },
        ];
        return {
            valueIndividual,
            valuePostulate: valuePostulate,
            reflex,
            principal
        }
    } catch (e) {
        console.log(e)
    }


}

const calcIntervalo = (data, variation, risk, interval, values) => {

    const { time_worked_months, salary, end_date } = data
    let totalWithoutInterval = 0
    let totalHours = 0;
    if (variation === "Sim") {

        interval.map((valueItem) => {

            var fromDateInterval = parseInt(
                new Date(`July 20, 69 ${valueItem.hora_inicio_intervalo} GMT+00:00`) / 1000
            );
            var toDateInterval = parseInt(
                new Date(`July 20, 69 ${valueItem.hora_fim_intervalo} GMT+00:00`) / 1000
            );

            var timeDiffRoutine =
                (Math.abs(fromDateInterval) - Math.abs(toDateInterval)) / 3600


            totalHours = totalHours + timeDiffRoutine;
        });
        totalWithoutInterval =
            Math.round(interval.length * totalHours * 4.286 * time_worked_months);

    }
    else {
        var fromDateInterval = parseInt(
            new Date(`July 20, 69 ${values.hora_inicio_intervalo} GMT+00:00`) / 1000
        );
        var toDateInterval = parseInt(new Date(`July 20, 69 ${values.hora_fim_intervalo} GMT+00:00`) / 1000);

        var timeDiffInterval =
            (Math.abs(fromDateInterval) - Math.abs(toDateInterval)) / 3600

        console.log(timeDiffInterval, "timeDiffInterval")

        // console.log(values.days_whiout_interval, timeDiffInterval, '-------------------')
        totalHours = parseInt(values.days_whiout_interval) * timeDiffInterval;
        console.log(totalHours)
        // console.log(totalHours, 'totalHours')
        // console.log(totalHours, time_worked_months, "time_worked_months", Math.round((totalHours * 4.286) * time_worked_months))
        totalWithoutInterval =
            Math.round((totalHours * 4.286) * time_worked_months);
        console.log(totalWithoutInterval)
    }

    const divisor = ParseDivisor[values.week_limit]
    console.log(divisor, "divisor")

    const intervalValueCalc = Math.round(salary / divisor);

    const intervalValue = intervalValueCalc + intervalValueCalc * 0.5;
    console.log(intervalValue, "intervalValue")


    const valuePostulate = Math.round(intervalValue * Math.round(totalWithoutInterval));

    const valueIndividual = Math.round(valuePostulate * risk);

    console.log(valuePostulate, "valuePostulate")
    console.log(valueIndividual, "valueIndividual")

    return {
        valueIndividual,
        valuePostulate: valuePostulate,
        principal: valuePostulate
    }

}

const adicionalPericulosidade = (data, risk) => {

    const { time_worked_months, salary, end_date } = data

    const month_value = Math.round(salary * 0.3);
    console.log(month_value, "month_value")
    const all_month_value = Math.round(month_value * time_worked_months);
    console.log(all_month_value, "all_month_value")
    const fgts = Math.round(month_value * 0.08 * time_worked_months);

    const thirteenth_salary = Math.round((month_value / 12) * time_worked_months);

    const vacation_sum = Math.round((month_value / 12) * time_worked_months);

    const vocation = Math.round(vacation_sum + vacation_sum / 3);
    console.log(all_month_value, fgts, thirteenth_salary, vocation)

    const result = Math.round(
        all_month_value + fgts + thirteenth_salary + vocation
    );
    const principal = all_month_value

    const result_with_risk = Math.round(result * risk);
    const reflex = [
        {
            label: "Depósitos do FGTS",
            value: fgts,
        },
        {
            label: "Décimo terceiro salário",
            value: thirteenth_salary,
        },
        {
            label: "Férias",
            value: vocation,
        },
    ];
    return {
        valueIndividual: result_with_risk,
        valuePostulate: result,
        reflex,
        principal
    }

}


const decimoTerceiroIntegral = (data, risk) => {
    const { time_worked_months, salary, end_date } = data

    const time = time_worked_months /12
    const result_with_risk = (salary * time) * risk;

    return {
        valueIndividual: result_with_risk,
        valuePostulate: salary * time
    }
}

const decimoTerceiroProporcional = (data, risk) => {
    const { time_worked_months, salary, end_date } = data
    let value= 0;
    if (time_worked_months <= 12) {
        const baseCalc = Math.round((salary / 12) * time_worked_months);
        const finalcalc = Math.round(baseCalc + baseCalc / 3);
        value = finalcalc;
    }
    if (time_worked_months > 12) {
        const years = time_worked_months / 12;

        if (Number.isInteger(years)) {
            const baseCalc = Math.round((salary / 12) * time_worked_months);
            const finalcalc = Math.round(baseCalc + baseCalc / 3);
            value = finalcalc;
        } else {
            const getDecimals = years - Math.floor(years);
            const mounths = 12 * getDecimals;
            const baseCalc = Math.round((salary / 12) * mounths);
            const finalcalc = Math.round(baseCalc + baseCalc / 3);
            value = finalcalc;
        }
    }

    const resultVocation = Math.round(value + value / 3);
    const result_with_risk = resultVocation * risk;
    return {
        valueIndividual: result_with_risk,
        valuePostulate: resultVocation
    }
}

const feriasIntegrais = (data, risk) => {
    const { time_worked_months, salary, end_date } = data

    const vacation = salary + salary / 3;
    const result_with_risk = Math.round(vacation * risk);

    return {
        valueIndividual: result_with_risk,
        valuePostulate: vacation
    }

}

const feriasProporcionais = (data, risk) => {
    const { time_worked_months, salary, end_date } = data
    let vacation = 0;
    if (time_worked_months <= 12) {
        const baseCalc = Math.round((salary / 12) * time_worked_months);
        const finalcalc = Math.round(baseCalc + baseCalc / 3);
        vacation = finalcalc;
    }
    if (time_worked_months > 12) {
        const years = time_worked_months / 12;

        if (Number.isInteger(years)) {
            const baseCalc = Math.round((salary / 12) * time_worked_months);
            const finalcalc = Math.round(baseCalc + baseCalc / 3);
            vacation = finalcalc;
        } else {
            const getDecimals = years - Math.floor(years);
            const mounths = 12 * getDecimals;
            const baseCalc = Math.round((salary / 12) * mounths);
            const finalcalc = Math.round(baseCalc + baseCalc / 3);
            vacation = finalcalc;
        }
    }

    const resultVocation = Math.round(vacation + vacation / 3);
    const result_with_risk = resultVocation * risk;
    return {
        valueIndividual: result_with_risk,
        valuePostulate: resultVocation
    }
}


const calc = {
    diffSalaty,
    insalubridade,
    calcVerbasRescisorias,
    calcHoraExtra,
    calcIntervalo,
    adicionalPericulosidade,
    decimoTerceiroIntegral,
    decimoTerceiroProporcional,
    feriasIntegrais,
    feriasProporcionais,
    fgts,
    fgts_calc_pure
}

export default calc

