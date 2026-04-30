import AccountsList from "./components/AccountsList";
import CreateAccountForm from "./components/CreateAccountForm";
import TransferForm from "./components/TransferForm";

export default function App() {
  return (
    <main className="container">
      <h1>Banking Dashboard</h1>
      <p>Spring Boot + React + Redux Toolkit starter.</p>
      <div className="grid">
        <CreateAccountForm />
        <TransferForm />
      </div>
      <AccountsList />
    </main>
  );
}
