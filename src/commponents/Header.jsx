import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

const Header = ({ user }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');

        navigate('/login');
    };
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Notes App</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className="me-2">
                        Signed in as: {user.name}
                    </Navbar.Text>
                    <Navbar.Text onClick={handleLogout} style={{ cursor: "pointer" }}>
                        Logout
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;