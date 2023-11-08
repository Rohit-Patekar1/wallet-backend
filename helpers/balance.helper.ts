export  function getBalance(amount:number,balance:number){
    if(amount>0)
    {
        return amount + balance;
    }
    else
    {
        return balance + amount;
    }
}