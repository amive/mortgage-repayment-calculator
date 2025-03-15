document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".number-input").forEach((input) => {
    input.addEventListener("input", function (e) {
      let value = e.target.value.replace(/,/g, ""); // Remove existing commas
      if (!isNaN(value) && value !== "") {
        e.target.value = Number(value).toLocaleString("en-GB");
      }
    });
  });
  function clearAll() {
    document.querySelectorAll(".number-input").forEach((input) => {
      input.value = "";
    });
  }
  function showAlert(message) {
    document.getElementById("alertMessage").textContent = message;
    document.getElementById("customAlert").style.display = "block";
  }

  function closeAlert() {
    document.getElementById("customAlert").style.display = "none";
  }
  function resultSwap() {
    const complete = document.querySelector(".completed-results");
    const empty = document.querySelector(".empty-results");
    if (document.getElementById("resultMonthly").textContent === "") {
      complete.style.display = "block";
      empty.style.display = "none";
    }
  }
  function calculateRepayments() {
    let amount = parseFloat(document.getElementById("MortgageAmount").value);
    let term = parseInt(document.getElementById("MortgageTerm").value);
    let rate = parseFloat(document.getElementById("InterestRate").value);
    let mortgageType = document.querySelector(
      'input[name="Mortgagetype"]:checked'
    ).value; // Get selected type

    if (isNaN(amount) || isNaN(term) || isNaN(rate)) {
      showAlert("Please enter valid numbers!");
      return;
    }

    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = term * 12;
    let monthlyPayment, totalPayment;

    if (mortgageType === "repayment") {
      // Repayment Mortgage Calculation
      monthlyPayment =
        (amount * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
      totalPayment = monthlyPayment * numberOfPayments;
    } else {
      // Interest-Only Mortgage Calculation
      monthlyPayment = amount * monthlyRate;
      totalPayment = monthlyPayment * numberOfPayments; // This assumes interest is paid for the full term
    }
    resultSwap();
    // Display result
    document.getElementById(
      "resultMonthly"
    ).textContent = `£ ${monthlyPayment.toLocaleString("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
    document.getElementById(
      "totalResult"
    ).textContent = `£ ${totalPayment.toLocaleString("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
  document.getElementById("clearAll").addEventListener("click", clearAll);
  // Attach function to button
  document
    .querySelector(".calc")
    .addEventListener("click", calculateRepayments);

  // Attach closeAlert to OK button
  document.getElementById("OK").addEventListener("click", closeAlert);
});
