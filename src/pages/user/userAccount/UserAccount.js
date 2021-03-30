import './UserAccount.scss';
import Layout from '../../../components/layout/Layout';
import { useSelector } from 'react-redux';
import { selectLoggedUser } from '../../../redux/selectors/userSelectors';

const UserAccount = () => {
  const user = useSelector(selectLoggedUser);

  const firstName = user?.first_name || '';
  const lastName = user?.last_name || '';
  const email = user?.email || '';
  const phone = user?.phone || '';
  const picture = user?.picture;

  return (
    <Layout>
      <div className='user-account'>
        {picture ? (
          <img src={picture} alt={firstName} className='user-account__picture' />
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
