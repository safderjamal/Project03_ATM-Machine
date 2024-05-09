#! /usr/bin/env node

import inquirer from "inquirer";

console.log("\n%%%%%% CLI ATM MACHINE %%%%%%\n");

let accountBalance = 5000;
const pinCode = "0000";
let condition = true;

// PIN VERIFICATION
const pinVerify = await inquirer.prompt([
  {
    message: "Enter your 4-digit PIN to confirm your identity :",
    type: "password",
    name: "pin",
    mask: "*",
  },
]);

if (pinVerify.pin !== pinCode) {
  console.log("\nIncorrect PIN Code");
  condition = false;
} else {
  console.log("\nPIN is correct\n");

  //LOOP AFTER CORRECT PIN | SELECT THE OPERATION
  while (condition) {
    let userOperation = await inquirer.prompt([
      {
        message: "Please select the transaction:",
        name: "operation",
        type: "list",
        choices: ["Check Balance", "Cash Withdrawal", "Fast Cash", "Exit"],
      },
    ]);
    console.log("\t");

    //CHECK ACCOUNT BALANCE
    if (userOperation.operation === "Check Balance") {
      console.log(`Your Account Balance is : ${accountBalance}\n`);
    }

    //WITHDRAW CASH IF AMOUNT IS LESS THAN ACCOUNT BALANCE
    else if (userOperation.operation === "Cash Withdrawal") {
      let withdrawAmount = await inquirer.prompt([
        {
          message: "Enter the Amount to Withdraw : ",
          name: "withdraw",
          type: "number",
        },
      ]);
    // ATM Machine contains 500, 1000 and 5000 Notes
      if (
        withdrawAmount.withdraw <= accountBalance &&
        withdrawAmount.withdraw % 500 === 0 &&
        withdrawAmount.withdraw <= 50000
      ) {
        accountBalance = accountBalance - withdrawAmount.withdraw;
        console.log("\nTransaction Successful");
        console.log(`Your Remaining Balance is : ${accountBalance}`);
        break;
      } else {
        if(withdrawAmount.withdraw > accountBalance){
          console.log("\nSorry!! You have Insufficient Balance");
        condition = false;
        }
        else if (withdrawAmount.withdraw % 500 !== 0){
          console.log("\nTransaction Failed");
          console.log("Invalid Amount");
          console.log("Please enter a multiple of 500");
        condition = false;
        }
        else {
          console.log("\nTransaction Failed");
          console.log("Invalid Amount");
          condition = false;
        }
      }
    }

    //CHOOSE THE AMOUNT FROM THE LIST TO FAST CASH WITHDRAWAL
    else if (userOperation.operation === "Fast Cash") {
      let fastCashTransaction = await inquirer.prompt([
        {
          message: "Choose the Amount to Withdraw : ",
          name: "fastCash",
          type: "list",
          choices: [500, 1000, 5000, 10000, 50000],
        },
      ]);
      if (fastCashTransaction.fastCash <= accountBalance) {
        accountBalance = accountBalance - fastCashTransaction.fastCash;
        console.log("\nTransaction Successful");
        console.log(`Your Remaining Balance is : ${accountBalance}`);
        break;
      } else {
        console.log("\nSorry!! You have Insufficient Balance");
        condition = false;
      }
    }

    //EXIT TRANSACTION
    else if (userOperation.operation === "Exit") {
      condition = false;
    }
  }
}
