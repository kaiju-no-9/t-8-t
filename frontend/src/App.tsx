
import { BrowserRouter , Routes , Route} from 'react-router-dom';
import '@xyflow/react/dist/style.css';
import CreateWorkFlow from "@/components/CreateWorkFlow.tsx";



function App() {

    return <div>
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard" element={<CreateWorkFlow/>}/>
            </Routes>
        </BrowserRouter>
    </div>


}

export default App