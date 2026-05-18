import React from 'react'
import Dashboard from '../componants/Admin/DashBoard'
import AddNewStore from '../componants/Admin/AddNewStore';
import AddNewUser from '../componants/Admin/AddNewUser';
import ShowOwnerList from '../componants/Admin/ShowOwnerList';
import ShowStoreList from '../componants/Admin/ShowStoreList';
import ShowUserList from '../componants/Admin/ShowUserList';
import LogOut from '../componants/LogOut';
import CheckToken from '../componants/CheckToken';
import UpdatePassword from '../componants/UpdatePassword';

const AdmindashBoard = () => {
    const [activeTab, setActiveTab] = React.useState('dashboard');

    const handleTabClick = () => {
        switch (activeTab) {
            case 'dashboard': return <Dashboard />;
            case 'addStore': return <AddNewStore />;
            case 'addUser': return <AddNewUser />;
            case 'usersList': return <ShowUserList />;
            case 'storesList': return <ShowStoreList />;
            case 'storeOwnersList': return <ShowOwnerList />;
            case 'updatePassword': return <UpdatePassword />;
            default: return <Dashboard />;
        }
    }

    return (
        
        <div className='min-h-screen min-w-screen bg-gray-50'>
            <CheckToken />
            <header className='py-6 px-6 bg-white border-b border-gray-200 shadow-sm flex justify-between items-center'>
                <h1 className='text-3xl font-bold text-slate-900'>Admin Dashboard</h1>
                <div>
                <LogOut />
                </div>
            </header>
            <div className='flex flex-row min-h-screen'>
                <aside className='w-full h-full md:w-64 bg-white border-r border-gray-200 p-5'>
                    <nav>
                        <ul className='space-y-2'>
                            <li>
                                <button
                                    onClick={() => setActiveTab('dashboard')}
                                    className={`w-full text-left rounded-xl px-4 py-3 ${activeTab === 'dashboard' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
                                >
                                    Dashboard
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('addStore')}
                                    className={`w-full text-left rounded-xl px-4 py-3 ${activeTab === 'addStore' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
                                >
                                    Add new Store
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('addUser')}
                                    className={`w-full text-left rounded-xl px-4 py-3 ${activeTab === 'addUser' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
                                >
                                    Add new User
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('storesList')}
                                    className={`w-full text-left rounded-xl px-4 py-3 ${activeTab === 'storesList' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
                                >
                                    Stores list
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('usersList')}
                                    className={`w-full text-left rounded-xl px-4 py-3 ${activeTab === 'usersList' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
                                >
                                    Users list
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('storeOwnersList')}
                                    className={`w-full text-left rounded-xl px-4 py-3 ${activeTab === 'storeOwnersList' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
                                >
                                    Store Owner list
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('updatePassword')}
                                    className={`w-full text-left rounded-xl px-4 py-3 ${activeTab === 'updatePassword' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
                                >
                                    Update Password
                                </button>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <main className='flex-1 p-6'>
                    <div className=''>
                        {handleTabClick()}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AdmindashBoard