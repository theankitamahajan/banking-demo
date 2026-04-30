import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAccount, fetchAccounts } from "../features/accounts/accountsSlice";

const defaultForm = {
  ownerName: "",
  accountNumber: "",
  initialBalance: "0"
};

export default function CreateAccountForm() {
  const dispatch = useDispatch();
  const [form, setForm] = useState(defaultForm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createAccount({ ...form, initialBalance: Number(form.initialBalance) }));
    dispatch(fetchAccounts());
    setForm(defaultForm);
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Create Account</h3>
      <input
        placeholder="Owner name"
        value={form.ownerName}
        onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
      />
      <input
        placeholder="Account number"
        value={form.accountNumber}
        onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
      />
      <input
        type="number"
        min="0"
        step="0.01"
        placeholder="Initial balance"
        value={form.initialBalance}
        onChange={(e) => setForm({ ...form, initialBalance: e.target.value })}
      />
      <button type="submit">Create</button>
    </form>
  );
}
