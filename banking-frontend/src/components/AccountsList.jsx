import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../features/accounts/accountsSlice";
import { fetchTransactions } from "../features/transfers/transfersSlice";

export default function AccountsList() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.accounts);
  const transactions = useSelector((state) => state.transfers.transactions);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  return (
    <div className="card">
      <h3>Accounts</h3>
      {status === "loading" ? <p>Loading...</p> : null}
      {error ? <p className="error">{error}</p> : null}
      <ul>
        {items.map((account) => (
          <li key={account.id}>
            <strong>{account.ownerName}</strong> - {account.accountNumber} - $
            {Number(account.balance).toFixed(2)}
            <button onClick={() => dispatch(fetchTransactions(account.id))}>View Transactions</button>
          </li>
        ))}
      </ul>

      <h4>Recent Transactions</h4>
      <ul>
        {transactions.map((tx) => (
          <li key={tx.id}>
            #{tx.id} from {tx.fromAccountId} to {tx.toAccountId} amount ${Number(tx.amount).toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
