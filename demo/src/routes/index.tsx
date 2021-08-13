import {
    Atomi,
    Base,
    Base2,
    MultipleTiles,
    MultipleTiles4,
    MultipleTiles6,
    MultipleTiles8,
    Multipletiles4FullImg,
} from './../templates';

const routes = [
    {
        path: '/templates/atomi',
        name: 'Atomi',
        component: Atomi
    },
    {
        path: '/templates/base',
        name: 'Base',
        component: Base
    },
    {
        path: '/templates/base2',
        name: 'Base2',
        component: Base2
    },
    {
        path: '/templates/multipletiles',
        name: 'Multipletiles',
        component: MultipleTiles
    },
    {
        path: '/templates/multipletiles4',
        name: 'Multipletiles4',
        component: MultipleTiles4
    },
    {
        path: '/templates/multipletiles4FullImg',
        name: 'multipletiles4FullImg',
        component: Multipletiles4FullImg
    },
    {
        path: '/templates/multipletiles6',
        name: 'Multipletiles6',
        component: MultipleTiles6
    },
    {
        path: '/templates/multipletiles8',
        name: 'Multipletiles8',
        component: MultipleTiles8
    }
];

export default routes;
