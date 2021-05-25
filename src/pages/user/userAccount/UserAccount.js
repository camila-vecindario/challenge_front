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
        <div className='user-account__wrapper'>
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
          <h6>
            {firstName} {lastName}
          </h6>
          <b>Correo:</b>
          <h6>{email}</h6>
          <b>Teléfono:</b>
          <h6>{phone}</h6>
        </div>
      </div>
    </Layout>
  );
};

export default UserAccount;
