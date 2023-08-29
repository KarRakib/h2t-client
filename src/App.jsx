import './App.css'
import AuthContext from './Context/AuthContext';
import ProductContext from './Context/ProductContext'
import Router from './Router/Router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider} from 'react-query'
import { useState } from 'react';
import { useEffect } from 'react';
import HomeLoader from './Components/HomeLoader';
const queryClient = new QueryClient()
function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the timeout duration as needed
  }, []);
  return (
    <div className='App.css'>
     { isLoading ? <HomeLoader/> :<>
     <QueryClientProvider client={queryClient}>
      <AuthContext>
        <ProductContext>
          <Router></Router>
          <ToastContainer />
        </ProductContext>
      </AuthContext>
      </QueryClientProvider>
     </>}
    </div>
  )
}

export default App
// ``   ǃ  b B