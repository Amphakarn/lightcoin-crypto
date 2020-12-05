class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (const transaction of this.transactions) {
      balance += transaction.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
      return true;
    }
    return false;
  }
}

class Deposit extends Transaction {
  isAllowed() {
    return true;
  }

  get value() {
    return this.amount;
  }
}

class Withdrawal extends Transaction {
  isAllowed() {
    if (this.amount > this.account.balance) {
      return false;
    } else {
      return true;
    }
  }

  get value() {
    return -this.amount;
  }
}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("bee");

console.log('Account Holder: ', myAccount.username);

console.log('Starting Balance: ', myAccount.balance);

const t1 = new Withdrawal(50.25, myAccount);
t1.commit();

const t3 = new Deposit(120.00, myAccount);
t3.commit();

console.log('Ending Balance:', myAccount.balance);
console.log(myAccount.transactions);
