import './App.css';
import { useState } from 'react';


//hooks
import useLocalStorage from './hooks/useLocalStorage';

//components
import Login from './components/loginT';
import Dashboard from './components/Dashboard';
import { ContactsProvider } from './contexts/ContactsProvider';
import { ConversationsProvider } from './contexts/ConversationsProvider';
import { SocketProvider } from './contexts/SocketProvider';

function App() {
  const [id, setId] = useLocalStorage('id',"0");
  const [showLogin, setShowLogin] = useState(false);
  const [currentUsername, setCurrentUsername] = useState("");
  const myStorage = window.localStorage;
  const dashboard = (
    <>
    {/* {id} */}
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} setId={setId} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
    </>
  )
  return (
    showLogin  ? dashboard : 
    <Login 
    id={setId}
    setShowLogin={setShowLogin}
    setCurrentUsername={setCurrentUsername}
    myStorage={myStorage}
    />
  );
}

export default App;
