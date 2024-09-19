import currencyToNumber from './../currencyToNumber'

const GRAU_RATIO_INSALUBRIDADE = {
    "Grau mínimo": 0.1,
    "Grau médio": 0.2,
    "Grau máximo": 0.4,
};


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

const calc = {
    diffSalaty,
    insalubridade
}

export default calc