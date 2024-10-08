// mockData.js
export const userAccounts = {
  savingAccounts: [
    { accountNumber: 'SA123456', balance: 5000, withdrawalsThisMonth: 3, accountType: 'Adult', interestRate: '10%', minBalance: 1000, branchName: 'Main Branch', branchId: 'B001' },
    { accountNumber: 'SA654321', balance: 3000, withdrawalsThisMonth: 1, accountType: 'Teen', interestRate: '11%', minBalance: 500, branchName: 'Main Branch', branchId: 'B001' },
  ],
  checkingAccounts: [
    { accountNumber: 'CA123456', balance: 2000, accountType: 'Checking', branchName: 'Main Branch', branchId: 'B001' },
    { accountNumber: 'CA654321', balance: 1500, accountType: 'Checking', branchName: 'Main Branch', branchId: 'B001' },
  ],
  fixedDeposits: [
    { accountNumber: 'FD123456', balance: 10000, duration: '6 months', interestRate: '13%', linkedSavingAccount: 'SA123456', startDate: '2023-01-01', branchName: 'Main Branch', branchId: 'B001' },
    { accountNumber: 'FD654321', balance: 20000, duration: '1 year', interestRate: '14%', linkedSavingAccount: 'SA654321', startDate: '2023-01-01', branchName: 'Main Branch', branchId: 'B001' },
  ],
};