import Layout from '../../../components/layout/Layout';
import { useSelector } from 'react-redux';
import { selectLoggedUser } from '../../../redux/selectors/userSelectors';
import './UserAccount.scss';

const UserAccount = () => {
  const user = useSelector(selectLoggedUser);

  const firstName = user?.firstName || '';
  const lastName = user?.lastName || '';
  const email = user?.email || '';
  const phone = user?.phone || '';

  return (
    <Layout>
      <div className='user-account'>
        {user.picture ? (
          <img src={user.picture} alt={firstName} className='user-account__picture' />
        ) : (
          <div className='user-account__picture'>
            <h1>
              {firstName.charAt(0).toUpperCase()}
              {lastName.charAt(0).toUpperCase()}
            </h1>
          </div>
        )}
        <h3>
          {firstName} {lastName}
        </h3>
        <h3>{email}</h3>
        <h3>{phone}</h3>
      </div>
    </Layout>
  );
};

export default UserAccount;
