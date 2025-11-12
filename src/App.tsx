
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/anime/:id" element={<DetailPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;