import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import CollectionsPage from '../pages/CollectionsPage';
import HomePage from '../pages/HomePage';
import ImagePage from '../pages/ImagePage';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/image/:id" element={<ImagePage />} />
        <Route path="/collections" element={<CollectionsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
