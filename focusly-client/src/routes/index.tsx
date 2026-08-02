import { createBrowserRouter } from 'react-router-dom';

const AppLayout = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
const CategoryManager = () => <div>Category Manager</div>;
const Settings = () => <div>Settings</div>;

// Placeholder components - will be implemented later
const Home = () => <div>Home Page</div>;
const AddTransaction = () => <div>Add Transaction</div>;
const Stats = () => <div>Stats Page</div>;
const Categories = () => <CategoryManager />;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout><Home /></AppLayout>,
  },
  {
    path: '/add',
    element: <AppLayout><AddTransaction /></AppLayout>,
  },
  {
    path: '/stats',
    element: <AppLayout><Stats /></AppLayout>,
  },
  {
    path: '/categories',
    element: <AppLayout><Categories /></AppLayout>,
  },
  {
    path: '/settings',
    element: <AppLayout><Settings /></AppLayout>,
  },
]);