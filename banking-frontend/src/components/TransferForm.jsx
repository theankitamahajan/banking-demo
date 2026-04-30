import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../features/accounts/accountsSlice";
import { fetchTransactions, submitTransfer } from "../features/transfers/transfersSlice";

const defaultForm = {
  fromAccountId: "",
  toAccountId: "",
  amount: ""
};

export default function TransferForm() {
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.accounts.items);
  const transferState = useSelector((state) => state.transfers);
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      fromAccountId: Number(form.fromAccountId),
      toAccountId: Number(form.toAccountId),
      amount: Number(form.amount)
    };
    const result = await dispatch(submitTransfer(payload));
    if (!result.error) {
      dispatch(fetchAccounts());
      dispatch(fetchTransactions(payload.fromAccountId));
      setForm(defaultForm);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Transfer Funds</h3>
      <select
        value={form.fromAccountId}
        onChange={(e) => setForm({ ...form, fromAccountId: e.target.value })}
      >
        <option value="">From account</option>
        {accounts.map((account) => (
          <option key={account.id} value={account.id}>
            {account.accountNumber} ({account.ownerName})
          </option>
        ))}
      </select>
      <select
        value={form.toAccountId}
        onChange={(e) => setForm({ ...form, toAccountId: e.target.value })}
      >
        <option value="">To account</option>
        {accounts.map((account) => (
          <option key={account.id} value={account.id}>
            {account.accountNumber} ({account.ownerName})
          </option>
        ))}
      </select>
      <input
        type="number"
        min="0.01"
        step="0.01"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />
      <button type="submit">Transfer</button>
      {transferState.error ? <p className="error">{transferState.error}</p> : null}
    </form>
  );
}
