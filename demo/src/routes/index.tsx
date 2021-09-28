import {
    Atomi,
    Base,
    Base2,
    FullImage,
    MultipleTiles,
    MultipleTiles4,
    MultipleTiles6,
    MultipleTiles8,
    Multipletiles4FullImg,
    multipletiles6Fullimg,
    multipletiles8Fullimg,
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
        path: '/templates/full-image',
        name: 'FullImage',
        component: FullImage
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
        path: '/templates/multipletiles6Fullimg',
        name: 'multipletiles6Fullimg',
        component: multipletiles6Fullimg
    },
    {
        path: '/templates/multipletiles8',
        name: 'Multipletiles8',
        component: MultipleTiles8
    },
    {
        path: '/templates/multipletiles8Fullimg',
        name: 'multipletiles8Fullimg',
        component: multipletiles8Fullimg
    },
];

export default routes;
