import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TicketPage from "./components/TicketPage/TicketPage";
import ViewTicket from "./components/ViewTicket/ViewTicket";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div>
          <Sidebar />
          <Switch>
            <Route path="/" exact component={TicketPage} />
            <Route path="/:id" component={ViewTicket} />
          </Switch>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
