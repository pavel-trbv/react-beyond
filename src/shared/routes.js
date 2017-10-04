import Home from './components/Home';
import NotFound from './components/NotFound';
import Counter from './components/Counter';

export default [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/counter',
    component: Counter
  },
  {
    path: '/',
    component: NotFound
  }
];