function showTab(tabId) {
  document.getElementById('salary').style.display = 'none';
  document.getElementById('payslip').style.display = 'none';
  document.getElementById(tabId).style.display = 'block';
}

function calculateSalary() {
  const total = parseFloat(document.getElementById("totalSalary").value);
  const lop = parseInt(document.getElementById("lopDays").value) ;
  const bonus = parseInt(document.getElementById("bonusDays").value);

  if (isNaN(total) || isNaN(lop) || isNaN(bonus)) {
    document.getElementById("salaryResult").innerText = "Enter valid numbers.";
    return;
  }

  const perDay = total / 30;
  const deduction = lop * perDay;
  const bonusAmount = bonus * perDay;
  const final = total - deduction + bonusAmount;

  document.getElementById("salaryResult").innerHTML = `
    Total: ₹ ${total.toFixed(2)}<br>
    LOP: ${lop} days<br>
    Bonus: ${bonus} days<br>
    Deduction: ₹ ${deduction.toFixed(2)}<br>
    Bonus Amount: ₹ ${bonusAmount.toFixed(2)}<br>
    <strong>Final Salary: ₹ ${final.toFixed(2)}</strong>
  `;
}

function generatePayslip() {
  const name = document.getElementById("empName").value;
  const id = document.getElementById("empId").value;
  const bank = document.getElementById("bankName").value;
  const account = document.getElementById("accountNo").value;
  const total = parseFloat(document.getElementById("pTotalSalary").value);
  const lop = parseInt(document.getElementById("pLop").value);
  const bonus = parseInt(document.getElementById("pBonus").value);
  const month = document.getElementById("payslipMonth").value;
  const year = document.getElementById("payslipYear").value;

  if (!name || !id || !bank || !account || isNaN(total) || isNaN(lop) || isNaN(bonus) || !month || !year) {
    alert("Please fill all fields correctly.");
    return;
  }

  const perDay = total / 30;
  const deduction = lop * perDay;
  const bonusAmount = bonus * perDay;
  const final = total - deduction + bonusAmount;

  document.getElementById("outMonthYear").innerText = `Payslip for the month of ${month} ${year}`;
  document.getElementById("outName").innerText = name;
  document.getElementById("outId").innerText = id;
  document.getElementById("outBank").innerText = bank;
  document.getElementById("outAccount").innerText = account;
  document.getElementById("outTotal").innerText = `₹${total.toFixed(2)}`;
  document.getElementById("outLop").innerText = lop;
  document.getElementById("outBonus").innerText = bonus;
  document.getElementById("outDeduction").innerText = `-₹${deduction.toFixed(2)}`;
  document.getElementById("outBonusAmt").innerText = `+₹${bonusAmount.toFixed(2)}`;
  document.getElementById("outFinal").innerText = `₹${final.toFixed(2)}`;

  document.getElementById("payslipContainer").style.display = "block";
}
