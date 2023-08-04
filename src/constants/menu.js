export const menu = [

    {
        icon: 'blocks',
        name: 'dashboard',
        link:  '/dashboard_a'
    },
    {
        cat: 'dashboard',
        icon: 'blocks',
        links: [
            { name: "Dashboard A", link: '/dashboard_a' },
            { name: "Dashboard B", link: '/dashboard_b' },
            { name: "Dashboard C", link: '/dashboard_c' },
            { name: "Dashboard D", link: '/dashboard_d' },
            { name: "Dashboard E", link: '/dashboard_e' },
            { name: "Dashboard F", link: '/dashboard_f' },
            { name: "Dashboard G", link: '/dashboard_g' },
            { name: "Dashboard H", link: '/dashboard_h' },
            { name: "Dashboard I", link: '/dashboard_i' },
            { name: "Dashboard J", link: '/dashboard_j' },
            { name: "Dashboard K", link: '/dashboard_k' },
            { name: "Page 404", link: '/404' },
        ]
    },

    {
        cat: 'patients',
        icon: 'users',
        links: [
            { name: "View Patients", link: '/patients' },
            { name: "Find patient", link: '/find_patient' }
        ]
    },
    {
        cat: 'Orders',
        icon: 'menu',
        links: [
            { name: "Find Order", link: '/get' },
            { name: "View order", link: '/view' }
        ]
    },

    {
        cat: 'Products',
        icon: 'stethoscope',
        links: [
            { name: "Add Product", link: '/add_product' },
            { name: "View Product", link: '/view_product' }
        ]
    },
    {
        cat: 'messages',
        icon: 'comment',
        links: [
            { name: "Doctor Messenger", link: '/doctor_messenger' },
            { name: "Patient Messenger", link: '/patient_messenger' }
        ]
    },
    {
        cat: 'appointments',
        icon: 'calendar',
        links: [
            { name: "Patient Appointments", link: '/patient_appointments' },
            { name: "Doctor Appointments", link: '/doctor_appointments' }
        ]
    },
    {
        
        icon: 'star',
        name: 'report',
        link: '/report' ,
    },
    {
        
        icon: 'star',
        name: 'My Account',
        link: '/my_account' ,
    },
    {
        
        icon: 'star',
        name: 'Manange Company',
        link: '/manage_company' ,
    },

    {
        
        icon: 'star',
        name: 'Documentation',
        // link: '/report' ,
    },


    {
        cat: 'reviews',
        icon: 'star',
        links: [
            { name: "Doctor Reviews", link: '/doctor_reviews' },
            { name: "Patient Reviews", link: '/patient_reviews' }
        ]
    },
    {
        icon: 'wallet',
        name: 'Finances',
        link: '/finances'
    },
    {
        icon: 'settings',
        name: 'Settings',
        link: '/settings'
    }
    // {
    //     icon: 'settings',
    //     name: 'login',
    //     link: '/login'
    // }
]