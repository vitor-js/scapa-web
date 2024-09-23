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

    const fgts_calc = fgts(monthValue, time)

    const extraSalary_calc = extraSalary(monthValue, time)

    const vocationBase_calc = vocationBase(monthValue, time)


    const vocation_calc = vocation(vocationBase_calc)

    const valuePostulate_calc = valuePostulate(sumMonthValue, vocation_calc, extraSalary_calc, fgts_calc)


    const valueIndividual = Math.round(valuePostulate_calc * risk);

    return {
        valueIndividual,
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
        return calcDispensaImotivadaOuRescisãoIndireta(days, time, salary, risk, have_vacation);
    }
    if (reason === "Pedido de demissão") { return calcPedidoDeDemissao(days, time, salary, risk, have_vacation); }
    if (reason === "Comum acordo") { return calcComumAcordo(days, time, salary, risk, have_vacation); }
    if (reason === "Dispensa motivada (justa causa)")
        return calcDispensaMotivada(days, time, salary, risk, have_vacation);
}


const calcDispensaImotivadaOuRescisãoIndireta = (days, time, salary, risk, have_vacation) => {
    const SalaryForDaysWorkedInTheLastMonth = (salary / 30) * days;

    const years = Math.round(time / 12);
    const AvisoPrevioIndenizado = Math.round(
        (salary / 30) * (years * 3) + salary
    );

    const fgts_calc = fgts(salary, time)
    const extraSalary_calc = extraSalary(salary, time)

    const vocation_calc = vacationCalcVerbas(salary, time, have_vacation)
    const multa = salary;

    console.log(SalaryForDaysWorkedInTheLastMonth, multa, extraSalary_calc, vocation_calc, fgts_calc, AvisoPrevioIndenizado, '--')

    const valuePostulate_calc = SalaryForDaysWorkedInTheLastMonth + multa + extraSalary_calc + vocation_calc + fgts_calc + AvisoPrevioIndenizado


    const valueIndividual = Math.round(valuePostulate_calc * risk);
    return {
        valueIndividual,
        valuePostulate: valuePostulate_calc
    }

}

const calcPedidoDeDemissao = (days, time, salary, risk, have_vacation) => {

    const SalaryForDaysWorkedInTheLastMonth = (salary / 30) * days;
    const multa = salary;
    const extraSalary_calc = extraSalary(salary, time)
    const vocation_calc = vacationCalcVerbas(salary, time, have_vacation)

    console.log(SalaryForDaysWorkedInTheLastMonth, multa, extraSalary_calc, vocation_calc)
    const valuePostulate_calc = SalaryForDaysWorkedInTheLastMonth + multa + extraSalary_calc + vocation_calc

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
    const fgts_calc = fgts(salary, time)

    const vocation_calc = vacationCalcVerbas(salary, time, have_vacation)

    console.log(SalaryForDaysWorkedInTheLastMonth, multa, extraSalary_calc, vocation_calc, fgts_calc)

    const valuePostulate_calc = SalaryForDaysWorkedInTheLastMonth + multa + extraSalary_calc + fgts_calc + vocation_calc

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
            intervalWithVariation.length * totalHours * 4.286 * time_worked_months;

    }
    else {
        var fromDateInterval = parseInt(
            new Date(`July 20, 69 ${values.hora_inicio_intervalo} GMT+00:00`) / 1000
        );
        var toDateInterval = parseInt(new Date(`July 20, 69 ${values.hora_fim_intervalo} GMT+00:00`) / 1000);

        var timeDiffInterval =
            (Math.abs(fromDateInterval) - Math.abs(toDateInterval)) / 3600


        totalHours = totalHours + timeDiffInterval;


        totalWithoutInterval =
            parseInt(values.days_whiout_interval) * timeDiffInterval * 4.286 * time_worked_months;

    }
    console.log(totalWithoutInterval, 'totalWithoutInterval')
    const divisor = ParseLimit[values.week_limit]
    console.log(divisor, 'totalWithoutInterval')
    const intervalValueCalc = Math.round(salary / divisor);
    const intervalValue = intervalValueCalc + intervalValueCalc * 0.5;

    const valuePostulate = Math.round(intervalValue * totalWithoutInterval);
    const valueIndividual = Math.round(valuePostulate * risk);


    return {
        valueIndividual,
        valuePostulate: valuePostulate
    }

}

const adicionalPericulosidade = (data, risk) => {
    const { time_worked_months, salary, end_date } = data

    const month_value = Math.round(salary * 0.3);

    const all_month_value = Math.round(month_value * time_worked_months);
    const fgts = Math.round(month_value * 0.08 * time_worked_months);
    const thirteenth_salary = Math.round((month_value / 12) * time_worked_months);

    const vacation_sum = Math.round((month_value / 12) * time_worked_months);
    const vocation = Math.round(vacation_sum + vacation_sum / 3);

    const result = Math.round(
        all_month_value + fgts + thirteenth_salary + vocation
    );
    const result_with_risk = Math.round(result * risk);

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
    const thirtySalary = (salary / 12) * end_date_convert.getMonth() + 1;
    const result_with_risk = thirtySalary * risk;

    return {
        valueIndividual: result_with_risk,
        valuePostulate: result
    }

}

const feriasIntegrais = (data, risk) => {
    const { time_worked_months, salary, end_date } = data

    const vacation = salary + salary / 3;
    const result_with_risk = Math.round(vacation * risk);

    return {
        valueIndividual: result_with_risk,
        valuePostulate: result
    }

}

const feriasProporcionais = () => {

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

