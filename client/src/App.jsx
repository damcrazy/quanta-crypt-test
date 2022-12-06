import './App.css';
import { useState,useEffect } from 'react';
import axios from "axios";

//hooks
import useLocalStorage from './hooks/useLocalStorage';

//components
import Login from './components/loginT';
import Dashboard from './components/Dashboard';
import { ContactsProvider } from './contexts/ContactsProvider';
import { ConversationsProvider } from './contexts/ConversationsProvider';
import { SocketProvider } from './contexts/SocketProvider';
import Payment  from './components/Payment';

const auth = "http://localhost:8800/api/users"


function App() {
  const [id, setId] = useLocalStorage('id',"0");
  const [showLogin, setShowLogin] = useState(false);
  const [currentUsername, setCurrentUsername] = useState("");
  const myStorage = window.localStorage;
  const [payment, setPayment] = useState(false);

  useEffect(() => {
    if (id !== "0") {
      axios.get(auth + "/payment", {
        params: {
          id: id
        }
      }).then((res) => {
        setPayment(res.data.payment);
      }).catch((err) => {
        console.log(err);
      })
    }
  }, [id])


  const dashboard = (
    <>
    {/* {id} */}
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} setId={setId} setShowLogin={setShowLogin} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
    </>
  )
  return (
    showLogin ? payment? dashboard : <Payment id={id}/>: 
    <Login 
    id={setId}
    setShowLogin={setShowLogin}
    setCurrentUsername={setCurrentUsername}
    myStorage={myStorage}
    auth={auth}
    />
  );
}

export default App;
