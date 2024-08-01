import { Outlet, Link } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <div className="container-sm">
                <header className="d-flex flex-wrap justify-content-center py-3 mb-4">
                    <a
                        href="/"
                        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
                    >
                        <i
                            className="bi bi-house-fill me-2"
                        ></i>
                        <span className="fs-4">Task Master</span>
                    </a>

                    <ul className="nav">
                        
                        <li className="nav-item">
<<<<<<< HEAD
=======
                            <Link className="nav-link" to="/">
                                <button className="btn btn-outline-primary me-2">
                                    <i className="bi bi-house-fill me-2"></i>
                                    Home
                                </button>
                            </Link>
                        </li>
                        <li className="nav-item">
>>>>>>> bf088ad7ae39fd261b67ab9c2436e0a73d95e038
                            <Link className="nav-link" to="/tasks"><button className="btn btn-outline-primary me-2">
                                <i className="bi bi-list-task me-2"></i>
                                Tasks
                            </button></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login"><button className="btn btn-outline-primary me-2">
                                <i className="bi bi-box-arrow-in-left me-2"></i>
                                Login
                            </button></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register"><button className="btn btn-outline-primary me-2">
                                <i className="bi bi-person-add me-2"></i>
                                Register
                            </button></Link>
                        </li>
                    </ul>

                </header>
            </div>
            <Outlet />
        </>
    )
}
