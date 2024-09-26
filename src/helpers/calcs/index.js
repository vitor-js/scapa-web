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

const fgts_calc_pure = (data, risk) => {
    const { time_worked_months, salary, end_date } = data
    const result = fgts(salary, time_worked_months)
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

    console.log(diferenceType, diff_value_salary, data, risk)

    let sumMonthValue = 0;
    let monthValue = 0;

    const { time_worked_months, salary } = data

    const time = parseInt(time_worked_months)
    console.log(time, salary, diferenceType)
    if (diferenceType === "absoluta") {
        monthValue = parseFloat(currencyToNumber(diff_value_salary));
        console.log(monthValue, 'monthValue')
        sumMonthValue = monthValue * time;

    }

    if (diferenceType === "percentual") {

        monthValue =
            (parseFloat(currencyToNumber(salary)) *
                parseFloat(currencyToNumber(diff_value_salary))) /
            100;
        sumMonthValue = monthValue * time;

    }
    console.log(monthValue, "monthValue")
    const fgts_calc = fgts(monthValue, time)
    console.log(fgts_calc, 'fgts_calc')
    const extraSalary_calc = extraSalary(monthValue, time)
    console.log(extraSalary_calc, "extraSalary_calc")
    const vocationBase_calc = vocationBase(monthValue, time)


    const vocation_calc = vocation(vocationBase_calc)
    console.log(vocation_calc)
    const valuePostulate_calc = valuePostulate(sumMonthValue, vocation_calc, extraSalary_calc, fgts_calc)
    console.log(sumMonthValue, vocation_calc, extraSalary_calc, fgts_calc, 'sumMonthValue, vocation_calc, extraSalary_calc, fgts_calcsumMonthValue, vocation_calc, extraSalary_calc, fgts_calc')
    console.log(valuePostulate_calc, "valuePostulate_calc")
    console.log(valuePostulate_calc)

    const valueIndividual = Math.round(valuePostulate_calc * risk);

    return {
        valueIndividual: valueIndividual,
        valuePostulate: valuePostulate_calc
    }
}

const insalubridade = (data, grau, risk, salary) => {

    const { time_worked_months } = data

    const time = parseInt(time_worked_months)
    const monthValue = salary * GRAU_RATIO_INSALUBRIDADE[grau];

    const fgts_calc = fgts(monthValue, time)
    const extraSalary_calc = extraSalary(monthValue, time)
    const vocationBase_calc = vocationBase(monthValue, time)
    const vocation_calc = vocation(vocationBase_calc)

    const valuePostulate_calc = monthValue * time + extraSalary_calc + vocation_calc + fgts_calc


    const valueIndividual = Math.round(valuePostulate_calc * risk);

    return {
        valueIndividual,
        valuePostulate: valuePostulate_calc
    }
}



const calcVerbasRescisorias = (data, reason, risk, have_vacation) => {
    const { time_worked_months, salary, end_date } = data
    const time = parseInt(time_worked_months)
    const end_date_convert = new Date(end_date);
    const days = getQuantityDays(end_date_convert.getMonth() + 1);
    if (reason === "Dispensa imotivada ou rescisão indireta") {
        return calcDispensaImotivadaOuRescisãoIndireta(days, time, salary, risk, have_vacation, end_date_convert);
    }
    if (reason === "Pedido de demissão") { return calcPedidoDeDemissao(days, time, salary, risk, have_vacation); }
    if (reason === "Comum acordo") { return calcComumAcordo(days, time, salary, risk, have_vacation); }
    if (reason === "Dispensa motivada (justa causa)")
        return calcDispensaMotivada(days, time, salary, risk, have_vacation);
}


const calcDispensaImotivadaOuRescisãoIndireta = (days, time, salary, risk, have_vacation, end_date_convert) => {
    const SalaryForDaysWorkedInTheLastMonth = (salary / 30) * days;

    const years = Math.round(time / 12);

    const AvisoPrevioIndenizado = Math.round(
        (salary / 30) * (years * 3) + salary
    );


    const fgtsBase = Math.round(0.08 * salary * time);
    const fgts = fgtsBase * 0.4;
    const multa = salary;
    const extraSalary_calc = extraSalary(salary, time)
    const vocation_calc = vacationCalcVerbas(salary, time, have_vacation)

    const valuePostulate_calc = SalaryForDaysWorkedInTheLastMonth + multa + extraSalary_calc + vocation_calc + fgts + AvisoPrevioIndenizado
    console.log(SalaryForDaysWorkedInTheLastMonth, "SalaryForDaysWorkedInTheLastMonth")
    console.log(multa, "multa")
    console.log(extraSalary, "extraSalary")
    console.log(vocation_calc, "vocation_calc")
    console.log(fgts, "fgts")

    console.log(AvisoPrevioIndenizado, "AvisoPrevioIndenizado")

    const valueIndividual = Math.round(valuePostulate_calc * risk);
    return {
        valueIndividual,
        valuePostulate: valuePostulate_calc
    }

}

const calcPedidoDeDemissao = (days, time, salary, risk, have_vacation) => {

    const SalaryForDaysWorkedInTheLastMonth = (salary / 30) * days;
    console.log(SalaryForDaysWorkedInTheLastMonth, "SalaryForDaysWorkedInTheLastMonth")
    const multa = salary;
    console.log(multa, "multa")
    const extraSalary_calc = extraSalary(salary, time)
    console.log(extraSalary_calc, "extraSalary_calc")
    const vocation_calc = vacationCalcVerbas(salary, time, have_vacation)
    console.log(vocation_calc, "vocation_calc")

    const valuePostulate_calc = SalaryForDaysWorkedInTheLastMonth + multa + extraSalary_calc + vocation_calc
    console.log(valuePostulate_calc, "valuePostulate_calc")
    const postuateValue = Math.round(
        valuePostulate_calc
    );
    const valueIndividual = postuateValue * risk;

    return {
        valueIndividual,
        valuePostulate: postuateValue
    }

}

const calcComumAcordo = (days, time, salary, risk, have_vacation) => {
    const SalaryForDaysWorkedInTheLastMonth = (salary / 30) * days;
    const multa = salary;
    const extraSalary_calc = extraSalary(salary, time)
    const years = Math.round(time / 12);
    const AvisoPrevioIndenizadoBase = Math.round(
        (salary / 30) * (years * 3) + salary
    );
    const AvisoPrevioIndenizado = AvisoPrevioIndenizadoBase * 0.5;
    const fgts_calc = fgts(salary, time)
    const fgts_value = fgts_calc * 0.2;
    const vocation_calc = vacationCalcVerbas(salary, time, have_vacation)



    const valuePostulate_calc = SalaryForDaysWorkedInTheLastMonth + multa + extraSalary_calc + fgts_value + vocation_calc + AvisoPrevioIndenizado

    const postuateValue = Math.round(
        valuePostulate_calc
    );
    const valueIndividual = postuateValue * risk;

    return {
        valueIndividual,
        valuePostulate: postuateValue
    }

}

const calcDispensaMotivada = (days, time, salary, risk, have_vacation) => {
    const SalaryForDaysWorkedInTheLastMonth = (salary / 30) * days;
    const multa = salary;

    const valuePostulate_calc = SalaryForDaysWorkedInTheLastMonth + multa

    const postuateValue = Math.round(
        valuePostulate_calc
    );
    const valueIndividual = postuateValue * risk;

    return {
        valueIndividual,
        valuePostulate: postuateValue
    }
}

const vacationCalcVerbas = (salary, diffDate, haveVacation) => {
    console.log(salary, diffDate, haveVacation)
    try {
        if (haveVacation === "Sim") {
            return Math.round(salary + salary / 3);
        }

        if (haveVacation === "Não") {
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
        }
    } catch (e) {
        console.log(e)
    }

};

const calcHoraExtra = (data, variation, risk, extraHour, limit, valuesForm) => {
    console.log(valuesForm, '--------')
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

        var fromDateInterval = parseInt(
            new Date(`July 20, 69 ${valuesForm.hora_inicio_intervalo} GMT+00:00`) / 1000
        );
        var toDateInterval = parseInt(
            new Date(`July 20, 69 ${valuesForm.hora_fim_intervalo} GMT+00:00`) / 1000
        );
        var timeDiffInterval =
            (Math.abs(fromDateInterval) - Math.abs(toDateInterval)) / 3600

        const haursWorkedPeerDay = timeDiffRoutine - timeDiffInterval;

        const haursInWeek = haursWorkedPeerDay * valuesForm.days_working_week;

        hextraHour = haursInWeek - ParseLimit[limit];

    }

    if (hextraHour <= 0) return {
        valueIndividual: 0,
        valuePostulate: 0
    }

    const { time_worked_months, salary, end_date } = data
    const salaryHour = Math.round(salary / ParseDivisor[limit]);
    const extraHourValue = Math.round(salaryHour + salaryHour * 0.5);

    const apuracaoDeHorasExtrasMes = Math.round(
        extraHourValue * hextraHour * 4.286
    );

    const apuracaoDeHorasExtrasTotal = Math.round(
        apuracaoDeHorasExtrasMes * time_worked_months
    );

    const fgts = Math.round(apuracaoDeHorasExtrasTotal * 0.08);

    const extraSalary = Math.round((apuracaoDeHorasExtrasMes / 12) * time_worked_months);

    const vocation = Math.round((apuracaoDeHorasExtrasMes / 12) * time_worked_months);
    const vocationCalc = Math.round(vocation + vocation / 3);

    const RSR = Math.round((apuracaoDeHorasExtrasMes / 6) * time_worked_months);

    const valuePostulate = Math.round(
        apuracaoDeHorasExtrasTotal + extraSalary + vocationCalc + RSR + fgts
    );
    const valueIndividual = Math.round(valuePostulate * risk);

    return {
        valueIndividual,
        valuePostulate: valuePostulate
    }

}

const calcIntervalo = (data, variation, risk, interval, values) => {
    const { time_worked_months, salary, end_date } = data
    let totalWithoutInterval = 0
    let totalHours = 0;
    if (variation === "Sim") {

        extraHour.map((valueItem) => {

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
            Math.round(intervalWithVariation.length * totalHours * 4.286 * time_worked_months);

    }
    else {
        var fromDateInterval = parseInt(
            new Date(`July 20, 69 ${values.hora_inicio_intervalo} GMT+00:00`) / 1000
        );
        var toDateInterval = parseInt(new Date(`July 20, 69 ${values.hora_fim_intervalo} GMT+00:00`) / 1000);

        var timeDiffInterval =
            (Math.abs(fromDateInterval) - Math.abs(toDateInterval)) / 3600
        console.log(values.days_whiout_interval, timeDiffInterval, '-------------------')
        totalHours = parseInt(values.days_whiout_interval) * timeDiffInterval;
        console.log(totalHours, 'totalHours')
        console.log(totalHours, time_worked_months, "time_worked_months", Math.round((totalHours * 4.286) * time_worked_months))
        totalWithoutInterval =
            Math.round((totalHours * 4.286) * time_worked_months);

    }

    const divisor = ParseDivisor[values.week_limit]

    const intervalValueCalc = Math.round(salary / divisor);
    const intervalValue = intervalValueCalc + intervalValueCalc * 0.5;


    const valuePostulate = Math.round(intervalValue * Math.round(totalWithoutInterval));
    const valueIndividual = Math.round(valuePostulate * risk);

    console.log(valuePostulate, "valuePostulate")
    console.log(valueIndividual, "valueIndividual")

    return {
        valueIndividual,
        valuePostulate: valuePostulate
    }

}

const adicionalPericulosidade = (data, risk) => {
    console.log()
    const { time_worked_months, salary, end_date } = data
    const month_value = Math.round(salary * 0.3);
    console.log(month_value, "month_value")
    const all_month_value = Math.round(month_value * time_worked_months);
    console.log(all_month_value, "all_month_value")

    const fgts = Math.round(month_value * 0.08 * time_worked_months);
    console.log(fgts, "fgts")
    const thirteenth_salary = Math.round((month_value / 12) * time_worked_months);
    console.log(thirteenth_salary, "thirteenth_salary")
    const vacation_sum = Math.round((month_value / 12) * time_worked_months);
    console.log(vacation_sum, "vacation_sum")
    const vocation = Math.round(vacation_sum + vacation_sum / 3);
    console.log(vocation, "vocation")

    const result = Math.round(
        all_month_value + fgts + thirteenth_salary + vocation
    );
    console.log(result, "result")
    const result_with_risk = Math.round(result * risk);
    console.log(result_with_risk, "result_with_risk")
    console.log(risk, "risk")
    return {
        valueIndividual: result_with_risk,
        valuePostulate: result
    }

}


const decimoTerceiroIntegral = (data, risk) => {
    const { time_worked_months, salary, end_date } = data
    const result_with_risk = salary * risk;

    return {
        valueIndividual: result_with_risk,
        valuePostulate: salary
    }
}

const decimoTerceiroProporcional = (data, risk) => {
    const { time_worked_months, salary, end_date } = data
    const end_date_convert = new Date(end_date);
    const thirteenth_salary = Math.round((salary / 12) * time_worked_months);

    const result_with_risk = thirteenth_salary * risk;

    return {
        valueIndividual: result_with_risk,
        valuePostulate: thirtySalary
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

const feriasProporcionais = (data, riks) => {
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

