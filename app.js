/* ─── Tab switching ─────────────────────────────────────── */
function toggleTab(tabId) {
  // activate correct tab panel
  document.querySelectorAll(".tab-content").forEach(el => el.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");

  // activate correct button
  document.querySelectorAll(".tabs button").forEach(btn => btn.classList.remove("active"));
  const btnId = tabId === "salaryTab" ? "salaryTabBtn" : "payslipTabBtn";
  document.getElementById(btnId).classList.add("active");
}

/* ─── Core salary math ───────────────────────────────────── */
function calculateFinalSalary(salary, lop, bonus) {
  const perDay   = salary / 30;
  const deduction = lop   * perDay;
  const bonusAmt  = bonus * perDay;
  const final     = salary - deduction + bonusAmt;
  return { deduction, bonusAmt, final };
}

/* ─── Final Salary Calculator (Tab 1) ───────────────────── */
function calculateSalary() {
  const salary = parseFloat(document.getElementById("totalSalary").value);
  const lop    = parseInt(document.getElementById("lopDays").value);
  const bonus  = parseInt(document.getElementById("bonusDays").value);

  if (isNaN(salary) || isNaN(lop) || isNaN(bonus) || salary <= 0 || lop < 0 || bonus < 0) {
    document.getElementById("result").textContent = "Please enter valid positive numbers.";
    return;
  }

  const { final } = calculateFinalSalary(salary, lop, bonus);
  document.getElementById("result").innerHTML = `<strong>Final Salary:</strong> ₹${final.toFixed(2)}`;
}

/* ─── Payslip Generator (Tab 2) ─────────────────────────── */
function generatePayslip() {
  const name  = document.getElementById("empName").value.trim();
  const id    = document.getElementById("empId").value.trim();
  const bank  = document.getElementById("bankName").value.trim();
  const acc   = document.getElementById("accNo").value.trim();
  const sal   = parseFloat(document.getElementById("totalSalary2").value);
  const lop   = parseInt(document.getElementById("lopDays2").value);
  const bonus = parseInt(document.getElementById("bonusDays2").value);

  if (!name || !id || !bank || !acc || isNaN(sal) || isNaN(lop) || isNaN(bonus) || sal <= 0 || lop < 0 || bonus < 0) {
    document.getElementById("payslipResult").textContent = "Please fill all fields with valid values.";
    return;
  }

  const { deduction, bonusAmt, final } = calculateFinalSalary(sal, lop, bonus);

  /* template literal for the payslip content */
  document.getElementById("payslipResult").innerHTML = `
    <div class="payslip">
      <div class="header"><strong>ABC Hospitals</strong><br>Payslip for the Month</div>

      <!-- Employee & Bank details -->
      <table>
        <tr><td>Employee Name</td><td>${name}</td><td>Employee ID</td><td>${id}</td></tr>
        <tr><td>Bank Name</td><td>${bank}</td><td>Account No</td><td>${acc}</td></tr>
      </table>

      <!-- Salary breakdown -->
      <table>
        <thead>
          <tr><th>Description</th><th>Days</th><th>Amount (₹)</th></tr>
        </thead>
        <tbody>
          <tr><td>Total Salary</td><td>30</td><td>${sal.toFixed(2)}</td></tr>
          <tr><td>Loss of Pay (LOP)</td><td>${lop}</td><td>- ${deduction.toFixed(2)}</td></tr>
          <tr><td>Bonus</td><td>${bonus}</td><td>+ ${bonusAmt.toFixed(2)}</td></tr>
          <tr><td colspan="2"><strong>Net Salary</strong></td><td><strong>${final.toFixed(2)}</strong></td></tr>
        </tbody>
      </table>

      <!-- Signature section -->
      <div class="footer">
        <div><br><br><strong>HR Signature</strong></div>
        <div><br><br><strong>Hospital Stamp</strong></div>
      </div>

      <div style="text-align:right; margin-top:20px;">Date: ${new Date().toLocaleDateString()}</div>
    </div>
  `;
}
