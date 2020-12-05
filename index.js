class Account {
  constructor(username) {
    this.username = username;
    this._transactions = [];
  }

  get balance() {
    let balance = 0;
    for (const transaction of this._transactions) {
      balance += transaction.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this._transactions.push(transaction);
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

const beeAccount = new Account("Bee");
console.log('Account Holder: ', beeAccount.username);
console.log('Starting Balance: ', beeAccount.balance);
const t1 = new Withdrawal(50.25, beeAccount);
t1.commit();
const t2 = new Deposit(120.00, beeAccount);
t2.commit();
console.log('Ending Balance:', beeAccount.balance, "\n");

const benjAccount = new Account("Benj");
console.log('Account Holder: ', benjAccount.username);
console.log('Starting Balance: ', benjAccount.balance);
const t3 = new Deposit(200, benjAccount);
t3.commit();
const t4 = new Withdrawal(20.00, benjAccount);
t4.commit();
console.log('Ending Balance:', benjAccount.balance, "\n");

// console.log(beeAccount._transactions);
