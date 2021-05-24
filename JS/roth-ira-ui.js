const RothUI = (function(){
  const selectors = {
    form: document.querySelector('.roth-ira-calculator'),
    startingBalance: parseFloat(document.querySelector('.sb').value),
    annualContributions: parseFloat(document.querySelector('.ac').value),
    age: parseFloat(document.querySelector('.age').value),
    retirementAge: parseFloat((document.querySelector('.retirement').value) - 1),
    rateOfReturn: parseFloat((document.querySelector('.ror').value) / 100),
    marginalTaxRate: parseFloat((document.querySelector('.mtr').value) / 100),
    rothTotal: document.querySelector('.roth-ira-total'),
    taxableSavingsTotal: document.querySelector('.taxable-savings-total'),
    inputs: Array.from(document.querySelectorAll('.calc-input')),
  }
  return {
    getSelectors: () => {
      return selectors
    },
    checkErrors: () => {
      const floatedInputArr = [];
      selectors.inputs.forEach(i => {
        document.querySelector('#submit').disabled = false;
        i.parentElement.classList.remove('input-error')
        floatedInputArr.push(parseFloat(i.value))
      });
      // Error Checking
      for(let i = 0; i < floatedInputArr.length - 1; i++) {
        if(floatedInputArr[i] < 0) RothUI.inputError(selectors.inputs[i]);
      }
      if((floatedInputArr[3] - floatedInputArr[2]) <= 0) {
        RothUI.inputError(selectors.inputs[2]);
        RothUI.inputError(selectors.inputs[3]);
      }
      if(floatedInputArr[5] > 37) RothUI.inputError(selectors.inputs[5]);
      if(floatedInputArr[4] > 12) RothUI.inputError(selectors.inputs[4]);
      if(floatedInputArr[1] > 6000) RothUI.inputError(selectors.inputs[1]);

    },
    inputError: (x) => {
      x.parentElement.classList.add('input-error');
      document.querySelector('#submit').disabled = true;
    },
    resetValues: () => {
      selectors.startingBalance = parseFloat(document.querySelector('.sb').value)
      selectors.annualContributions = parseFloat(document.querySelector('.ac').value)
      selectors.retirementAge = parseFloat((document.querySelector('.retirement').value) - 1)
      selectors.age = parseFloat(document.querySelector('.age').value)
      selectors.rateOfReturn = parseFloat((document.querySelector('.ror').value) / 100)
      selectors.marginalTaxRate = parseFloat((document.querySelector('.mtr').value) / 100)
    },
    displayChart: (tcArr, tsArr, age) => {
      myChart.data.labels = []
      myChart.options.scales.y.max = Math.round(tcArr[tcArr.length - 1]);
      myChart.data.datasets[0].label = `Roth IRA: $${RothUI.insertCommas(Math.round(tcArr[tcArr.length - 1]))}`
      myChart.data.datasets[1].label = `Trad IRA: $${RothUI.insertCommas(Math.round(tsArr[tsArr.length - 1]))}`
      for(let i = 0; i < tcArr.length; i++) {
        myChart.data.datasets[0].data[i] = tcArr[i]
        myChart.data.datasets[1].data[i] = tsArr[i]
        i === 0 ? myChart.data.labels[i] = age : myChart.data.labels[i] = `Age - ${age + i}`
      }      
      myChart.update();   
    },
    insertCommas: (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    showReportModal: () => {
      // Create Modal Report
    },
    displayLoader: () => {
      document.getElementById('tax-calc-loader').style.display = 'block';
      document.getElementById('tax-calc-loader').style.opacity = 1;
      document.getElementById('tax-calc-loader').style.transition = 'opacity .2s';
      setTimeout(()=> {
        document.getElementById('tax-calc-loader').style.opacity = 0;
        document.getElementById('tax-calc-loader').style.transition = 'all .2s';
        document.getElementById('tax-calc-loader').style.display = 'none';
      },1500)
    },
    createReport: () => {
      // Create Report for
    },
    createPaginationButtons: () => {
      // Create PaginationButtons
    },
    tablePagination: () => {
      // Handle Table Pagination
    },
  }
})()