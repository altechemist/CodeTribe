import React from 'react'

// Sweet alerts
import Swal from 'sweetalert2'

// Define the profile type
interface Profile {
  name: string;
  email: string;
  password: string;
  preferences: Array<string>;
  bookmarks: Array<string>;
}

// Props for the Profile component
interface ProfileProps {
  user: Profile;
}

// Define the Profile component
const ProfilePage: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className='container border rounded-5 p-4 my-4 shadow'>
      {user.name ? (
        <div>
          <h1>{user.name}'s Profile</h1>
          <p>Email: {user.email}</p>
          <h6>Interest:</h6>
          <ul>
            {user.preferences.map((pref, index) => (
              <li key={index}>{pref}</li>
            ))}
          </ul>
          
        </div>
      ) : (
        <div>Please login</div>
      )}
    </div>
  )
}

export default ProfilePage
