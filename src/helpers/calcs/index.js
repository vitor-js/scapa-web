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

    const { proccess_time, salary } = data

    const time = parseInt(proccess_time)
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

    const { proccess_time } = data

    const time = parseInt(proccess_time)
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
    const { proccess_time, salary, end_date } = data
    const time = parseInt(proccess_time)
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

    console.log(SalaryForDaysWorkedInTheLastMonth, multa, extraSalary_calc, vocation_calc, fgts_calc, AvisoPrevioIndenizado)
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


const calc = {
    diffSalaty,
    insalubridade,
    calcVerbasRescisorias
}

export default calc